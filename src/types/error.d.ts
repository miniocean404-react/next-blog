interface ErrorProps {
  error: Error & { digest?: string; environmentName: "Server" | "Client" }
  reset: () => void
}
