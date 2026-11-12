"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DropdownManagement, { DropdownItem, DropdownPayload } from "@/app/components/DropdownManagement";


import { useAuth } from "@/app/context/AuthContext";
import { useAddEventTypeMutation, useDeleteEventTypeMutation, useGetEventTypesQuery, useUpdateEventTypeMutation } from "@/app/services/sectors-api";

export default function EventTypesAdminPage() {
  const router = useRouter();

  const { user, isLoading, isAuthenticated } = useAuth();

  const { data: EventTypes = [], isLoading: EventTypesIsLoading, isFetching: EventTypesIsFetching, isError: EventTypesIsError, refetch: refetchEventTypes } = useGetEventTypesQuery();

  const [addEventType, { isLoading: isAdding }] = useAddEventTypeMutation();
  const [updateEventType, { isLoading: isUpdating }] = useUpdateEventTypeMutation();
  const [deleteEventType, { isLoading: isDeleting }] = useDeleteEventTypeMutation();

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
    if (!isLoading && isAuthenticated && user?.isAdmin === true && EventTypesIsError) {
      toast.error("تعذر تحميل أنواع الأحداث. حاول تحديث البيانات.");
    }
  }, [EventTypesIsError, isLoading, isAuthenticated, user?.isAdmin]);

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
          return "لا يمكن حذف نوع الحدث لأنه مستخدم بالفعل في فيديوهات.";
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
      await addEventType({ DescA: data.DescA }).unwrap();
      await refetchEventTypes();
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "فشل إضافة نوع الحدث. حاول مرة أخرى.")
      );
    }
  }

  async function editItem(
    code: number,
    data: DropdownPayload
  ): Promise<void> {
    try {
      await updateEventType({
        code,
        DescA: data.DescA,
      }).unwrap();

      await refetchEventTypes();
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "فشل تعديل نوع الحدث. حاول مرة أخرى.")
      );
    }
  }

  async function removeItem(code: number): Promise<void> {
    try {
      await deleteEventType(code).unwrap();
      await refetchEventTypes();
    } catch (error) {
      throw new Error(
        getErrorMessage(
          error,
          "لا يمكن حذف نوع الحدث لأنه مستخدم في فيديوهات."
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
        title="إدارة أنواع الأحداث"
        description="إضافة وتعديل وحذف أنواع الأحداث"
        items={EventTypes as DropdownItem[]}
        isLoading={EventTypesIsLoading || EventTypesIsFetching}
        isSaving={isSaving}
        onCreate={createItem}
        onUpdate={editItem}
        onDelete={removeItem}
      />
    </main>
  );
}
