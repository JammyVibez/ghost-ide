"use client"

import { useEffect, useRef, useState } from "react"
import { RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LivePreviewProps {
  code: string
  fileType: string
}

export function LivePreview({ code, fileType }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState(Date.now())

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePreview()
    }, 500) // Debounce for 500ms

    return () => clearTimeout(timer)
  }, [code])

  const updatePreview = () => {
    if (!iframeRef.current) return
    setError(null)

    try {
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document

      if (!doc) return

      let htmlContent = ""

      if (fileType === "html" || fileType === "htm") {
        htmlContent = code
      } else if (fileType === "md" || fileType === "markdown") {
        // Simple markdown to HTML conversion
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: system-ui; padding: 20px; line-height: 1.6; }
                h1, h2, h3 { color: #333; }
                code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
                pre { background: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; }
              </style>
            </head>
            <body>${code.replace(/\n/g, "<br>")}</body>
          </html>
        `
      } else if (fileType === "js" || fileType === "jsx") {
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: system-ui; padding: 20px; }
                #output { background: #f4f4f4; padding: 12px; border-radius: 6px; margin-top: 12px; }
              </style>
            </head>
            <body>
              <h3>JavaScript Output</h3>
              <div id="output"></div>
              <script>
                const originalLog = console.log;
                const output = document.getElementById('output');
                console.log = (...args) => {
                  output.innerHTML += args.join(' ') + '<br>';
                  originalLog(...args);
                };
                try {
                  ${code}
                } catch (e) {
                  output.innerHTML = '<span style="color: red;">Error: ' + e.message + '</span>';
                }
              </script>
            </body>
          </html>
        `
      } else if (fileType === "css") {
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>${code}</style>
            </head>
            <body>
              <div style="padding: 20px;">
                <h1>CSS Preview</h1>
                <p>This is a paragraph with your custom styles applied.</p>
                <button>Button</button>
                <div class="box">Box Element</div>
              </div>
            </body>
          </html>
        `
      } else {
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: monospace; padding: 20px; white-space: pre-wrap; }
              </style>
            </head>
            <body>${code}</body>
          </html>
        `
      }

      doc.open()
      doc.write(htmlContent)
      doc.close()
      setLastUpdate(Date.now())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Preview error")
    }
  }

  const handleRefresh = () => {
    updatePreview()
  }

  const handleOpenInNewTab = () => {
    const newWindow = window.open()
    if (newWindow) {
      newWindow.document.write(code)
      newWindow.document.close()
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Preview Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Live Preview</span>
          <span className="text-xs text-muted-foreground">Auto-refresh enabled</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={handleOpenInNewTab} className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Open
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden bg-white">
        {error ? (
          <div className="p-4 text-red-500 font-mono text-sm">
            <strong>Preview Error:</strong>
            <br />
            {error}
          </div>
        ) : (
          <iframe ref={iframeRef} className="w-full h-full border-0" title="Live Preview" sandbox="allow-scripts" />
        )}
      </div>
    </div>
  )
}
