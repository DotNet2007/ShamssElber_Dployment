"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DropdownManagement, { DropdownItem, DropdownPayload } from "@/app/components/DropdownManagement";


import { useAuth } from "@/app/context/AuthContext";
import { useAddProdLineMutation, useDeleteProdLineMutation, useGetProdLinesQuery, useUpdateProdLineMutation } from "@/app/services/sectors-api";

export default function ProductionLinesAdminPage() {
  const router = useRouter();

  const { user, isLoading, isAuthenticated } = useAuth();

  const { data: ProdLines = [], isLoading: ProdLinesIsLoading, isFetching: ProdLinesIsFetching, isError: ProdLinesIsError, refetch: refetchProdLines } = useGetProdLinesQuery();

  const [addProdLine, { isLoading: isAdding }] = useAddProdLineMutation();
  const [updateProdLine, { isLoading: isUpdating }] = useUpdateProdLineMutation();
  const [deleteProdLine, { isLoading: isDeleting }] = useDeleteProdLineMutation();

  const isSaving = isAdding || isUpdating || isDeleting;

  // Check authentication and admin permissions.
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/sign-in");
      return;
    }

    if (user?.isAdmin !== true) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Show loading errors through Sonner only.
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.isAdmin === true && ProdLinesIsError) {
      toast.error("تعذر تحميل خطوط الإنتاج. حاول تحديث البيانات.");
    }
  }, [ProdLinesIsError, isLoading, isAuthenticated, user?.isAdmin]);

  function getErrorMessage(
    error: unknown,
    fallback: string
  ): string {
    if (typeof error !== "object" || error === null) {
      return fallback;
    }

    if ("data" in error) {
      const data = error.data;

      if (typeof data === "string") {
        return data;
      }

      if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        if (data.message.includes("Already Used In Videos")) {
          return "لا يمكن حذف خط الإنتاج لأنه مستخدم بالفعل في فيديوهات.";
        }

        return data.message;
      }
    }

    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }

    return fallback;
  }

  async function createItem(data: DropdownPayload): Promise<void> {
    try {
      await addProdLine({ DescA: data.DescA }).unwrap();
      await refetchProdLines();
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "فشل إضافة خط الإنتاج. حاول مرة أخرى.")
      );
    }
  }

  async function editItem(
    code: number,
    data: DropdownPayload
  ): Promise<void> {
    try {
      await updateProdLine({
        code,
        DescA: data.DescA,
      }).unwrap();

      await refetchProdLines();
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "فشل تعديل خط الإنتاج. حاول مرة أخرى.")
      );
    }
  }

  async function removeItem(code: number): Promise<void> {
    try {
      await deleteProdLine(code).unwrap();
      await refetchProdLines();
    } catch (error) {
      throw new Error(
        getErrorMessage(
          error,
          "لا يمكن حذف خط الإنتاج لأنه مستخدم في فيديوهات."
        )
      );
    }
  }

  // Keep all hooks above conditional returns.
  if (isLoading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[calc(100vh-74px)] items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              h-10 w-10 animate-spin rounded-full
              border-4 border-slate-200 border-t-blue-600
            "
          />

          <p className="text-sm text-slate-500">
            جاري التحقق من الصلاحيات...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || user?.isAdmin !== true) {
    return null;
  }

  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-300 px-5 py-12 md:py-16"
    >
      <DropdownManagement
        title="إدارة خطوط الإنتاج"
        description="إضافة وتعديل وحذف خطوط الإنتاج"
        items={ProdLines as DropdownItem[]}
        isLoading={ProdLinesIsLoading || ProdLinesIsFetching}
        isSaving={isSaving}
        onCreate={createItem}
        onUpdate={editItem}
        onDelete={removeItem}
      />
    </main>
  );
}
