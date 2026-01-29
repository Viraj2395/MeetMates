import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata = {
  title: "MeetMates",
  description: "Discover and create delightful events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {/* Header */}

        <main className="relative min-h-screen container mx-auto pt-40 md:pt-32">
        {/* glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"/>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"/>
        </div>

        <div className="relative z-10">{children}</div>
        {/* Footer */}
          <footer className="border-t border-gray-800/50 py-8 px-6 max-w-7xl">
            <div>Made with love by Viiirrraj❤️</div>
          </footer>
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
