import type { Metadata } from "next";

import { Cairo } from "next/font/google";

// import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "./components/Layout/navbar";
import Footer from "./components/Layout/footer";
import { AuthProvider } from "./context/AuthContext";
import ReduxProvider from "./providers/ReduxProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});


export const metadata: Metadata = {
  title: "OCR Archive",
  description: "OCR Document Management System",
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
                <main className="flex-1">
                  {children}
                </main>
              </ReduxProvider>
          </AuthProvider>
        {/* <Footer /> */}

      </body>
    </html>
  );
}