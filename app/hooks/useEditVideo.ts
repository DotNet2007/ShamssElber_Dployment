"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import type { ChangeEvent, DragEvent } from "react";
import { formatDuration } from "@/app/helpers/videoHelper";
import { getCurrentDateTime } from "@/app/helpers/getCurentDate";
import { toast } from "sonner";
import { useAuth } from "@/app/context/AuthContext";
import { useGetChannelsQuery, useGetContentTypesQuery, useGetEventsQuery, useGetEventTypesQuery, useGetItemsQuery, useGetItemsSerQuery, useGetItemTypesQuery, useGetProdLinesQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetSectorsQuery, useGetSongsQuery, useGetSpeakersQuery, useGetTranslationsQuery, useAddEventMutation, useUpdateEventMutation } from "@/app/services/sectors-api";
import { useGetVideoByCodeQuery, useUpdateVideoMutation, useSubmitVideoMutation, useDeleteVideoMutation, useAdminUpdateVideoMutation } from "@/app/services/videos-api";
import { toDateTimeLocal, getFileUrl, isValidVideoFile, isValidThumbnailFile, getApiErrorMessage, getThumbnailUrl } from "../helpers/edit-video/editVideo.helpers";


export function useEditVideo() {


  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const params = useParams<{ code: string }>();
  const router = useRouter();
  const code = Number(params?.code);
  
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

  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  const isAdmin = user?.isAdmin === true;

  const currentUserId =
    user?.id != null && Number.isFinite(Number(user.id))
      ? Number(user.id)
      : null;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [authLoading, isAuthenticated, router]);

  // ==================================================
  // PRODUCT
  // ==================================================

  // const { data: itemsType = [], isLoading: itemsTypeIsLoading, refetch: refetchItemsType, isFetching: itemsTypeIsFetching, isError: itemsTypeIsError } = useGetItemTypesQuery();
  const { data: itemsType = [], isLoading: itemsTypeIsLoading } = useGetItemTypesQuery();
  const { data: eventTypes = [], isLoading: eventTypesIsLoading } = useGetEventTypesQuery();
  const { data: productionLines = [], isLoading: productionLinesIsLoading } = useGetProdLinesQuery();
  
  const { data: sectors = [], isLoading: sectorsIsLoading } = useGetSectorsQuery();
  const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading } = useGetProductEntityOneQuery();
  const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading } = useGetProductEntityTwoQuery();

  const { data: songs = [], isLoading: songsIsLoading } = useGetSongsQuery();
  const { data: speakers = [], isLoading: speakersIsLoading } = useGetSpeakersQuery();
  const { data: events = [], isLoading: eventsIsLoading, refetch: refetchEvents, isFetching: eventsIsFetching, } = useGetEventsQuery();

  const { data: items = [], isLoading: itemsIsLoading } = useGetItemsQuery();
  const { data: itemsSer = [], isLoading: itemsSerIsLoading } = useGetItemsSerQuery();
  const { data: channels = [], isLoading: channelsIsLoading } = useGetChannelsQuery();
  const { data: translations = [], isLoading: translationsIsLoading } = useGetTranslationsQuery();

  const { data: contentTypes = [], isLoading: contentTypesIsLoading } = useGetContentTypesQuery(undefined, { skip: !isAdmin });

  const { data: videoResponse, isLoading: isVideoLoading, isError: isVideoError, error: videoError } = useGetVideoByCodeQuery(code, { skip: !Number.isFinite(code) || authLoading || !isAuthenticated });

  const [updateVideo, { isLoading: isSaving }] = useUpdateVideoMutation();

  const [adminUpdateVideo] = useAdminUpdateVideoMutation();

  const [submitVideo, { isLoading: isSubmitting }] = useSubmitVideoMutation();
  const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();
  const [addEvent, { isLoading: isAddingEvent }] = useAddEventMutation();
  const [updateEvent, { isLoading: isUpdatingEvent }] = useUpdateEventMutation();

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

  const [isVideoDragging, setIsVideoDragging] = useState(false);



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
  const [eventNameText, setEventNameText] = useState("");
  const [originalEventNameText, setOriginalEventNameText] = useState("");
  const [eventTextInitializedForCode, setEventTextInitializedForCode] = useState<number | null>(null);
  const [showEventSuggestions, setShowEventSuggestions] = useState(false);
  const filteredEvents = events.filter((event) =>
    String(event.DescA ?? "")
      .toLowerCase()
      .includes(eventNameText.trim().toLowerCase())
  );


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

  const [formLayout, setFormLayout] = useState<"grid3" | "grid2" | "full">(() => {
    if (typeof window === "undefined") {
      return "grid2";
    }

    const saved = localStorage.getItem("video-form-layout");

    if (saved === "grid3" || saved === "grid2" || saved === "full") {
      return saved;
    }

    return "grid2";
  });

  const changeFormLayout = (layout: "grid3" | "grid2" | "full") => {
    setFormLayout(layout);
    localStorage.setItem("video-form-layout", layout);
  };



  const hasUnsavedChanges = useMemo(() => {
    if (!video) return false;

    const original = video as unknown as Record<string, unknown>;

    const originalDate = (() => {
      if (!video.TDate) return date;

      const parsedDate = new Date(video.TDate);

      if (Number.isNaN(parsedDate.getTime())) return date;

      return new Date(
        parsedDate.getTime() -
          parsedDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);
    })();

    const originalEvent = events.find(
      (event) => String(event.Code) === String(video.Event_Code ?? "")
    );

    return (
      date !== originalDate ||
      title !== (video.ItemName ?? "") ||
      item !== String(video.Item_Code ?? "") ||
      production1 !== String(video.ProdEntity1_Code ?? "") ||
      production2 !== String(video.ProdEntity2_Code ?? "") ||
      sector !== String(video.Sec_Code ?? "") ||
      translation !== String(video.Translation_Code ?? "") ||
      productType !== String(video.ItemType_Code ?? "") ||
      productName !== (video.ItemName ?? "") ||
      productSerial !== String(video.ItemSer_Code ?? "") ||
      eventType !== String(video.EventType_Code ?? "") ||
      eventName !== String(video.Event_Code ?? "") ||
      eventNameText !== String(originalEvent?.DescA ?? "") ||
      productionLine !== String(video.ProdLine_Code ?? "") ||
      hymnName !== String(video.Song_Code ?? "") ||
      speakerName !== String(video.Speaker_Code ?? "") ||
      channelName !==
        (video.ChannelName ??
          (video.Channel_Code != null ? String(video.Channel_Code) : "")) ||
      contentType !== String(video.ContentType_Code ?? "") ||
      content1 !== String(original.Content1 ?? original.content1 ?? "") ||
      content2 !== String(original.Content2 ?? original.content2 ?? "") ||
      content3 !== String(original.Content3 ?? original.content3 ?? "") ||
      content4 !== String(original.Content4 ?? original.content4 ?? "") ||
      content5 !== String(original.Content5 ?? original.content5 ?? "") ||
      isRepeated !== Boolean(original.IsRepeated ?? original.isRepeated ?? false) ||
      repeatType !== String(original.RepeatType ?? original.repeatType ?? "") ||
      youtubeLink !== (video.YouTubeLink ?? "") ||
      facebookLink !== (video.FaceBookLink ?? "") ||
      instagramLink !== (video.InstagramLink ?? "") ||
      Boolean(videoFile) ||
      Boolean(thumbnailFile) ||
      existingVideoFileName !== (video.FileName ?? "")
    );
  }, [
    video,
    events,
    date,
    title,
    item,
    production1,
    production2,
    sector,
    translation,
    productType,
    productName,
    productSerial,
    eventType,
    eventName,
    eventNameText,
    productionLine,
    hymnName,
    speakerName,
    channelName,
    contentType,
    content1,
    content2,
    content3,
    content4,
    content5,
    isRepeated,
    repeatType,
    youtubeLink,
    facebookLink,
    instagramLink,
    videoFile,
    thumbnailFile,
    existingVideoFileName,
  ]);



  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);


  const pathname = usePathname();

  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const allowNavigationRef = useRef(false);

  const confirmNavigation = () => {
    allowNavigationRef.current = true;
    setShowUnsavedModal(false);

    if (pendingNavigation) {
      router.push(pendingNavigation);
    }
  };

  const cancelNavigation = () => {
    setShowUnsavedModal(false);
    setPendingNavigation(null);
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

  // File URL generation is kept in the standalone helpers module.


  // ==================================================
  // LOAD VIDEO DATA
  // ==================================================

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!video) return;

    const videoExtra = video as unknown as Record<string, unknown>;

    setTitle(video.ItemName ?? "");
    setItem(video.Item_Code != null ? String(video.Item_Code) : "");

    if (video.TDate) {
      const parsedDate = new Date(video.TDate);
      if (!Number.isNaN(parsedDate.getTime())) {
        setDate(toDateTimeLocal(video.TDate));
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

    setIsRepeated(Boolean(videoExtra.IsRepeated ?? videoExtra.isRepeated ?? false));
    setRepeatType(videoExtra.RepeatType != null ? String(videoExtra.RepeatType) : (videoExtra.repeatType != null ? String(videoExtra.repeatType) : ""));

    setContentType(video.ContentType_Code != null ? String(video.ContentType_Code) : "");

    setChannelName(video.ChannelName ?? (video.Channel_Code != null ? String(video.Channel_Code) : ""));

    setContent1(String(videoExtra.Content1 ?? videoExtra.content1 ?? ""));
    setContent2(String(videoExtra.Content2 ?? videoExtra.content2 ?? ""));
    setContent3(String(videoExtra.Content3 ?? videoExtra.content3 ?? ""));
    setContent4(String(videoExtra.Content4 ?? videoExtra.content4 ?? ""));
    setContent5(String(videoExtra.Content5 ?? videoExtra.content5 ?? ""));

    const existingDuration = videoExtra.Duration ?? videoExtra.duration;
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
      setThumbnailUrl(getThumbnailUrl(video.ImageLink));
    }
  }, [video]);

  // ==================================================
  // EVENT DISPLAY NAME
  // ==================================================

  useEffect(() => {
    if (!video) return;

    const videoCode = Number(video.Code);

    if (eventTextInitializedForCode === videoCode) {
      return;
    }

    const eventCode =
      video.Event_Code != null ? String(video.Event_Code) : "";

    // setEventName(eventCode);

    if (!eventCode) {
      return;
    }

  
    const selectedEvent = events.find(
      (event) => String(event.Code) === eventCode
    );

    if (!selectedEvent) {
      if (eventsIsLoading || eventsIsFetching) return;

      setEventNameText("");
      setOriginalEventNameText("");
      setEventTextInitializedForCode(videoCode);
      return;
    }

    const name = String(selectedEvent.DescA ?? "");

    setEventNameText(name);
    setOriginalEventNameText(name);
    setEventTextInitializedForCode(videoCode);
  }, [
    video,
    events,
    eventsIsLoading,
    eventsIsFetching,
    eventTextInitializedForCode,
  ]);

  // ==================================================
  // VIDEO SELECT
  // ==================================================

  const handleVideoSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!isValidVideoFile(file)) {
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


  const handleVideoDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsVideoDragging(false);

    if (isLocked) return;

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    // Reuse your existing validation, preview,
    // object URL and duration logic.
    const input = videoInputRef.current;

    if (!input) return;

    const transfer = new DataTransfer();
    transfer.items.add(file);

    input.files = transfer.files;

    handleVideoSelect({
      target: input,
    } as ChangeEvent<HTMLInputElement>);
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

  
  // ==================================================
  // THUMBNAIL SELECT
  // ==================================================

  const handleThumbnailSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!isValidThumbnailFile(file)) {
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

    formData.append("contentType", contentType);

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

      // ==================================================
      // UPDATE EVENT NAME
      // ==================================================
      // Existing Event -> PATCH the same Code.
      // New Event -> it is created separately by the Add button.
      if (
        eventName &&
        eventNameText.trim() &&
        eventNameText.trim() !== originalEventNameText.trim()
      ) {
          await updateEvent({
            code: Number(eventName),
            DescA: eventNameText.trim(),
          }).unwrap();

          setOriginalEventNameText(eventNameText.trim());
        }

      
      if (isAdmin) {
        const result = await adminUpdateVideo({ code, formData }).unwrap();
        console.log("Video updated By Admin:", result);
      } else {
        const result = await updateVideo({ code, formData }).unwrap();
        console.log("Video updated:", result);
      }


      // const result =
      //   await updateVideo({
      //     code,
      //     formData,
      //   }).unwrap();


      // console.log(
      //   "Video updated:",
      //   result
      // );


      toast.success("تم تحديث الفيديو بنجاح.");

      router.push("/videos");

    }

    catch (error: unknown) {

      // console.error(
      //   "Update Draft Videos Error:",
      //   error
      // );

      console.log(formData)

      console.log(error)


      const message = getApiErrorMessage(
        error,
        "حدث خطأ أثناء تحديث الفيديو.",
      );


      toast.error(message);

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

      toast.success("تم تقديم الفيديو للمراجعة بنجاح.");

      router.push("/videos");
    } catch (error: unknown) {
      // console.error(
      //   "Submit video error:",
      //   error
      // );

      const message = getApiErrorMessage(
        error,
        "حدث خطأ أثناء تقديم الفيديو.",
      );

      toast.error(message);
    }
  };

  // ==================================================
  // DELETE VIDEO
  // ==================================================

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeletingVideo, setIsDeletingVideo] = useState(false);

  const handleDelete = async () => {
    if (!canDelete) {
      setError("ليس لديك صلاحية لحذف هذا الفيديو.");
      return;
    }

    setError("");
    setIsDeletingVideo(true);

    try {
      await deleteVideo(code).unwrap();

      toast.success("تم حذف الفيديو بنجاح.");
      setShowDeleteModal(false);
      router.push("/videos");
    } catch (error: unknown) {
      const message = getApiErrorMessage(
        error,
        "حدث خطأ أثناء حذف الفيديو.",
      );

      toast.error(message);
    } finally {
      setIsDeletingVideo(false);
    }
  };

  // const handleDelete = async () => {
  //   if (!canDelete) {
  //     setError("ليس لديك صلاحية لحذف هذا الفيديو.");
  //     return;
  //   }

  //   const confirmed = window.confirm(
  //     "هل أنت متأكد من حذف هذا الفيديو؟\nلا يمكن التراجع عن هذه العملية."
  //   );

  //   if (!confirmed) return;

  //   setError("");

  //   try {
  //     await deleteVideo(code).unwrap();

  //     toast.success("تم حذف الفيديو بنجاح.");

  //     router.push("/videos");
  //   } catch (error: unknown) {

  //     const message = getApiErrorMessage(
  //       error,
  //       "حدث خطأ أثناء حذف الفيديو.",
  //     );

  //     toast.error(message);
  //   }
  // };


  return {
    videoInputRef,
    thumbnailInputRef,
    dateInputRef,
    router,
    code,
    videoFile,
    setVideoFile,
    videoUrl,
    setVideoUrl,
    videoDuration,
    setVideoDuration,
    thumbnailFile,
    setThumbnailFile,
    thumbnailUrl,
    setThumbnailUrl,
    youtubeLink,
    setYoutubeLink,
    facebookLink,
    setFacebookLink,
    instagramLink,
    setInstagramLink,
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
    title,
    setTitle,
    date,
    setDate,
    production1,
    setProduction1,
    production2,
    setProduction2,
    sector,
    setSector,
    translation,
    setTranslation,
    user,
    authLoading,
    isAuthenticated,
    isAdmin,
    currentUserId,
    itemsType,
    itemsTypeIsLoading,
    eventTypes,
    eventTypesIsLoading,
    productionLines,
    productionLinesIsLoading,
    sectors,
    sectorsIsLoading,
    productEntitiesOne,
    productEntitiesOneIsLoading,
    productEntitiesTwo,
    productEntitiesTwoIsLoading,
    songs,
    songsIsLoading,
    speakers,
    speakersIsLoading,
    events,
    eventsIsLoading,
    eventsIsFetching,
    refetchEvents,
    items,
    itemsIsLoading,
    itemsSer,
    itemsSerIsLoading,
    channels,
    channelsIsLoading,
    translations,
    translationsIsLoading,
    contentTypes,
    contentTypesIsLoading,
    videoResponse,
    video,
    isVideoLoading,
    isVideoError,
    videoError,
    updateVideo,
    isSaving,
    adminUpdateVideo,
    submitVideo,
    isSubmitting,
    deleteVideo,
    isDeleting,
    addEvent,
    isAddingEvent,
    updateEvent,
    isUpdatingEvent,
    contentType,
    setContentType,
    isSubmitted,
    isOwner,
    canEdit,
    canDelete,
    isLocked,
    isVideoDragging,
    setIsVideoDragging,
    existingVideoFileName,
    setExistingVideoFileName,
    existingThumbnailFileName,
    setExistingThumbnailFileName,
    productType,
    setProductType,
    item,
    setItem,
    productName,
    setProductName,
    productSerial,
    setProductSerial,
    eventType,
    setEventType,
    eventName,
    setEventName,
    eventNameText,
    setEventNameText,
    originalEventNameText,
    setOriginalEventNameText,
    eventTextInitializedForCode,
    setEventTextInitializedForCode,
    showEventSuggestions,
    setShowEventSuggestions,
    filteredEvents,
    productionLine,
    setProductionLine,
    hymnName,
    setHymnName,
    speakerName,
    setSpeakerName,
    channelName,
    setChannelName,
    isRepeated,
    setIsRepeated,
    repeatType,
    setRepeatType,
    error,
    setError,
    formLayout,
    setFormLayout,
    changeFormLayout,
    hasUnsavedChanges,
    pathname,
    showUnsavedModal,
    setShowUnsavedModal,
    pendingNavigation,
    setPendingNavigation,
    confirmNavigation,
    cancelNavigation,
    openDatePicker,
    handleVideoSelect,
    handleVideoDrop,
    handleRemoveVideo,
    handleThumbnailSelect,
    handleRemoveThumbnail,
    handleSave,
    handleSubmit,
    showDeleteModal,
    setShowDeleteModal,
    isDeletingVideo,
    handleDelete
  };
}
