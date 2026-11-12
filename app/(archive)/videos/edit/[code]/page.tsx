// "use client";

import EditVideoPage from "@/app/components/videos/Edit-Video/EditVideoPage";

// import type { ChangeEvent, ReactNode } from "react";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import { Building2, Calendar, CalendarDays, ChevronDown, FileVideo, Folder, Globe2, Image as ImageIcon, ImagePlus, Layers, ListOrdered, Languages, Music2, Package, Plus, Save, Share2, Trash2, UploadCloud, User, Video, Workflow, Grid3X3, Grid2X2, Rows3, Pencil } from "lucide-react";
// import { formatDuration, formatFileSize } from "@/app/helpers/videoHelper";
// import { useGetChannelsQuery, useGetContentTypesQuery, useGetEventsQuery, useGetEventTypesQuery, useGetItemsQuery, useGetItemsSerQuery, useGetItemTypesQuery, useGetProdLinesQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetSectorsQuery, useGetSongsQuery, useGetSpeakersQuery, useGetTranslationsQuery, useAddEventMutation, useUpdateEventMutation } from "@/app/services/sectors-api";
// import { useGetVideoByCodeQuery, useUpdateVideoMutation, useSubmitVideoMutation, useDeleteVideoMutation, useAdminUpdateVideoMutation } from "@/app/services/videos-api";
// import { getCurrentDateTime } from "@/app/helpers/getCurentDate";
// import { getArabicDayName } from "@/app/helpers/getArabicDayName";
// import { toast } from "sonner";
// import { useAuth } from "@/app/context/AuthContext";
// import { AlertTriangle, X } from "lucide-react";





//   function getApiErrorMessage(
//     error: unknown,
//     fallback: string,
//   ): string {
//     if (typeof error !== "object" || error === null) {
//       return fallback;
//     }

//     const value = error as {
//       data?: unknown;
//       message?: unknown;
//       error?: unknown;
//       response?: {
//         data?: unknown;
//       };
//     };

//     const responseData =
//       typeof value.response?.data === "object" &&
//       value.response.data !== null
//         ? (value.response.data as {
//             message?: unknown;
//             error?: unknown;
//           })
//         : undefined;

//     const data =
//       typeof value.data === "object" && value.data !== null
//         ? (value.data as {
//             message?: unknown;
//             error?: unknown;
//           })
//         : responseData;

//     const candidates = [
//       data?.message,
//       data?.error,
//       value.message,
//       value.error,
//     ];

//     const serverMessage = candidates.find(
//       (candidate): candidate is string =>
//         typeof candidate === "string" &&
//         candidate.trim().length > 0,
//     )?.trim();

//     if (!serverMessage) {
//       return fallback;
//     }

//     // رسائل السيرفر وترجمتها للعربي
//     const messages: Record<string, string> = {
//       "Product name already exists": "اسم المنتج موجود بالفعل",
//       "Product not found": "المنتج غير موجود",
//       "Event name already exists": "اسم الحدث موجود بالفعل",
//       "Event not found": "الحدث غير موجود",
//       "Video not found": "الفيديو غير موجود",
//       "Unauthorized": "غير مصرح لك بتنفيذ هذا الإجراء",
//       "Forbidden": "ليس لديك صلاحية لتنفيذ هذا الإجراء",
//       "Validation failed": "البيانات المدخلة غير صحيحة",
//     };

//     // لو الرسالة موجودة في الترجمة، اعرض العربي
//     if (messages[serverMessage]) {
//       return messages[serverMessage];
//     }

//     // لو السيرفر رجّع رسالة عربية بالفعل، اعرضها
//     if (/[\u0600-\u06FF]/.test(serverMessage)) {
//       return serverMessage;
//     }

//     // لا تعرض أي رسالة إنجليزية غير مترجمة
//     return fallback;
//   }


// export default function EditVideoPage() {

//   const videoInputRef = useRef<HTMLInputElement>(null);
//   const thumbnailInputRef = useRef<HTMLInputElement>(null);
//   const params = useParams<{ code: string }>();
//   const router = useRouter();
//   const code = Number(params?.code);
  
//   // ==================================================
//   // VIDEO
//   // ==================================================

//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoUrl, setVideoUrl] = useState("");
//   const [videoDuration, setVideoDuration] = useState("");

//   // ==================================================
//   // THUMBNAIL
//   // ==================================================
//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
//   const [thumbnailUrl, setThumbnailUrl] = useState("");


//   const [youtubeLink, setYoutubeLink] = useState("");
//   const [facebookLink, setFacebookLink] = useState("");
//   const [instagramLink, setInstagramLink] = useState("");

//   const [content1, setContent1] = useState("");
//   const [content2, setContent2] = useState("");
//   const [content3, setContent3] = useState("");
//   const [content4, setContent4] = useState("");
//   const [content5, setContent5] = useState("");


//   // ==================================================
//   // VIDEO INFORMATION
//   // ==================================================

//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState(getCurrentDateTime());

//   const dateInputRef = useRef<HTMLInputElement>(null);

//   const openDatePicker = () => {
//     dateInputRef.current?.showPicker();
//   };

//   // ==================================================
//   // PRODUCTION
//   // ==================================================

//   const [production1, setProduction1] = useState("");
//   const [production2, setProduction2] = useState("");

//   // ==================================================
//   // SECTOR / TRANSLATION
//   // ==================================================

//   const [sector, setSector] = useState("");
//   const [translation, setTranslation] = useState("");

//   const { user, isLoading: authLoading, isAuthenticated } = useAuth();

//   const isAdmin = user?.isAdmin === true;

//   const currentUserId =
//     user?.id != null && Number.isFinite(Number(user.id))
//       ? Number(user.id)
//       : null;

//   useEffect(() => {
//     if (!authLoading && !isAuthenticated) {
//       router.replace("/sign-in");
//     }
//   }, [authLoading, isAuthenticated, router]);

//   // ==================================================
//   // PRODUCT
//   // ==================================================

//   // const { data: itemsType = [], isLoading: itemsTypeIsLoading, refetch: refetchItemsType, isFetching: itemsTypeIsFetching, isError: itemsTypeIsError } = useGetItemTypesQuery();
//   const { data: itemsType = [], isLoading: itemsTypeIsLoading } = useGetItemTypesQuery();
//   const { data: eventTypes = [], isLoading: eventTypesIsLoading } = useGetEventTypesQuery();
//   const { data: productionLines = [], isLoading: productionLinesIsLoading } = useGetProdLinesQuery();
  
//   const { data: sectors = [], isLoading: sectorsIsLoading } = useGetSectorsQuery();
//   const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading } = useGetProductEntityOneQuery();
//   const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading } = useGetProductEntityTwoQuery();

//   const { data: songs = [], isLoading: songsIsLoading } = useGetSongsQuery();
//   const { data: speakers = [], isLoading: speakersIsLoading } = useGetSpeakersQuery();
//   const { data: events = [], isLoading: eventsIsLoading, refetch: refetchEvents, isFetching: eventsIsFetching, } = useGetEventsQuery();

//   const { data: items = [], isLoading: itemsIsLoading } = useGetItemsQuery();
//   const { data: itemsSer = [], isLoading: itemsSerIsLoading } = useGetItemsSerQuery();
//   const { data: channels = [], isLoading: channelsIsLoading } = useGetChannelsQuery();
//   const { data: translations = [], isLoading: translationsIsLoading } = useGetTranslationsQuery();

//   const { data: contentTypes = [], isLoading: contentTypesIsLoading } = useGetContentTypesQuery(undefined, { skip: !isAdmin });

//   const { data: videoResponse, isLoading: isVideoLoading, isError: isVideoError, error: videoError } = useGetVideoByCodeQuery(code, { skip: !Number.isFinite(code) || authLoading || !isAuthenticated });

//   const [updateVideo, { isLoading: isSaving }] = useUpdateVideoMutation();

//   const [adminUpdateVideo] = useAdminUpdateVideoMutation();

//   const [submitVideo, { isLoading: isSubmitting }] = useSubmitVideoMutation();
//   const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();
//   const [addEvent, { isLoading: isAddingEvent }] = useAddEventMutation();
//   const [updateEvent, { isLoading: isUpdatingEvent }] = useUpdateEventMutation();

//   const video = videoResponse?.data;

  

//   // ==================================================
//   // PERMISSIONS / LOCK STATE
//   // ==================================================

//   const [contentType, setContentType] = useState("");


//   const isSubmitted = String(video?.RecordStatus ?? "").toUpperCase() === "SUBMITTED";

//   const isOwner = currentUserId !== null && Number(video?.Emp_Code) === currentUserId;

//   // Admin can edit any video.
//   // Non-admin users can edit only their own DRAFT videos.
//   const canEdit = isAdmin || (!isSubmitted && isOwner);

//   // Admin can delete any video.
//   // Non-admin users can delete only their own DRAFT videos.
//   const canDelete = isAdmin || (!isSubmitted && isOwner);

//   const isLocked = !canEdit;

//   const [isVideoDragging, setIsVideoDragging] = useState(false);



//   const [existingVideoFileName, setExistingVideoFileName] = useState("");
//   const [existingThumbnailFileName, setExistingThumbnailFileName] = useState("");

//   const [productType, setProductType] = useState("");

//   const [item, setItem] = useState("");

//   const [productName, setProductName] = useState("");
//   const [productSerial, setProductSerial] = useState("");

//   // ==================================================
//   // EVENT
//   // ==================================================

//   const [eventType, setEventType] = useState("");
//   const [eventName, setEventName] = useState("");
//   const [eventNameText, setEventNameText] = useState("");
//   const [originalEventNameText, setOriginalEventNameText] = useState("");
//   const [eventTextInitializedForCode, setEventTextInitializedForCode] = useState<number | null>(null);
//   const [showEventSuggestions, setShowEventSuggestions] = useState(false);
//   const filteredEvents = events.filter((event) =>
//     String(event.DescA ?? "")
//       .toLowerCase()
//       .includes(eventNameText.trim().toLowerCase())
//   );


//   // ==================================================
//   // PRODUCTION LINE
//   // ==================================================

//   const [productionLine, setProductionLine] = useState("");

//   // ==================================================
//   // HYMN / SPEAKER / CHANNEL
//   // ==================================================

//   const [hymnName, setHymnName] = useState("");
//   const [speakerName, setSpeakerName] = useState("");
//   const [channelName, setChannelName] = useState("");

//   // ==================================================
//   // REPEATED
//   // ==================================================

//   const [isRepeated, setIsRepeated] = useState(false);
//   const [repeatType, setRepeatType] = useState("");


