import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { registerVideoUploadProgress, ServerVideoFile, unregisterVideoUploadProgress, useCreateServerVideoDraftMutation, useCreateVideoWithProgressMutation, useLazyGetServerVideoFilesQuery } from "../services/videos-api";
import { getErrorMessage } from "../helpers/edit-video/editVideo.helpers";
import { toast } from "sonner";
import { getCurrentDateTime } from "../helpers/getCurentDate";
import { formatDuration } from "../helpers/videoHelper";
import { useGetItemTypesQuery, useGetEventTypesQuery, useGetProdLinesQuery, useGetSectorsQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetSongsQuery, useGetSpeakersQuery, useGetEventsQuery, useGetItemsQuery, useGetItemsSerQuery, useGetChannelsQuery, useGetTranslationsQuery, useGetContentTypesQuery, useAddProductEntityOneMutation, useAddProductEntityTwoMutation, useAddSectorMutation, useAddItemTypeMutation, useAddEventTypeMutation, useAddProdLineMutation, useAddSongMutation, useAddSpeakerMutation, useAddItemMutation, useAddItemSerMutation, useAddTranslationMutation, useAddChannelMutation, useAddEventMutation } from "../services/sectors-api";
import type { DragEvent } from "react";
export function useAddVideo() {
  const router = useRouter();

  // ==================================================
  // REFS
  // ==================================================

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // ==================================================
  // AUTHENTICATION
  // ==================================================

  const { user, isLoading: authLoading, isAuthenticated, } = useAuth();
  const isAdmin = user?.isAdmin === true;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [authLoading, isAuthenticated, router]);

  // ==================================================
  // VIDEO SOURCE
  // ==================================================

  const [videoSource, setVideoSource] = useState<"device" | "server">("device");

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [isVideoDragging, setIsVideoDragging] = useState(false);

  const [selectedServerVideo, setSelectedServerVideo] = useState<ServerVideoFile | null>(null);

  // ==================================================
  // SERVER VIDEO BROWSER
  // ==================================================

  const [showServerBrowser, setShowServerBrowser] = useState(false);
  const [serverVideos, setServerVideos] = useState<ServerVideoFile[]>([]);
  const [serverSearch, setServerSearch] = useState("");
  const [serverPage, setServerPage] = useState(1);
  const [serverTotalPages, setServerTotalPages] = useState(1);
  const [serverTotal, setServerTotal] = useState(0);
  const [serverVideosError, setServerVideosError] = useState("");

  const [
    getServerVideoFiles, { isFetching: isLoadingServerVideos } ] = useLazyGetServerVideoFilesQuery();

  const loadServerVideos = async ( page = serverPage, search = serverSearch ) => {
    setServerVideosError("");
    try {
      const response = await getServerVideoFiles({ page, limit: 30, search: search.trim(), }).unwrap();
      const data = response.data;
      setServerVideos(data.videos ?? []);
      setServerPage(data.pagination?.page ?? page);
      setServerTotalPages(data.pagination?.totalPages ?? 1);
      setServerTotal(data.pagination?.total ?? 0);
    } catch (requestError: unknown) {
      setServerVideosError(getErrorMessage( requestError, "تعذر تحميل ملفات الفيديو من السيرفر" ));
      setServerVideos([]);
    }
  };

  const openServerBrowser = () => {
    setVideoSource("server");
    setShowServerBrowser(true);
    setServerPage(1);
    void loadServerVideos(1, serverSearch);
  };

  const chooseServerVideo = (file: ServerVideoFile) => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setSelectedServerVideo(file);
    setVideoSource("server");
    setShowServerBrowser(false);

    setVideoFile(null);
    setVideoUrl("");
    setVideoDuration("");

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const chooseDeviceSource = () => {
    setVideoSource("device");
    setSelectedServerVideo(null);
    setShowServerBrowser(false);
  };

  // ==================================================
  // REMOVE VIDEO
  // ==================================================

  const handleRemoveVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(null);
    setVideoUrl("");
    setVideoDuration("");
    setSelectedServerVideo(null);

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  // ==================================================
  // THUMBNAIL
  // ==================================================

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleThumbnailSelect = ( event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      toast.error("من فضلك اختر صورة صالحة.");
      event.target.value = "";
      return;
    }

    if (thumbnailUrl) {
      URL.revokeObjectURL(thumbnailUrl);
    }

    const url = URL.createObjectURL(file);

    setThumbnailFile(file);
    setThumbnailUrl(url);
  };

  const handleRemoveThumbnail = () => {
    if (thumbnailUrl) {
      URL.revokeObjectURL(thumbnailUrl);
    }

    setThumbnailFile(null);
    setThumbnailUrl("");

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  // ==================================================
  // CLEANUP OBJECT URLS
  // ==================================================

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  useEffect(() => {
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);

  // ==================================================
  // VIDEO INFORMATION
  // ==================================================

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getCurrentDateTime());

  const openDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

  // ==================================================
  // SOCIAL LINKS
  // ==================================================

  const [youtubeLink, setYoutubeLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");

  // ==================================================
  // CONTENT
  // ==================================================

  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");
  const [content4, setContent4] = useState("");
  const [content5, setContent5] = useState("");
  const [contentType, setContentType] = useState("");

  // ==================================================
  // LOOKUP DATA
  // ==================================================

  const { data: itemsType = [], isLoading: itemsTypeIsLoading, refetch: refetchItemsType } = useGetItemTypesQuery();
  const { data: eventTypes = [], isLoading: eventTypesIsLoading, refetch: refetchEventTypes } = useGetEventTypesQuery();
  const { data: productionLines = [], isLoading: productionLinesIsLoading, refetch: refetchProductionLines } = useGetProdLinesQuery();
  
  const { data: sectors = [], isLoading: sectorsIsLoading, refetch: refetchSectors } = useGetSectorsQuery();
  const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading, refetch: refetchProductEntitiesOne } = useGetProductEntityOneQuery();
  const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading, refetch: refetchProductEntitiesTwo } = useGetProductEntityTwoQuery();

  const { data: songs = [], isLoading: songsIsLoading, refetch: refetchSongs } = useGetSongsQuery();
  const { data: speakers = [], isLoading: speakersIsLoading, refetch: refetchSpeakers } = useGetSpeakersQuery();
  const { data: events = [], isLoading: eventsIsLoading, isFetching: eventsIsFetching, refetch: refetchEvents, } = useGetEventsQuery();

  const { data: items = [], isLoading: itemsIsLoading, refetch: refetchItems } = useGetItemsQuery();
  const { data: itemsSer = [], isLoading: itemsSerIsLoading, refetch: refetchItemsSer } = useGetItemsSerQuery();
  const { data: channels = [], isLoading: channelsIsLoading, refetch: refetchChannels } = useGetChannelsQuery();
  const { data: translations = [], isLoading: translationsIsLoading, refetch: refetchTranslations } = useGetTranslationsQuery();

  const { data: contentTypes = [], isLoading: contentTypesIsLoading } = useGetContentTypesQuery(undefined, { skip: !isAdmin });


  // ==================================================
  // ADD LOOKUP MUTATIONS
  // ==================================================

  const [addProductEntityOne] = useAddProductEntityOneMutation();
  const [addProductEntityTwo] = useAddProductEntityTwoMutation();
  const [addSector] = useAddSectorMutation();
  const [addItemType] = useAddItemTypeMutation();
  const [addEventType] = useAddEventTypeMutation();
  const [addProdLine] = useAddProdLineMutation();
  const [addSong] = useAddSongMutation();
  const [addSpeaker] = useAddSpeakerMutation();
  const [addItem] = useAddItemMutation();
  const [addItemSer] = useAddItemSerMutation();
  const [addTranslation] = useAddTranslationMutation();
  const [addChannel] = useAddChannelMutation();

  const [addEvent, { isLoading: isAddingEvent }] = useAddEventMutation();

  // ==================================================
  // ADD ITEM MODAL
  // ==================================================

  type AddableLookupType =
    | "item"
    | "production1"
    | "production2"
    | "sector"
    | "translation"
    | "productType"
    | "eventType"
    | "productionLine"
    | "productSerial"
    | "song"
    | "speaker"
    | "channel";

  const [addModalType, setAddModalType] =
  useState<AddableLookupType | null>(null);

  const [newValue, setNewValue] = useState("");
  const [isAddingLookup, setIsAddingLookup] = useState(false);

  const isAddModalOpen = addModalType !== null;

  const openAddModal = (type: AddableLookupType) => {
    setNewValue("");
    setAddModalType(type);
  };

  const closeAddModal = () => {
    if (isAddingLookup) return;

    setAddModalType(null);
    setNewValue("");
  };

  const modalTitles: Record<AddableLookupType, string> = {
    item: "إضافة صنف جديد",
    production1: "إضافة جهة إنتاج 1",
    production2: "إضافة جهة إنتاج 2",
    sector: "إضافة قطاع جديد",
    translation: "إضافة ترجمة جديدة",
    productType: "إضافة نوع منتج",
    eventType: "إضافة نوع حدث",
    productionLine: "إضافة خط إنتاج",
    productSerial: "إضافة تسلسل منتج",
    song: "إضافة ترنيمة جديدة",
    speaker: "إضافة متكلم جديد",
    channel: "إضافة قناة جديدة",
  };

  const getAddModalTitle = () => {
    return addModalType ? modalTitles[addModalType] : "";
  };

  const handleAddItem = async () => {
  const value = newValue.trim();

  if (!addModalType || !value || isAddingLookup) return;

  setIsAddingLookup(true);

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;

    switch (addModalType) {
    case "item": {
        result = await addItem({ DescA: value }).unwrap();
        await refetchItems();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setItem(String(code));
        break;
    }

    case "production1": {
        result = await addProductEntityOne({ DescA: value }).unwrap();
        await refetchProductEntitiesOne();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setProduction1(String(code));
        break;
    }

    case "production2": {
        result = await addProductEntityTwo({ DescA: value }).unwrap();
        await refetchProductEntitiesTwo();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setProduction2(String(code));
        break;
    }

    case "sector": {
        result = await addSector({ DescA: value }).unwrap();
        await refetchSectors();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setSector(String(code));
        break;
    }

    case "translation": {
        result = await addTranslation({ DescA: value }).unwrap();
        await refetchTranslations();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setTranslation(String(code));
        break;
    }

    case "productType": {
        result = await addItemType({ DescA: value }).unwrap();
        await refetchItemsType();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setProductType(String(code));
        break;
    }

    case "eventType": {
        result = await addEventType({ DescA: value }).unwrap();
        await refetchEventTypes();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setEventType(String(code));
        break;
    }

    case "productionLine": {
        result = await addProdLine({ DescA: value }).unwrap();
        await refetchProductionLines();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setProductionLine(String(code));
        break;
    }

    case "productSerial": {
        result = await addItemSer({ DescA: value }).unwrap();
        await refetchItemsSer();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setProductSerial(String(code));
        break;
    }

    case "song": {
        result = await addSong({ DescA: value }).unwrap();
        await refetchSongs();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setHymnName(String(code));
        break;
    }

    case "speaker": {
        result = await addSpeaker({ DescA: value }).unwrap();
        await refetchSpeakers();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) {
        setSelectedSpeakers((previous) => [
            ...previous,
            Number(code),
        ]);
        }
        break;
    }

    case "channel": {
        result = await addChannel({ DescA: value }).unwrap();
        await refetchChannels();

        const code = result?.Code ?? result?.data?.Code;
        if (code != null) setChannelName(String(code));
        break;
    }
    }

    toast.success("تمت إضافة العنصر بنجاح");

    setAddModalType(null);
    setNewValue("");
} catch (addError: unknown) {
    const message = getErrorMessage(
    addError,
    "حدث خطأ أثناء إضافة العنصر."
    );

    toast.error(message);
} finally {
    setIsAddingLookup(false);
}
};

  // ==================================================
  // PRODUCT
  // ==================================================

  const [productType, setProductType] = useState("");
  const [item, setItem] = useState("");
  const [productName, setProductName] = useState("");
  const [productSerial, setProductSerial] = useState("");

  // ==================================================
  // PRODUCTION
  // ==================================================

  const [production1, setProduction1] = useState("");
  const [production2, setProduction2] = useState("");
  const [productionLine, setProductionLine] = useState("");

  // ==================================================
  // SECTOR / TRANSLATION
  // ==================================================

  const [sector, setSector] = useState("");
  const [translation, setTranslation] = useState("");

  // ==================================================
  // EVENT
  // ==================================================

  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventNameText, setEventNameText] = useState("");
  const [showEventSuggestions, setShowEventSuggestions] = useState(false);

  const filteredEvents = events.filter((event) =>
    String(event.DescA ?? "").toLowerCase().includes(eventNameText.trim().toLowerCase())
  );

  // ==================================================
  // HYMN / SPEAKER / CHANNEL
  // ==================================================

  const [hymnName, setHymnName] = useState("");
  const [selectedSpeakers, setSelectedSpeakers] = useState<number[]>([]);
  const [manualSpeakers, setManualSpeakers] = useState<string[]>([]);
  const [channelName, setChannelName] = useState("");

  // ==================================================
  // REPEATED
  // ==================================================

  const [isRepeated, setIsRepeated] = useState(false);
  const [repeatType, setRepeatType] = useState("");

  // ==================================================
  // FORM LAYOUT
  // ==================================================

  const [formLayout, setFormLayout] = useState<"grid3" | "grid2" | "full">(() => {
    if (typeof window === "undefined") {
      return "grid2";
    }

    const saved = localStorage.getItem("video-form-layout");

    if (
      saved === "grid3" ||
      saved === "grid2" ||
      saved === "full"
    ) {
      return saved;
    }

    return "grid2";
  });

  const changeFormLayout = (
    layout: "grid3" | "grid2" | "full"
  ) => {
    setFormLayout(layout);
    localStorage.setItem("video-form-layout", layout);
  };

  // ==================================================
  // UPLOAD PROGRESS
  // ==================================================

  type UploadPhase =
    | "idle"
    | "uploading"
    | "processing"
    | "completed";

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadPhase, setUploadPhase] = useState<UploadPhase>("idle");
  const [isSaving, setIsSaving] = useState(false);

  const [
    createVideoWithProgress,
    { isLoading: isRegularSavingUpload },
  ] = useCreateVideoWithProgressMutation();

  // Assumes this mutation exists in your API slice.
  const [createServerVideoDraft] =
    useCreateServerVideoDraftMutation();

  const isSavingUploadVideo =
    isSaving || isRegularSavingUpload;

  // ==================================================
  // ERROR
  // ==================================================

  const [error, setError] = useState("");

  // ==================================================
  // VIDEO SELECT
  // ==================================================

  const processVideoFile = (file?: File) => {
    if (!file) return;

    setError("");

    const extension = file.name.split(".").pop()?.toLowerCase();

    const supportedExtensions = [
      "mp4",
      "webm",
      "ogg",
      "mkv",
      "avi",
      "mov",
    ];

    const isVideo =
      file.type.startsWith("video/") ||
      supportedExtensions.includes(extension ?? "");

    if (!isVideo) {
      toast.error(
        "من فضلك اختر ملف فيديو صالح (MP4, WebM, MOV, AVI, MKV)."
      );

      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }

      return;
    }

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    const previewUrl = URL.createObjectURL(file);

    setVideoFile(file);
    setVideoUrl(previewUrl);
    setVideoSource("device");
    setSelectedServerVideo(null);
    setVideoDuration("");

    const metadataUrl = URL.createObjectURL(file);
    const video = document.createElement("video");

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      if (Number.isFinite(video.duration)) {
        setVideoDuration(formatDuration(video.duration));
      }

      URL.revokeObjectURL(metadataUrl);
      video.removeAttribute("src");
      video.load();
    };

    video.onerror = () => {
      URL.revokeObjectURL(metadataUrl);
    };

    video.src = metadataUrl;
  };

  const handleVideoSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    processVideoFile(event.target.files?.[0]);
  };

  const handleVideoDragOver = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsVideoDragging(true);
  };

  const handleVideoDragLeave = (
    event: DragEvent<HTMLDivElement>
  ) => {
    if (
      !event.currentTarget.contains(
        event.relatedTarget as Node | null
      )
    ) {
      setIsVideoDragging(false);
    }
  };

  const handleVideoDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsVideoDragging(false);
    processVideoFile(event.dataTransfer.files?.[0]);
  };

  // ==================================================
  // RESET FORM
  // ==================================================

  const handleRefresh = () => {
    setTitle("");
    setDate(getCurrentDateTime());

    setProduction1("");
    setProduction2("");
    setProductionLine("");

    setSector("");
    setTranslation("");

    setProductType("");
    setItem("");
    setProductName("");
    setProductSerial("");

    setEventType("");
    setEventName("");
    setEventNameText("");
    setShowEventSuggestions(false);

    setHymnName("");
    setManualSpeakers([]);
    setSelectedSpeakers([]);
    setChannelName("");

    setIsRepeated(false);
    setRepeatType("");

    setYoutubeLink("");
    setFacebookLink("");
    setInstagramLink("");

    setContent1("");
    setContent2("");
    setContent3("");
    setContent4("");
    setContent5("");
    setContentType("");

    setError("");

    handleRemoveVideo();

    setVideoSource("device");
    setShowServerBrowser(false);
    setServerSearch("");
    setServerPage(1);
    setServerVideos([]);
    setServerVideosError("");

    handleRemoveThumbnail();

    setUploadProgress(0);
    setUploadPhase("idle");
  };

  // ==================================================
  // SAVE VIDEO
  // ==================================================

  const handleSave = async () => {
    setError("");

    if (isSaving) return;

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!item) {
      setError("من فضلك اختر الصنف.");
      return;
    }

    if (!production1) {
      setError("من فضلك اختر جهة انتاج 1.");
      return;
    }

    if (!sector) {
      setError("من فضلك اختر القطاع.");
      return;
    }

    if (!productName.trim()) {
      setError("من فضلك أدخل اسم المنتج.");
      return;
    }

    if (videoSource === "device" && !videoFile) {
      setError("من فضلك اختر ملف الفيديو من جهازك.");
      return;
    }

    if (videoSource === "server" && !selectedServerVideo) {
      setError("من فضلك اختر ملف فيديو من السيرفر.");
      return;
    }

    // ==================================================
    // CREATE FORMDATA
    // ==================================================

    const formData = new FormData();

    formData.append("date", date || "");
    formData.append("title", title.trim());

    formData.append("production1", production1 || "");
    formData.append("production2", production2 || "");

    formData.append("sector", sector || "");
    formData.append("translation", translation || "");

    formData.append("productType", productType || "");
    formData.append("item", item || "");
    formData.append("productName", productName.trim());
    formData.append("productSerial", productSerial || "");

    formData.append("eventType", eventType || "");
    formData.append("eventName", eventName || "");

    formData.append("productionLine", productionLine || "");

    formData.append("hymnName", hymnName || "");

    formData.append("speakerCodes",JSON.stringify(selectedSpeakers));

    formData.append("manualSpeakers",JSON.stringify(manualSpeakers));

    formData.append("isRepeated", String(isRepeated));
    formData.append("repeatType", repeatType || "");

    formData.append("channelName", channelName || "");

    formData.append("youtubeLink", youtubeLink.trim());
    formData.append("facebookLink", facebookLink.trim());
    formData.append("instagramLink", instagramLink.trim());

    formData.append("content1", content1.trim());
    formData.append("content2", content2.trim());
    formData.append("content3", content3.trim());
    formData.append("content4", content4.trim());
    formData.append("content5", content5.trim());

    if (isAdmin) {
      formData.append("contentType", contentType || "");
    }

    if (thumbnailFile) {
      formData.append( "thumbnailFile", thumbnailFile, thumbnailFile.name );
    }

    // ==================================================
    // SAVE
    // ==================================================

    try {
      setIsSaving(true);
      setUploadProgress(0);

      let result: unknown;

      if (videoSource === "device") {
        if (!videoFile) {
          throw new Error(
            "من فضلك اختر ملف الفيديو من جهازك."
          );
        }

        formData.append(
          "videoFile",
          videoFile,
          videoFile.name
        );

        setUploadPhase("uploading");

        const uploadId =
          `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        registerVideoUploadProgress(uploadId, {
          onProgress: (percentage) => {
            setUploadProgress(percentage);
          },
          onUploadComplete: () => {
            setUploadPhase("processing");
          },
        });

        try {
          result = await createVideoWithProgress({
            formData,
            uploadId,
          }).unwrap();
        } finally {
          unregisterVideoUploadProgress(uploadId);
        }
      } else {
        if (!selectedServerVideo) {
          throw new Error(
            "من فضلك اختر ملف فيديو من السيرفر."
          );
        }

        setUploadPhase("processing");

        const payload: Record<string, string> = {};

        formData.forEach((value, key) => {
          if (typeof value === "string") {
            payload[key] = value;
          }
        });

        result = await createServerVideoDraft({
          ...payload,
          serverRelativePath: selectedServerVideo.relativePath,
        }).unwrap();
      }

      setUploadProgress(100);
      setUploadPhase("completed");

      console.log("Video created successfully:", result);

      toast.success("تم حفظ الفيديو كمسودة بنجاح");

      router.push("/videos");
    } catch (saveError: unknown) {
      setUploadPhase("idle");
      setUploadProgress(0);

      const message = getErrorMessage(
        saveError,
        "حدث خطأ أثناء حفظ الفيديو."
      );

      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  // ==================================================
  // RETURN
  // ==================================================

  return {
    // Refs
    videoInputRef,
    thumbnailInputRef,
    dateInputRef,

    // Authentication
    user,
    isAdmin,
    authLoading,
    isAuthenticated,

    // Video
    videoSource,
    setVideoSource,
    videoFile,
    videoUrl,
    videoDuration,
    isVideoDragging,
    handleVideoSelect,
    handleVideoDragOver,
    handleVideoDragLeave,
    handleVideoDrop,
    processVideoFile,
    handleRemoveVideo,

    // Server videos
    showServerBrowser,
    setShowServerBrowser,
    serverVideos,
    serverSearch,
    setServerSearch,
    serverPage,
    setServerPage,
    serverTotalPages,
    serverTotal,
    serverVideosError,
    isLoadingServerVideos,
    loadServerVideos,
    openServerBrowser,
    chooseServerVideo,
    chooseDeviceSource,
    selectedServerVideo,

    // Thumbnail
    thumbnailFile,
    thumbnailUrl,
    handleThumbnailSelect,
    handleRemoveThumbnail,

    // Basic information
    title,
    setTitle,
    date,
    setDate,
    openDatePicker,

    // Social links
    youtubeLink,
    setYoutubeLink,
    facebookLink,
    setFacebookLink,
    instagramLink,
    setInstagramLink,

    // Content
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
    contentType,
    setContentType,

    // Lookup data
    itemsType,
    itemsTypeIsLoading,
    refetchItemsType,
    eventTypes,
    eventTypesIsLoading,
    refetchEventTypes,
    productionLines,
    productionLinesIsLoading,
    refetchProductionLines,
    sectors,
    sectorsIsLoading,
    refetchSectors,
    productEntitiesOne,
    productEntitiesOneIsLoading,
    refetchProductEntitiesOne,
    productEntitiesTwo,
    productEntitiesTwoIsLoading,
    refetchProductEntitiesTwo,
    songs,
    songsIsLoading,
    refetchSongs,
    speakers,
    speakersIsLoading,
    refetchSpeakers,
    events,
    eventsIsLoading,
    eventsIsFetching,
    refetchEvents,
    items,
    itemsIsLoading,
    refetchItems,
    itemsSer,
    itemsSerIsLoading,
    refetchItemsSer,
    channels,
    channelsIsLoading,
    refetchChannels,
    translations,
    translationsIsLoading,
    refetchTranslations,
    contentTypes,
    contentTypesIsLoading,

    // Add mutations
    addProductEntityOne,
    addProductEntityTwo,
    addSector,
    addItemType,
    addEventType,
    addProdLine,
    addSong,
    addSpeaker,
    addItem,
    addItemSer,
    addTranslation,
    addChannel,
    addEvent,
    isAddingEvent,

    // Product
    productType,
    setProductType,
    item,
    setItem,
    productName,
    setProductName,
    productSerial,
    setProductSerial,

    // Production
    production1,
    setProduction1,
    production2,
    setProduction2,
    productionLine,
    setProductionLine,

    // Sector / translation
    sector,
    setSector,
    translation,
    setTranslation,

    // Event
    eventType,
    setEventType,
    eventName,
    setEventName,
    eventNameText,
    setEventNameText,
    showEventSuggestions,
    setShowEventSuggestions,
    filteredEvents,

    // Hymn / speakers / channel
    hymnName,
    setHymnName,
    selectedSpeakers,
    setSelectedSpeakers,
    manualSpeakers,
    setManualSpeakers,
    channelName,
    setChannelName,

    // Repeated
    isRepeated,
    setIsRepeated,
    repeatType,
    setRepeatType,

    // Layout
    formLayout,
    setFormLayout,
    changeFormLayout,

    // Upload
    uploadProgress,
    uploadPhase,
    isSaving,
    isSavingUploadVideo,

    // Error
    error,
    setError,

    // Actions
    handleRefresh,
    handleSave,

    isAddModalOpen,
    newValue,
    setNewValue,
    openAddModal,
    closeAddModal,
    getAddModalTitle,
    handleAddItem,
    isAddingLookup,
  };
}
