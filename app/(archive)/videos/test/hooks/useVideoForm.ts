"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { formatDuration } from "@/app/helpers/videoHelper";

import { useGetContentTypesQuery, useGetEventsQuery, useGetEventTypesQuery, useGetItemsQuery, useGetItemTypesQuery, useGetProdLinesQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetSectorsQuery, useGetSongsQuery, useGetSpeakersQuery } from "@/app/services/sectors-api";

import { useCreateVideoMutation } from "@/app/services/videos-api";

import { jwtDecode } from "jwt-decode";
import { getArabicDayName } from "@/app/helpers/getArabicDayName";

// ==================================================
// TYPES
// ==================================================

type FormLayout = "grid3" | "grid2" | "full";

type JwtPayload = {
  id?: number | string;
  isAdmin?: boolean ;
//   role?: string;
};

// ==================================================
// HELPERS
// ==================================================

const getIsAdminFromToken = (): boolean => {
  try {
    const token = localStorage.getItem("userToken");

    if (!token) return false;

    const decoded = jwtDecode<JwtPayload>(token);

    return (
      decoded?.isAdmin === true 
    //   decoded?.role === "ADMIN"
    );
  } catch {
    return false;
  }
};

// const getCurrentUserIdFromToken = (): number | null => {
//   try {
//     const token = localStorage.getItem("userToken");

//     if (!token) return null;

//     const decoded = jwtDecode<JwtPayload>(token);

//     if (decoded?.id == null) return null;

//     const id = Number(decoded.id);

//     return Number.isFinite(id) ? id : null;
//   } catch {
//     return null;
//   }
// };

// ==================================================
// HOOK
// ==================================================

