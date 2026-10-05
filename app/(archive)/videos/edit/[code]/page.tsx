"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Building2, Calendar, CalendarDays, ChevronDown, FileVideo, Folder, Globe2, Image as ImageIcon, ImagePlus, Layers, ListOrdered, Languages, Music2, Package, Plus, Save, Share2, Trash2, UploadCloud, User, Video, Workflow, Grid3X3, Grid2X2, Rows3 } from "lucide-react";

import { formatDuration, formatFileSize } from "@/app/helpers/videoHelper";
import { useGetChannelsQuery, useGetContentTypesQuery, useGetEventsQuery, useGetEventTypesQuery, useGetItemsQuery, useGetItemsSerQuery, useGetItemTypesQuery, useGetProdLinesQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetSectorsQuery, useGetSongsQuery, useGetSpeakersQuery, useGetTranslationsQuery } from "@/app/services/sectors-api";
import { useGetVideoByCodeQuery, useUpdateVideoMutation, useSubmitVideoMutation, useDeleteVideoMutation } from "@/app/services/videos-api";
import { getCurrentDateTime } from "@/app/helpers/getCurentDate";
import { getArabicDayName } from "@/app/helpers/getArabicDayName";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export default function EditVideoPage() {

  const getIsAdminFromToken = (): boolean => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) return false;

      const decoded: any = jwtDecode(token);

      return (
        decoded?.isAdmin === true 
      );
    } catch {
      return false;
    }
  };

  const getCurrentUserIdFromToken = (): number | null => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) return null;

      const decoded: any = jwtDecode(token);

      if (decoded?.id == null) return null;

      const id = Number(decoded.id);

      return Number.isFinite(id) ? id : null;
    } catch {
      return null;
    }
  };

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const params = useParams<{ code: string }>();
  const router = useRouter();
  const code = Number(params?.code);
  
  const [formLayout, setFormLayout] = useState<"grid3" | "grid2" | "full">("grid3");
 


  // ==================================================
  // VIDEO
  // ==================================================

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDuration, setVideoDuration] = useState("");

  // ==================================================
  // THUMBNAIL
  // ==================================================
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");


  const [youtubeLink, setYoutubeLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");

  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");
  const [content4, setContent4] = useState("");
  const [content5, setContent5] = useState("");


  // ==================================================
  // VIDEO INFORMATION
  // ==================================================

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getCurrentDateTime());

  const dateInputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

  // ==================================================
  // PRODUCTION
  // ==================================================

  const [production1, setProduction1] = useState("");
  const [production2, setProduction2] = useState("");

  // ==================================================
  // SECTOR / TRANSLATION
  // ==================================================

  const [sector, setSector] = useState("");
  const [translation, setTranslation] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setIsAdmin(getIsAdminFromToken());
    setCurrentUserId(getCurrentUserIdFromToken());
    setAuthReady(true);
  }, []);

  // ==================================================
  // PRODUCT
  // ==================================================

  const { data: itemsType = [], isLoading: itemsTypeIsLoading, refetch: refetchItemsType, isFetching: itemsTypeIsFetching, isError: itemsTypeIsError } = useGetItemTypesQuery();
  const { data: eventTypes = [], isLoading: eventTypesIsLoading, refetch: refetchEventTypes, isFetching: eventTypesIsFetching, isError: eventTypesIsError } = useGetEventTypesQuery();
  const { data: productionLines = [], isLoading: productionLinesIsLoading, refetch: refetchProductionLines, isFetching: productionLinesIsFetching, isError: productionLinesIsError } = useGetProdLinesQuery();
  
  const { data: sectors = [], isLoading: sectorsIsLoading, refetch: refetchSectors, isFetching: sectorsIsFetching, isError: sectorsIsError } = useGetSectorsQuery();
  const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading, refetch: refetchProductEntitiesOne, isFetching: productEntitiesOneIsFetching, isError: productEntitiesOneIsError } = useGetProductEntityOneQuery();
  const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading, refetch: refetchProductEntitiesTwo, isFetching: productEntitiesTwoIsFetching, isError: productEntitiesTwoIsError } = useGetProductEntityTwoQuery();

  const { data: songs = [], isLoading: songsIsLoading, refetch: refetchSongs, isFetching: songsIsFetching, isError: songsIsError } = useGetSongsQuery();
  const { data: speakers = [], isLoading: speakersIsLoading, refetch: refetchSpeakers, isFetching: speakersIsFetching, isError: speakersIsError } = useGetSpeakersQuery();
  const { data: events = [], isLoading: eventsIsLoading, refetch: refetchEvents, isFetching: eventsIsFetching, isError: eventsIsError } = useGetEventsQuery();

  const { data: items = [], isLoading: itemsIsLoading, refetch: refetchItems, isFetching: itemsIsFetching, isError: itemsIsError } = useGetItemsQuery();
  const { data: itemsSer = [], isLoading: itemsSerIsLoading, refetch: refetchItemsSer, isFetching: itemsSerIsFetching, isError: itemsSerIsError } = useGetItemsSerQuery();
  const { data: channels = [], isLoading: channelsIsLoading, refetch: refetchChannels, isFetching: channelsIsFetching, isError: channelsIsError } = useGetChannelsQuery();
  const { data: translations = [], isLoading: translationsIsLoading, refetch: refetchTranslations, isFetching: translationsIsFetching, isError: translationsIsError } = useGetTranslationsQuery();

  const { data: contentTypes = [], isLoading: contentTypesIsLoading } = useGetContentTypesQuery(undefined, { skip: !isAdmin });

  const { data: videoResponse, isLoading: isVideoLoading, isError: isVideoError, error: videoError, refetch: refetchVideo } = useGetVideoByCodeQuery(code, { skip: !Number.isFinite(code) });

  const [updateVideo, { isLoading: isSaving }] = useUpdateVideoMutation();
  const [submitVideo, { isLoading: isSubmitting }] = useSubmitVideoMutation();
  const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();

  const video = videoResponse?.data;

  // ==================================================
  // PERMISSIONS / LOCK STATE
  // ==================================================

  const [contentType, setContentType] = useState("");


  const isSubmitted = String(video?.RecordStatus ?? "").toUpperCase() === "SUBMITTED";

  const isOwner = currentUserId !== null && Number(video?.Emp_Code) === currentUserId;

  // Admin can edit any video.
  // Non-admin users can edit only their own DRAFT videos.
  const canEdit = isAdmin || (!isSubmitted && isOwner);

  // Admin can delete any video.
  // Non-admin users can delete only their own DRAFT videos.
  const canDelete = isAdmin || (!isSubmitted && isOwner);

  const isLocked = !canEdit;



  const [existingVideoFileName, setExistingVideoFileName] = useState("");
  const [existingThumbnailFileName, setExistingThumbnailFileName] = useState("");

  const [productType, setProductType] = useState("");

  const [item, setItem] = useState("");

  const [productName, setProductName] = useState("");
  const [productSerial, setProductSerial] = useState("");

  // ==================================================
  // EVENT
  // ==================================================

  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");

  // ==================================================
  // PRODUCTION LINE
  // ==================================================

  const [productionLine, setProductionLine] = useState("");

  // ==================================================
  // HYMN / SPEAKER / CHANNEL
  // ==================================================

  const [hymnName, setHymnName] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [channelName, setChannelName] = useState("");

  // ==================================================
  // REPEATED
  // ==================================================

  const [isRepeated, setIsRepeated] = useState(false);
  const [repeatType, setRepeatType] = useState("");


  // ==================================================
  // ERROR
  // ==================================================

  const [error, setError] = useState("");

  // ==================================================
  // CHANGE THE LAOYUT FROM LOCAL STORAGE
  // ==================================================

  useEffect(() => {
    const saved = localStorage.getItem("video-form-layout");

    if (
      saved === "grid3" ||
      saved === "grid2" ||
      saved === "full"
    ) {
      setFormLayout(saved);
    }
  }, []);

  const changeFormLayout = (layout: "grid3" | "grid2" | "full") => {
    setFormLayout(layout);
    localStorage.setItem("video-form-layout", layout);
  };



  // ==================================================
  // CLEANUP VIDEO URL
  // ==================================================

  useEffect(() => {
    return () => {
      if (videoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  // ==================================================
  // CLEANUP THUMBNAIL URL
  // ==================================================

  useEffect(() => {
    return () => {
      if (thumbnailUrl.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);

  // ==================================================
  // API FILE URL
  // ==================================================

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const getFileUrl = (fileName: string | null | undefined) => {
    if (!fileName) return "";
    const value = fileName.trim();
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }
    if (value.startsWith("/")) {
      return `${API_URL}${value}`;
    }
    return `${API_URL}/uploads/videos/${encodeURIComponent(value)}`;
  };

  // ==================================================
  // LOAD VIDEO DATA
  // ==================================================

  useEffect(() => {
    if (!video) return;

    setTitle(video.ItemName ?? "");
    setItem(video.Item_Code != null ? String(video.Item_Code) : "");

    if (video.TDate) {
      const parsedDate = new Date(video.TDate);
      if (!Number.isNaN(parsedDate.getTime())) {
        const localDate = new Date(
          parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);
        setDate(localDate);
      }
    }

    setProduction1(video.ProdEntity1_Code != null ? String(video.ProdEntity1_Code) : "");
    setProduction2(video.ProdEntity2_Code != null ? String(video.ProdEntity2_Code) : "");
    
    setSector(video.Sec_Code != null ? String(video.Sec_Code) : "");
    setTranslation(video.Translation_Code != null ? String(video.Translation_Code) : "");
    
    setProductType(video.ItemType_Code != null ? String(video.ItemType_Code) : "");
    setProductName(video.ItemName ?? "");
    setProductSerial(video.ItemSer_Code != null ? String(video.ItemSer_Code) : "");
    setEventType(video.EventType_Code != null ? String(video.EventType_Code) : "");
    setEventName(video.Event_Code != null ? String(video.Event_Code) : "");
    setProductionLine(video.ProdLine_Code != null ? String(video.ProdLine_Code) : "");
    setHymnName(video.Song_Code != null ? String(video.Song_Code) : "");
    setSpeakerName(video.Speaker_Code != null ? String(video.Speaker_Code) : "");

    setIsRepeated(Boolean((video as any).IsRepeated ?? (video as any).isRepeated ?? false));
    setRepeatType((video as any).RepeatType != null ? String((video as any).RepeatType) : ((video as any).repeatType != null ? String((video as any).repeatType) : ""));

    setContentType(video.ContentType_Code != null ? String(video.ContentType_Code) : "");

    setChannelName(video.ChannelName ?? (video.Channel_Code != null ? String(video.Channel_Code) : ""));

    setContent1((video as any).Content1 ?? (video as any).content1 ?? "");
    setContent2((video as any).Content2 ?? (video as any).content2 ?? "");
    setContent3((video as any).Content3 ?? (video as any).content3 ?? "");
    setContent4((video as any).Content4 ?? (video as any).content4 ?? "");
    setContent5((video as any).Content5 ?? (video as any).content5 ?? "");

    const existingDuration = (video as any).Duration ?? (video as any).duration;
    if (existingDuration != null && existingDuration !== "") {
      setVideoDuration(String(existingDuration));
    }

    setYoutubeLink(video.YouTubeLink ?? "");
    setFacebookLink(video.FaceBookLink ?? "");
    setInstagramLink(video.InstagramLink ?? "");

    setExistingVideoFileName(video.FileName ?? "");
    setExistingThumbnailFileName(video.ImageLink ?? "");

    if (video.FileName) {
      setVideoUrl(getFileUrl(video.FileName));
    }

    if (video.ImageLink) {
      setThumbnailUrl(getFileUrl(video.ImageLink));
    }
  }, [video]);

  // ==================================================
  // VIDEO SELECT
  // ==================================================

  const handleVideoSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("video/")) {
      setError("من فضلك اختر ملف فيديو صالح.");
      return;
    }

    if (videoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(videoUrl);
    }

    const url = URL.createObjectURL(file);

    setVideoFile(file);
    setVideoUrl(url);
    setVideoDuration("");

    const video = document.createElement("video");

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const duration = video.duration;

      if (Number.isFinite(duration)) {
        setVideoDuration(formatDuration(duration));
      }
    };

    video.src = url;
  };


  // ==================================================
  // REMOVE VIDEO
  // ==================================================

  const handleRemoveVideo = () => {
    if (videoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(videoUrl);
    }

    // Remove current video from UI
    setVideoFile(null);
    setVideoUrl("");
    setVideoDuration("");

    // IMPORTANT:
    // Clear the existing database file name.
    // This allows the user to choose a replacement video.
    setExistingVideoFileName("");

    // Reset file input
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  // const handleRemoveVideo = () => {
  //   // If the user selected a replacement video, remove only
  //   // the newly selected file and restore the existing database video.
  //   if (videoUrl.startsWith("blob:")) {
  //     URL.revokeObjectURL(videoUrl);
  //   }

  //   setVideoFile(null);
  //   setVideoDuration("");

  //   if (existingVideoFileName) {
  //     setVideoUrl(getFileUrl(existingVideoFileName));
  //   } else {
  //     setVideoUrl("");
  //   }

  //   if (videoInputRef.current) {
  //     videoInputRef.current.value = "";
  //   }
  // };

  // ==================================================
  // THUMBNAIL SELECT
  // ==================================================

  const handleThumbnailSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("من فضلك اختر صورة صالحة.");
      return;
    }

    if (thumbnailUrl.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailUrl);
    }

    const url = URL.createObjectURL(file);

    setThumbnailFile(file);
    setThumbnailUrl(url);
  };

  // ==================================================
  // REMOVE THUMBNAIL
  // ==================================================

  const handleRemoveThumbnail = () => {
    if (thumbnailUrl.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailUrl);
    }

    setThumbnailFile(null);
    setThumbnailUrl("");

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  
  // ==================================================
// SAVE VIDEO
// ==================================================

  const handleSave = async () => {

    if (!canEdit) {
      setError("ليس لديك صلاحية لتعديل هذا الفيديو.");
      return;
    }

    setError("");


    // ==================================================
    // VALIDATION
    // ==================================================

    if (!date) {

      setError(
        "من فضلك أدخل التاريخ."
      );

      return;
    }




    if (!productName.trim()) {

      setError(
        "من فضلك أدخل اسم المنتج."
      );

      return;
    }



    if (!videoFile && !existingVideoFileName) {

      setError(
        "لا يوجد ملف فيديو حالي، من فضلك اختر ملف الفيديو."
      );

      return;
    }


    // ==================================================
    // CREATE FORMDATA
    // ==================================================

    const formData =
      new FormData();


    // ==================================================
    // VIDEO INFORMATION
    // ==================================================

    formData.append(
      "date",
      date
    );

    formData.append(
      "title",
      title
    );

    formData.append(
      "item",
      item
    );

    // ==================================================
    // PRODUCTION
    // ==================================================

    if (production1) {

      formData.append(
        "production1",
        production1
      );

    }


    if (production2) {

      formData.append(
        "production2",
        production2
      );

    }


    // ==================================================
    // SECTOR
    // ==================================================

    if (sector) {

      formData.append(
        "sector",
        sector
      );

    }


    // ==================================================
    // TRANSLATION
    // ==================================================

    if (translation.trim()) {

      formData.append(
        "translation",
        translation
      );

    }


    // ==================================================
    // PRODUCT
    // ==================================================

    if (productType) {

      formData.append(
        "productType",
        productType
      );

    }


    if (productName.trim()) {

      formData.append(
        "productName",
        productName
      );

    }


    if (productSerial.trim()) {

      formData.append(
        "productSerial",
        productSerial
      );

    }


    // ==================================================
    // EVENT
    // ==================================================

    if (eventType) {

      formData.append(
        "eventType",
        eventType
      );

    }


    if (eventName) {

      formData.append(
        "eventName",
        eventName
      );

    }


    // ==================================================
    // PRODUCTION LINE
    // ==================================================

    if (productionLine) {

      formData.append(
        "productionLine",
        productionLine
      );

    }


    // ==================================================
    // HYMN
    // ==================================================

    if (hymnName) {

      formData.append(
        "hymnName",
        hymnName
      );

    }


    // ==================================================
    // SPEAKER
    // ==================================================

    if (speakerName) {

      formData.append(
        "speakerName",
        speakerName
      );

    }


    // ==================================================
    // REPEATED
    // ==================================================

    formData.append(
      "isRepeated",
      String(isRepeated)
    );


    if (repeatType) {

      formData.append(
        "repeatType",
        repeatType
      );

    }





    if (youtubeLink.trim()) {

      formData.append(
        "youtubeLink",
        youtubeLink
      );

    }


    if (facebookLink.trim()) {

      formData.append(
        "facebookLink",
        facebookLink
      );

    }


    if (instagramLink.trim()) {

      formData.append(
        "instagramLink",
        instagramLink
      );

    }


    // ==================================================
    // CHANNEL
    // ==================================================

    formData.append(
      "channelName",
      channelName
    );

    // ==================================================
    // CONTENT
    // ==================================================

    formData.append("content1", content1);
    formData.append("content2", content2);
    formData.append("content3", content3);
    formData.append("content4", content4);
    formData.append("content5", content5);

    // ==================================================
    // VIDEO INFORMATION
    // ==================================================

    formData.append(
      "duration",
      videoDuration
    );


    // ==================================================
    // VIDEO FILE
    // ==================================================

    if (videoFile) {
      formData.append(
        "videoFile",
        videoFile
      );
    }


    // ==================================================
    // THUMBNAIL
    // ==================================================

    if (thumbnailFile) {

      formData.append(
        "thumbnailFile",
        thumbnailFile
      );

    }


    // ==================================================
    // SEND TO BACKEND
    // ==================================================

    try {

      const result =
        await updateVideo({
          code,
          formData,
        }).unwrap();


      console.log(
        "Video updated:",
        result
      );


      toast.info("تم تحديث الفيديو بنجاح.");

      router.push("/videos");

    }

    catch (error: any) {

      console.error(
        "Update Draft Videos Error:",
        error
      );

      console.log(formData)


      const message =
        error?.data?.message ||
        "حدث خطأ أثناء تحديث الفيديو.";


      setError(
        message
      );

    }

  };

  // ==================================================
  // SUBMIT VIDEO
  // ==================================================

  const handleSubmit = async () => {

    if (!canEdit) {
      setError("ليس لديك صلاحية لتقديم هذا الفيديو.");
      return;
    }

    setError("");

    try {
      await submitVideo(code).unwrap();

      alert("تم تقديم الفيديو للمراجعة بنجاح.");

      router.push("/videos");
    } catch (error: any) {
      console.error(
        "Submit video error:",
        error
      );

      const message =
        error?.data?.message ||
        "حدث خطأ أثناء تقديم الفيديو.";

      setError(message);
    }
  };

  // ==================================================
  // DELETE VIDEO
  // ==================================================

  const handleDelete = async () => {
    if (!canDelete) {
      setError("ليس لديك صلاحية لحذف هذا الفيديو.");
      return;
    }

    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذا الفيديو؟\nلا يمكن التراجع عن هذه العملية."
    );

    if (!confirmed) return;

    setError("");

    try {
      await deleteVideo(code).unwrap();

      alert("تم حذف الفيديو بنجاح.");

      router.push("/videos");
    } catch (error: any) {
      console.error("Delete video error:", error);

      const message =
        error?.data?.message ||
        "حدث خطأ أثناء حذف الفيديو.";

      setError(message);
    }
  };

  if (!authReady || isVideoLoading) {
    return (
      <main dir="rtl" className="mx-auto w-full max-w-[1200px] px-5 py-[70px]">
        <div className="rounded-[14px] border border-[#e6eaf0] bg-white p-8 text-center text-sm text-[#718096]">
          جاري تحميل بيانات الفيديو...
        </div>
      </main>
    );
  }

  if (isVideoError || !video) {
    return (
      <main dir="rtl" className="mx-auto w-full max-w-[1200px] px-5 py-[70px]">
        <div className="rounded-[14px] border border-red-100 bg-red-50 p-8 text-center text-sm text-red-700">
          {((videoError as any)?.data?.message) || "تعذر تحميل بيانات الفيديو."}
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1200px]
        px-5
        py-[70px]
        max-[768px]:px-3
        max-[768px]:py-[35px]
      "
    >
      {/* ==================================================
          PAGE HEADING
          ================================================== */}

      <div
        className="
          mb-[25px]
          flex
          items-center
          justify-between
          gap-5
          max-[600px]:flex-col
          max-[600px]:items-start
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <h2 className="mb-1 text-2xl font-bold text-[#172033]">
              تعديل الفيديو
            </h2>

            {video.RecordStatus === "DRAFT" && (
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-amber-200
                  bg-amber-50
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  text-amber-700
                "
              >
                مسودة
              </span>
            )}
          </div>

          <p className="text-[13px] text-[#718096]">
            تعديل بيانات الفيديو وإدارة ملفاته داخل أرشيف الفيديوهات
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => router.push("/videos/add")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Plus size={16} />
            جديد
          </button>

          {canDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSaving || isSubmitting || isDeleting}
              className="
                inline-flex h-10 items-center justify-center gap-2
                rounded-[9px] border border-red-200 bg-white px-4
                text-xs font-semibold text-red-600 transition
                hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              <Trash2 size={16} />
              {isDeleting ? "جاري الحذف..." : "حذف"}
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isSubmitting || isDeleting || !canEdit}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-[9px]
              bg-[#2563eb]
              px-4
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-[#1d4ed8]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Save size={16} />
            {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>

          {video.RecordStatus === "DRAFT" && canEdit && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving || isSubmitting || isDeleting || !canEdit}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-[9px]
                bg-emerald-600
                px-4
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-emerald-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Share2 size={16} />
              {isSubmitting ? "جاري التقديم..." : "تقديم"}
            </button>
          )}
        </div>
      </div>

      {/* ==================================================
          ERROR
          ================================================== */}

      {error && (
        <div
          className="
            mb-5
            rounded-[9px]
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-xs
            leading-7
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* ==================================================
          VIDEO INFORMATION
          ================================================== */}

      <section
        className="
          mb-[22px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#e6eaf0]
          bg-white
          shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#e6eaf0]
            px-6
            py-5
            max-[600px]:px-4
          "
        >
          {/* Left side: Video icon + title */}
          <div className="flex items-center gap-3 flex-1">
            <div
              className="
                flex
                h-[38px]
                w-[38px]
                shrink-0
                items-center
                justify-center
                rounded-[10px]
                bg-[#eef2ff]
                text-[#4f46e5]
              "
            >
              <Video size={20} />
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-[#172033]">
                بيانات الفيديو
              </h3>

              <span className="mt-0.5 block text-[11px] text-[#718096]">
                المعلومات الأساسية للفيديو
              </span>
            </div>
          </div>

          {/* Right side: Layout Options */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            {/* 3 Columns */}
            <button
              type="button"
              onClick={() => changeFormLayout("grid3")}
              title="ثلاثة أعمدة"
              className={`p-1.5 rounded-md transition ${
                formLayout === "grid3"
                  ? "bg-[#EEF4FF] text-[#2563EB]"
                  : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
              }`}
            >
              <Grid3X3 size={17} />
            </button>

            {/* 2 Columns */}
            <button
              type="button"
              onClick={() => changeFormLayout("grid2")}
              title="عمودين"
              className={`p-1.5 rounded-md transition ${
                formLayout === "grid2"
                  ? "bg-[#EEF4FF] text-[#2563EB]"
                  : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
              }`}
            >
              <Grid2X2 size={17} />
            </button>

            {/* Full Width */}
            <button
              type="button"
              onClick={() => changeFormLayout("full")}
              title="عرض كامل"
              className={`p-1.5 rounded-md transition ${
                formLayout === "full"
                  ? "bg-[#EEF4FF] text-[#2563EB]"
                  : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
              }`}
            >
              <Rows3 size={17} />
            </button>
          </div>
        </div>

        {/* BODY */}

        <div className="p-[25px] max-[600px]:p-4">
          <div
            className={`
            grid gap-5
            ${
              formLayout === "grid3"
                ? "grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
                : formLayout === "grid2"
                ? "grid-cols-2 max-[600px]:grid-cols-1"
                : "grid-cols-1"
            }
          `}>
            {/* ==================================================
                1. التاريخ
                ================================================== */}

            <FormGroup label="التاريخ" required>
              <InputWrapper icon={<Calendar size={16} />}>
                <div
                  className={`${inputClass} relative w-full cursor-pointer`}
                  onClick={openDatePicker}
                >
                  {/* Arabic value */}
                  <div
                    className="
                      pointer-events-none
                      flex
                      h-full
                      w-full
                      items-center
                      overflow-hidden
                      whitespace-nowrap
                      text-[13px]
                      text-[#172033]
                    "
                  >
                    {date ?
                      getArabicDayName(date)
                      : "اختر التاريخ"}
                  </div>

                  {/* Native picker */}
                  <input
                    ref={dateInputRef}
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      cursor-pointer
                      opacity-0
                    "
                    tabIndex={-1}
                  />
                </div>
              </InputWrapper>
            </FormGroup>

            
            
            {/* ==================================================
                2. الصنف
                ================================================== */}

            <FormGroup label="الصنف" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Folder size={16} />}
                onAdd={() => console.log("إختر الصنف")}
              >
                <select
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || itemsIsLoading}
                >
                  <option value="">
                    {itemsIsLoading
                      ? "جاري تحميل الاصناف ..."
                      : "اختر الصنف"}
                  </option>

                  {items.map((item: any) => (
                    <option
                      key={item.Code}
                      value={item.Code}
                    >
                      {item.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                3. جهة انتاج 1
                ================================================== */}

            <FormGroup label="جهة انتاج 1" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Building2 size={16} />}
                onAdd={() => console.log("إضافة جهة إنتاج 1")}
                 disabled={isLocked}
              >
                <select
                  value={production1}
                  onChange={(e) => setProduction1(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || productEntitiesOneIsLoading}
                >
                  <option value="">
                    {productEntitiesOneIsLoading
                      ? "جاري تحميل جهة الانتاج..."
                      : "اختر جهة الانتاج"}
                  </option>

                  {productEntitiesOne.map((productEntityOne: any) => (
                    <option
                      key={productEntityOne.Code}
                      value={productEntityOne.Code}
                    >
                      {productEntityOne.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                4. جهة انتاج 2
                ================================================== */}

            <FormGroup label="جهة انتاج 2">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Building2 size={16} />}
                onAdd={() => console.log("إضافة جهة إنتاج 2")}
                 disabled={isLocked}
              >

                <select
                  value={production2}
                  onChange={(e) => setProduction2(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || productEntitiesTwoIsLoading}
                >
                  <option value="">
                    {productEntitiesTwoIsLoading
                      ? "جاري تحميل جهة الانتاج..."
                      : "اختر جهة الانتاج"}
                  </option>

                  {productEntitiesTwo.map((productEntityTwo: any) => (
                    <option
                      key={productEntityTwo.Code}
                      value={productEntityTwo.Code}
                    >
                      {productEntityTwo.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                5. القطاع
                ================================================== */}

            <FormGroup label="القطاع" required>
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Layers size={16} />}
                onAdd={() => console.log("إضافة قطاع")}
                 disabled={isLocked}
              >
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || sectorsIsLoading}
                >
                  <option value="">
                    {sectorsIsLoading
                      ? "جاري تحميل القطاعات..."
                      : "اختر القطاعات "}
                  </option>

                  {sectors.map((sector: any) => (
                    <option
                      key={sector.Code}
                      value={sector.Code}
                    >
                      {sector.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                6. الترجمه
                ================================================== */}

            <FormGroup label="الترجمه">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Languages size={16} />}
                onAdd={() => console.log("إضافة ترجمه")}
              >

                <select
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  className={selectClass}
                  disabled={translationsIsLoading}
                >
                  <option value="">
                    {translationsIsLoading
                      ? "جاري تحميل الترجمات ..."
                      : "اختر ترجمه للمنتج"}
                  </option>

                  {translations.map((translation: any) => (
                    <option
                      key={translation.Code}
                      value={translation.Code}
                    >
                      {translation.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

           
        

            {/* ==================================================
                7. نوع المنتج
                ================================================== */}

            <FormGroup label="نوع المنتج">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Package size={16} />}
                onAdd={() => console.log("إضافة نوع منتج")}
                 disabled={isLocked}
              >
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || itemsTypeIsLoading}
                >
                  <option value="">
                    {itemsTypeIsLoading
                      ? "جاري تحميل أنواع المنتجات..."
                      : "اختر نوع المنتج"}
                  </option>

                  {itemsType.map((itemType: any) => (
                    <option
                      key={itemType.Code}
                      value={itemType.Code}
                    >
                      {itemType.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                8. نوع الحدث
                ================================================== */}

            <FormGroup label="نوع الحدث">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<CalendarDays size={16} />}
                onAdd={() => console.log("إضافة نوع حدث")}
                 disabled={isLocked}
              >

                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || eventTypesIsLoading}
                >
                  <option value="">
                    {eventTypesIsLoading
                      ? "جاري تحميل أنواع الاحداث..."
                      : "اختر نوع الحدث"}
                  </option>

                  {eventTypes.map((eventType: any) => (
                    <option
                      key={eventType.Code}
                      value={eventType.Code}
                    >
                      {eventType.DescA}
                    </option>
                  ))}</select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                9. خط الانتاج
                ================================================== */}

            <FormGroup label="خط الانتاج">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Workflow size={16} />}
                onAdd={() => console.log("إضافة خط إنتاج")}
                 disabled={isLocked}
              >
                <select
                  value={productionLine}
                  onChange={(e) => setProductionLine(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || productionLinesIsLoading}
                >
                  <option value="">
                    {productionLinesIsLoading
                      ? "جاري تحميل خطوط الانتاج..."
                      : "اختر خط إنتاج"}
                  </option>

                  {productionLines.map((productionLine: any) => (
                    <option
                      key={productionLine.Code}
                      value={productionLine.Code}
                    >
                      {productionLine.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                10. اسم المنتج
                ================================================== */}

            <FormGroup label="اسم المنتج" required>
              <InputWrapper
                icon={<Package size={16} />}
              >
                <input
                  type="text"
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value)
                  }
                  placeholder="اسم المنتج"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>


            {/* ==================================================
                11. تسلسل المنتج
                ================================================== */}

            <FormGroup label="تسلسل المنتج">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<ListOrdered size={16} />}
                onAdd={() => console.log("إضافة تسلسل")}
              >

                <select
                  value={productSerial}
                  onChange={(e) => setProductSerial(e.target.value)}
                  className={selectClass}
                  disabled={itemsSerIsLoading}
                >
                  <option value="">
                    {itemsSerIsLoading
                      ? "جاري تحميل التسلسل ..."
                      : "اختر تسلسل للمنتج"}
                  </option>

                  {itemsSer.map((itemSer: any) => (
                    <option
                      key={itemSer.Code}
                      value={itemSer.Code}
                    >
                      {itemSer.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>


            {/* ==================================================
                حالة الحدث + اسم الحدث
              ================================================== */}

            <div
              className="
                col-span-1
                grid
                grid-cols-[0.65fr_1.35fr]
                items-end
                gap-5
                max-[600px]:grid-cols-1
              "
            >
              {/* =========================================
                  حالة الحدث
                  ========================================= */}

              <FormGroup label="حالة الحدث">
                <div
                  className="
                    flex
                    h-11
                    w-full
                    items-center
                    justify-between
                    rounded-[9px]
                    border
                    border-[#dfe5ed]
                    bg-[#fbfcfe]
                    px-3
                  "
                >
                  {/* النص */}
                  <span
                    className={`
                      text-xs
                      font-medium
                      transition-colors
                      ${
                        isRepeated
                          ? "text-[#2563eb]"
                          : "text-[#718096]"
                      }
                    `}
                  >
                    {isRepeated ? "مكرر" : "غير مكرر"}
                  </span>

                  {/* Toggle */}
                  <label
                    className="
                      relative
                      inline-flex
                      h-5
                      w-9
                      shrink-0
                      cursor-pointer
                      items-center
                    "
                  >
                    <input
                      type="checkbox"
                      checked={isRepeated}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        setIsRepeated(checked);

                        // مسح اسم الحدث عند تغيير الحالة
                        setEventName("");
                      }}
                      className="peer sr-only"
                    />

                    {/* Toggle Background */}
                    <span
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-[#cbd5e1]
                        transition-all
                        duration-200
                        peer-checked:bg-[#2563eb]
                        peer-focus:ring-2
                        peer-focus:ring-blue-500/20
                      "
                    />

                    {/* Toggle Circle */}
                    <span
                      className="
                        absolute
                        right-[18px]
                        top-[2px]
                        h-4
                        w-4
                        rounded-full
                        bg-white
                        shadow-sm
                        transition-all
                        duration-200
                        peer-checked:right-[2px]
                      "
                    />
                  </label>
                </div>
              </FormGroup>


              {/* =========================================
                  اسم الحدث
                  ========================================= */}

              <FormGroup label="اسم الحدث">
                {isRepeated ? (
                  /* =========================================
                    مكرر → Dropdown
                    ========================================= */

                  <SelectWrapper
                    isAdmin={isAdmin}
                    icon={<CalendarDays size={16} />}
                 disabled={isLocked}
                  >
                    <select
                      value={eventName}
                      onChange={(e) => {
                        setEventName(e.target.value);
                      }}
                      className={selectClass}
                      disabled={isLocked || eventsIsLoading}
                    >
                      <option value="">
                        {eventsIsLoading
                          ? "جاري تحميل الأحداث..."
                          : "اختر الحدث المكرر"}
                      </option>

                      {events
                        .filter(
                          (event: any) =>
                            event.IsRepeated === true
                        )
                        .map((event: any) => (
                          <option
                            key={event.Code}
                            value={event.Code}
                          >
                            {event.DescA}
                          </option>
                        ))}
                    </select>
                  </SelectWrapper>
                ) : (
                  /* =========================================
                    غير مكرر → TextBox
                    ========================================= */

                  <InputWrapper
                    icon={<CalendarDays size={16} />}
                  >
                    <input
                      type="text"
                      value={eventName}
                      onChange={(e) => {
                        setEventName(e.target.value);
                      }}
                      placeholder="اكتب اسم الحدث"
                      className={inputClass}
                   disabled={isLocked}
                    />
                  </InputWrapper>
                )}
              </FormGroup>
            </div>

            

            {/* ==================================================
                13. اسم الترنيمه
                ================================================== */}

            <FormGroup label="اسم الترنيمه">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<Music2 size={16} />}
                onAdd={() => console.log("إضافة ترنيمة")}
                 disabled={isLocked}
              >

                <select
                  value={hymnName}
                  onChange={(e) => setHymnName(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || songsIsLoading}
                >
                  <option value="">
                    {songsIsLoading
                      ? "جاري تحميل الترانيم..."
                      : "اختر ترنيمه"}
                  </option>

                  {songs.map((song: any) => (
                    <option
                      key={song.Code}
                      value={song.Code}
                    >
                      {song.DescA}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </FormGroup>

            {/* ==================================================
                14. اسم المتكلم
                ================================================== */}

            <FormGroup label="اسم المتكلم">
              <SelectWrapper
                isAdmin={isAdmin}
                icon={<User size={16} />}
                onAdd={() => console.log("إضافة متكلم")}
                 disabled={isLocked}
              >

                <select
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                  className={selectClass}
                  disabled={isLocked || speakersIsLoading}
                >
                  <option value="">
                    {speakersIsLoading
                      ? "جاري تحميل القائمين ع العمل..."
                      : "اختر متكلم"}
                  </option>

                  {speakers.map((speaker: any) => (
                    <option
                      key={speaker.Code}
                      value={speaker.Code}
                    >
                      {speaker.DescA}
                    </option>
                  ))}
                </select>

              </SelectWrapper>
            </FormGroup>

            {isAdmin && (
              <FormGroup label="نوع المحتوى">
                <SelectWrapper
                  icon={<Layers size={16} />}
                >
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className={selectClass}
                    disabled={contentTypesIsLoading}
                  >
                    <option value="">
                      {contentTypesIsLoading
                        ? "جاري تحميل أنواع المحتوى..."
                        : "اختر نوع المحتوى"}
                    </option>

                    {contentTypes.map((contentType: any) => (
                      <option
                        key={contentType.Code}
                        value={contentType.Code}
                      >
                        {contentType.DescA}
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              </FormGroup>
            )}

          </div>

          
          <div className="mt-5">
            <div
              className="
                grid
                grid-cols-4
                gap-5
                max-[1100px]:grid-cols-2
                max-[600px]:grid-cols-1
              "
            >
              {/* قناة / صفحة الرفع الرئيسية */}
              <FormGroup label="قناة / صفحة الرفع الرئيسية">
                <SelectWrapper
                  isAdmin={isAdmin}
                  icon={<Video size={16} />}
                  onAdd={() => console.log("إضافة قناة")}>

                  <select
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className={selectClass}
                    disabled={isLocked || channelsIsLoading}
                  >
                    <option value="">
                      {channelsIsLoading
                        ? "جاري تحميل القنوات..."
                        : "اختر قناة"}
                    </option>

                    {channels.map((channel: any) => (
                      <option
                        key={channel.Code}
                        value={channel.Code}
                      >
                        {channel.DescA}
                      </option>
                    ))}
                  </select>

                </SelectWrapper>
              </FormGroup>

              {/* YouTube */}

              <FormGroup label="رابط YouTube">
                <InputWrapper icon={<Video size={16} />}>
                  <input
                    type="url"
                    value={youtubeLink}
                    onChange={(e) =>
                      setYoutubeLink(e.target.value)
                    }
                    placeholder="رابط YouTube"
                    className={inputClass}
                   disabled={isLocked}
                  />
                </InputWrapper>
              </FormGroup>

              {/* Facebook */}

              <FormGroup label="رابط Facebook">
                <InputWrapper icon={<Share2  size={16} />}>
                  <input
                    type="url"
                    value={facebookLink}
                    onChange={(e) =>
                      setFacebookLink(e.target.value)
                    }
                    placeholder="رابط Facebook"
                    className={inputClass}
                   disabled={isLocked}
                  />
                </InputWrapper>
              </FormGroup>

              {/* Instagram */}

              <FormGroup label="رابط Instagram">
                <InputWrapper icon={<Globe2  size={16} />}>
                  <input
                    type="url"
                    value={instagramLink}
                    onChange={(e) =>
                      setInstagramLink(e.target.value)
                    }
                    placeholder="رابط Instagram"
                    className={inputClass}
                   disabled={isLocked}
                  />
                </InputWrapper>
              </FormGroup>
            </div>

            {youtubeLink.trim() &&
              facebookLink.trim() &&
              instagramLink.trim() && (
                <div className="mt-4">
                  <div className="mb-2 text-[11px] font-semibold text-[#718096]">
                    روابط النشر
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-3
                      gap-3
                      max-[600px]:grid-cols-1
                    "
                  >
                    <a
                      href={youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex h-10 items-center justify-center gap-2 rounded-[9px]
                        border border-red-200 bg-white px-3 text-xs font-semibold text-red-600
                        transition hover:bg-red-50
                      "
                    >
                      <Video size={15} />
                      فتح YouTube
                    </a>

                    <a
                      href={facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex h-10 items-center justify-center gap-2 rounded-[9px]
                        border border-blue-200 bg-white px-3 text-xs font-semibold text-blue-600
                        transition hover:bg-blue-50
                      "
                    >
                      <Share2 size={15} />
                      فتح Facebook
                    </a>

                    <a
                      href={instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex h-10 items-center justify-center gap-2 rounded-[9px]
                        border border-pink-200 bg-white px-3 text-xs font-semibold text-pink-600
                        transition hover:bg-pink-50
                      "
                    >
                      <Globe2 size={15} />
                      فتح Instagram
                    </a>
                  </div>
                </div>
              )}
          </div>




        </div>
      </section>

      {/* ==================================================
          محتوى المنتج
          ================================================== */}

      <section
        className="
          mt-5
          overflow-hidden
          rounded-[14px]
          border
          border-[#e6eaf0]
          bg-white
          shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-[#e6eaf0]
            px-6
            py-4
            max-[600px]:px-4
          "
        >
          <div
            className="
              flex
              h-[38px]
              w-[38px]
              items-center
              justify-center
              rounded-[10px]
              bg-[#eef2ff]
              text-[#4f46e5]
            "
          >
            <Package size={19} />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#172033]">
              محتوى المنتج
            </h3>

            <span className="mt-0.5 block text-[11px] text-[#718096]">
              البيانات الأساسية لمحتوى المنتج
            </span>
          </div>
        </div>

        {/* Body */}

        <div className="p-6 max-[600px]:p-4">
          <div
            className="
              grid
              grid-cols-5
              gap-5
              max-[1100px]:grid-cols-3
              max-[700px]:grid-cols-2
              max-[500px]:grid-cols-1
            "
          >
            {/* Input 1 */}

            <FormGroup label="المحتوى 1">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content1}
                  onChange={(e) =>
                    setContent1(e.target.value)
                  }
                  placeholder="المحتوى 1"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* Input 2 */}

            <FormGroup label="المحتوى 2">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content2}
                  onChange={(e) =>
                    setContent2(e.target.value)
                  }
                  placeholder="المحتوى 2"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* Input 3 */}

            <FormGroup label="المحتوى 3">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content3}
                  onChange={(e) =>
                    setContent3(e.target.value)
                  }
                  placeholder="المحتوى 3"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* Input 4 */}

            <FormGroup label="المحتوى 4">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content4}
                  onChange={(e) =>
                    setContent4(e.target.value)
                  }
                  placeholder="المحتوى 4"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* Input 5 */}

            <FormGroup label="المحتوى 5">
              <InputWrapper icon={<Package size={16} />}>
                <input
                  type="text"
                  value={content5}
                  onChange={(e) =>
                    setContent5(e.target.value)
                  }
                  placeholder="المحتوى 5"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>
          </div>
        </div>
      </section>

      {/* ==================================================
          VIDEO FILE
          ================================================== */}

      <section
        className="
          mb-[22px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#e6eaf0]
          bg-white
          shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            min-h-[78px]
            items-center
            justify-between
            gap-3
            border-b
            border-[#e6eaf0]
            px-6
            py-5
            max-[600px]:flex-col
            max-[600px]:items-start
            max-[600px]:px-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-[38px]
                w-[38px]
                items-center
                justify-center
                rounded-[10px]
                bg-red-50
                text-red-500
              "
            >
              <FileVideo size={20} />
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-[#172033]">
                ملف الفيديو
              </h3>

              <span className="mt-0.5 block text-[11px] text-[#718096]">
                اختر ملف الفيديو المراد إضافته للأرشيف
              </span>
            </div>
          </div>

          <span className="text-xs text-[#718096]">
            {videoFile
              ? videoFile.name
              : existingVideoFileName
                ? existingVideoFileName
              : "لم يتم اختيار فيديو"}
          </span>
        </div>

        {/* BODY */}

        <div className="p-6 max-[600px]:p-4">
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,.mkv,.avi,.mov"
            onChange={handleVideoSelect}
            disabled={isLocked}
            hidden
          />

          {!videoFile && !existingVideoFileName ? (
            <button
              type="button"
              onClick={() =>
                videoInputRef.current?.click()
              }
              disabled={isLocked}
              className="
                flex
                min-h-[230px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-[#cbd5e1]
                bg-[#f8fafc]
                px-5
                text-center
                transition
                hover:border-blue-400
                hover:bg-[#eff6ff]
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#dbeafe]
                  text-[#2563eb]
                "
              >
                <UploadCloud size={30} />
              </div>

              <h3 className="mb-1 text-sm font-bold text-[#334155]">
                لم يتم اختيار ملف فيديو
              </h3>

              <p className="text-xs text-[#64748b]">
                اضغط هنا لاختيار الفيديو من جهازك
              </p>

              <span className="mt-3 text-[11px] text-[#94a3b8]">
                MP4 · WebM · MOV · AVI · MKV
              </span>
            </button>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[#e6eaf0] bg-[#0f172a]">
              <div className="flex min-h-[250px] items-center justify-center bg-black">
                <video
                  src={videoUrl}
                  controls
                  className="
                    max-h-[500px]
                    w-full
                    object-contain
                  "
                />
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  bg-white
                  p-4
                  max-[600px]:flex-col
                  max-[600px]:items-stretch
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-50
                      text-red-500
                    "
                  >
                    <FileVideo size={21} />
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[#172033]">
                      {videoFile
                        ? videoFile.name
                        : existingVideoFileName || "الفيديو الحالي"}
                    </div>

                    <div className="mt-1 flex gap-4 text-[11px] text-[#94a3b8]">
                      {videoFile ? (
                        <span>
                          {formatFileSize(videoFile.size)}
                        </span>
                      ) : (
                        existingVideoFileName && (
                          <span>
                            الفيديو الحالي
                          </span>
                        )
                      )}

                      {videoDuration && (
                        <span>
                          {videoDuration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  disabled={isLocked}
                  className="
                    inline-flex
                    h-9
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-red-200
                    bg-white
                    px-3
                    text-xs
                    font-semibold
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  <Trash2 size={15} />
                  حذف الفيديو
                </button>
              </div>
            </div>
          )}

          
        </div>
      </section>

      {/* ==================================================
          صور تعريفية
          ================================================== */}

      <section
        className="
          mb-[22px]
          overflow-hidden
          rounded-[14px]
          border
          border-[#e6eaf0]
          bg-white
          shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-[#e6eaf0]
            px-6
            py-5
            max-[600px]:px-4
          "
        >
          <div
            className="
              flex
              h-[38px]
              w-[38px]
              items-center
              justify-center
              rounded-[10px]
              bg-[#eff6ff]
              text-[#2563eb]
            "
          >
            <ImageIcon size={20} />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#172033]">
              صور تعريفية
            </h3>

            <span className="mt-0.5 block text-[11px] text-[#718096]">
              صورة تعريفية تظهر أثناء تصفح أرشيف الفيديوهات
            </span>
          </div>
        </div>

        <div className="p-6 max-[600px]:p-4">
          <input
            ref={thumbnailInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleThumbnailSelect}
            disabled={isLocked}
            hidden
          />

          <div
            className="
              flex
              items-center
              gap-6
              max-[600px]:flex-col
              max-[600px]:items-stretch
            "
          >
            <div
              className="
                flex
                h-[180px]
                w-[280px]
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-dashed
                border-[#cbd5e1]
                bg-[#f8fafc]
                max-[600px]:w-full
              "
            >
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                  <ImagePlus size={30} />

                  <span className="text-xs">
                    لم يتم اختيار صورة
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  thumbnailInputRef.current?.click()
                }
                disabled={isLocked}
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-[9px]
                  border
                  border-[#e6eaf0]
                  bg-white
                  px-4
                  text-xs
                  font-semibold
                  text-[#4a5568]
                  transition
                  hover:bg-[#eff6ff]
                  hover:text-[#2563eb]
                "
              >
                <ImagePlus size={16} />
                اختيار صورة
              </button>

              {thumbnailFile && (
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  disabled={isLocked}
                  className="
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    gap-2
                    rounded-[9px]
                    border
                    border-red-200
                    bg-white
                    px-4
                    text-xs
                    font-semibold
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  <Trash2 size={16} />
                  حذف الصورة
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// ==================================================
// FORM GROUP
// ==================================================

function FormGroup({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label className="text-xs font-semibold text-[#4a5568]">
        {label}

        {required && (
          <span
            className="mr-1 text-[14px] font-bold text-red-500"
            title="هذا الحقل مطلوب"
            aria-label="حقل مطلوب"
          >
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

// ==================================================
// INPUT WRAPPER
// ==================================================

function InputWrapper({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <span
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          z-10
          flex
          -translate-y-1/2
          items-center
          justify-center
          text-[#a0aec0]
        "
      >
        {icon}
      </span>

      {children}
    </div>
  );
}

// ==================================================
// SELECT WRAPPER
// ==================================================

function SelectWrapper({
  icon,
  children,
  onAdd,
  disabled = false,
  isAdmin = false,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onAdd?: () => void;
  disabled?: boolean;
  isAdmin?: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative min-w-0 flex-1">
        <span
          className="
            pointer-events-none absolute right-3 top-1/2 z-10
            flex -translate-y-1/2 items-center justify-center
            text-[#a0aec0]
          "
        >
          {icon}
        </span>

        <span
          className="
            pointer-events-none absolute left-3 top-1/2 z-10
            flex -translate-y-1/2 items-center justify-center
            text-[#718096]
          "
        >
          <ChevronDown size={16} strokeWidth={2} />
        </span>

        {children}
      </div>

      {/* + يظهر للـ Admin فقط */}
      {isAdmin && (
        <button
          type="button"
          title="إضافة"
          aria-label="إضافة"
          onClick={onAdd}
          disabled={disabled}
          className="
            flex h-11 w-11 shrink-0 items-center justify-center
            rounded-[9px] border border-[#dfe5ed] bg-white
            text-[#718096] transition-all duration-200
            hover:border-[#2563eb]
            hover:bg-[#eff6ff]
            hover:text-[#2563eb]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Plus size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}


// ==================================================
// INPUT STYLE
// ==================================================

const inputClass = `
  h-11
  w-full
  rounded-[9px]
  border
  border-[#dfe5ed]
  bg-[#fbfcfe]
  pr-[42px]
  pl-3
  text-xs
  text-[#172033]
  outline-none
  transition
  placeholder:text-[#a0aec0]
  focus:border-[#2563eb]
  focus:bg-white
  focus:ring-[3px]
  focus:ring-blue-500/10
  disabled:cursor-not-allowed
  disabled:bg-[#f1f5f9]
  disabled:text-[#94a3b8]
  disabled:opacity-80
`;

// ==================================================
// SELECT STYLE
// ==================================================

const selectClass = `
  h-11
  w-full
  appearance-none
  rounded-[9px]
  border
  border-[#dfe5ed]
  bg-[#fbfcfe]
  pr-[42px]
  pl-[38px]
  text-xs
  text-[#172033]
  outline-none
  transition
  cursor-pointer
  focus:border-[#2563eb]
  focus:bg-white
  focus:ring-[3px]
  focus:ring-blue-500/10
  disabled:cursor-not-allowed
  disabled:bg-[#f1f5f9]
  disabled:text-[#94a3b8]
  disabled:opacity-80
`;