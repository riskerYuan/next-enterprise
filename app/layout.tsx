import { headers } from "next/headers"
import Web3Provider from "@/context/Web3"
import "styles/tailwind.css"

export const metadata = {
  title: "Duck",
  description: "Duck",
  icons: {
    icon: "/logo.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookies = headers().get("cookie")
  return (
    <html lang="en">
      <body>
        <Web3Provider cookies={cookies}>{children}</Web3Provider>
      </body>
    </html>
  )
}