//   // ==================================================
//   // ERROR
//   // ==================================================

//   const [error, setError] = useState("");

//   // ==================================================
//   // CHANGE THE LAOYUT FROM LOCAL STORAGE
//   // ==================================================

//   const [formLayout, setFormLayout] = useState<"grid3" | "grid2" | "full">(() => {
//     if (typeof window === "undefined") {
//       return "grid2";
//     }

//     const saved = localStorage.getItem("video-form-layout");

//     if (saved === "grid3" || saved === "grid2" || saved === "full") {
//       return saved;
//     }

//     return "grid2";
//   });

//   const changeFormLayout = (layout: "grid3" | "grid2" | "full") => {
//     setFormLayout(layout);
//     localStorage.setItem("video-form-layout", layout);
//   };



//   const hasUnsavedChanges = useMemo(() => {
//     if (!video) return false;

//     const original = video as unknown as Record<string, unknown>;

//     const originalDate = (() => {
//       if (!video.TDate) return date;

//       const parsedDate = new Date(video.TDate);

//       if (Number.isNaN(parsedDate.getTime())) return date;

//       return new Date(
//         parsedDate.getTime() -
//           parsedDate.getTimezoneOffset() * 60000
//       )
//         .toISOString()
//         .slice(0, 16);
//     })();

//     const originalEvent = events.find(
//       (event) => String(event.Code) === String(video.Event_Code ?? "")
//     );

//     return (
//       date !== originalDate ||
//       title !== (video.ItemName ?? "") ||
//       item !== String(video.Item_Code ?? "") ||
//       production1 !== String(video.ProdEntity1_Code ?? "") ||
//       production2 !== String(video.ProdEntity2_Code ?? "") ||
//       sector !== String(video.Sec_Code ?? "") ||
//       translation !== String(video.Translation_Code ?? "") ||
//       productType !== String(video.ItemType_Code ?? "") ||
//       productName !== (video.ItemName ?? "") ||
//       productSerial !== String(video.ItemSer_Code ?? "") ||
//       eventType !== String(video.EventType_Code ?? "") ||
//       eventName !== String(video.Event_Code ?? "") ||
//       eventNameText !== String(originalEvent?.DescA ?? "") ||
//       productionLine !== String(video.ProdLine_Code ?? "") ||
//       hymnName !== String(video.Song_Code ?? "") ||
//       speakerName !== String(video.Speaker_Code ?? "") ||
//       channelName !==
//         (video.ChannelName ??
//           (video.Channel_Code != null ? String(video.Channel_Code) : "")) ||
//       contentType !== String(video.ContentType_Code ?? "") ||
//       content1 !== String(original.Content1 ?? original.content1 ?? "") ||
//       content2 !== String(original.Content2 ?? original.content2 ?? "") ||
//       content3 !== String(original.Content3 ?? original.content3 ?? "") ||
//       content4 !== String(original.Content4 ?? original.content4 ?? "") ||
//       content5 !== String(original.Content5 ?? original.content5 ?? "") ||
//       isRepeated !== Boolean(original.IsRepeated ?? original.isRepeated ?? false) ||
//       repeatType !== String(original.RepeatType ?? original.repeatType ?? "") ||
//       youtubeLink !== (video.YouTubeLink ?? "") ||
//       facebookLink !== (video.FaceBookLink ?? "") ||
//       instagramLink !== (video.InstagramLink ?? "") ||
//       Boolean(videoFile) ||
//       Boolean(thumbnailFile) ||
//       existingVideoFileName !== (video.FileName ?? "")
//     );
//   }, [
//     video,
//     events,
//     date,
//     title,
//     item,
//     production1,
//     production2,
//     sector,
//     translation,
//     productType,
//     productName,
//     productSerial,
//     eventType,
//     eventName,
//     eventNameText,
//     productionLine,
//     hymnName,
//     speakerName,
//     channelName,
//     contentType,
//     content1,
//     content2,
//     content3,
//     content4,
//     content5,
//     isRepeated,
//     repeatType,
//     youtubeLink,
//     facebookLink,
//     instagramLink,
//     videoFile,
//     thumbnailFile,
//     existingVideoFileName,
//   ]);



//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       if (!hasUnsavedChanges) return;

//       event.preventDefault();
//       event.returnValue = "";
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [hasUnsavedChanges]);


//   const pathname = usePathname();

//   const [showUnsavedModal, setShowUnsavedModal] = useState(false);
//   const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

//   const allowNavigationRef = useRef(false);

//   const confirmNavigation = () => {
//     allowNavigationRef.current = true;
//     setShowUnsavedModal(false);

//     if (pendingNavigation) {
//       router.push(pendingNavigation);
//     }
//   };

//   const cancelNavigation = () => {
//     setShowUnsavedModal(false);
//     setPendingNavigation(null);
//   };



//   // ==================================================
//   // CLEANUP VIDEO URL
//   // ==================================================

//   useEffect(() => {
//     return () => {
//       if (videoUrl.startsWith("blob:")) {
//         URL.revokeObjectURL(videoUrl);
//       }
//     };
//   }, [videoUrl]);

//   // ==================================================
//   // CLEANUP THUMBNAIL URL
//   // ==================================================

//   useEffect(() => {
//     return () => {
//       if (thumbnailUrl.startsWith("blob:")) {
//         URL.revokeObjectURL(thumbnailUrl);
//       }
//     };
//   }, [thumbnailUrl]);

//   // ==================================================
//   // API FILE URL
//   // ==================================================

//   const API_URL =
//     process.env.NEXT_PUBLIC_API_URL ||
//     "http://localhost:5000";

//   const getFileUrl = (fileName: string | null | undefined) => {
//     if (!fileName) return "";
//     const value = fileName.trim();
//     if (!value) return "";
//     if (value.startsWith("http://") || value.startsWith("https://")) {
//       return value;
//     }
//     if (value.startsWith("/")) {
//       return `${API_URL}${value}`;
//     }
//     return `${API_URL}/uploads/videos/${encodeURIComponent(value)}`;
//   };

//   // ==================================================
//   // LOAD VIDEO DATA
//   // ==================================================

//   /* eslint-disable react-hooks/set-state-in-effect */
//   useEffect(() => {
//     if (!video) return;

//     const videoExtra = video as unknown as Record<string, unknown>;

//     setTitle(video.ItemName ?? "");
//     setItem(video.Item_Code != null ? String(video.Item_Code) : "");

//     if (video.TDate) {
//       const parsedDate = new Date(video.TDate);
//       if (!Number.isNaN(parsedDate.getTime())) {
//         const localDate = new Date(
//           parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000
//         )
//           .toISOString()
//           .slice(0, 16);
//         setDate(localDate);
//       }
//     }

//     setProduction1(video.ProdEntity1_Code != null ? String(video.ProdEntity1_Code) : "");
//     setProduction2(video.ProdEntity2_Code != null ? String(video.ProdEntity2_Code) : "");
    
//     setSector(video.Sec_Code != null ? String(video.Sec_Code) : "");
//     setTranslation(video.Translation_Code != null ? String(video.Translation_Code) : "");
    
//     setProductType(video.ItemType_Code != null ? String(video.ItemType_Code) : "");
//     setProductName(video.ItemName ?? "");
//     setProductSerial(video.ItemSer_Code != null ? String(video.ItemSer_Code) : "");
//     setEventType(video.EventType_Code != null ? String(video.EventType_Code) : "");
//     setEventName(video.Event_Code != null ? String(video.Event_Code) : "");
//     setProductionLine(video.ProdLine_Code != null ? String(video.ProdLine_Code) : "");
//     setHymnName(video.Song_Code != null ? String(video.Song_Code) : "");
//     setSpeakerName(video.Speaker_Code != null ? String(video.Speaker_Code) : "");

//     setIsRepeated(Boolean(videoExtra.IsRepeated ?? videoExtra.isRepeated ?? false));
//     setRepeatType(videoExtra.RepeatType != null ? String(videoExtra.RepeatType) : (videoExtra.repeatType != null ? String(videoExtra.repeatType) : ""));

//     setContentType(video.ContentType_Code != null ? String(video.ContentType_Code) : "");

//     setChannelName(video.ChannelName ?? (video.Channel_Code != null ? String(video.Channel_Code) : ""));

//     setContent1(String(videoExtra.Content1 ?? videoExtra.content1 ?? ""));
//     setContent2(String(videoExtra.Content2 ?? videoExtra.content2 ?? ""));
//     setContent3(String(videoExtra.Content3 ?? videoExtra.content3 ?? ""));
//     setContent4(String(videoExtra.Content4 ?? videoExtra.content4 ?? ""));
//     setContent5(String(videoExtra.Content5 ?? videoExtra.content5 ?? ""));

//     const existingDuration = videoExtra.Duration ?? videoExtra.duration;
//     if (existingDuration != null && existingDuration !== "") {
//       setVideoDuration(String(existingDuration));
//     }

//     setYoutubeLink(video.YouTubeLink ?? "");
//     setFacebookLink(video.FaceBookLink ?? "");
//     setInstagramLink(video.InstagramLink ?? "");

//     setExistingVideoFileName(video.FileName ?? "");
//     setExistingThumbnailFileName(video.ImageLink ?? "");

//     if (video.FileName) {
//       setVideoUrl(getFileUrl(video.FileName));
//     }

//     if (video.ImageLink) {
//       setThumbnailUrl(getFileUrl(video.ImageLink));
//     }
//   }, [video]);

//   // ==================================================
//   // EVENT DISPLAY NAME
//   // ==================================================

//   useEffect(() => {
//     if (!video) return;

//     const videoCode = Number(video.Code);

//     if (eventTextInitializedForCode === videoCode) {
//       return;
//     }

//     const eventCode =
//       video.Event_Code != null ? String(video.Event_Code) : "";

//     // setEventName(eventCode);

//     if (!eventCode) {
//       return;
//     }

  
//     const selectedEvent = events.find(
//       (event) => String(event.Code) === eventCode
//     );

//     if (!selectedEvent) {
//       if (eventsIsLoading || eventsIsFetching) return;

//       setEventNameText("");
//       setOriginalEventNameText("");
//       setEventTextInitializedForCode(videoCode);
//       return;
//     }

//     const name = String(selectedEvent.DescA ?? "");

//     setEventNameText(name);
//     setOriginalEventNameText(name);
//     setEventTextInitializedForCode(videoCode);
//   }, [
//     video,
//     events,
//     eventsIsLoading,
//     eventsIsFetching,
//     eventTextInitializedForCode,
//   ]);

