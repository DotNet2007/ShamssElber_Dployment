"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DropdownManagement, { DropdownItem, DropdownPayload } from "@/app/components/DropdownManagement";

import { useAddItemMutation, useDeleteItemMutation, useGetItemsQuery, useUpdateItemMutation } from "@/app/services/sectors-api";
import { useAuth } from "@/app/context/AuthContext";

export default function ItemsAdminPage() {
  const router = useRouter();

  const { user, isLoading, isAuthenticated } = useAuth();

  const { data: items = [], isLoading: itemsIsLoading, isFetching: itemsIsFetching, isError: itemsIsError, refetch: refetchItems } = useGetItemsQuery();

  const [addItem, { isLoading: isAdding }] = useAddItemMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();

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
    if (!isLoading && isAuthenticated && user?.isAdmin === true && itemsIsError) {
      toast.error("تعذر تحميل الأصناف. حاول تحديث البيانات.");
    }
  }, [itemsIsError, isLoading, isAuthenticated, user?.isAdmin]);

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
          return "لا يمكن حذف هذا الصنف لأنه مستخدم بالفعل في فيديوهات.";
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
      await addItem({ DescA: data.DescA }).unwrap();
      await refetchItems();
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "فشل إضافة الصنف. حاول مرة أخرى.")
      );
    }
  }

  async function editItem(
    code: number,
    data: DropdownPayload
  ): Promise<void> {
    try {
      await updateItem({
        code,
        DescA: data.DescA,
      }).unwrap();

      await refetchItems();
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "فشل تعديل الصنف. حاول مرة أخرى.")
      );
    }
  }

  async function removeItem(code: number): Promise<void> {
    try {
      await deleteItem(code).unwrap();
      await refetchItems();
    } catch (error) {
      throw new Error(
        getErrorMessage(
          error,
          "لا يمكن حذف هذا الصنف لأنه مستخدم في فيديوهات."
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
        title="إدارة الأصناف"
        description="إضافة وتعديل وحذف الأصناف"
        items={items as DropdownItem[]}
        isLoading={itemsIsLoading || itemsIsFetching}
        isSaving={isSaving}
        onCreate={createItem}
        onUpdate={editItem}
        onDelete={removeItem}
      />
    </main>
  );
}
