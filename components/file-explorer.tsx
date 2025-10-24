"use client"

import type React from "react"

import { useState } from "react"
import { File, Plus, Upload, Trash2, Edit2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileExplorerProps {
  activeFile: string | null
  onFileSelect: (file: string) => void
  files: string[]
  onCreateFile: (fileName: string) => void
  onDeleteFile: (fileName: string) => void
  onRenameFile: (oldName: string, newName: string) => void
}

export function FileExplorer({
  activeFile,
  onFileSelect,
  files,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
}: FileExplorerProps) {
  const [editingFile, setEditingFile] = useState<string | null>(null)
  const [newFileName, setNewFileName] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files
    if (!uploadedFiles) return

    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        onCreateFile(file.name)
      }
      reader.readAsText(file)
    })
  }

  const handleCreateNewFile = () => {
    const fileName = prompt("Enter file name:")
    if (fileName && !files.includes(fileName)) {
      onCreateFile(fileName)
    }
  }

  const handleRename = (oldName: string) => {
    const newName = prompt("Enter new file name:", oldName)
    if (newName && newName !== oldName && !files.includes(newName)) {
      onRenameFile(oldName, newName)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Explorer</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCreateNewFile} title="New File">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" title="Upload Files">
            <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </label>
            <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {files.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            <p>No files yet</p>
            <p className="mt-2">Drag & drop files here or click + to create</p>
          </div>
        ) : (
          <div>
            {files.map((file) => {
              const isActive = activeFile === file

              return (
                <div
                  key={file}
                  className={cn(
                    "group flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary/50 transition-colors",
                    isActive && "bg-secondary text-primary font-medium",
                  )}
                >
                  <button onClick={() => onFileSelect(file)} className="flex items-center gap-2 flex-1 min-w-0">
                    <File className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{file}</span>
                  </button>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleRename(file)}
                      title="Rename"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={() => {
                        if (confirm(`Delete ${file}?`)) {
                          onDeleteFile(file)
                        }
                      }}
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
