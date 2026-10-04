"use client";

import AddVideoHeader from "./components/AddVideoHeader";
import VideoInformationSection from "./components/VideoInformationSection";
import ProductContentSection from "./components/ProductContentSection";
import VideoFileSection from "./components/VideoFileSection";
import ThumbnailSection from "./components/ThumbnailSection";

import { useVideoForm } from "./hooks/useVideoForm";

export default function AddVideoPage() {
  const form = useVideoForm();

  return (
    <main dir="rtl" className=" mx-auto w-full max-w-[1200px] px-5 py-[70px] max-[768px]:px-3 max-[768px]:py-[35px] ">
      <AddVideoHeader
        isSaving={form.isSaving}
        onRefresh={form.handleRefresh}
        onSave={form.handleSave}
      />

      {form.error && (
        <div className=" mb-5 rounded-[9px] border border-red-200 bg-red-50 px-4 py-3 text-xs leading-7 text-red-700 "
        >
          {form.error}
        </div>
      )}

      <VideoInformationSection
        {...form}
      />

      <ProductContentSection
        content1={form.content1}
        setContent1={form.setContent1}
        content2={form.content2}
        setContent2={form.setContent2}
        content3={form.content3}
        setContent3={form.setContent3}
        content4={form.content4}
        setContent4={form.setContent4}
        content5={form.content5}
        setContent5={form.setContent5}
      />

      <VideoFileSection
        videoInputRef={form.videoInputRef}
        videoFile={form.videoFile}
        videoUrl={form.videoUrl}
        videoDuration={form.videoDuration}
        handleVideoSelect={form.handleVideoSelect}
        handleRemoveVideo={form.handleRemoveVideo}
      />

      <ThumbnailSection
        thumbnailInputRef={form.thumbnailInputRef}
        thumbnailUrl={form.thumbnailUrl}
        thumbnailFile={form.thumbnailFile}
        handleThumbnailSelect={
          form.handleThumbnailSelect
        }
        handleRemoveThumbnail={
          form.handleRemoveThumbnail
        }
      />
    </main>
  );
}