//   // ==================================================
//   // VIDEO SELECT
//   // ==================================================

//   const handleVideoSelect = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     setError("");

//     if (!file.type.startsWith("video/")) {
//       setError("من فضلك اختر ملف فيديو صالح.");
//       return;
//     }

//     if (videoUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     const url = URL.createObjectURL(file);

//     setVideoFile(file);
//     setVideoUrl(url);
//     setVideoDuration("");

//     const video = document.createElement("video");

//     video.preload = "metadata";

//     video.onloadedmetadata = () => {
//       const duration = video.duration;

//       if (Number.isFinite(duration)) {
//         setVideoDuration(formatDuration(duration));
//       }
//     };

//     video.src = url;
//   };


//   const handleVideoDrop = (
//     event: React.DragEvent<HTMLDivElement>
//   ) => {
//     event.preventDefault();
//     setIsVideoDragging(false);

//     if (isLocked) return;

//     const file = event.dataTransfer.files?.[0];

//     if (!file) return;

//     // Reuse your existing validation, preview,
//     // object URL and duration logic.
//     const input = videoInputRef.current;

//     if (!input) return;

//     const transfer = new DataTransfer();
//     transfer.items.add(file);

//     input.files = transfer.files;

//     handleVideoSelect({
//       target: input,
//     } as ChangeEvent<HTMLInputElement>);
//   };


//   // ==================================================
//   // REMOVE VIDEO
//   // ==================================================

//   const handleRemoveVideo = () => {
//     if (videoUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     // Remove current video from UI
//     setVideoFile(null);
//     setVideoUrl("");
//     setVideoDuration("");

//     // IMPORTANT:
//     // Clear the existing database file name.
//     // This allows the user to choose a replacement video.
//     setExistingVideoFileName("");

//     // Reset file input
//     if (videoInputRef.current) {
//       videoInputRef.current.value = "";
//     }
//   };

  
//   // ==================================================
//   // THUMBNAIL SELECT
//   // ==================================================

//   const handleThumbnailSelect = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     setError("");

//     if (!file.type.startsWith("image/")) {
//       setError("من فضلك اختر صورة صالحة.");
//       return;
//     }

//     if (thumbnailUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(thumbnailUrl);
//     }

//     const url = URL.createObjectURL(file);

//     setThumbnailFile(file);
//     setThumbnailUrl(url);
//   };

//   // ==================================================
//   // REMOVE THUMBNAIL
//   // ==================================================

//   const handleRemoveThumbnail = () => {
//     if (thumbnailUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(thumbnailUrl);
//     }

//     setThumbnailFile(null);
//     setThumbnailUrl("");

//     if (thumbnailInputRef.current) {
//       thumbnailInputRef.current.value = "";
//     }
//   };

  
//   // ==================================================
// // SAVE VIDEO
// // ==================================================

//   const handleSave = async () => {

//     if (!canEdit) {
//       setError("ليس لديك صلاحية لتعديل هذا الفيديو.");
//       return;
//     }

//     setError("");


//     // ==================================================
//     // VALIDATION
//     // ==================================================

//     if (!date) {

//       setError(
//         "من فضلك أدخل التاريخ."
//       );

//       return;
//     }




//     if (!productName.trim()) {

//       setError(
//         "من فضلك أدخل اسم المنتج."
//       );

//       return;
//     }



//     if (!videoFile && !existingVideoFileName) {

//       setError(
//         "لا يوجد ملف فيديو حالي، من فضلك اختر ملف الفيديو."
//       );

//       return;
//     }


//     // ==================================================
//     // CREATE FORMDATA
//     // ==================================================

//     const formData =
//       new FormData();


//     // ==================================================
//     // VIDEO INFORMATION
//     // ==================================================

//     formData.append(
//       "date",
//       date
//     );

//     formData.append(
//       "title",
//       title
//     );

//     formData.append(
//       "item",
//       item
//     );

//     // ==================================================
//     // PRODUCTION
//     // ==================================================

//     if (production1) {

//       formData.append(
//         "production1",
//         production1
//       );

//     }


//     if (production2) {

//       formData.append(
//         "production2",
//         production2
//       );

//     }


//     // ==================================================
//     // SECTOR
//     // ==================================================

//     if (sector) {

//       formData.append(
//         "sector",
//         sector
//       );

//     }


//     // ==================================================
//     // TRANSLATION
//     // ==================================================

//     if (translation.trim()) {

//       formData.append(
//         "translation",
//         translation
//       );

//     }


//     // ==================================================
//     // PRODUCT
//     // ==================================================

//     if (productType) {

//       formData.append(
//         "productType",
//         productType
//       );

//     }


//     if (productName.trim()) {

//       formData.append(
//         "productName",
//         productName
//       );

//     }


//     if (productSerial.trim()) {

//       formData.append(
//         "productSerial",
//         productSerial
//       );

//     }


//     // ==================================================
//     // EVENT
//     // ==================================================

//     if (eventType) {

//       formData.append(
//         "eventType",
//         eventType
//       );

//     }


//     if (eventName) {

//       formData.append(
//         "eventName",
//         eventName
//       );

//     }


//     // ==================================================
//     // PRODUCTION LINE
//     // ==================================================

//     if (productionLine) {

//       formData.append(
//         "productionLine",
//         productionLine
//       );

//     }


//     // ==================================================
//     // HYMN
//     // ==================================================

//     if (hymnName) {

//       formData.append(
//         "hymnName",
//         hymnName
//       );

//     }


//     // ==================================================
//     // SPEAKER
//     // ==================================================

//     if (speakerName) {

//       formData.append(
//         "speakerName",
//         speakerName
//       );

//     }


//     // ==================================================
//     // REPEATED
//     // ==================================================

//     formData.append(
//       "isRepeated",
//       String(isRepeated)
//     );


//     if (repeatType) {

//       formData.append(
//         "repeatType",
//         repeatType
//       );

//     }





//     if (youtubeLink.trim()) {

//       formData.append(
//         "youtubeLink",
//         youtubeLink
//       );

//     }


//     if (facebookLink.trim()) {

//       formData.append(
//         "facebookLink",
//         facebookLink
//       );

//     }


//     if (instagramLink.trim()) {

//       formData.append(
//         "instagramLink",
//         instagramLink
//       );

//     }


//     // ==================================================
//     // CHANNEL
//     // ==================================================

//     formData.append(
//       "channelName",
//       channelName
//     );

//     // ==================================================
//     // CONTENT
//     // ==================================================

//     formData.append("content1", content1);
//     formData.append("content2", content2);
//     formData.append("content3", content3);
//     formData.append("content4", content4);
//     formData.append("content5", content5);

//     // ==================================================
//     // VIDEO INFORMATION
//     // ==================================================

//     formData.append(
//       "duration",
//       videoDuration
//     );


//     // ==================================================
//     // VIDEO FILE
//     // ==================================================

//     if (videoFile) {
//       formData.append(
//         "videoFile",
//         videoFile
//       );
//     }


//     // ==================================================
//     // THUMBNAIL
//     // ==================================================

//     if (thumbnailFile) {

//       formData.append(
//         "thumbnailFile",
//         thumbnailFile
//       );

//     }


//     // ==================================================
//     // SEND TO BACKEND
//     // ==================================================

//     try {

//       // ==================================================
//       // UPDATE EVENT NAME
//       // ==================================================
//       // Existing Event -> PATCH the same Code.
//       // New Event -> it is created separately by the Add button.
//       if (
//         eventName &&
//         eventNameText.trim() &&
//         eventNameText.trim() !== originalEventNameText.trim()
//       ) {
//           await updateEvent({
//             code: Number(eventName),
//             DescA: eventNameText.trim(),
//           }).unwrap();

//           setOriginalEventNameText(eventNameText.trim());
//         }

      
//       if (isAdmin) {
//         const result = await adminUpdateVideo({ code, formData }).unwrap();
//         console.log("Video updated By Admin:", result);
//       } else {
//         const result = await updateVideo({ code, formData }).unwrap();
//         console.log("Video updated:", result);
//       }


//       // const result =
//       //   await updateVideo({
//       //     code,
//       //     formData,
//       //   }).unwrap();


//       // console.log(
//       //   "Video updated:",
//       //   result
//       // );


//       toast.success("تم تحديث الفيديو بنجاح.");

//       router.push("/videos");

//     }

//     catch (error: unknown) {

//       // console.error(
//       //   "Update Draft Videos Error:",
//       //   error
//       // );

//       console.log(formData)

//       console.log(error)


//       const message = getApiErrorMessage(
//         error,
//         "حدث خطأ أثناء تحديث الفيديو.",
//       );


//       toast.error(message);

//     }

//   };

//   // ==================================================
//   // SUBMIT VIDEO
//   // ==================================================

//   const handleSubmit = async () => {

//     if (!canEdit) {
//       setError("ليس لديك صلاحية لتقديم هذا الفيديو.");
//       return;
//     }

//     setError("");

//     try {
//       await submitVideo(code).unwrap();

//       toast.success("تم تقديم الفيديو للمراجعة بنجاح.");

//       router.push("/videos");
//     } catch (error: unknown) {
//       // console.error(
//       //   "Submit video error:",
//       //   error
//       // );

//       const message = getApiErrorMessage(
//         error,
//         "حدث خطأ أثناء تقديم الفيديو.",
//       );

//       toast.error(message);
//     }
//   };

//   // ==================================================
//   // DELETE VIDEO
//   // ==================================================

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeletingVideo, setIsDeletingVideo] = useState(false);

//   const handleDelete = async () => {
//     if (!canDelete) {
//       setError("ليس لديك صلاحية لحذف هذا الفيديو.");
//       return;
//     }

//     setError("");
//     setIsDeletingVideo(true);

//     try {
//       await deleteVideo(code).unwrap();

//       toast.success("تم حذف الفيديو بنجاح.");
//       setShowDeleteModal(false);
//       router.push("/videos");
//     } catch (error: unknown) {
//       const message = getApiErrorMessage(
//         error,
//         "حدث خطأ أثناء حذف الفيديو.",
//       );

//       toast.error(message);
//     } finally {
//       setIsDeletingVideo(false);
//     }
//   };

//   // const handleDelete = async () => {
//   //   if (!canDelete) {
//   //     setError("ليس لديك صلاحية لحذف هذا الفيديو.");
//   //     return;
//   //   }

//   //   const confirmed = window.confirm(
//   //     "هل أنت متأكد من حذف هذا الفيديو؟\nلا يمكن التراجع عن هذه العملية."
//   //   );

//   //   if (!confirmed) return;

//   //   setError("");