export function useVideoForm() {
  // ==================================================
  // REFS
  // ==================================================

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // ==================================================
  // ADMIN
  // ==================================================

  const [isAdmin, setIsAdmin] = useState(false);

//   const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // ==================================================
  // FORM LAYOUT
  // ==================================================

  const [formLayout, setFormLayout] = useState<FormLayout>("grid3");

  // ==================================================
  // DATE
  // ==================================================

  const [date, setDate] = useState(getArabicDayName(new Date().toISOString()));

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

  // ==================================================
  // VIDEO INFORMATION
  // ==================================================

  const [title, setTitle] = useState("");

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

  // ==================================================
  // CONTENT TYPE
  // ==================================================

  const [contentType, setContentType] = useState("");

  // ==================================================
  // PRODUCT
  // ==================================================

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
  // HYMN / SPEAKER
  // ==================================================

  const [hymnName, setHymnName] = useState("");
  const [speakerName, setSpeakerName] = useState("");

  // ==================================================
  // REPEATED
  // ==================================================

  const [isRepeated, setIsRepeated] = useState(false);
  const [repeatType, setRepeatType] = useState("");

  // ==================================================
  // UPLOAD CHANNELS
  // ==================================================

  const [mainUploadChannel, setMainUploadChannel] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");

  // ==================================================
  // PRODUCT CONTENT
  // ==================================================

  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");
  const [content4, setContent4] = useState("");
  const [content5, setContent5] = useState("");

  // ==================================================
  // OTHER
  // ==================================================

  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  // ==================================================
  // ERROR
  // ==================================================

  const [error, setError] = useState("");

  // ==================================================
  // API - DROPDOWNS
  // ==================================================

  const { data: itemsType = [], isLoading: itemsTypeIsLoading } = useGetItemTypesQuery();
  const { data: eventTypes = [], isLoading: eventTypesIsLoading } = useGetEventTypesQuery();
  const { data: productionLines = [], isLoading: productionLinesIsLoading } = useGetProdLinesQuery();
  const { data: sectors = [], isLoading: sectorsIsLoading } = useGetSectorsQuery();
  const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading } = useGetProductEntityOneQuery();
  const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading } = useGetProductEntityTwoQuery();
  const { data: songs = [], isLoading: songsIsLoading } = useGetSongsQuery();
  const { data: speakers = [], isLoading: speakersIsLoading } = useGetSpeakersQuery();
  const { data: events = [], isLoading: eventsIsLoading } = useGetEventsQuery();
  const { data: items = [], isLoading: itemsIsLoading } = useGetItemsQuery();

  const { data: contentTypes = [], isLoading: contentTypesIsLoading } = useGetContentTypesQuery(undefined, { skip: !isAdmin });

  // ==================================================
  // CREATE VIDEO
  // ==================================================

  const [ createVideo, { isLoading: isSaving } ] = useCreateVideoMutation();

  // ==================================================
  // INITIALIZATION
  // ==================================================

  useEffect(() => {
    setIsAdmin(
      getIsAdminFromToken()
    );

    // setCurrentUserId(
    //   getCurrentUserIdFromToken()
    // );
  }, []);

  // ==================================================
  // LOAD FORM LAYOUT
  // ==================================================

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "video-form-layout"
      );

    if (
      saved === "grid3" ||
      saved === "grid2" ||
      saved === "full"
    ) {
      setFormLayout(saved);
    }
  }, []);

  // ==================================================
  // CHANGE FORM LAYOUT
  // ==================================================

  const changeFormLayout = (
    layout: FormLayout
  ) => {
    setFormLayout(layout);

    localStorage.setItem(
      "video-form-layout",
      layout
    );
  };

  // ==================================================
  // DATE PICKER
  // ==================================================

  const openDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

  // ==================================================
  // VIDEO URL CLEANUP
  // ==================================================

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  // ==================================================
  // THUMBNAIL URL CLEANUP
  // ==================================================

  useEffect(() => {
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(
          thumbnailUrl
        );
      }
    };
  }, [thumbnailUrl]);

  // ==================================================
  // VIDEO SELECT
  // ==================================================

  const handleVideoSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("video/")) {
      setError(
        "من فضلك اختر ملف فيديو صالح."
      );

      return;
    }

    if (videoUrl) {
      URL.revokeObjectURL(
        videoUrl
      );
    }

    const url =
      URL.createObjectURL(file);

    setVideoFile(file);
    setVideoUrl(url);
    setVideoDuration("");

    const video =
      document.createElement("video");

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(
        video.src
      );

      const duration =
        video.duration;

      if (
        Number.isFinite(duration)
      ) {
        setVideoDuration(
          formatDuration(duration)
        );
      }
    };

    video.src = url;
  };

  // ==================================================
  // REMOVE VIDEO
  // ==================================================

  const handleRemoveVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(
        videoUrl
      );
    }

    setVideoFile(null);
    setVideoUrl("");
    setVideoDuration("");

    if (videoInputRef.current) {
      videoInputRef.current.value =
        "";
    }
  };

  // ==================================================
  // THUMBNAIL SELECT
  // ==================================================

  const handleThumbnailSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError(
        "من فضلك اختر صورة صالحة."
      );

      return;
    }

    if (thumbnailUrl) {
      URL.revokeObjectURL(
        thumbnailUrl
      );
    }

    const url =
      URL.createObjectURL(file);

    setThumbnailFile(file);
    setThumbnailUrl(url);
  };

  // ==================================================
  // REMOVE THUMBNAIL
  // ==================================================

  const handleRemoveThumbnail = () => {
    if (thumbnailUrl) {
      URL.revokeObjectURL(
        thumbnailUrl
      );
    }

    setThumbnailFile(null);
    setThumbnailUrl("");

    if (
      thumbnailInputRef.current
    ) {
      thumbnailInputRef.current.value =
        "";
    }
  };

  // ==================================================
  // REFRESH / RESET
  // ==================================================

  const handleRefresh = () => {
    setTitle("");

    setProduction1("");
    setProduction2("");

    setSector("");
    setTranslation("");

    setContentType("");

    setProductType("");
    setItem("");
    setProductName("");
    setProductSerial("");

    setEventType("");
    setEventName("");

    setProductionLine("");

    setHymnName("");
    setSpeakerName("");

    setIsRepeated(false);
    setRepeatType("");

    setMainUploadChannel("");

    setYoutubeLink("");
    setFacebookLink("");
    setInstagramLink("");

    setContent1("");
    setContent2("");
    setContent3("");
    setContent4("");
    setContent5("");

    setDescription("");
    setNotes("");

    setError("");

    handleRemoveVideo();

    handleRemoveThumbnail();
  };

  // ==================================================
  // SAVE
  // ==================================================

  const handleSave = async () => {
    setError("");

    // ==================================================
    // VALIDATION
    // ==================================================

    // الصنف
    if (!item.trim()) {

        setError(
            "من فضلك اختر الصنف."
        );

    return;
    }


    // جهة إنتاج 1
    if (!production1.trim()) {

        setError(
            "من فضلك اختر جهة الإنتاج الأولى."
        );

    return;
    }


    // القطاع
    if (!sector.trim()) {

        setError(
            "من فضلك اختر القطاع."
        );

    return;
    }


    // اسم المنتج
    if (!productName.trim()) {

        setError(
            "من فضلك أدخل اسم المنتج."
        );

    return;
    }


    // ملف الفيديو
    if (!videoFile) {

        setError(
            "من فضلك اختر ملف الفيديو."
        );

    return;
    }

    // ==================================================
    // FORMDATA
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
    // CONTENT TYPE
    // ==================================================

    if (
      isAdmin &&
      contentType
    ) {
      formData.append(
        "contentType",
        contentType
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

    if (item) {
      formData.append(
        "item",
        item
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

    // ==================================================
    // UPLOAD CHANNEL
    // ==================================================

    if (mainUploadChannel) {
      formData.append(
        "mainUploadChannel",
        mainUploadChannel
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
    // PRODUCT CONTENT
    // ==================================================

    if (content1.trim()) {
      formData.append(
        "content1",
        content1
      );
    }

    if (content2.trim()) {
      formData.append(
        "content2",
        content2
      );
    }

    if (content3.trim()) {
      formData.append(
        "content3",
        content3
      );
    }

    if (content4.trim()) {
      formData.append(
        "content4",
        content4
      );
    }

    if (content5.trim()) {
      formData.append(
        "content5",
        content5
      );
    }

    // ==================================================
    // OTHER
    // ==================================================

    formData.append(
      "duration",
      videoDuration
    );

    if (description.trim()) {
      formData.append(
        "description",
        description
      );
    }

    if (notes.trim()) {
      formData.append(
        "notes",
        notes
      );
    }

    // ==================================================
    // VIDEO FILE
    // ==================================================

    formData.append(
      "videoFile",
      videoFile
    );

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
    // SEND
    // ==================================================

    try {
      const result =
        await createVideo(
          formData
        ).unwrap();

      console.log(
        "Video created:",
        result
      );

      alert(
        "تم حفظ الفيديو كمسودة بنجاح."
      );

      handleRefresh();
    } catch (error: any) {
      console.error(
        "Create video error:",
        error
      );

      const message =
        error?.data?.message ||
        "حدث خطأ أثناء حفظ الفيديو.";

      setError(message);
    }
  };

  // ==================================================
  // RETURN
  // ==================================================

  return {
    // --------------------------------------------------
    // ADMIN
    // --------------------------------------------------

    isAdmin,
    // currentUserId,

    // --------------------------------------------------
    // REFS
    // --------------------------------------------------

    videoInputRef,
    thumbnailInputRef,
    dateInputRef,

    // --------------------------------------------------
    // LAYOUT
    // --------------------------------------------------

    formLayout,
    changeFormLayout,

    // --------------------------------------------------
    // DATE
    // --------------------------------------------------

    date,
    setDate,
    openDatePicker,

    // --------------------------------------------------
    // VIDEO
    // --------------------------------------------------

    videoFile,
    videoUrl,
    videoDuration,

    handleVideoSelect,
    handleRemoveVideo,

    // --------------------------------------------------
    // THUMBNAIL
    // --------------------------------------------------

    thumbnailFile,
    thumbnailUrl,

    handleThumbnailSelect,
    handleRemoveThumbnail,

    // --------------------------------------------------
    // VIDEO INFORMATION
    // --------------------------------------------------

    title,
    setTitle,

    // --------------------------------------------------
    // PRODUCTION
    // --------------------------------------------------

    production1,
    setProduction1,

    production2,
    setProduction2,

    productEntitiesOne,
    productEntitiesOneIsLoading,

    productEntitiesTwo,
    productEntitiesTwoIsLoading,

    // --------------------------------------------------
    // SECTOR
    // --------------------------------------------------

    sector,
    setSector,

    sectors,
    sectorsIsLoading,

    // --------------------------------------------------
    // TRANSLATION
    // --------------------------------------------------

    translation,
    setTranslation,

    // --------------------------------------------------
    // CONTENT TYPE
    // --------------------------------------------------

    contentType,
    setContentType,

    contentTypes,
    contentTypesIsLoading,

    // --------------------------------------------------
    // PRODUCT
    // --------------------------------------------------

    productType,
    setProductType,

    item,
    setItem,

    productName,
    setProductName,

    productSerial,
    setProductSerial,

    itemsType,
    itemsTypeIsLoading,

    items,
    itemsIsLoading,

    // --------------------------------------------------
    // EVENT
    // --------------------------------------------------

    eventType,
    setEventType,

    eventTypes,
    eventTypesIsLoading,

    eventName,
    setEventName,

    events,
    eventsIsLoading,

    // --------------------------------------------------
    // PRODUCTION LINE
    // --------------------------------------------------

    productionLine,
    setProductionLine,

    productionLines,
    productionLinesIsLoading,

    // --------------------------------------------------
    // HYMN
    // --------------------------------------------------

    hymnName,
    setHymnName,

    songs,
    songsIsLoading,

    // --------------------------------------------------
    // SPEAKER
    // --------------------------------------------------

    speakerName,
    setSpeakerName,

    speakers,
    speakersIsLoading,

    // --------------------------------------------------
    // REPEATED
    // --------------------------------------------------

    isRepeated,
    setIsRepeated,

    repeatType,
    setRepeatType,

    // --------------------------------------------------
    // CHANNELS
    // --------------------------------------------------

    mainUploadChannel,
    setMainUploadChannel,

    youtubeLink,
    setYoutubeLink,

    facebookLink,
    setFacebookLink,

    instagramLink,
    setInstagramLink,

    // --------------------------------------------------
    // CONTENT
    // --------------------------------------------------

    content1,
    setContent1,

    content2,
    setContent2,

    content3,
    setContent3,

    content4,
    setContent4,

    content5,
    setContent5,

    // --------------------------------------------------
    // OTHER
    // --------------------------------------------------

    description,
    setDescription,

    notes,
    setNotes,

    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    error,

    // --------------------------------------------------
    // SAVE
    // --------------------------------------------------

    isSaving,
    handleSave,

    // --------------------------------------------------
    // REFRESH
    // --------------------------------------------------

    handleRefresh,
  };
}