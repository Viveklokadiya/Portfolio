import './globals.css'
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from './providers'

export const metadata = {
  title: 'Vivek Lokadiya - Full Stack Developer Portfolio',
  description: 'Professional portfolio showcasing full-stack development projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}