//   //   try {
//   //     await deleteVideo(code).unwrap();

//   //     toast.success("تم حذف الفيديو بنجاح.");

//   //     router.push("/videos");
//   //   } catch (error: unknown) {

//   //     const message = getApiErrorMessage(
//   //       error,
//   //       "حدث خطأ أثناء حذف الفيديو.",
//   //     );

//   //     toast.error(message);
//   //   }
//   // };

//   if (authLoading || !isAuthenticated || isVideoLoading) {
//     return (
//       <main dir="rtl" className="mx-auto w-full max-w-300 px-5 py-17.5">
//         <div className="rounded-[14px] border border-[#e6eaf0] bg-white p-8 text-center text-sm text-[#718096]">
//           جاري تحميل بيانات الفيديو...
//         </div>
//       </main>
//     );
//   }

//   if (isVideoError || !video) {
//     return (
//       <main dir="rtl" className="mx-auto w-full max-w-300 px-5 py-17.5">
//         <div className="rounded-[14px] border border-red-100 bg-red-50 p-8 text-center text-sm text-red-700">
//           {getApiErrorMessage(videoError, "تعذر تحميل بيانات الفيديو.")}
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main
//       dir="rtl"
//       className="
//         mx-auto
//         w-full
//         max-w-400
//         py-10
       
//       "
//     >
//       {/* ==================================================
//           PAGE HEADING
//           ================================================== */}

//       <div
//         className="
//           mb-6.25
//           flex
//           items-center
//           justify-between
//           gap-5
//           max-[600px]:flex-col
//           max-[600px]:items-start
//         "
//       >
//         <div>
//           <div className="flex items-center gap-3">
//             <h2 className="mb-1 text-2xl font-bold text-[#172033]">
//               تعديل الفيديو
//             </h2>

//             {video.RecordStatus === "DRAFT" && (
//               <span
//                 className="
//                   inline-flex
//                   items-center
//                   rounded-full
//                   border
//                   border-amber-200
//                   bg-amber-50
//                   px-3
//                   py-1
//                   text-[11px]
//                   font-semibold
//                   text-amber-700
//                 "
//               >
//                 مسودة
//               </span>
//             )}
//           </div>

//           <p className="text-[13px] text-[#718096]">
//             تعديل بيانات الفيديو وإدارة ملفاته داخل أرشيف الفيديوهات
//           </p>
//         </div>

//         <div className="flex items-center gap-2.5">
//           <button
//             type="button"
//             onClick={() => {
//               if (hasUnsavedChanges) {
//                 setPendingNavigation("/videos/add");
//                 setShowUnsavedModal(true);
//                 return;
//               }

//               router.push("/videos/add");
//             }}
//             // onClick={() => router.push("/videos/add")}
//             className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
//           >
//             <Plus size={16} />
//             جديد
//           </button>

//           {canDelete && (
//             <button
//               type="button"
//               // onClick={handleDelete}
//               onClick={() => setShowDeleteModal(true)}
//               disabled={isSaving || isSubmitting || isDeleting}
//               className="
//                 inline-flex h-10 items-center justify-center gap-2
//                 rounded-[9px] border border-red-200 bg-white px-4
//                 text-xs font-semibold text-red-600 transition
//                 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60
//               "
//             >
//               <Trash2 size={16} />
//               {isDeleting ? "جاري الحذف..." : "حذف"}
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={isSaving || isSubmitting || isDeleting || !canEdit || !hasUnsavedChanges}
//             className="
//               inline-flex
//               h-10
//               items-center
//               justify-center
//               gap-2
//               rounded-[9px]
//               bg-[#2563eb]
//               px-4
//               text-xs
//               font-semibold
//               text-white
//               transition
//               hover:bg-[#1d4ed8]
//               disabled:cursor-not-allowed
//               disabled:opacity-60
//             "
//           >
//             <Save size={16} />
//             {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
//           </button>

//           {video.RecordStatus === "DRAFT" && canEdit && (
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isSaving || isSubmitting || isDeleting || !canEdit}
//               className="
//                 inline-flex
//                 h-10
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-[9px]
//                 bg-emerald-600
//                 px-4
//                 text-xs
//                 font-semibold
//                 text-white
//                 transition
//                 hover:bg-emerald-700
//                 disabled:cursor-not-allowed
//                 disabled:opacity-60
//               "
//             >
//               <Share2 size={16} />
//               {isSubmitting ? "جاري التقديم..." : "تقديم"}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ==================================================
//           ERROR
//           ================================================== */}

//       {error && (
//         <div
//           className="
//             mb-5
//             rounded-[9px]
//             border
//             border-red-200
//             bg-red-50
//             px-4
//             py-3
//             text-xs
//             leading-7
//             text-red-700
//           "
//         >
//           {error}
//         </div>
//       )}

//       {/* ==================================================
//           VIDEO INFORMATION
//           ================================================== */}

//       <section
//         className="
//           mb-5.5
//           overflow-hidden
//           rounded-[14px]
//           border
//           border-[#e6eaf0]
//           bg-white
//           shadow-[0_5px_20px_rgba(15,23,42,0.035)]
//         "
//       >
//         {/* HEADER */}

//         <div
//           className="
//             flex
//             items-center
//             justify-between
//             border-b
//             border-[#e6eaf0]
//             px-6
//             py-5
//             max-[600px]:px-4
//           "
//         >
//           {/* Left side: Video icon + title */}
//           <div className="flex items-center gap-3 flex-1">
//             <div
//               className="
//                 flex
//                 h-9.5
//                 w-9.5
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-[10px]
//                 bg-[#eef2ff]
//                 text-[#4f46e5]
//               "
//             >
//               <Video size={20} />
//             </div>

//             <div>
//               <h3 className="text-[15px] font-bold text-[#172033]">
//                 بيانات الفيديو
//               </h3>

//               <span className="mt-0.5 block text-[11px] text-[#718096]">
//                 المعلومات الأساسية للفيديو
//               </span>
//             </div>
//           </div>

//           {/* Right side: Layout Options */}
//           <div className="hidden md:flex items-center gap-1 shrink-0">
//             {/* 3 Columns */}
//             <button
//               type="button"
//               onClick={() => changeFormLayout("grid3")}
//               title="ثلاثة أعمدة"
//               className={`p-1.5 rounded-md transition ${
//                 formLayout === "grid3"
//                   ? "bg-[#EEF4FF] text-[#2563EB]"
//                   : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
//               }`}
//             >
//               <Grid3X3 size={17} />
//             </button>

//             {/* 2 Columns */}
//             <button
//               type="button"
//               onClick={() => changeFormLayout("grid2")}
//               title="عمودين"
//               className={`p-1.5 rounded-md transition ${
//                 formLayout === "grid2"
//                   ? "bg-[#EEF4FF] text-[#2563EB]"
//                   : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
//               }`}
//             >
//               <Grid2X2 size={17} />
//             </button>

//             {/* Full Width */}
//             <button
//               type="button"
//               onClick={() => changeFormLayout("full")}
//               title="عرض كامل"
//               className={`p-1.5 rounded-md transition ${
//                 formLayout === "full"
//                   ? "bg-[#EEF4FF] text-[#2563EB]"
//                   : "text-[#718096] hover:bg-[#F5F7FA] hover:text-[#2563EB]"
//               }`}
//             >
//               <Rows3 size={17} />
//             </button>
//           </div>
//         </div>

//         {/* BODY */}

//         <div className="p-6.25 max-[600px]:p-4">
//           <div
//             className={`
//             grid gap-5
//             ${
//               formLayout === "grid3"
//                 ? "grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
//                 : formLayout === "grid2"
//                 ? "grid-cols-2 max-[600px]:grid-cols-1"
//                 : "grid-cols-1"
//             }
//           `}>
//             {/* ==================================================
//                 1. التاريخ
//                 ================================================== */}

//             <FormGroup label="التاريخ" required>
//               <InputWrapper icon={<Calendar size={16} />}>
//                 <div
//                   className={`${inputClass} relative w-full cursor-pointer`}
//                   onClick={openDatePicker}
                  
//                 >
//                   {/* Arabic value */}
//                   <div
//                     className="
//                       pointer-events-none
//                       flex
//                       h-full
//                       w-full
//                       items-center
//                       overflow-hidden
//                       whitespace-nowrap
//                       text-[13px]
//                       text-[#172033]
//                     "
//                   >
//                     {date ?
//                       getArabicDayName(date)
//                       : "اختر التاريخ"}
//                   </div>

//                   {/* Native picker */}
//                   <input
//                     ref={dateInputRef}
//                     type="datetime-local"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     disabled={isLocked}
//                     className="
//                       absolute
//                       inset-0
//                       h-full
//                       w-full
//                       cursor-pointer
//                       opacity-0
//                     "
//                     tabIndex={-1}
//                   />
//                 </div>
//               </InputWrapper>
//             </FormGroup>

            
            
//             {/* ==================================================
//                 2. الصنف
//                 ================================================== */}

//             <FormGroup label="الصنف" required>
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Folder size={16} />}
//                 onAdd={() => console.log("إختر الصنف")}
//                 disabled={isLocked || itemsIsLoading}
//               >
//                 <select
//                   value={item}
//                   onChange={(e) => setItem(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || itemsIsLoading}
//                 >
//                   <option value="">
//                     {itemsIsLoading
//                       ? "جاري تحميل الاصناف ..."
//                       : "اختر الصنف"}
//                   </option>

//                   {items.map((item) => (
//                     <option
//                       key={item.Code}
//                       value={item.Code}
//                     >
//                       {item.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>

//             {/* ==================================================
//                 3. جهة انتاج 1
//                 ================================================== */}

//             <FormGroup label="جهة انتاج 1" required>
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Building2 size={16} />}
//                 onAdd={() => console.log("إضافة جهة إنتاج 1")}
//                 disabled={isLocked || productEntitiesOneIsLoading}
//               >
//                 <select
//                   value={production1}
//                   onChange={(e) => setProduction1(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || productEntitiesOneIsLoading}
//                 >
//                   <option value="">
//                     {productEntitiesOneIsLoading
//                       ? "جاري تحميل جهة الانتاج..."
//                       : "اختر جهة الانتاج"}
//                   </option>

//                   {productEntitiesOne.map((productEntityOne) => (
//                     <option
//                       key={productEntityOne.Code}
//                       value={productEntityOne.Code}
//                     >
//                       {productEntityOne.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>

//             {/* ==================================================
//                 4. جهة انتاج 2
//                 ================================================== */}

