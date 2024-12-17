'use client'

import ServerError from "@/components/errors/ServerError"
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <ServerError />
      </body>
    </html>
  )
}