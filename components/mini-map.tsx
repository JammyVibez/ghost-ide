"use client"

interface MiniMapProps {
  content: string
  scrollPosition: number
  onScrollTo: (position: number) => void
}

export function MiniMap({ content, scrollPosition, onScrollTo }: MiniMapProps) {
  const lines = content.split("\n")
  const maxLines = 100
  const displayLines = lines.slice(0, maxLines)

  return (
    <div className="absolute right-0 top-0 bottom-0 w-24 bg-card/50 border-l border-border overflow-hidden">
      <div className="p-1 space-y-px">
        {displayLines.map((line, index) => (
          <div
            key={index}
            onClick={() => onScrollTo(index)}
            className="h-1 bg-muted-foreground/20 hover:bg-muted-foreground/40 cursor-pointer rounded-sm transition-colors"
            style={{
              width: `${Math.min((line.length / 80) * 100, 100)}%`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute left-0 right-0 h-8 bg-primary/20 border-y border-primary/40"
        style={{
          top: `${(scrollPosition / lines.length) * 100}%`,
        }}
      />
    </div>
  )
}