//             <FormGroup label="جهة انتاج 2">
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Building2 size={16} />}
//                 onAdd={() => console.log("إضافة جهة إنتاج 2")}
//                 disabled={isLocked || productEntitiesTwoIsLoading}
//               >

//                 <select
//                   value={production2}
//                   onChange={(e) => setProduction2(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || productEntitiesTwoIsLoading}
//                 >
//                   <option value="">
//                     {productEntitiesTwoIsLoading
//                       ? "جاري تحميل جهة الانتاج..."
//                       : "اختر جهة الانتاج"}
//                   </option>

//                   {productEntitiesTwo.map((productEntityTwo) => (
//                     <option
//                       key={productEntityTwo.Code}
//                       value={productEntityTwo.Code}
//                     >
//                       {productEntityTwo.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>

//             {/* ==================================================
//                 5. القطاع
//                 ================================================== */}

//             <FormGroup label="القطاع" required>
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Layers size={16} />}
//                 onAdd={() => console.log("إضافة قطاع")}
//                 disabled={isLocked || sectorsIsLoading }
//               >
//                 <select
//                   value={sector}
//                   onChange={(e) => setSector(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || sectorsIsLoading}
//                 >
//                   <option value="">
//                     {sectorsIsLoading
//                       ? "جاري تحميل القطاعات..."
//                       : "اختر القطاعات "}
//                   </option>

//                   {sectors.map((sector) => (
//                     <option
//                       key={sector.Code}
//                       value={sector.Code}
//                     >
//                       {sector.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>

//             {/* ==================================================
//                 6. الترجمه
//                 ================================================== */}

//             <FormGroup label="الترجمه">
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Languages size={16} />}
//                 onAdd={() => console.log("إضافة ترجمه")}
//                 disabled={isLocked || translationsIsLoading}
//               >

//                 <select
//                   value={translation}
//                   onChange={(e) => setTranslation(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || translationsIsLoading}
//                 >
//                   <option value="">
//                     {translationsIsLoading
//                       ? "جاري تحميل الترجمات ..."
//                       : "اختر ترجمه للمنتج"}
//                   </option>

//                   {translations.map((translation) => (
//                     <option
//                       key={translation.Code}
//                       value={translation.Code}
//                     >
//                       {translation.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>

           
        

//             {/* ==================================================
//                 7. نوع المنتج
//                 ================================================== */}

//             <FormGroup label="نوع المنتج">
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Package size={16} />}
//                 onAdd={() => console.log("إضافة نوع منتج")}
//                 disabled={isLocked || itemsTypeIsLoading}
//               >
//                 <select
//                   value={productType}
//                   onChange={(e) => setProductType(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || itemsTypeIsLoading}
//                 >
//                   <option value="">
//                     {itemsTypeIsLoading
//                       ? "جاري تحميل أنواع المنتجات..."
//                       : "اختر نوع المنتج"}
//                   </option>

//                   {itemsType.map((itemType) => (
//                     <option
//                       key={itemType.Code}
//                       value={itemType.Code}
//                     >
//                       {itemType.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>

//             {/* ==================================================
//                 8. نوع الحدث
//                 ================================================== */}

//             <FormGroup label="نوع الحدث">
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<CalendarDays size={16} />}
//                 onAdd={() => console.log("إضافة نوع حدث")}
//                 disabled={isLocked || eventTypesIsLoading}
//               >

//                 <select
//                   value={eventType}
//                   onChange={(e) => setEventType(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || eventTypesIsLoading}
//                 >
//                   <option value="">
//                     {eventTypesIsLoading
//                       ? "جاري تحميل أنواع الاحداث..."
//                       : "اختر نوع الحدث"}
//                   </option>

//                   {eventTypes.map((eventType) => (
//                     <option
//                       key={eventType.Code}
//                       value={eventType.Code}
//                     >
//                       {eventType.DescA}
//                     </option>
//                   ))}</select>
//               </SelectWrapper>
//             </FormGroup>

//             {/* ==================================================
//                 9. خط الانتاج
//                 ================================================== */}

//             <FormGroup label="خط الانتاج">
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Workflow size={16} />}
//                 onAdd={() => console.log("إضافة خط إنتاج")}
//                 disabled={isLocked || productionLinesIsLoading}
//               >
//                 <select
//                   value={productionLine}
//                   onChange={(e) => setProductionLine(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || productionLinesIsLoading}
//                 >
//                   <option value="">
//                     {productionLinesIsLoading
//                       ? "جاري تحميل خطوط الانتاج..."
//                       : "اختر خط إنتاج"}
//                   </option>

//                   {productionLines.map((productionLine) => (
//                     <option
//                       key={productionLine.Code}
//                       value={productionLine.Code}
//                     >
//                       {productionLine.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>

//             {/* ==================================================
//                 10. اسم المنتج
//                 ================================================== */}

//             <FormGroup label="اسم المنتج" required>
//               <InputWrapper
//                 icon={<Package size={16} />}
//               >
//                 <input
//                   type="text"
//                   value={productName}
//                   onChange={(e) =>
//                     setProductName(e.target.value)
//                   }
//                   placeholder="اسم المنتج"
//                   className={inputClass}
//                   disabled={isLocked}
//                 />
//               </InputWrapper>
//             </FormGroup>


//             {/* ==================================================
//                 11. تسلسل المنتج
//                 ================================================== */}

//             <FormGroup label="تسلسل المنتج">
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<ListOrdered size={16} />}
//                 onAdd={() => console.log("إضافة تسلسل")}
//                 disabled={isLocked || eventsIsLoading}
//               >

//                 <select
//                   value={productSerial}
//                   onChange={(e) => setProductSerial(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || eventsIsLoading}
//                 >
//                   <option value="">
//                     {itemsSerIsLoading
//                       ? "جاري تحميل التسلسل ..."
//                       : "اختر تسلسل للمنتج"}
//                   </option>

//                   {itemsSer.map((itemSer) => (
//                     <option
//                       key={itemSer.Code}
//                       value={itemSer.Code}
//                     >
//                       {itemSer.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>


//             {/* ==================================================
//                 حالة الحدث + اسم الحدث
//               ================================================== */}

//             <div
//               className="
//                 col-span-1
//                 grid
//                 grid-cols-[0.65fr_1.35fr]
//                 items-end
//                 gap-5
//                 max-[600px]:grid-cols-1
//               "
//             >
//               {/* =========================================
//                   حالة الحدث
//                   ========================================= */}

//               <FormGroup label="حالة الحدث">
//                 <div
//                   className="
//                     flex
//                     h-11
//                     w-full
//                     items-center
//                     justify-between
//                     rounded-[9px]
//                     border
//                     border-[#dfe5ed]
//                     bg-[#fbfcfe]
//                     px-3
//                   "
//                 >
//                   {/* النص */}
//                   <span
//                     className={`
//                       text-xs
//                       font-medium
//                       transition-colors
//                       ${
//                         isRepeated
//                           ? "text-[#2563eb]"
//                           : "text-[#718096]"
//                       }
//                     `}
//                   >
//                     {isRepeated ? "مكرر" : "غير مكرر"}
//                   </span>

//                   {/* Toggle */}
//                   <label
//                     className="
//                       relative
//                       inline-flex
//                       h-5
//                       w-9
//                       shrink-0
//                       cursor-pointer
//                       items-center
//                     "
//                   >
//                     <input
//                       type="checkbox"
//                       checked={isRepeated}
//                       disabled={isLocked || eventsIsLoading}
//                       onChange={(e) => {
//                         const checked = e.target.checked;

//                         setIsRepeated(checked);

//                         // مسح اسم الحدث عند تغيير الحالة
//                         setEventName("");
//                         setEventNameText("");
//                         setShowEventSuggestions(false);
//                       }}
//                       className="peer sr-only"
//                     />

//                     {/* Toggle Background */}
//                     <span
//                       className="
//                         absolute
//                         inset-0
//                         rounded-full
//                         bg-[#cbd5e1]
//                         transition-all
//                         duration-200
//                         peer-checked:bg-[#2563eb]
//                         peer-focus:ring-2
//                         peer-focus:ring-blue-500/20
//                       "
//                     />

//                     {/* Toggle Circle */}
//                     <span
//                       className="
//                         absolute
//                         right-4.5
//                         top-0.5
//                         h-4
//                         w-4
//                         rounded-full
//                         bg-white
//                         shadow-sm
//                         transition-all
//                         duration-200
//                         peer-checked:right-0.5
//                       "
//                     />
//                   </label>
//                 </div>
//               </FormGroup>


//               {/* =========================================
//                   اسم الحدث
//                   ========================================= */}

//               <FormGroup label="اسم الحدث">

//                 {isRepeated ? (

//                   /* =========================================
//                     مكرر → Dropdown
//                     ========================================= */

//                   <SelectWrapper
//                     icon={<CalendarDays size={16} />}
//                   >
//                     <select
//                       value={eventName}
//                       onChange={(e) => {
//                         setEventName(e.target.value);
//                       }}
//                       className={selectClass}
//                       disabled={isLocked || eventsIsLoading}
//                     >
//                       <option value="">
//                         {eventsIsLoading
//                           ? "جاري تحميل الأحداث..."
//                           : "اختر الحدث المكرر"}
//                       </option>

//                       {events.map((event) => (
//                         <option
//                           key={event.Code}
//                           value={event.Code}
//                         >
//                           {event.DescA}
//                         </option>
//                       ))}
//                     </select>
//                   </SelectWrapper>

//                 ) : (

//                   /* =========================================
//                     غير مكرر → Autocomplete TextBox
//                     ========================================= */

//                   <div className="relative w-full">

//                     <InputWrapper icon={<CalendarDays size={16} />}>

//                       <input
//                         type="text"
//                         value={eventNameText}

//                         onChange={(e) => {
//                           const value = e.target.value;

//                           setEventNameText(value);

//                           // Keep the existing Event Code while editing.
//                           // If the name changes, handleSave() will PATCH
//                           // the same Event instead of creating a new one.
//                           setShowEventSuggestions(
//                             value.trim().length > 0
//                           );
//                         }}

//                         onFocus={() => {
//                           if (eventNameText.trim()) {
//                             setShowEventSuggestions(true);
//                           }
//                         }}

//                         onBlur={() => {
//                           setTimeout(() => {
//                             setShowEventSuggestions(false);
//                           }, 150);
//                         }}

//                         placeholder="اكتب اسم الحدث"
//                         className={inputClass}
//                         disabled={isLocked}
//                       />

//                     </InputWrapper>


//                     {/* =========================================
//                         AUTOCOMPLETE
//                         ========================================= */}

