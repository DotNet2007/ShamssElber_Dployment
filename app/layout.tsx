import type { Metadata } from "next";

import { Cairo } from "next/font/google";

// import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

// import Navbar from "./components/Layout/navbar";
// import Footer from "./components/Layout/footer";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import ReduxProvider from "./providers/ReduxProvider";



const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Shamss Elber Archive",
  description: "Shamss Elber Archive Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#f5f7fb]">

        {/* <Navbar /> */}
          <AuthProvider>
              <ReduxProvider>
                <main className="flex-1 w-full">
                  {children}
                  <Toaster
                    position="top-right"
                    dir="rtl"
                    richColors
                    closeButton
                    duration={2000}
                    expand={false}
                    visibleToasts={4}
                    toastOptions={{
                      className:
                        "font-cairo text-right rounded-xl shadow-lg border",
                      classNames: {
                        toast:
                          "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700",
                        title: "font-semibold text-sm",
                        description: "text-sm",
                        success:
                          "border-green-200 dark:border-green-800",
                        error:
                          "border-red-200 dark:border-red-800",
                        warning:
                          "border-yellow-200 dark:border-yellow-800",
                        info:
                          "border-blue-200 dark:border-blue-800",
                      },
                    }}
                  />
                </main>
              </ReduxProvider>
          </AuthProvider>
        {/* <Footer /> */}

      </body>
    </html>
  );
}