// Loading components

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-muted border-t-primary`} />
}

export function LoadingCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
      <div className="w-full h-48 bg-muted rounded-lg mb-4" />
      <div className="h-4 bg-muted rounded mb-2" />
      <div className="h-4 bg-muted rounded w-3/4 mb-4" />
      <div className="h-6 bg-muted rounded w-1/4" />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
