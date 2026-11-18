"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DropdownManagement, { DropdownItem, DropdownPayload } from "@/app/components/DropdownManagement";


import { useAuth } from "@/app/context/AuthContext";
import { useAddSpeakerMutation, useDeleteSpeakerMutation, useGetSpeakersQuery, useUpdateSpeakerMutation } from "@/app/services/sectors-api";


export default function SpeakersAdminPage() {
  const router = useRouter();

  const { user, isLoading, isAuthenticated } = useAuth();

  const { data: Speakers = [], isLoading: SpeakersIsLoading, isFetching: SpeakersIsFetching, isError: SpeakersIsError, refetch: refetchSpeakers } = useGetSpeakersQuery();

  const [addSpeaker, { isLoading: isAdding }] = useAddSpeakerMutation();
  const [updateSpeaker, { isLoading: isUpdating }] = useUpdateSpeakerMutation();
  const [deleteSpeaker, { isLoading: isDeleting }] = useDeleteSpeakerMutation();

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
    if (!isLoading && isAuthenticated && user?.isAdmin === true && SpeakersIsError) {
      toast.error("تعذر تحميل المتكلمين . حاول تحديث البيانات.");
    }
  }, [SpeakersIsError, isLoading, isAuthenticated, user?.isAdmin]);

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
          return "لا يمكن حذف هذا المتكلم لأنه مستخدم بالفعل في فيديوهات.";
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
      await addSpeaker({ DescA: data.DescA }).unwrap();
      await refetchSpeakers();
    } catch (error) {
      throw new Error( getErrorMessage(error, "فشل إضافة المتكلم. حاول مرة أخرى.") );
    }
  }

  async function editItem( code: number, data: DropdownPayload ): Promise<void> {
    try {
      await updateSpeaker({ code, DescA: data.DescA }).unwrap(); 
      await refetchSpeakers();
    } catch (error) {
      throw new Error( getErrorMessage(error, "فشل تعديل المتكلم. حاول مرة أخرى.") );
    }
  }

  async function removeItem(code: number): Promise<void> {
    try {
      await deleteSpeaker(code).unwrap();
      await refetchSpeakers();
    } catch (error) {
      throw new Error( getErrorMessage( error, "لا يمكن حذف هذا المتكلم لأنه مستخدم في فيديوهات.") );
    }
  }

  // Keep all hooks above conditional returns.
  if (isLoading) {
    return (
      <main dir="rtl" className="flex min-h-[calc(100vh-74px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className=" h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 " />

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
    <main dir="rtl" className="mx-auto w-full max-w-400 px-5 py-12 md:py-16" >
      <DropdownManagement
        title="إدارة المتكلمين"
        description="إضافة وتعديل وحذف المتكلمين "
        items={Speakers as DropdownItem[]}
        isLoading={SpeakersIsLoading || SpeakersIsFetching}
        isSaving={isSaving}
        onCreate={createItem}
        onUpdate={editItem}
        onDelete={removeItem}
      />
    </main>
  );
}