//                     {showEventSuggestions && eventNameText.trim() && (

//                       <div
//                         className="
//                           absolute
//                           right-0
//                           left-0
//                           top-[calc(100%+6px)]
//                           z-50
//                           overflow-hidden
//                           rounded-[9px]
//                           border
//                           border-[#e6eaf0]
//                           bg-white
//                           shadow-[0_10px_30px_rgba(15,23,42,0.10)]
//                         "
//                       >

//                         {filteredEvents.length > 0 ? (

//                           /* =====================================
//                             نتائج موجودة
//                             ===================================== */

//                           <div className="max-h-55 overflow-y-auto py-1">

//                             {filteredEvents.map((event) => (

//                               <button
//                                 key={event.Code}
//                                 type="button"

//                                 onMouseDown={(e) => {
//                                   e.preventDefault();

//                                   setEventNameText(event.DescA);
//                                   setEventName(String(event.Code));

//                                   // مهم لمعرفة هل الاسم اتغير بعد كده
//                                   setOriginalEventNameText(event.DescA);

//                                   setShowEventSuggestions(false);
//                                 }}

//                                 className="
//                                   flex
//                                   w-full
//                                   items-center
//                                   gap-2
//                                   px-3
//                                   py-2.5
//                                   text-right
//                                   text-xs
//                                   text-[#334155]
//                                   transition
//                                   hover:bg-[#f5f8ff]
//                                   hover:text-[#2563eb]
//                                 "
//                               >

//                                 <CalendarDays
//                                   size={14}
//                                   className="shrink-0 text-[#94a3b8]"
//                                 />

//                                 <span className="truncate">
//                                   {event.DescA}
//                                 </span>

//                               </button>

//                             ))}

//                           </div>

//                         ) : (

//                           /* =====================================
//                             لا يوجد → إضافة جديدة
//                             ===================================== */


//                             <div className="p-3">

//                               <div className="mb-2 text-[11px] text-[#718096]">
//                                 {eventName
//                                   ? "تم تعديل اسم الحدث"
//                                   : "لا يوجد حدث مطابق"}
//                               </div>

//                               <button
//                                 type="button"
//                                 disabled={isAddingEvent || isUpdatingEvent}
//                                 onMouseDown={(e) => {
//                                   e.preventDefault();
//                                 }}
//                                 onClick={async () => {

//                                   const value = eventNameText.trim();

//                                   if (!value) return;

//                                   try {

//                                     // =========================================
//                                     // EDIT EXISTING EVENT
//                                     // =========================================
//                                     if (eventName) {

//                                       await updateEvent({
//                                         code: Number(eventName),
//                                         DescA: value,
//                                       }).unwrap();

//                                       setOriginalEventNameText(value);
//                                       setEventNameText(value);
//                                       setShowEventSuggestions(false);

//                                       await refetchEvents();

//                                       toast.success("تم تعديل الحدث بنجاح");

//                                       return;
//                                     }

//                                     // =========================================
//                                     // ADD NEW EVENT
//                                     // =========================================

//                                     const result = await addEvent({
//                                       DescA: value,
//                                     }).unwrap();

//                                     const newCode =
//                                       result?.Code ??
//                                       result?.data?.Code;

//                                     if (!newCode) {
//                                       toast.error(
//                                         "تمت إضافة الحدث ولكن لم يتم إرجاع الكود"
//                                       );
//                                       return;
//                                     }

//                                     setEventName(String(newCode));
//                                     setEventNameText(value);
//                                     setOriginalEventNameText(value);
//                                     setShowEventSuggestions(false);

//                                     await refetchEvents();

//                                     toast.success("تمت إضافة الحدث بنجاح");

//                                   } catch (error: unknown) {

//                                     console.error("Event Error:", error);

//                                     toast.error(
//                                       getApiErrorMessage(
//                                         error,
//                                         "حدث خطأ أثناء حفظ الحدث",
//                                       ),
//                                     );
//                                   }
//                                 }}
//                                 className="
//                                   flex
//                                   h-9
//                                   w-full
//                                   items-center
//                                   justify-center
//                                   gap-2
//                                   rounded-lg
//                                   bg-[#2563eb]
//                                   px-3
//                                   text-xs
//                                   font-semibold
//                                   text-white
//                                   transition
//                                   hover:bg-[#1d4ed8]
//                                   active:scale-[0.98]
//                                   disabled:cursor-not-allowed
//                                   disabled:opacity-50
//                                 "
//                               >

//                                 {eventName ? (
//                                   <>
//                                     <Pencil size={15} />

//                                     {isUpdatingEvent
//                                       ? "جاري التعديل..."
//                                       : `تعديل "${eventNameText.trim()}"`}
//                                   </>
//                                 ) : (
//                                   <>
//                                     <Plus size={15} />

//                                     {isAddingEvent
//                                       ? "جاري الإضافة..."
//                                       : `إضافة "${eventNameText.trim()}"`}
//                                   </>
//                                 )}

//                               </button>

//                             </div>
//                           )}

//                       </div>

//                     )}

//                   </div>
//                 )}

//               </FormGroup>
              
//             </div>

            

//             {/* ==================================================
//                 13. اسم الترنيمه
//                 ================================================== */}

//             <FormGroup label="اسم الترنيمه">
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Music2 size={16} />}
//                 onAdd={() => console.log("إضافة ترنيمة")}
//                 disabled={isLocked || songsIsLoading}
//               >

//                 <select
//                   value={hymnName}
//                   onChange={(e) => setHymnName(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || songsIsLoading}
//                 >
//                   <option value="">
//                     {songsIsLoading
//                       ? "جاري تحميل الترانيم..."
//                       : "اختر ترنيمه"}
//                   </option>

//                   {songs.map((song) => (
//                     <option
//                       key={song.Code}
//                       value={song.Code}
//                     >
//                       {song.DescA}
//                     </option>
//                   ))}
//                 </select>
//               </SelectWrapper>
//             </FormGroup>

//             {/* ==================================================
//                 14. اسم المتكلم
//                 ================================================== */}

//             <FormGroup label="اسم المتكلم">
//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<User size={16} />}
//                 onAdd={() => console.log("إضافة متكلم")}
//                  disabled={isLocked || speakersIsLoading}
//               >

//                 <select
//                   value={speakerName}
//                   onChange={(e) => setSpeakerName(e.target.value)}
//                   className={selectClass}
//                   disabled={isLocked || speakersIsLoading}
//                 >
//                   <option value="">
//                     {speakersIsLoading
//                       ? "جاري تحميل القائمين ع العمل..."
//                       : "اختر متكلم"}
//                   </option>

//                   {speakers.map((speaker) => (
//                     <option
//                       key={speaker.Code}
//                       value={speaker.Code}
//                     >
//                       {speaker.DescA}
//                     </option>
//                   ))}
//                 </select>

//               </SelectWrapper>
//             </FormGroup>

//             {isAdmin && (
//               <FormGroup label="نوع المحتوى">
//                 <SelectWrapper
//                   icon={<Layers size={16} />}
//                 >
//                   <select
//                     value={contentType}
//                     onChange={(e) => setContentType(e.target.value)}
//                     className={selectClass}
//                     disabled={isLocked || contentTypesIsLoading}
//                   >
//                     <option value="">
//                       {contentTypesIsLoading
//                         ? "جاري تحميل أنواع المحتوى..."
//                         : "اختر نوع المحتوى"}
//                     </option>

//                     {contentTypes.map((contentType) => (
//                       <option
//                         key={contentType.Code}
//                         value={contentType.Code}
//                       >
//                         {contentType.DescA}
//                       </option>
//                     ))}
//                   </select>
//                 </SelectWrapper>
//               </FormGroup>
//             )}

//           </div>

          
//           <div className="mt-5">
//             <div
//               className="
//                 grid
//                 grid-cols-4
//                 gap-5
//                 max-[1100px]:grid-cols-2
//                 max-[600px]:grid-cols-1
//               "
//             >
//               {/* قناة / صفحة الرفع الرئيسية */}
//               <FormGroup label="قناة / صفحة الرفع الرئيسية">
//                 <SelectWrapper
//                   isAdmin={isAdmin}
//                   icon={<Video size={16} />}
//                   onAdd={() => console.log("إضافة قناة")}>

//                   <select
//                     value={channelName}
//                     onChange={(e) => setChannelName(e.target.value)}
//                     className={selectClass}
//                     disabled={isLocked || channelsIsLoading}
//                   >
//                     <option value="">
//                       {channelsIsLoading
//                         ? "جاري تحميل القنوات..."
//                         : "اختر قناة"}
//                     </option>

//                     {channels.map((channel) => (
//                       <option
//                         key={channel.Code}
//                         value={channel.Code}
//                       >
//                         {channel.DescA}
//                       </option>
//                     ))}
//                   </select>

//                 </SelectWrapper>
//               </FormGroup>

//               {/* YouTube */}

//               <FormGroup label="رابط YouTube">
//                 <InputWrapper icon={<Video size={16} />}>
//                   <input
//                     type="url"
//                     value={youtubeLink}
//                     onChange={(e) =>
//                       setYoutubeLink(e.target.value)
//                     }
//                     placeholder="رابط YouTube"
//                     className={inputClass}
//                    disabled={isLocked}
//                   />
//                 </InputWrapper>
//               </FormGroup>

//               {/* Facebook */}

//               <FormGroup label="رابط Facebook">
//                 <InputWrapper icon={<Share2  size={16} />}>
//                   <input
//                     type="url"
//                     value={facebookLink}
//                     onChange={(e) =>
//                       setFacebookLink(e.target.value)
//                     }
//                     placeholder="رابط Facebook"
//                     className={inputClass}
//                    disabled={isLocked}
//                   />
//                 </InputWrapper>
//               </FormGroup>

//               {/* Instagram */}

//               <FormGroup label="رابط Instagram">
//                 <InputWrapper icon={<Globe2  size={16} />}>
//                   <input
//                     type="url"
//                     value={instagramLink}
//                     onChange={(e) =>
//                       setInstagramLink(e.target.value)
//                     }
//                     placeholder="رابط Instagram"
//                     className={inputClass}
//                    disabled={isLocked}
//                   />
//                 </InputWrapper>
//               </FormGroup>
//             </div>

//             {youtubeLink.trim() &&
//               facebookLink.trim() &&
//               instagramLink.trim() && (
//                 <div className="mt-4">
//                   <div className="mb-2 text-[11px] font-semibold text-[#718096]">
//                     روابط النشر
//                   </div>

