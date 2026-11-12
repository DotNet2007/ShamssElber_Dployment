"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Layout/navbar";
import Footer from "../components/Layout/footer";

import { useAuth } from "../context/AuthContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // =========================================================
    // CHECK AUTHENTICATION
    // =========================================================

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
        router.replace("/sign-in");
        }
    }, [isLoading, isAuthenticated, router]);

    // =========================================================
    // LOADING
    // =========================================================

    if (isLoading) {
        return (
            <div dir="rtl" className=" flex min-h-screen items-center justify-center bg-[#f5f7fb] ">
                <div className=" flex flex-col items-center gap-4 ">

                    <div className=" h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 "/>

                    <p className="text-sm text-slate-500">
                        جاري التحقق من تسجيل الدخول...
                    </p>

                </div>
            </div>
        );
    }

    // =========================================================
    // NOT AUTHENTICATED
    // =========================================================

    if (!isAuthenticated) {
        return null;
    }

    // =========================================================
    // AUTHENTICATED
    // =========================================================

    return (
        <div dir="rtl" className=" flex min-h-screen flex-col ">
            <Navbar />

            <main className="flex-1 w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}