//                   <div
//                     className="
//                       grid
//                       grid-cols-3
//                       gap-3
//                       max-[600px]:grid-cols-1
//                     "
//                   >
//                     <a
//                       href={youtubeLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="
//                         flex h-10 items-center justify-center gap-2 rounded-[9px]
//                         border border-red-200 bg-white px-3 text-xs font-semibold text-red-600
//                         transition hover:bg-red-50
//                       "
//                     >
//                       <Video size={15} />
//                       فتح YouTube
//                     </a>

//                     <a
//                       href={facebookLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="
//                         flex h-10 items-center justify-center gap-2 rounded-[9px]
//                         border border-blue-200 bg-white px-3 text-xs font-semibold text-blue-600
//                         transition hover:bg-blue-50
//                       "
//                     >
//                       <Share2 size={15} />
//                       فتح Facebook
//                     </a>

//                     <a
//                       href={instagramLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="
//                         flex h-10 items-center justify-center gap-2 rounded-[9px]
//                         border border-pink-200 bg-white px-3 text-xs font-semibold text-pink-600
//                         transition hover:bg-pink-50
//                       "
//                     >
//                       <Globe2 size={15} />
//                       فتح Instagram
//                     </a>
//                   </div>
//                 </div>
//               )}
//           </div>




//         </div>
//       </section>

//       {/* ==================================================
//           محتوى المنتج
//           ================================================== */}

//       <section
//         className="
//           mt-5
//           overflow-hidden
//           rounded-[14px]
//           border
//           border-[#e6eaf0]
//           bg-white
//           shadow-[0_5px_20px_rgba(15,23,42,0.035)]
//         "
//       >
//         {/* Header */}

//         <div
//           className="
//             flex
//             items-center
//             gap-3
//             border-b
//             border-[#e6eaf0]
//             px-6
//             py-4
//             max-[600px]:px-4
//           "
//         >
//           <div
//             className="
//               flex
//               h-9.5
//               w-9.5
//               items-center
//               justify-center
//               rounded-[10px]
//               bg-[#eef2ff]
//               text-[#4f46e5]
//             "
//           >
//             <Package size={19} />
//           </div>

//           <div>
//             <h3 className="text-[15px] font-bold text-[#172033]">
//               محتوى المنتج
//             </h3>

//             <span className="mt-0.5 block text-[11px] text-[#718096]">
//               البيانات الأساسية لمحتوى المنتج
//             </span>
//           </div>
//         </div>

//         {/* Body */}

//         <div className="p-6 max-[600px]:p-4">
//           <div
//             className="
//               grid
//               grid-cols-5
//               gap-5
//               max-[1100px]:grid-cols-3
//               max-[700px]:grid-cols-2
//               max-[500px]:grid-cols-1
//             "
//           >
//             {/* Input 1 */}

//             <FormGroup label="المحتوى 1">
//               <InputWrapper icon={<Package size={16} />}>
//                 <input
//                   type="text"
//                   value={content1}
//                   onChange={(e) =>
//                     setContent1(e.target.value)
//                   }
//                   placeholder="المحتوى 1"
//                   className={inputClass}
//                    disabled={isLocked}
//                 />
//               </InputWrapper>
//             </FormGroup>

//             {/* Input 2 */}

//             <FormGroup label="المحتوى 2">
//               <InputWrapper icon={<Package size={16} />}>
//                 <input
//                   type="text"
//                   value={content2}
//                   onChange={(e) =>
//                     setContent2(e.target.value)
//                   }
//                   placeholder="المحتوى 2"
//                   className={inputClass}
//                    disabled={isLocked}
//                 />
//               </InputWrapper>
//             </FormGroup>

//             {/* Input 3 */}

//             <FormGroup label="المحتوى 3">
//               <InputWrapper icon={<Package size={16} />}>
//                 <input
//                   type="text"
//                   value={content3}
//                   onChange={(e) =>
//                     setContent3(e.target.value)
//                   }
//                   placeholder="المحتوى 3"
//                   className={inputClass}
//                    disabled={isLocked}
//                 />
//               </InputWrapper>
//             </FormGroup>

//             {/* Input 4 */}

//             <FormGroup label="المحتوى 4">
//               <InputWrapper icon={<Package size={16} />}>
//                 <input
//                   type="text"
//                   value={content4}
//                   onChange={(e) =>
//                     setContent4(e.target.value)
//                   }
//                   placeholder="المحتوى 4"
//                   className={inputClass}
//                    disabled={isLocked}
//                 />
//               </InputWrapper>
//             </FormGroup>

//             {/* Input 5 */}

//             <FormGroup label="المحتوى 5">
//               <InputWrapper icon={<Package size={16} />}>
//                 <input
//                   type="text"
//                   value={content5}
//                   onChange={(e) =>
//                     setContent5(e.target.value)
//                   }
//                   placeholder="المحتوى 5"
//                   className={inputClass}
//                    disabled={isLocked}
//                 />
//               </InputWrapper>
//             </FormGroup>
//           </div>
//         </div>
//       </section>

//       {/* ==================================================
//           VIDEO FILE
//           ================================================== */}

//       <section
//         className="
//           mb-5.5
//           overflow-hidden
//           rounded-[14px]
//           border
//           border-[#e6eaf0]
//           bg-white
//           shadow-[0_5px_20px_rgba(15,23,42,0.035)]
//         "
//       >
//         {/* HEADER */}

//         <div
//           className="
//             flex
//             min-h-19.5
//             items-center
//             justify-between
//             gap-3
//             border-b
//             border-[#e6eaf0]
//             px-6
//             py-5
//             max-[600px]:flex-col
//             max-[600px]:items-start
//             max-[600px]:px-4
//           "
//         >
//           <div className="flex items-center gap-3">
//             <div
//               className="
//                 flex
//                 h-9.5
//                 w-9.5
//                 items-center
//                 justify-center
//                 rounded-[10px]
//                 bg-red-50
//                 text-red-500
//               "
//             >
//               <FileVideo size={20} />
//             </div>

//             <div>
//               <h3 className="text-[15px] font-bold text-[#172033]">
//                 ملف الفيديو
//               </h3>

//               <span className="mt-0.5 block text-[11px] text-[#718096]">
//                 اختر ملف الفيديو المراد إضافته للأرشيف
//               </span>
//             </div>
//           </div>

//           <span className="text-xs text-[#718096]">
//             {videoFile
//               ? videoFile.name
//               : existingVideoFileName
//                 ? existingVideoFileName
//               : "لم يتم اختيار فيديو"}
//           </span>
//         </div>


//         {/* BODY */}
//         <div className="p-6 max-[600px]:p-4">
//           <input
//             ref={videoInputRef}
//             type="file"
//             accept="video/mp4,video/webm,video/ogg,.mkv,.avi,.mov"
//             onChange={handleVideoSelect}
//             disabled={isLocked}
//             hidden
//           />

//           {/* DRAG AND DROP ZONE */}
//           <div
//             onDragOver={(event) => {
//               event.preventDefault();

//               if (!isLocked) {
//                 setIsVideoDragging(true);
//               }
//             }}
//             onDragLeave={(event) => {
//               if (
//                 !event.currentTarget.contains(
//                   event.relatedTarget as Node
//                 )
//               ) {
//                 setIsVideoDragging(false);
//               }
//             }}
//             onDrop={handleVideoDrop}
//             className={`
//               rounded-xl border-2 border-dashed p-3 transition-colors
//               ${
//                 isVideoDragging
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-transparent"
//               }
//             `}
//           >
//             <div className="mb-3 text-center text-xs text-slate-500">
//               اسحب الفيديو من جهازك وأفلته هنا، أو اضغط لاختياره
//             </div>

//             {!videoFile && !existingVideoFileName ? (
//               <button
//                 type="button"
//                 onClick={() => videoInputRef.current?.click()}
//                 disabled={isLocked}
//                 className="
//                   flex min-h-57.5 w-full flex-col
//                   items-center justify-center rounded-xl
//                   border border-dashed border-[#cbd5e1]
//                   bg-[#f8fafc] px-5 text-center transition
//                   hover:border-blue-400 hover:bg-[#eff6ff]
//                   disabled:cursor-not-allowed disabled:opacity-60
//                 "
//               >
//                 <div
//                   className="
//                     mb-4 flex h-16 w-16 items-center justify-center
//                     rounded-full bg-[#dbeafe] text-[#2563eb]
//                   "
//                 >
//                   <UploadCloud size={30} />
//                 </div>

//                 <h3 className="mb-1 text-sm font-bold text-[#334155]">
//                   لم يتم اختيار ملف فيديو
//                 </h3>

//                 <p className="text-xs text-[#64748b]">
//                   اضغط هنا لاختيار الفيديو من جهازك
//                 </p>

//                 <span className="mt-3 text-[11px] text-[#94a3b8]">
//                   MP4 · WebM · MOV · AVI · MKV
//                 </span>
//               </button>
//             ) : (
//               <div className="overflow-hidden rounded-xl border border-[#e6eaf0] bg-[#0f172a]">
//                 <div className="flex min-h-62.5 items-center justify-center bg-black">
//                   <video
//                     src={videoUrl}
//                     controls
//                     className="max-h-125 w-full object-contain"
//                   />
//                 </div>

//                 <div
//                   className="
//                     flex items-center justify-between gap-4 bg-white p-4
//                     max-[600px]:flex-col max-[600px]:items-stretch
//                   "
//                 >
//                   <div className="flex min-w-0 items-center gap-3">
//                     <div
//                       className="
//                         flex h-11 w-11 shrink-0 items-center justify-center
//                         rounded-lg bg-red-50 text-red-500
//                       "
//                     >
//                       <FileVideo size={21} />
//                     </div>

//                     <div className="min-w-0">
//                       <div className="truncate text-sm font-semibold text-[#172033]">
//                         {videoFile
//                           ? videoFile.name
//                           : existingVideoFileName || "الفيديو الحالي"}
//                       </div>

//                       <div className="mt-1 flex gap-4 text-[11px] text-[#94a3b8]">
//                         {videoFile ? (
//                           <span>{formatFileSize(videoFile.size)}</span>
//                         ) : (
//                           existingVideoFileName && (
//                             <span>الفيديو الحالي</span>
//                           )
//                         )}

//                         {videoDuration && <span>{videoDuration}</span>}
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleRemoveVideo}
//                     disabled={isLocked}
//                     className="
//                       inline-flex h-9 shrink-0 items-center justify-center
//                       gap-2 rounded-lg border border-red-200 bg-white
//                       px-3 text-xs font-semibold text-red-500 transition
//                       hover:bg-red-50 disabled:cursor-not-allowed
//                       disabled:opacity-60
//                     "
//                   >
//                     <Trash2 size={15} />
//                     حذف الفيديو
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//       </section>

//       {/* ==================================================
//           صور تعريفية
//           ================================================== */}

//       <section
//         className="
//           mb-5.5
//           overflow-hidden
//           rounded-[14px]
//           border
//           border-[#e6eaf0]
//           bg-white
//           shadow-[0_5px_20px_rgba(15,23,42,0.035)]
//         "
//       >
//         <div
//           className="
//             flex
//             items-center
//             gap-3
//             border-b
//             border-[#e6eaf0]
//             px-6
//             py-5
//             max-[600px]:px-4
//           "
//         >
//           <div
//             className="
//               flex
//               h-9.5
//               w-9.5
//               items-center
//               justify-center
//               rounded-[10px]
//               bg-[#eff6ff]
//               text-[#2563eb]
//             "
//           >
//             <ImageIcon size={20} />
//           </div>

//           <div>
//             <h3 className="text-[15px] font-bold text-[#172033]">
//               صور تعريفية
//             </h3>

//             <span className="mt-0.5 block text-[11px] text-[#718096]">
//               صورة تعريفية تظهر أثناء تصفح أرشيف الفيديوهات
//             </span>
//           </div>
//         </div>

//         <div className="p-6 max-[600px]:p-4">
//           <input
//             ref={thumbnailInputRef}
//             type="file"
//             accept="image/png,image/jpeg,image/webp"
//             onChange={handleThumbnailSelect}
//             disabled={isLocked}
//             hidden
//           />

//           <div
//             className="
//               flex
//               items-center
//               gap-6
//               max-[600px]:flex-col
//               max-[600px]:items-stretch
//             "
//           >
//             <div
//               className="
//                 flex
//                 h-45
//                 w-70
//                 shrink-0
//                 items-center
//                 justify-center
//                 overflow-hidden
//                 rounded-xl
//                 border
//                 border-dashed
//                 border-[#cbd5e1]
//                 bg-[#f8fafc]
//                 max-[600px]:w-full
//               "
//             >
//               {thumbnailUrl ? (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img src={thumbnailUrl}  alt="Video thumbnail" className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
//                   <ImagePlus size={30} />

//                   <span className="text-xs">
//                     لم يتم اختيار صورة
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-wrap gap-2">
//               <button
//                 type="button"
//                 onClick={() =>
//                   thumbnailInputRef.current?.click()
//                 }
//                 disabled={isLocked}
//                 className="
//                   inline-flex
//                   h-10
//                   items-center
//                   justify-center
//                   gap-2
//                   rounded-[9px]
//                   border
//                   border-[#e6eaf0]
//                   bg-white
//                   px-4
//                   text-xs
//                   font-semibold
//                   text-[#4a5568]
//                   transition
//                   hover:bg-[#eff6ff]
//                   hover:text-[#2563eb]
//                 "
//               >
//                 <ImagePlus size={16} />
//                 اختيار صورة
//               </button>

//               {thumbnailFile && (
//                 <button
//                   type="button"
//                   onClick={handleRemoveThumbnail}
//                   disabled={isLocked}
//                   className="
//                     inline-flex
//                     h-10
//                     items-center
//                     justify-center
//                     gap-2
//                     rounded-[9px]
//                     border
//                     border-red-200
//                     bg-white
//                     px-4
//                     text-xs
//                     font-semibold
//                     text-red-500
//                     transition
//                     hover:bg-red-50
//                   "
//                 >
//                   <Trash2 size={16} />
//                   حذف الصورة
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>



//       {showUnsavedModal && (
//   <div
//     dir="rtl"
//     className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
//     onMouseDown={(e) => {
//       if (e.target === e.currentTarget) {
//         cancelNavigation();
//       }
//     }}
//   >
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="unsaved-title"
//       className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
//     >
//       <div className="flex items-start gap-4 p-6">
//         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
//           <AlertTriangle size={25} />
//         </div>

//         <div className="flex-1">
//           <h3
//             id="unsaved-title"
//             className="text-lg font-bold text-slate-900"
//           >
//             تعديلات غير محفوظة
//           </h3>

//           <p className="mt-2 text-sm leading-7 text-slate-600">
//             أنت أجريت تعديلات على بيانات الفيديو ولم تحفظها بعد.
//             هل تريد الخروج بدون حفظ التغييرات؟
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={cancelNavigation}
//           aria-label="إغلاق النافذة"
//           className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//         >
//           <X size={19} />
//         </button>
//       </div>

//       <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:flex-row sm:justify-start">
//         <button
//           type="button"
//           onClick={cancelNavigation}
//           className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
//         >
//           العودة للتعديل
//         </button>

//         <button
//           type="button"
//           onClick={confirmNavigation}
//           className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
//         >
//           الخروج بدون حفظ
//         </button>
//       </div>
//     </div>
//   </div>
// )}




// {showDeleteModal && (
//   <div
//     dir="rtl"
//     className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
//     onMouseDown={(e) => {
//       if (e.target === e.currentTarget && !isDeleting) {
//         setShowDeleteModal(false);
//       }
//     }}
//   >
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="delete-modal-title"
//       className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
//     >
//       {/* Header */}
//       <div className="flex items-start gap-4 p-6">
//         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
//           <Trash2 size={25} />
//         </div>

//         <div className="flex-1">
//           <h3
//             id="delete-modal-title"
//             className="text-lg font-bold text-slate-900"
//           >
//             تأكيد حذف الفيديو
//           </h3>

//           <p className="mt-2 text-sm leading-7 text-slate-600">
//             هل أنت متأكد أنك تريد حذف هذا الفيديو؟
//             <span className="mt-1 block font-semibold text-red-600">
//               لا يمكن التراجع عن هذه العملية.
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:flex-row sm:justify-start">
//         <button
//           type="button"
//           disabled={isDeleting}
//           onClick={() => setShowDeleteModal(false)}
//           className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           إلغاء
//         </button>

//         <button
//           type="button"
//           disabled={isDeleting}
//           onClick={handleDelete}
//           className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           <Trash2 size={17} />
//           {isDeleting ? "جاري الحذف..." : "تأكيد الحذف"}
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//     </main>
//   );
// }

// // ==================================================
// // FORM GROUP
// // ==================================================

// function FormGroup({
//   label,
//   children,
//   required = false,
// }: {
//   label: string;
//   children: ReactNode;
//   required?: boolean;
// }) {
//   return (
//     <div className="flex flex-col gap-1.75">
//       <label className="text-xs font-semibold text-[#4a5568]">
//         {label}

//         {required && (
//           <span
//             className="mr-1 text-[14px] font-bold text-red-500"
//             title="هذا الحقل مطلوب"
//             aria-label="حقل مطلوب"
//           >
//             *
//           </span>
//         )}
//       </label>

//       {children}
//     </div>
//   );
// }

// // ==================================================
// // INPUT WRAPPER
// // ==================================================

// function InputWrapper({
//   icon,
//   children,
// }: {
//   icon: ReactNode;
//   children: ReactNode;
// }) {
//   return (
//     <div className="relative w-full">
//       <span
//         className="
//           pointer-events-none
//           absolute
//           right-3
//           top-1/2
//           z-10
//           flex
//           -translate-y-1/2
//           items-center
//           justify-center
//           text-[#a0aec0]
//         "
//       >
//         {icon}
//       </span>

//       {children}
//     </div>
//   );
// }

// // ==================================================
// // SELECT WRAPPER
// // ==================================================

// function SelectWrapper({
//   icon,
//   children,
//   onAdd,
//   disabled = false,
//   isAdmin = false,
// }: {
//   icon: ReactNode;
//   children: ReactNode;
//   onAdd?: () => void;
//   disabled?: boolean;
//   isAdmin?: boolean;
// }) {
//   return (
//     <div className="flex w-full items-center gap-2">
//       <div className="relative min-w-0 flex-1">
//         <span
//           className="
//             pointer-events-none absolute right-3 top-1/2 z-10
//             flex -translate-y-1/2 items-center justify-center
//             text-[#a0aec0]
//           "
//         >
//           {icon}
//         </span>

//         <span
//           className="
//             pointer-events-none absolute left-3 top-1/2 z-10
//             flex -translate-y-1/2 items-center justify-center
//             text-[#718096]
//           "
//         >
//           <ChevronDown size={16} strokeWidth={2} />
//         </span>

//         {children}
//       </div>

//       {/* + يظهر للـ Admin فقط */}
//       {isAdmin && (
//         <button
//           type="button"
//           title="إضافة"
//           aria-label="إضافة"
//           onClick={onAdd}
//           disabled={disabled}
//           className="
//             flex h-11 w-11 shrink-0 items-center justify-center
//             rounded-[9px] border border-[#dfe5ed] bg-white
//             text-[#718096] transition-all duration-200
//             hover:border-[#2563eb]
//             hover:bg-[#eff6ff]
//             hover:text-[#2563eb]
//             active:scale-95
//             disabled:cursor-not-allowed
//             disabled:opacity-50
//           "
//         >
//           <Plus size={18} strokeWidth={2} />
//         </button>
//       )}
//     </div>
//   );
// }


// // ==================================================
// // INPUT STYLE
// // ==================================================

// const inputClass = `
//   h-11
//   w-full
//   rounded-[9px]
//   border
//   border-[#dfe5ed]
//   bg-[#fbfcfe]
//   pr-[42px]
//   pl-3
//   text-xs
//   text-[#172033]
//   outline-none
//   transition
//   placeholder:text-[#a0aec0]
//   focus:border-[#2563eb]
//   focus:bg-white
//   focus:ring-[3px]
//   focus:ring-blue-500/10
//   disabled:cursor-not-allowed
//   disabled:bg-[#f1f5f9]
//   disabled:text-[#94a3b8]
//   disabled:opacity-80
// `;

// // ==================================================
// // SELECT STYLE
// // ==================================================

// const selectClass = `
//   h-11
//   w-full
//   appearance-none
//   rounded-[9px]
//   border
//   border-[#dfe5ed]
//   bg-[#fbfcfe]
//   pr-[42px]
//   pl-[38px]
//   text-xs
//   text-[#172033]
//   outline-none
//   transition
//   cursor-pointer
//   focus:border-[#2563eb]
//   focus:bg-white
//   focus:ring-[3px]
//   focus:ring-blue-500/10
//   disabled:cursor-not-allowed
//   disabled:bg-[#f1f5f9]
//   disabled:text-[#94a3b8]
//   disabled:opacity-80
// `;






export default function Page() {
  return <EditVideoPage />;
}
