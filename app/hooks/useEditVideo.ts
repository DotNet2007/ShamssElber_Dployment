// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useParams, useRouter, usePathname } from "next/navigation";
// import type { ChangeEvent, DragEvent } from "react";
// import { formatDuration } from "@/app/helpers/videoHelper";
// import { getCurrentDateTime } from "@/app/helpers/getCurentDate";
// import { toast } from "sonner";
// import { useAuth } from "@/app/context/AuthContext";

// import {
//   useGetChannelsQuery,
//   useGetContentTypesQuery,
//   useGetEventsQuery,
//   useGetEventTypesQuery,
//   useGetItemsQuery,
//   useGetItemsSerQuery,
//   useGetItemTypesQuery,
//   useGetProdLinesQuery,
//   useGetProductEntityOneQuery,
//   useGetProductEntityTwoQuery,
//   useGetSectorsQuery,
//   useGetSongsQuery,
//   useGetSpeakersQuery,
//   useGetTranslationsQuery,
//   useAddEventMutation,
//   useUpdateEventMutation,
// } from "@/app/services/sectors-api";

// import {
//   useGetVideoByCodeQuery,
//   useUpdateVideoMutation,
//   useSubmitVideoMutation,
//   useDeleteVideoMutation,
//   useAdminUpdateVideoMutation,
//   useLazyGetServerVideoFilesQuery,
//   useUpdateVideoWithProgressMutation,
//   useAdminUpdateVideoWithProgressMutation,
//   unregisterVideoUploadProgress,
//   registerVideoUploadProgress,
// } from "@/app/services/videos-api";

// import type { ServerVideoFile } from "@/app/services/videos-api";

// import {
//   toDateTimeLocal,
//   getFileUrl,
//   isValidVideoFile,
//   isValidThumbnailFile,
//   getApiErrorMessage,
//   getThumbnailUrl,
//   normalizeSpeakerCodes,
//   normalizeManualSpeakers,
// } from "../helpers/edit-video/editVideo.helpers";





// export function useEditVideo() {
//   const videoInputRef = useRef<HTMLInputElement>(null);
//   const thumbnailInputRef = useRef<HTMLInputElement>(null);
//   const dateInputRef = useRef<HTMLInputElement>(null);

//   const params = useParams<{ code: string }>();
//   const router = useRouter();
//   const pathname = usePathname();

//   const code = Number(params?.code);

//   // const [isFormInitialized, setIsFormInitialized] = useState(false);

//   // ==================================================
//   // VIDEO
//   // ==================================================

//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoUrl, setVideoUrl] = useState("");
//   const [videoDuration, setVideoDuration] = useState("");

//   const [isVideoDragging, setIsVideoDragging] = useState(false);

//   const [existingVideoFileName, setExistingVideoFileName] = useState("");
//   const [existingThumbnailFileName, setExistingThumbnailFileName] = useState("");


//   // Selected server video filename.
//   // Backend currently accepts filename only, not relativePath.
//   const [serverFileName, setServerFileName] = useState("");

//   // ==================================================
//   // SERVER VIDEO BROWSER
//   // ==================================================

//   const [showServerBrowser, setShowServerBrowser] = useState(false);

//   const [serverVideos, setServerVideos] = useState<ServerVideoFile[]>([]);
//   const [serverSearch, setServerSearch] = useState("");
//   const [serverPage, setServerPage] = useState(1);
//   const [serverTotalPages, setServerTotalPages] = useState(1);
//   const [serverTotal, setServerTotal] = useState(0);
//   const [serverVideosError, setServerVideosError] = useState("");

//   const [
//     getServerVideoFiles,
//     { isFetching: isLoadingServerVideos },
//   ] = useLazyGetServerVideoFilesQuery();

//   const loadServerVideos = async (
//     page = serverPage,
//     search = serverSearch
//   ) => {
//     try {
//       setServerVideosError("");

//       const response = await getServerVideoFiles({
//         page,
//         limit: 30,
//         search: search.trim(),
//       }).unwrap();

//       const data = response.data;

//       setServerVideos(data.videos ?? []);
//       setServerPage(data.pagination?.page ?? page);
//       setServerTotalPages(data.pagination?.totalPages ?? 1);
//       setServerTotal(data.pagination?.total ?? 0);
//     } catch (requestError: unknown) {
//       setServerVideosError(
//         getApiErrorMessage(
//           requestError,
//           "تعذر تحميل ملفات الفيديو من السيرفر."
//         )
//       );

//       setServerVideos([]);
//     }
//   };

//   const openServerBrowser = () => {
//     if (isLocked) return;

//     setShowServerBrowser(true);
//     setServerPage(1);

//     void loadServerVideos(1, serverSearch);
//   };

//   const closeServerBrowser = () => {
//     setShowServerBrowser(false);
//   };

//   const handleServerSearch = (value: string) => {
//     setServerSearch(value);
//     setServerPage(1);

//     void loadServerVideos(1, value);
//   };

//   const handleServerPageChange = (page: number) => {
//     if (
//       page < 1 ||
//       page > serverTotalPages ||
//       isLoadingServerVideos
//     ) {
//       return;
//     }

//     void loadServerVideos(page, serverSearch);
//   };

//   // ==================================================
//   // THUMBNAIL
//   // ==================================================

//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
//   const [thumbnailUrl, setThumbnailUrl] = useState("");

//   // ==================================================
//   // SOCIAL LINKS
//   // ==================================================

//   const [youtubeLink, setYoutubeLink] = useState("");
//   const [facebookLink, setFacebookLink] = useState("");
//   const [instagramLink, setInstagramLink] = useState("");

//   // ==================================================
//   // CONTENT
//   // ==================================================

//   const [content1, setContent1] = useState("");
//   const [content2, setContent2] = useState("");
//   const [content3, setContent3] = useState("");
//   const [content4, setContent4] = useState("");
//   const [content5, setContent5] = useState("");
//   const [contentType, setContentType] = useState("");

//   // ==================================================
//   // VIDEO INFORMATION
//   // ==================================================

//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState(getCurrentDateTime());

//   const openDatePicker = () => {
//     dateInputRef.current?.showPicker();
//   };

//   // ==================================================
//   // PRODUCTION
//   // ==================================================

//   const [production1, setProduction1] = useState("");
//   const [production2, setProduction2] = useState("");
//   const [productionLine, setProductionLine] = useState("");

//   // ==================================================
//   // SECTOR / TRANSLATION
//   // ==================================================

//   const [sector, setSector] = useState("");
//   const [translation, setTranslation] = useState("");

//   // ==================================================
//   // AUTHENTICATION
//   // ==================================================

//   const {
//     user,
//     isLoading: authLoading,
//     isAuthenticated,
//   } = useAuth();

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
//   // PRODUCT / LOOKUP DATA
//   // ==================================================

//   const {
//     data: itemsType = [],
//     isLoading: itemsTypeIsLoading,
//   } = useGetItemTypesQuery();

//   const {
//     data: eventTypes = [],
//     isLoading: eventTypesIsLoading,
//   } = useGetEventTypesQuery();

//   const {
//     data: productionLines = [],
//     isLoading: productionLinesIsLoading,
//   } = useGetProdLinesQuery();

//   const {
//     data: sectors = [],
//     isLoading: sectorsIsLoading,
//   } = useGetSectorsQuery();

//   const {
//     data: productEntitiesOne = [],
//     isLoading: productEntitiesOneIsLoading,
//   } = useGetProductEntityOneQuery();

//   const {
//     data: productEntitiesTwo = [],
//     isLoading: productEntitiesTwoIsLoading,
//   } = useGetProductEntityTwoQuery();

//   const {
//     data: songs = [],
//     isLoading: songsIsLoading,
//   } = useGetSongsQuery();

//   const {
//     data: speakers = [],
//     isLoading: speakersIsLoading,
//   } = useGetSpeakersQuery();

//   const {
//     data: events = [],
//     isLoading: eventsIsLoading,
//     refetch: refetchEvents,
//     isFetching: eventsIsFetching,
//   } = useGetEventsQuery();

//   const {
//     data: items = [],
//     isLoading: itemsIsLoading,
//   } = useGetItemsQuery();

//   const {
//     data: itemsSer = [],
//     isLoading: itemsSerIsLoading,
//   } = useGetItemsSerQuery();

//   const {
//     data: channels = [],
//     isLoading: channelsIsLoading,
//   } = useGetChannelsQuery();

//   const {
//     data: translations = [],
//     isLoading: translationsIsLoading,
//   } = useGetTranslationsQuery();

//   const {
//     data: contentTypes = [],
//     isLoading: contentTypesIsLoading,
//   } = useGetContentTypesQuery(undefined, {
//     skip: !isAdmin,
//   });

//   // ==================================================
//   // VIDEO API
//   // ==================================================

//   const {
//     data: videoResponse,
//     isLoading: isVideoLoading,
//     isError: isVideoError,
//     error: videoError,
//   } = useGetVideoByCodeQuery(code, {
//     skip:
//       !Number.isFinite(code) ||
//       authLoading ||
//       !isAuthenticated,
//   });

//   const [updateVideo, { isLoading: isSaving }] =
//     useUpdateVideoMutation();

//   const [adminUpdateVideo] = useAdminUpdateVideoMutation();

//   const [submitVideo, { isLoading: isSubmitting }] =
//     useSubmitVideoMutation();

//   const [deleteVideo, { isLoading: isDeleting }] =
//     useDeleteVideoMutation();

//   // const [downloadVideo, { isLoading: isDownloading }] = useDownloadVideoMutation();

//   const [addEvent, { isLoading: isAddingEvent }] =
//     useAddEventMutation();

//   const [updateEvent, { isLoading: isUpdatingEvent }] =
//     useUpdateEventMutation();

//   const video = videoResponse?.data;


//   type UploadPhase = | "idle" | "uploading" | "processing" | "completed";
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadPhase, setUploadPhase] = useState<UploadPhase>("idle");

//   const [updateVideoWithProgress, { isLoading: isSavingUpdate }] = useUpdateVideoWithProgressMutation();
//   const [adminUpdateVideoWithProgress] = useAdminUpdateVideoWithProgressMutation();

//   // ==================================================
//   // PERMISSIONS / LOCK STATE
//   // ==================================================

//   const isSubmitted =
//     String(video?.RecordStatus ?? "").toUpperCase() === "SUBMITTED";

//   const isOwner =
//     currentUserId !== null &&
//     Number(video?.Emp_Code) === currentUserId;

//   const canEdit = isAdmin || (!isSubmitted && isOwner);
//   const canDelete = isAdmin || (!isSubmitted && isOwner);
//   const isLocked = !canEdit;

//   // ==================================================
//   // PRODUCT
//   // ==================================================

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

//   const [
//     eventTextInitializedForCode,
//     setEventTextInitializedForCode,
//   ] = useState<number | null>(null);

//   const [showEventSuggestions, setShowEventSuggestions] =
//     useState(false);

//   const filteredEvents = events.filter((event) =>
//     String(event.DescA ?? "")
//       .toLowerCase()
//       .includes(eventNameText.trim().toLowerCase())
//   );

//   // ==================================================
//   // HYMN / SPEAKER / CHANNEL
//   // ==================================================

//   const [hymnName, setHymnName] = useState("");
//   // const [speakerName, setSpeakerName] = useState("");

//   const [selectedSpeakers, setSelectedSpeakers] = useState<number[]>([]);
//   const [manualSpeakers, setManualSpeakers] = useState<string[]>([]);

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
//   // FORM LAYOUT
//   // ==================================================

//   const [formLayout, setFormLayout] = useState<
//     "grid3" | "grid2" | "full"
//   >(() => {
//     if (typeof window === "undefined") {
//       return "grid2";
//     }

//     const saved = localStorage.getItem("video-form-layout");

//     if (
//       saved === "grid3" ||
//       saved === "grid2" ||
//       saved === "full"
//     ) {
//       return saved;
//     }

//     return "grid2";
//   });

//   const changeFormLayout = (
//     layout: "grid3" | "grid2" | "full"
//   ) => {
//     setFormLayout(layout);
//     localStorage.setItem("video-form-layout", layout);
//   };

//   // ==================================================
//   // UNSAVED CHANGES
//   // ==================================================
//   const hasUnsavedChanges = useMemo(() => {
//     if (!video) return false;

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const original = video as unknown as Record<string, any>;

//     // Original date
//     const originalDate = video.TDate
//       ? toDateTimeLocal(video.TDate)
//       : "";

//     // Original registered speakers
//     const originalSpeakerCodes = normalizeSpeakerCodes(
//       Array.isArray(original.speakerCodes)
//         ? original.speakerCodes
//         : Array.isArray(original.VideoSpeakers)
//           ? original.VideoSpeakers.map(
//               // eslint-disable-next-line @typescript-eslint/no-explicit-any
//               (item: any) => item.Speaker_Code
//             )
//           : video.Speaker_Code != null
//             ? [video.Speaker_Code]
//             : []
//     );

//     // Original manual speakers
//     const originalManualSpeakers = normalizeManualSpeakers(
//       original.manualSpeakers ?? original.Manual_Speakers
//     );

//     const currentSpeakerCodes =
//       normalizeSpeakerCodes(selectedSpeakers);

//     const currentManualSpeakers =
//       normalizeManualSpeakers(manualSpeakers);

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

//       eventNameText.trim() !== originalEventNameText.trim() ||

//       productionLine !== String(video.ProdLine_Code ?? "") ||

//       hymnName !== String(video.Song_Code ?? "") ||

//       // Registered speakers
//       JSON.stringify(currentSpeakerCodes) !==
//         JSON.stringify(originalSpeakerCodes) ||

//       // Manual speakers
//       JSON.stringify(currentManualSpeakers) !==
//         JSON.stringify(originalManualSpeakers) ||

//       channelName !== (
//         video.ChannelName ??
//         (video.Channel_Code != null
//           ? String(video.Channel_Code)
//           : "")
//       ) ||

//       contentType !== String(video.ContentType_Code ?? "") ||

//       content1 !== String(original.Content1 ?? original.content1 ?? "") ||

//       content2 !== String(original.Content2 ?? original.content2 ?? "") ||

//       content3 !== String(original.Content3 ?? original.content3 ?? "") ||

//       content4 !== String(original.Content4 ?? original.content4 ?? "") ||

//       content5 !== String(original.Content5 ?? original.content5 ?? "") ||

//       isRepeated !== Boolean(
//         original.IsRepeated ?? original.isRepeated ?? false
//       ) ||

//       repeatType !== String(
//         original.RepeatType ?? original.repeatType ?? ""
//       ) ||

//       youtubeLink !== (video.YouTubeLink ?? "") ||

//       facebookLink !== (video.FaceBookLink ?? "") ||

//       instagramLink !== (video.InstagramLink ?? "") ||

//       Boolean(videoFile) ||

//       Boolean(thumbnailFile) ||

//       (
//         serverFileName !== "" &&
//         serverFileName !== (video.FileName ?? "")
//       )
//     );
//   }, [
//     video,
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
//     originalEventNameText,
//     productionLine,
//     hymnName,
//     selectedSpeakers,
//     manualSpeakers,
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
//     serverFileName,
//   ]);


//   // const hasUnsavedChanges = useMemo(() => {
//   //   if (!video) return false;

//   //   const original = video as unknown as Record<string, unknown>;

//   //   const originalDate = (() => {
//   //     if (!video.TDate) return date;

//   //     const parsedDate = new Date(video.TDate);

//   //     if (Number.isNaN(parsedDate.getTime())) {
//   //       return date;
//   //     }

//   //     return new Date(
//   //       parsedDate.getTime() -
//   //         parsedDate.getTimezoneOffset() * 60000
//   //     )
//   //       .toISOString()
//   //       .slice(0, 16);
//   //   })();

//   //   const originalEvent = events.find(
//   //     (event) =>
//   //       String(event.Code) === String(video.Event_Code ?? "")
//   //   );

//   //   return (
//   //     date !== originalDate ||
//   //     title !== (video.ItemName ?? "") ||
//   //     item !== String(video.Item_Code ?? "") ||
//   //     production1 !== String(video.ProdEntity1_Code ?? "") ||
//   //     production2 !== String(video.ProdEntity2_Code ?? "") ||
//   //     sector !== String(video.Sec_Code ?? "") ||
//   //     translation !== String(video.Translation_Code ?? "") ||
//   //     productType !== String(video.ItemType_Code ?? "") ||
//   //     productName !== (video.ItemName ?? "") ||
//   //     productSerial !== String(video.ItemSer_Code ?? "") ||
//   //     eventType !== String(video.EventType_Code ?? "") ||
//   //     eventName !== String(video.Event_Code ?? "") ||
//   //     eventNameText !== String(originalEvent?.DescA ?? "") ||
//   //     productionLine !== String(video.ProdLine_Code ?? "") ||
//   //     hymnName !== String(video.Song_Code ?? "") ||
//   //     JSON.stringify([...selectedSpeakers].sort((a, b) => a - b)) !==
//   //       JSON.stringify(
//   //         (
//   //           Array.isArray(original.speakerCodes)
//   //             ? original.speakerCodes.map(Number)
//   //             : video.Speaker_Code != null
//   //               ? [Number(video.Speaker_Code)]
//   //               : []
//   //         ).sort((a, b) => a - b)
//   //       ) ||

//   //     JSON.stringify(manualSpeakers) !==
//   //       JSON.stringify(
//   //         Array.isArray(original.manualSpeakers)
//   //           ? original.manualSpeakers
//   //           : []
//   //       ) ||
//   //     // speakerName !== String(video.Speaker_Code ?? "") ||
//   //     channelName !==
//   //       (video.ChannelName ??
//   //         (video.Channel_Code != null
//   //           ? String(video.Channel_Code)
//   //           : "")) ||
//   //     contentType !== String(video.ContentType_Code ?? "") ||
//   //     content1 !== String(original.Content1 ?? original.content1 ?? "") ||
//   //     content2 !== String(original.Content2 ?? original.content2 ?? "") ||
//   //     content3 !== String(original.Content3 ?? original.content3 ?? "") ||
//   //     content4 !== String(original.Content4 ?? original.content4 ?? "") ||
//   //     content5 !== String(original.Content5 ?? original.content5 ?? "") ||
//   //     isRepeated !==
//   //       Boolean(original.IsRepeated ?? original.isRepeated ?? false) ||
//   //     repeatType !==
//   //       String(original.RepeatType ?? original.repeatType ?? "") ||
//   //     youtubeLink !== (video.YouTubeLink ?? "") ||
//   //     facebookLink !== (video.FaceBookLink ?? "") ||
//   //     instagramLink !== (video.InstagramLink ?? "") ||

//   //     // New local files
//   //     Boolean(videoFile) ||
//   //     Boolean(thumbnailFile) ||

//   //     // A different server video was selected
//   //     (
//   //       serverFileName !== "" &&
//   //       serverFileName !== (video.FileName ?? "")
//   //     )
//   //   );
//   // }, [
//   //   video,
//   //   events,
//   //   date,
//   //   title,
//   //   item,
//   //   production1,
//   //   production2,
//   //   sector,
//   //   translation,
//   //   productType,
//   //   productName,
//   //   productSerial,
//   //   eventType,
//   //   eventName,
//   //   eventNameText,
//   //   productionLine,
//   //   hymnName,
//   //   selectedSpeakers,
//   //   manualSpeakers,
//   //   channelName,
//   //   contentType,
//   //   content1,
//   //   content2,
//   //   content3,
//   //   content4,
//   //   content5,
//   //   isRepeated,
//   //   repeatType,
//   //   youtubeLink,
//   //   facebookLink,
//   //   instagramLink,
//   //   videoFile,
//   //   thumbnailFile,
//   //   serverFileName,
//   // ]);

//   // ==================================================
//   // BEFORE UNLOAD
//   // ==================================================

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

//   // ==================================================
//   // UNSAVED NAVIGATION MODAL
//   // ==================================================

//   const [showUnsavedModal, setShowUnsavedModal] = useState(false);
//   const [pendingNavigation, setPendingNavigation] =
//     useState<string | null>(null);

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
//   // LOAD VIDEO DATA
//   // ==================================================

//   /* eslint-disable react-hooks/set-state-in-effect */
//   useEffect(() => {
//     if (!video) return;

//     const videoExtra = video as unknown as Record<string, unknown>;

//     setTitle(video.ItemName ?? "");
//     setItem(
//       video.Item_Code != null ? String(video.Item_Code) : ""
//     );

//     if (video.TDate) {
//       const parsedDate = new Date(video.TDate);

//       if (!Number.isNaN(parsedDate.getTime())) {
//         setDate(toDateTimeLocal(video.TDate));
//       }
//     }

//     setProduction1(
//       video.ProdEntity1_Code != null
//         ? String(video.ProdEntity1_Code)
//         : ""
//     );

//     setProduction2(
//       video.ProdEntity2_Code != null
//         ? String(video.ProdEntity2_Code)
//         : ""
//     );

//     setSector(
//       video.Sec_Code != null ? String(video.Sec_Code) : ""
//     );

//     setTranslation(
//       video.Translation_Code != null
//         ? String(video.Translation_Code)
//         : ""
//     );

//     setProductType(
//       video.ItemType_Code != null
//         ? String(video.ItemType_Code)
//         : ""
//     );

//     setProductName(video.ItemName ?? "");

//     setProductSerial(
//       video.ItemSer_Code != null
//         ? String(video.ItemSer_Code)
//         : ""
//     );

//     setEventType(
//       video.EventType_Code != null
//         ? String(video.EventType_Code)
//         : ""
//     );

//     setEventName(
//       video.Event_Code != null
//         ? String(video.Event_Code)
//         : ""
//     );

//     setProductionLine(
//       video.ProdLine_Code != null
//         ? String(video.ProdLine_Code)
//         : ""
//     );

//     setHymnName(
//       video.Song_Code != null
//         ? String(video.Song_Code)
//         : ""
//     );

//     // Registered speakers
//     const existingSpeakerCodes = Array.isArray(
//       videoExtra.speakerCodes
//     )
//       ? videoExtra.speakerCodes.map(Number)
//       : Array.isArray(videoExtra.VideoSpeakers)
//         ? (videoExtra.VideoSpeakers as Array<{
//             Speaker_Code: number;
//           }>).map((item) => Number(item.Speaker_Code))
//         : video.Speaker_Code != null
//           ? [Number(video.Speaker_Code)]
//           : [];

//     setSelectedSpeakers(existingSpeakerCodes);

//     // Manually entered speakers
//     try {
//       const parsedManualSpeakers = video.Manual_Speakers
//         ? JSON.parse(video.Manual_Speakers)
//         : [];

//       setManualSpeakers(
//         Array.isArray(parsedManualSpeakers)
//           ? parsedManualSpeakers
//           : []
//       );
//     } catch {
//       setManualSpeakers([]);
//     }

//     // setSpeakerName(
//     //   video.Speaker_Code != null
//     //     ? String(video.Speaker_Code)
//     //     : ""
//     // );

//     setIsRepeated(
//       Boolean(
//         videoExtra.IsRepeated ??
//           videoExtra.isRepeated ??
//           false
//       )
//     );

//     setRepeatType(
//       videoExtra.RepeatType != null
//         ? String(videoExtra.RepeatType)
//         : videoExtra.repeatType != null
//           ? String(videoExtra.repeatType)
//           : ""
//     );

//     setContentType(
//       video.ContentType_Code != null
//         ? String(video.ContentType_Code)
//         : ""
//     );

//     setChannelName(
//       video.ChannelName ??
//         (video.Channel_Code != null
//           ? String(video.Channel_Code)
//           : "")
//     );

//     setContent1(
//       String(videoExtra.Content1 ?? videoExtra.content1 ?? "")
//     );

//     setContent2(
//       String(videoExtra.Content2 ?? videoExtra.content2 ?? "")
//     );

//     setContent3(
//       String(videoExtra.Content3 ?? videoExtra.content3 ?? "")
//     );

//     setContent4(
//       String(videoExtra.Content4 ?? videoExtra.content4 ?? "")
//     );

//     setContent5(
//       String(videoExtra.Content5 ?? videoExtra.content5 ?? "")
//     );

//     const existingDuration =
//       videoExtra.Duration ?? videoExtra.duration;

//     if (
//       existingDuration != null &&
//       existingDuration !== ""
//     ) {
//       setVideoDuration(String(existingDuration));
//     } else {
//       setVideoDuration("");
//     }

//     setYoutubeLink(video.YouTubeLink ?? "");
//     setFacebookLink(video.FaceBookLink ?? "");
//     setInstagramLink(video.InstagramLink ?? "");

//     setExistingVideoFileName(video.FileName ?? "");
//     setExistingThumbnailFileName(video.ImageLink ?? "");

//     // Reset replacement selections when loading a video
//     setVideoFile(null);
//     setServerFileName("");
//     setThumbnailFile(null);

//     if (video.FileName) {
//       setVideoUrl(getFileUrl(video.FileName));
//     } else {
//       setVideoUrl("");
//     }

//     if (video.ImageLink) {
//       setThumbnailUrl(getThumbnailUrl(video.ImageLink));
//     } else {
//       setThumbnailUrl("");
//     }

//     // setIsFormInitialized(true);
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
//       video.Event_Code != null
//         ? String(video.Event_Code)
//         : "";

//     if (!eventCode) {
//       setEventNameText("");
//       setOriginalEventNameText("");
//       setEventTextInitializedForCode(videoCode);
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
//   // VIDEO SELECT FROM DEVICE
//   // ==================================================

//   const handleVideoSelect = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (isLocked) {
//       event.target.value = "";
//       return;
//     }

//     setError("");

//     if (!isValidVideoFile(file)) {
//       setError("من فضلك اختر ملف فيديو صالح.");
//       event.target.value = "";
//       return;
//     }

//     // Revoke previous local preview
//     if (videoUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     const url = URL.createObjectURL(file);

//     // Device source replaces server selection
//     setVideoFile(file);
//     setServerFileName("");
//     setVideoUrl(url);
//     setVideoDuration("");

//     const videoElement = document.createElement("video");

//     videoElement.preload = "metadata";

//     videoElement.onloadedmetadata = () => {
//       if (Number.isFinite(videoElement.duration)) {
//         setVideoDuration(
//           formatDuration(videoElement.duration)
//         );
//       }
//     };

//     videoElement.src = url;

//     setShowServerBrowser(false);
//   };

//   // ==================================================
//   // VIDEO SELECT FROM SERVER
//   // ==================================================

//   const handleServerVideoSelect = (
//     fileName: string,
//     fileUrl?: string
//   ) => {
//     if (isLocked) return;

//     const selectedFileName = fileName.trim();

//     if (!selectedFileName) {
//       setError("اسم ملف الفيديو غير صالح.");
//       return;
//     }

//     // Revoke previous local preview only
//     if (videoUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     setError("");

//     // Clear device upload selection
//     setVideoFile(null);

//     if (videoInputRef.current) {
//       videoInputRef.current.value = "";
//     }

//     // Store server filename for update API
//     setServerFileName(selectedFileName);

//     // Server video is not uploaded again
//     setVideoUrl(
//       fileUrl || getFileUrl(selectedFileName)
//     );

//     setVideoDuration("");
//     setShowServerBrowser(false);
//   };

//   // ==================================================
//   // VIDEO DRAG AND DROP
//   // ==================================================

//   const handleVideoDrop = (
//     event: DragEvent<HTMLDivElement>
//   ) => {
//     event.preventDefault();
//     setIsVideoDragging(false);

//     if (isLocked) return;

//     const file = event.dataTransfer.files?.[0];

//     if (!file) return;

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
//   // REMOVE / CANCEL VIDEO SELECTION
//   // ==================================================

//   const handleRemoveVideo = () => {
//     if (isLocked) return;

//     if (videoUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     setVideoFile(null);
//     setServerFileName("");
//     setVideoDuration("");

//     if (videoInputRef.current) {
//       videoInputRef.current.value = "";
//     }

//     // Restore the original saved video.
//     // The current backend does not support clearing FileName.
//     if (video?.FileName) {
//       setVideoUrl(getFileUrl(video.FileName));
//       setExistingVideoFileName(video.FileName);
//     } else {
//       setVideoUrl("");
//       setExistingVideoFileName("");
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

//     if (isLocked) {
//       event.target.value = "";
//       return;
//     }

//     setError("");

//     if (!isValidThumbnailFile(file)) {
//       setError("من فضلك اختر صورة صالحة.");
//       event.target.value = "";
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
//     if (isLocked) return;

//     if (thumbnailUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(thumbnailUrl);
//     }

//     setThumbnailFile(null);

//     // Restore the original thumbnail.
//     // The current backend does not support clearing ImageLink.
//     if (video?.ImageLink) {
//       setThumbnailUrl(getThumbnailUrl(video.ImageLink));
//     } else {
//       setThumbnailUrl("");
//     }

//     if (thumbnailInputRef.current) {
//       thumbnailInputRef.current.value = "";
//     }
//   };

//   // ==================================================
//   // SAVE VIDEO
//   // ==================================================

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
//       setError("من فضلك أدخل التاريخ.");
//       return;
//     }

//     if (!productName.trim()) {
//       setError("من فضلك أدخل اسم المنتج.");
//       return;
//     }

//     if (
//       !videoFile &&
//       !serverFileName &&
//       !existingVideoFileName
//     ) {
//       setError(
//         "لا يوجد ملف فيديو حالي، من فضلك اختر ملف الفيديو."
//       );
//       return;
//     }

//     // ==================================================
//     // FORM DATA
//     // ==================================================

//     const formData = new FormData();

//     formData.append("date", date);
//     formData.append("title", title);
//     formData.append("item", item);

//     if (production1) formData.append("production1", production1);
//     if (production2) formData.append("production2", production2);

//     if (sector) formData.append("sector", sector);

//     if (translation.trim()) {
//       formData.append("translation", translation);
//     }

//     if (productType) formData.append("productType", productType);

//     if (productName.trim()) {
//       formData.append("productName", productName.trim());
//     }

//     if (productSerial.trim()) {
//       formData.append("productSerial", productSerial);
//     }

//     if (eventType) formData.append("eventType", eventType);
//     if (eventName) formData.append("eventName", eventName);

//     if (productionLine) {
//       formData.append("productionLine", productionLine);
//     }

//     if (hymnName) formData.append("hymnName", hymnName);
  
//     formData.append("speakerCodes",JSON.stringify(selectedSpeakers));
//     formData.append("manualSpeakers",JSON.stringify(manualSpeakers));
   
   
//     // if (speakerName) formData.append("speakerName", speakerName);

//     formData.append("isRepeated", String(isRepeated));

//     if (repeatType) formData.append("repeatType", repeatType);

//     if (youtubeLink.trim()) {
//       formData.append("youtubeLink", youtubeLink.trim());
//     }

//     if (facebookLink.trim()) {
//       formData.append("facebookLink", facebookLink.trim());
//     }

//     if (instagramLink.trim()) {
//       formData.append("instagramLink", instagramLink.trim());
//     }

//     formData.append("channelName", channelName);

//     formData.append("contentType", contentType);
//     formData.append("content1", content1);
//     formData.append("content2", content2);
//     formData.append("content3", content3);
//     formData.append("content4", content4);
//     formData.append("content5", content5);

//     formData.append("duration", videoDuration);

//     // ==================================================
//     // VIDEO SOURCE
//     // ==================================================

//     if (videoFile) {
//       formData.append("videoFile", videoFile);
//     } else if (
//       serverFileName &&
//       serverFileName !== (video?.FileName ?? "")
//     ) {
//       formData.append("serverFileName", serverFileName);
//     }

//     // ==================================================
//     // THUMBNAIL
//     // ==================================================

//     if (thumbnailFile) {
//       formData.append("thumbnailFile", thumbnailFile);
//     }

//     // ==================================================
//     // UPLOAD PROGRESS SETUP
//     // ==================================================

//     const uploadId = `${code}-${Date.now()}-${Math.random()
//       .toString(36)
//       .slice(2)}`;

//     setUploadProgress(0);
//     setUploadPhase(videoFile ? "uploading" : "processing");

//     registerVideoUploadProgress(uploadId, {
//       onProgress: (percentage) => {
//         setUploadProgress(percentage);
//       },

//       onUploadComplete: () => {
//         setUploadProgress(100);
//         setUploadPhase("processing");
//       },
//     });

//     // ==================================================
//     // SEND UPDATE
//     // ==================================================

//     try {
//       // Update existing event name if changed
//       if (
//         eventName &&
//         eventNameText.trim() &&
//         eventNameText.trim() !== originalEventNameText.trim()
//       ) {
//         await updateEvent({
//           code: Number(eventName),
//           DescA: eventNameText.trim(),
//         }).unwrap();

//         setOriginalEventNameText(eventNameText.trim());
//       }

//       // Admin update / regular update
//       if (isAdmin) {
//         await adminUpdateVideoWithProgress({
//           code,
//           formData,
//           uploadId,
//         }).unwrap();
//       } else {
//         await updateVideoWithProgress({
//           code,
//           formData,
//           uploadId,
//         }).unwrap();
//       }

//       setUploadProgress(100);
//       setUploadPhase("completed");

//       toast.success("تم تحديث الفيديو بنجاح.");

//       router.push("/videos");
//     } catch (requestError: unknown) {
//       console.error("Update video error:", requestError);

//       const message = getApiErrorMessage(
//         requestError,
//         "حدث خطأ أثناء تحديث الفيديو."
//       );

//       toast.error(message);
//     } finally {
//       unregisterVideoUploadProgress(uploadId);
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
//     } catch (requestError: unknown) {
//       const message = getApiErrorMessage(
//         requestError,
//         "حدث خطأ أثناء تقديم الفيديو."
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
//     } catch (requestError: unknown) {
//       const message = getApiErrorMessage(
//         requestError,
//         "حدث خطأ أثناء حذف الفيديو."
//       );

//       toast.error(message);
//     } finally {
//       setIsDeletingVideo(false);
//     }
//   };

//   // ==================================================
//   // DOWNLOAD VIDEO
//   // ==================================================
//   const handleDownloadVideo = async () => {
//     if (!code || !Number.isFinite(code)) return;

//     try {
//       const token = localStorage.getItem("userToken");

//       if (!token) {
//         toast.error("يرجى تسجيل الدخول أولاً");
//         return;
//       }

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${code}/download`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "ngrok-skip-browser-warning": "true",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Download failed: ${response.status}`);
//       }

//       const blob = await response.blob();

//       const fileName =
//         existingVideoFileName ||
//         serverFileName ||
//         `video-${code}.mp4`;

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");

//       link.href = url;
//       link.download = fileName;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(url);

//       toast.success("تم تحميل الفيديو بنجاح");
//     } catch (error) {
//       console.error("Video download error:", error);
//       toast.error("خطأ في تحميل الملف");
//     }
//   };

//   return {
//     // Refs
//     videoInputRef,
//     thumbnailInputRef,
//     dateInputRef,

//     // Router
//     router,
//     code,
//     pathname,

//     // Video
//     videoFile,
//     setVideoFile,
//     videoUrl,
//     setVideoUrl,
//     videoDuration,
//     setVideoDuration,
//     isVideoDragging,
//     setIsVideoDragging,
//     existingVideoFileName,
//     setExistingVideoFileName,
//     handleDownloadVideo,
//     // isDownloading,

//     // Server video browser
//     serverFileName,
//     setServerFileName,
//     serverVideos,
//     serverSearch,
//     setServerSearch,
//     serverPage,
//     serverTotalPages,
//     serverTotal,
//     serverVideosError,
//     isLoadingServerVideos,
//     showServerBrowser,
//     setShowServerBrowser,
//     loadServerVideos,
//     openServerBrowser,
//     closeServerBrowser,
//     handleServerSearch,
//     handleServerPageChange,
//     handleServerVideoSelect,

//     // Thumbnail
//     thumbnailFile,
//     setThumbnailFile,
//     thumbnailUrl,
//     setThumbnailUrl,
//     existingThumbnailFileName,
//     setExistingThumbnailFileName,

//     // Social links
//     youtubeLink,
//     setYoutubeLink,
//     facebookLink,
//     setFacebookLink,
//     instagramLink,
//     setInstagramLink,

//     // Content
//     content1,
//     setContent1,
//     content2,
//     setContent2,
//     content3,
//     setContent3,
//     content4,
//     setContent4,
//     content5,
//     setContent5,
//     contentType,
//     setContentType,

//     // Video information
//     title,
//     setTitle,
//     date,
//     setDate,

//     // Production
//     production1,
//     setProduction1,
//     production2,
//     setProduction2,
//     productionLine,
//     setProductionLine,

//     // Sector / Translation
//     sector,
//     setSector,
//     translation,
//     setTranslation,

//     // Authentication
//     user,
//     authLoading,
//     isAuthenticated,
//     isAdmin,
//     currentUserId,

//     // Lookup data
//     itemsType,
//     itemsTypeIsLoading,
//     eventTypes,
//     eventTypesIsLoading,
//     productionLines,
//     productionLinesIsLoading,
//     sectors,
//     sectorsIsLoading,
//     productEntitiesOne,
//     productEntitiesOneIsLoading,
//     productEntitiesTwo,
//     productEntitiesTwoIsLoading,
//     songs,
//     songsIsLoading,
//     speakers,
//     speakersIsLoading,
//     events,
//     eventsIsLoading,
//     eventsIsFetching,
//     refetchEvents,
//     items,
//     itemsIsLoading,
//     itemsSer,
//     itemsSerIsLoading,
//     channels,
//     channelsIsLoading,
//     translations,
//     translationsIsLoading,
//     contentTypes,
//     contentTypesIsLoading,

//     // Video API
//     videoResponse,
//     video,
//     isVideoLoading,
//     isVideoError,
//     videoError,
//     updateVideo,
//     isSaving,
//     adminUpdateVideo,
//     submitVideo,
//     isSubmitting,
//     deleteVideo,
//     isDeleting,
//     addEvent,
//     isAddingEvent,
//     updateEvent,
//     isUpdatingEvent,

//     // Permissions
//     isSubmitted,
//     isOwner,
//     canEdit,
//     canDelete,
//     isLocked,

//     // Product
//     productType,
//     setProductType,
//     item,
//     setItem,
//     productName,
//     setProductName,
//     productSerial,
//     setProductSerial,

//     // Event
//     eventType,
//     setEventType,
//     eventName,
//     setEventName,
//     eventNameText,
//     setEventNameText,
//     originalEventNameText,
//     setOriginalEventNameText,
//     eventTextInitializedForCode,
//     setEventTextInitializedForCode,
//     showEventSuggestions,
//     setShowEventSuggestions,
//     filteredEvents,

//     // Hymn / Speaker / Channel
//     hymnName,
//     setHymnName,
//     // speakerName,
//     // setSpeakerName,

//     selectedSpeakers,
//     setSelectedSpeakers,

//     manualSpeakers,
//     setManualSpeakers,

//     channelName,
//     setChannelName,

//     // Repeated
//     isRepeated,
//     setIsRepeated,
//     repeatType,
//     setRepeatType,

//     // Error
//     error,
//     setError,

//     // Layout
//     formLayout,
//     setFormLayout,
//     changeFormLayout,

//     // Unsaved changes
//     hasUnsavedChanges,
//     showUnsavedModal,
//     setShowUnsavedModal,
//     pendingNavigation,
//     setPendingNavigation,
//     confirmNavigation,
//     cancelNavigation,

//     // Handlers
//     openDatePicker,
//     handleVideoSelect,
//     handleVideoDrop,
//     handleRemoveVideo,
//     handleThumbnailSelect,
//     handleRemoveThumbnail,
//     handleSave,
//     handleSubmit,

//     // Delete modal
//     showDeleteModal,
//     setShowDeleteModal,
//     isDeletingVideo,
//     handleDelete,

//     uploadProgress,
//     uploadPhase,
//     isSavingUpdate,

//     // setIsFormInitialized,
//     // isFormInitialized

//   };
// }



"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import type { ChangeEvent, DragEvent } from "react";
import { formatDuration } from "@/app/helpers/videoHelper";
import { getCurrentDateTime } from "@/app/helpers/getCurentDate";
import { toast } from "sonner";
import { useAuth } from "@/app/context/AuthContext";

import {
  useGetChannelsQuery,
  useGetContentTypesQuery,
  useGetEventsQuery,
  useGetEventTypesQuery,
  useGetItemsQuery,
  useGetItemsSerQuery,
  useGetItemTypesQuery,
  useGetProdLinesQuery,
  useGetProductEntityOneQuery,
  useGetProductEntityTwoQuery,
  useGetSectorsQuery,
  useGetSongsQuery,
  useGetSpeakersQuery,
  useGetTranslationsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useAddProductEntityOneMutation,
  useAddProductEntityTwoMutation,
  useAddSectorMutation,
  useAddItemTypeMutation,
  useAddEventTypeMutation,
  useAddProdLineMutation,
  useAddSongMutation,
  useAddSpeakerMutation,
  useAddItemMutation,
  useAddItemSerMutation,
  useAddTranslationMutation,
  useAddChannelMutation,
} from "@/app/services/sectors-api";

import {
  useGetVideoByCodeQuery,
  useUpdateVideoMutation,
  useSubmitVideoMutation,
  useDeleteVideoMutation,
  useAdminUpdateVideoMutation,
  useLazyGetServerVideoFilesQuery,
  useUpdateVideoWithProgressMutation,
  useAdminUpdateVideoWithProgressMutation,
  unregisterVideoUploadProgress,
  registerVideoUploadProgress,
} from "@/app/services/videos-api";

import type { ServerVideoFile } from "@/app/services/videos-api";

import {
  toDateTimeLocal,
  getFileUrl,
  isValidVideoFile,
  isValidThumbnailFile,
  getApiErrorMessage,
  getThumbnailUrl,
  normalizeSpeakerCodes,
  normalizeManualSpeakers,
  getErrorMessage,
} from "../helpers/edit-video/editVideo.helpers";





export function useEditVideo() {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const params = useParams<{ code: string }>();
  const router = useRouter();
  const pathname = usePathname();

  const code = Number(params?.code);


  

  // const [isFormInitialized, setIsFormInitialized] = useState(false);

  // ==================================================
  // VIDEO
  // ==================================================

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDuration, setVideoDuration] = useState("");

  const [isVideoDragging, setIsVideoDragging] = useState(false);

  const [existingVideoFileName, setExistingVideoFileName] = useState("");
  const [existingThumbnailFileName, setExistingThumbnailFileName] = useState("");


  // Selected server video filename.
  // Backend currently accepts filename only, not relativePath.
  const [serverFileName, setServerFileName] = useState("");

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
    getServerVideoFiles,
    { isFetching: isLoadingServerVideos },
  ] = useLazyGetServerVideoFilesQuery();

  const loadServerVideos = async (
    page = serverPage,
    search = serverSearch
  ) => {
    try {
      setServerVideosError("");

      const response = await getServerVideoFiles({
        page,
        limit: 30,
        search: search.trim(),
      }).unwrap();

      const data = response.data;

      setServerVideos(data.videos ?? []);
      setServerPage(data.pagination?.page ?? page);
      setServerTotalPages(data.pagination?.totalPages ?? 1);
      setServerTotal(data.pagination?.total ?? 0);
    } catch (requestError: unknown) {
      setServerVideosError(
        getApiErrorMessage(
          requestError,
          "تعذر تحميل ملفات الفيديو من السيرفر."
        )
      );

      setServerVideos([]);
    }
  };

  const openServerBrowser = () => {
    if (isLocked) return;

    setShowServerBrowser(true);
    setServerPage(1);

    void loadServerVideos(1, serverSearch);
  };

  const closeServerBrowser = () => {
    setShowServerBrowser(false);
  };

  const handleServerSearch = (value: string) => {
    setServerSearch(value);
    setServerPage(1);

    void loadServerVideos(1, value);
  };

  const handleServerPageChange = (page: number) => {
    if (
      page < 1 ||
      page > serverTotalPages ||
      isLoadingServerVideos
    ) {
      return;
    }

    void loadServerVideos(page, serverSearch);
  };

  // ==================================================
  // THUMBNAIL
  // ==================================================

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

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
  // VIDEO INFORMATION
  // ==================================================

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getCurrentDateTime());

  const openDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

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
  // AUTHENTICATION
  // ==================================================

  const {
    user,
    isLoading: authLoading,
    isAuthenticated,
  } = useAuth();

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
  // PRODUCT / LOOKUP DATA
  // ==================================================

  const { data: itemsType = [], isLoading: itemsTypeIsLoading, refetch: refetchItemsType } = useGetItemTypesQuery();
  const { data: eventTypes = [], isLoading: eventTypesIsLoading, refetch: refetchEventTypes } = useGetEventTypesQuery();
  const { data: productionLines = [], isLoading: productionLinesIsLoading, refetch: refetchProductionLines } = useGetProdLinesQuery();
  
  const { data: sectors = [], isLoading: sectorsIsLoading, refetch: refetchSectors } = useGetSectorsQuery();
  const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading, refetch: refetchProductEntitiesOne } = useGetProductEntityOneQuery();
  const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading, refetch: refetchProductEntitiesTwo } = useGetProductEntityTwoQuery();

  const { data: songs = [], isLoading: songsIsLoading, refetch: refetchSongs } = useGetSongsQuery();
  const { data: speakers = [], isLoading: speakersIsLoading, refetch: refetchSpeakers } = useGetSpeakersQuery();
  const {
    data: events = [],
    isLoading: eventsIsLoading,
    isFetching: eventsIsFetching,
    refetch: refetchEvents,
  } = useGetEventsQuery();

  const { data: items = [], isLoading: itemsIsLoading, refetch: refetchItems } = useGetItemsQuery();
  const { data: itemsSer = [], isLoading: itemsSerIsLoading, refetch: refetchItemsSer } = useGetItemsSerQuery();
  const { data: channels = [], isLoading: channelsIsLoading, refetch: refetchChannels } = useGetChannelsQuery();
  const { data: translations = [], isLoading: translationsIsLoading, refetch: refetchTranslations } = useGetTranslationsQuery();

  const { data: contentTypes = [], isLoading: contentTypesIsLoading } = useGetContentTypesQuery(undefined, { skip: !isAdmin });

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


  // ==================================================
  // VIDEO API
  // ==================================================

  const {
    data: videoResponse,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError,
  } = useGetVideoByCodeQuery(code, {
    skip:
      !Number.isFinite(code) ||
      authLoading ||
      !isAuthenticated,
  });

  const [updateVideo, { isLoading: isSaving }] =
    useUpdateVideoMutation();

  const [adminUpdateVideo] = useAdminUpdateVideoMutation();

  const [submitVideo, { isLoading: isSubmitting }] =
    useSubmitVideoMutation();

  const [deleteVideo, { isLoading: isDeleting }] =
    useDeleteVideoMutation();

  // const [downloadVideo, { isLoading: isDownloading }] = useDownloadVideoMutation();

  const [addEvent, { isLoading: isAddingEvent }] =
    useAddEventMutation();

  const [updateEvent, { isLoading: isUpdatingEvent }] =
    useUpdateEventMutation();

  const video = videoResponse?.data;


  type UploadPhase = | "idle" | "uploading" | "processing" | "completed";
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadPhase, setUploadPhase] = useState<UploadPhase>("idle");

  const [updateVideoWithProgress, { isLoading: isRegularSavingUpdate }] =
    useUpdateVideoWithProgressMutation();
  const [adminUpdateVideoWithProgress, { isLoading: isAdminSavingUpdate }] =
    useAdminUpdateVideoWithProgressMutation();

  // Keep the save state accurate for both admin and regular update requests.
  const isSavingUpdate = isRegularSavingUpdate || isAdminSavingUpdate;

  // ==================================================
  // PERMISSIONS / LOCK STATE
  // ==================================================

  const isSubmitted =
    String(video?.RecordStatus ?? "").toUpperCase() === "SUBMITTED";

  const isOwner =
    currentUserId !== null &&
    Number(video?.Emp_Code) === currentUserId;

  const canEdit = isAdmin || (!isSubmitted && isOwner);
  const canDelete = isAdmin || (!isSubmitted && isOwner);
  const isLocked = !canEdit;

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
  const [eventNameText, setEventNameText] = useState("");
  const [originalEventNameText, setOriginalEventNameText] = useState("");

  const [
    eventTextInitializedForCode,
    setEventTextInitializedForCode,
  ] = useState<number | null>(null);

  const [showEventSuggestions, setShowEventSuggestions] =
    useState(false);

  const filteredEvents = events.filter((event) =>
    String(event.DescA ?? "")
      .toLowerCase()
      .includes(eventNameText.trim().toLowerCase())
  );

  // ==================================================
  // HYMN / SPEAKER / CHANNEL
  // ==================================================

  const [hymnName, setHymnName] = useState("");
  // const [speakerName, setSpeakerName] = useState("");

  const [selectedSpeakers, setSelectedSpeakers] = useState<number[]>([]);
  const [manualSpeakers, setManualSpeakers] = useState<string[]>([]);

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
  // FORM LAYOUT
  // ==================================================

  const [formLayout, setFormLayout] = useState<
    "grid3" | "grid2" | "full"
  >(() => {
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
  // UNSAVED CHANGES
  // ==================================================
  const hasUnsavedChanges = useMemo(() => {
    if (!video) return false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const original = video as unknown as Record<string, any>;

    // Original date
    const originalDate = video.TDate
      ? toDateTimeLocal(video.TDate)
      : "";

    // Original registered speakers
    const originalSpeakerCodes = normalizeSpeakerCodes(
      Array.isArray(original.speakerCodes)
        ? original.speakerCodes
        : Array.isArray(original.VideoSpeakers)
          ? original.VideoSpeakers.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (item: any) => item.Speaker_Code
            )
          : video.Speaker_Code != null
            ? [video.Speaker_Code]
            : []
    );

    // Original manual speakers
    const originalManualSpeakers = normalizeManualSpeakers(
      original.manualSpeakers ?? original.Manual_Speakers
    );

    const currentSpeakerCodes =
      normalizeSpeakerCodes(selectedSpeakers);

    const currentManualSpeakers =
      normalizeManualSpeakers(manualSpeakers);

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

      eventNameText.trim() !== originalEventNameText.trim() ||

      productionLine !== String(video.ProdLine_Code ?? "") ||

      hymnName !== String(video.Song_Code ?? "") ||

      // Registered speakers
      JSON.stringify(currentSpeakerCodes) !==
        JSON.stringify(originalSpeakerCodes) ||

      // Manual speakers
      JSON.stringify(currentManualSpeakers) !==
        JSON.stringify(originalManualSpeakers) ||

      channelName !== (
        video.ChannelName ??
        (video.Channel_Code != null
          ? String(video.Channel_Code)
          : "")
      ) ||

      contentType !== String(video.ContentType_Code ?? "") ||

      content1 !== String(original.Content1 ?? original.content1 ?? "") ||

      content2 !== String(original.Content2 ?? original.content2 ?? "") ||

      content3 !== String(original.Content3 ?? original.content3 ?? "") ||

      content4 !== String(original.Content4 ?? original.content4 ?? "") ||

      content5 !== String(original.Content5 ?? original.content5 ?? "") ||

      isRepeated !== Boolean(
        original.IsRepeated ?? original.isRepeated ?? false
      ) ||

      repeatType !== String(
        original.RepeatType ?? original.repeatType ?? ""
      ) ||

      youtubeLink !== (video.YouTubeLink ?? "") ||

      facebookLink !== (video.FaceBookLink ?? "") ||

      instagramLink !== (video.InstagramLink ?? "") ||

      Boolean(videoFile) ||

      Boolean(thumbnailFile) ||

      (
        serverFileName !== "" &&
        serverFileName !== (video.FileName ?? "")
      )
    );
  }, [
    video,
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
    originalEventNameText,
    productionLine,
    hymnName,
    selectedSpeakers,
    manualSpeakers,
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
    serverFileName,
  ]);


  // ==================================================
  // BEFORE UNLOAD
  // ==================================================

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

  // ==================================================
  // UNSAVED NAVIGATION MODAL
  // ==================================================

  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] =
    useState<string | null>(null);

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
  // LOAD VIDEO DATA
  // ==================================================

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!video) return;

    const videoExtra = video as unknown as Record<string, unknown>;

    setTitle(video.ItemName ?? "");
    setItem(
      video.Item_Code != null ? String(video.Item_Code) : ""
    );

    if (video.TDate) {
      const parsedDate = new Date(video.TDate);

      if (!Number.isNaN(parsedDate.getTime())) {
        setDate(toDateTimeLocal(video.TDate));
      }
    }

    setProduction1(
      video.ProdEntity1_Code != null
        ? String(video.ProdEntity1_Code)
        : ""
    );

    setProduction2(
      video.ProdEntity2_Code != null
        ? String(video.ProdEntity2_Code)
        : ""
    );

    setSector(
      video.Sec_Code != null ? String(video.Sec_Code) : ""
    );

    setTranslation(
      video.Translation_Code != null
        ? String(video.Translation_Code)
        : ""
    );

    setProductType(
      video.ItemType_Code != null
        ? String(video.ItemType_Code)
        : ""
    );

    setProductName(video.ItemName ?? "");

    setProductSerial(
      video.ItemSer_Code != null
        ? String(video.ItemSer_Code)
        : ""
    );

    setEventType(
      video.EventType_Code != null
        ? String(video.EventType_Code)
        : ""
    );

    setEventName(
      video.Event_Code != null
        ? String(video.Event_Code)
        : ""
    );

    setProductionLine(
      video.ProdLine_Code != null
        ? String(video.ProdLine_Code)
        : ""
    );

    setHymnName(
      video.Song_Code != null
        ? String(video.Song_Code)
        : ""
    );

    // Registered speakers. Prefer the complete multi-speaker relation;
    // fall back to the legacy Speaker_Code for older API responses.
    const rawSpeakerCodes = Array.isArray(videoExtra.speakerCodes)
      ? videoExtra.speakerCodes
      : Array.isArray(videoExtra.VideoSpeakers)
        ? (videoExtra.VideoSpeakers as Array<{
            Speaker_Code?: number | string;
            speakerCode?: number | string;
            Speaker?: { Code?: number | string };
          }>).map(
            (entry) =>
              entry.Speaker_Code ??
              entry.speakerCode ??
              entry.Speaker?.Code
          )
        : video.Speaker_Code != null
          ? [video.Speaker_Code]
          : [];

    setSelectedSpeakers(normalizeSpeakerCodes(rawSpeakerCodes));

    // Manual speakers may arrive as a JSON string or an already-parsed array.
    setManualSpeakers(
      normalizeManualSpeakers(
        videoExtra.manualSpeakers ?? videoExtra.Manual_Speakers
      )
    );

    // setSpeakerName(
    //   video.Speaker_Code != null
    //     ? String(video.Speaker_Code)
    //     : ""
    // );

    setIsRepeated(
      Boolean(
        videoExtra.IsRepeated ??
          videoExtra.isRepeated ??
          false
      )
    );

    setRepeatType(
      videoExtra.RepeatType != null
        ? String(videoExtra.RepeatType)
        : videoExtra.repeatType != null
          ? String(videoExtra.repeatType)
          : ""
    );

    setContentType(
      video.ContentType_Code != null
        ? String(video.ContentType_Code)
        : ""
    );

    setChannelName(
      video.ChannelName ??
        (video.Channel_Code != null
          ? String(video.Channel_Code)
          : "")
    );

    setContent1(
      String(videoExtra.Content1 ?? videoExtra.content1 ?? "")
    );

    setContent2(
      String(videoExtra.Content2 ?? videoExtra.content2 ?? "")
    );

    setContent3(
      String(videoExtra.Content3 ?? videoExtra.content3 ?? "")
    );

    setContent4(
      String(videoExtra.Content4 ?? videoExtra.content4 ?? "")
    );

    setContent5(
      String(videoExtra.Content5 ?? videoExtra.content5 ?? "")
    );

    const existingDuration =
      videoExtra.Duration ?? videoExtra.duration;

    if (
      existingDuration != null &&
      existingDuration !== ""
    ) {
      setVideoDuration(String(existingDuration));
    } else {
      setVideoDuration("");
    }

    setYoutubeLink(video.YouTubeLink ?? "");
    setFacebookLink(video.FaceBookLink ?? "");
    setInstagramLink(video.InstagramLink ?? "");

    setExistingVideoFileName(video.FileName ?? "");
    setExistingThumbnailFileName(video.ImageLink ?? "");

    // Reset replacement selections when loading a video
    setVideoFile(null);
    setServerFileName("");
    setThumbnailFile(null);

    if (video.FileName) {
      setVideoUrl(getFileUrl(video.FileName));
    } else {
      setVideoUrl("");
    }

    if (video.ImageLink) {
      setThumbnailUrl(getThumbnailUrl(video.ImageLink));
    } else {
      setThumbnailUrl("");
    }

    // setIsFormInitialized(true);
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
      video.Event_Code != null
        ? String(video.Event_Code)
        : "";

    if (!eventCode) {
      setEventNameText("");
      setOriginalEventNameText("");
      setEventTextInitializedForCode(videoCode);
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
  // VIDEO SELECT FROM DEVICE
  // ==================================================

  const handleVideoSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (isLocked) {
      event.target.value = "";
      return;
    }

    setError("");

    if (!isValidVideoFile(file)) {
      setError("من فضلك اختر ملف فيديو صالح.");
      event.target.value = "";
      return;
    }

    // Revoke previous local preview
    if (videoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(videoUrl);
    }

    const url = URL.createObjectURL(file);

    // Device source replaces server selection
    setVideoFile(file);
    setServerFileName("");
    setVideoUrl(url);
    setVideoDuration("");

    const videoElement = document.createElement("video");

    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = () => {
      if (Number.isFinite(videoElement.duration)) {
        setVideoDuration(
          formatDuration(videoElement.duration)
        );
      }
    };

    videoElement.src = url;

    setShowServerBrowser(false);
  };

  // ==================================================
  // VIDEO SELECT FROM SERVER
  // ==================================================

  const handleServerVideoSelect = (
    fileName: string,
    fileUrl?: string
  ) => {
    if (isLocked) return;

    const selectedFileName = fileName.trim();

    if (!selectedFileName) {
      setError("اسم ملف الفيديو غير صالح.");
      return;
    }

    // Revoke previous local preview only
    if (videoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(videoUrl);
    }

    setError("");

    // Clear device upload selection
    setVideoFile(null);

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }

    // Store server filename for update API
    setServerFileName(selectedFileName);

    // Server video is not uploaded again
    setVideoUrl(
      fileUrl || getFileUrl(selectedFileName)
    );

    setVideoDuration("");
    setShowServerBrowser(false);
  };

  // ==================================================
  // VIDEO DRAG AND DROP
  // ==================================================

  const handleVideoDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsVideoDragging(false);

    if (isLocked) return;

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

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
  // REMOVE / CANCEL VIDEO SELECTION
  // ==================================================

  const handleRemoveVideo = () => {
    if (isLocked) return;

    if (videoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(null);
    setServerFileName("");
    setVideoDuration("");

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }

    // Restore the original saved video.
    // The current backend does not support clearing FileName.
    if (video?.FileName) {
      setVideoUrl(getFileUrl(video.FileName));
      setExistingVideoFileName(video.FileName);
    } else {
      setVideoUrl("");
      setExistingVideoFileName("");
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

    if (isLocked) {
      event.target.value = "";
      return;
    }

    setError("");

    if (!isValidThumbnailFile(file)) {
      setError("من فضلك اختر صورة صالحة.");
      event.target.value = "";
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
    if (isLocked) return;

    if (thumbnailUrl.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailUrl);
    }

    setThumbnailFile(null);

    // Restore the original thumbnail.
    // The current backend does not support clearing ImageLink.
    if (video?.ImageLink) {
      setThumbnailUrl(getThumbnailUrl(video.ImageLink));
    } else {
      setThumbnailUrl("");
    }

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
      setError("من فضلك أدخل التاريخ.");
      return;
    }

    if (!productName.trim()) {
      setError("من فضلك أدخل اسم المنتج.");
      return;
    }

    if (
      !videoFile &&
      !serverFileName &&
      !existingVideoFileName
    ) {
      setError(
        "لا يوجد ملف فيديو حالي، من فضلك اختر ملف الفيديو."
      );
      return;
    }

    // ==================================================
    // FORM DATA
    // ==================================================

    const formData = new FormData();

    formData.append("date", date);
    formData.append("title", title);
    formData.append("item", item);

    if (production1) formData.append("production1", production1);
    if (production2) formData.append("production2", production2);

    if (sector) formData.append("sector", sector);

    if (translation.trim()) {
      formData.append("translation", translation);
    }

    if (productType) formData.append("productType", productType);

    if (productName.trim()) {
      formData.append("productName", productName.trim());
    }

    if (productSerial.trim()) {
      formData.append("productSerial", productSerial);
    }

    if (eventType) formData.append("eventType", eventType);
    if (eventName) formData.append("eventName", eventName);

    if (productionLine) {
      formData.append("productionLine", productionLine);
    }

    if (hymnName) formData.append("hymnName", hymnName);
  
    formData.append("speakerCodes",JSON.stringify(selectedSpeakers));
    formData.append("manualSpeakers",JSON.stringify(manualSpeakers));
   
   
    // if (speakerName) formData.append("speakerName", speakerName);

    formData.append("isRepeated", String(isRepeated));

    if (repeatType) formData.append("repeatType", repeatType);

    if (youtubeLink.trim()) {
      formData.append("youtubeLink", youtubeLink.trim());
    }

    if (facebookLink.trim()) {
      formData.append("facebookLink", facebookLink.trim());
    }

    if (instagramLink.trim()) {
      formData.append("instagramLink", instagramLink.trim());
    }

    formData.append("channelName", channelName);

    formData.append("contentType", contentType);
    formData.append("content1", content1);
    formData.append("content2", content2);
    formData.append("content3", content3);
    formData.append("content4", content4);
    formData.append("content5", content5);

    formData.append("duration", videoDuration);

    // ==================================================
    // VIDEO SOURCE
    // ==================================================

    if (videoFile) {
      formData.append("videoFile", videoFile);
    } else if (
      serverFileName &&
      serverFileName !== (video?.FileName ?? "")
    ) {
      formData.append("serverFileName", serverFileName);
    }

    // ==================================================
    // THUMBNAIL
    // ==================================================

    if (thumbnailFile) {
      formData.append("thumbnailFile", thumbnailFile);
    }

    // ==================================================
    // UPLOAD PROGRESS SETUP
    // ==================================================

    const uploadId = `${code}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

    setUploadProgress(0);
    setUploadPhase(videoFile ? "uploading" : "processing");

    registerVideoUploadProgress(uploadId, {
      onProgress: (percentage) => {
        setUploadProgress(percentage);
      },

      onUploadComplete: () => {
        setUploadProgress(100);
        setUploadPhase("processing");
      },
    });

    // ==================================================
    // SEND UPDATE
    // ==================================================

    try {
      // Update existing event name if changed
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

      // Admin update / regular update
      if (isAdmin) {
        await adminUpdateVideoWithProgress({
          code,
          formData,
          uploadId,
        }).unwrap();
      } else {
        await updateVideoWithProgress({
          code,
          formData,
          uploadId,
        }).unwrap();
      }

      setUploadProgress(100);
      setUploadPhase("completed");

      toast.success("تم تحديث الفيديو بنجاح.");

      router.push("/videos");
    } catch (requestError: unknown) {
      console.error("Update video error:", requestError);

      const message = getApiErrorMessage(
        requestError,
        "حدث خطأ أثناء تحديث الفيديو."
      );

      toast.error(message);
    } finally {
      unregisterVideoUploadProgress(uploadId);
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
    } catch (requestError: unknown) {
      const message = getApiErrorMessage(
        requestError,
        "حدث خطأ أثناء تقديم الفيديو."
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
    } catch (requestError: unknown) {
      const message = getApiErrorMessage(
        requestError,
        "حدث خطأ أثناء حذف الفيديو."
      );

      toast.error(message);
    } finally {
      setIsDeletingVideo(false);
    }
  };

  // ==================================================
  // DOWNLOAD VIDEO
  // ==================================================
  const handleDownloadVideo = async () => {
    if (!code || !Number.isFinite(code)) return;

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        toast.error("يرجى تسجيل الدخول أولاً");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${code}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();

      const fileName =
        existingVideoFileName ||
        serverFileName ||
        `video-${code}.mp4`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("تم تحميل الفيديو بنجاح");
    } catch (error) {
      console.error("Video download error:", error);
      toast.error("خطأ في تحميل الملف");
    }
  };



    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newValue, setNewValue] = useState("");
    const [addType, setAddType] = useState<"item" | "production1" | "production2" | "sector" | "translation" | "productType" | "eventType" | "productionLine" | "productSerial" | "song" | "speaker" | "channel" | null>(null);
  
  
    const handleAddItem = async () => {
      if (!newValue.trim() || !addType) return;
  
      try {
        switch (addType) {
          case "item":
            await addItem({ DescA: newValue.trim() }).unwrap();
            await refetchItems();
            break;
  
          case "production1":
            await addProductEntityOne({ DescA: newValue.trim() }).unwrap();
            await refetchProductEntitiesOne();
            break;
  
          case "production2":
            await addProductEntityTwo({ DescA: newValue.trim() }).unwrap();
            await refetchProductEntitiesTwo();
            break;
  
          case "sector":
            await addSector({ DescA: newValue.trim() }).unwrap();
            await refetchSectors();
            break;
  
          case "translation":
            await addTranslation({ DescA: newValue.trim() }).unwrap();
            await refetchTranslations();
            break;
  
          case "productType":
            await addItemType({ DescA: newValue.trim() }).unwrap();
            await refetchItemsType();
            break;
  
          case "eventType":
            await addEventType({ DescA: newValue.trim() }).unwrap();
            await refetchEventTypes();
            break;
  
          case "productionLine":
            await addProdLine({ DescA: newValue.trim() }).unwrap();
            await refetchProductionLines();
            break;
  
          case "productSerial":
            await addItemSer({ DescA: newValue.trim() }).unwrap();
            await refetchItemsSer();
          break;
  
          case "song":
            await addSong({ DescA: newValue.trim() }).unwrap();
            await refetchSongs();
            break;
  
          case "speaker":
            await addSpeaker({ DescA: newValue.trim() }).unwrap();
            await refetchSpeakers();
            break;
  
          case "channel":
            await addChannel({ DescA: newValue.trim() }).unwrap();
            await refetchChannels();
            break;
        }
  
        toast.success("تمت الإضافة بنجاح");
        closeAddModal();
  
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "حدث خطأ أثناء الإضافة"));
      }
    };
  
  
    const openAddModal = (type: NonNullable<typeof addType>) => {
      setAddType(type);
      setNewValue("");
      setIsAddModalOpen(true);
    };
  
    const closeAddModal = () => {
      setIsAddModalOpen(false);
      setNewValue("");
      setAddType(null);
    };
  
    const getAddModalTitle = () => {
      switch (addType) {
        case "item": return "إضافة صنف";
        case "production1": return "إضافة جهة إنتاج 1";
        case "production2": return "إضافة جهة إنتاج 2";
        case "sector": return "إضافة قطاع";
        case "translation": return "إضافة ترجمة";
        case "productType": return "إضافة نوع منتج";
        case "eventType": return "إضافة نوع حدث";
        case "productionLine": return "إضافة خط إنتاج";
        case "productSerial": return "إضافة تسلسل منتج";
        case "song": return "إضافة ترنيمة";
        case "speaker": return "إضافة متكلم";
        case "channel": return "إضافة قناة";
        default: return "إضافة عنصر";
      }
    };

  return {
    // Refs
    videoInputRef,
    thumbnailInputRef,
    dateInputRef,

    // Router
    router,
    code,
    pathname,

    // Video
    videoFile,
    setVideoFile,
    videoUrl,
    setVideoUrl,
    videoDuration,
    setVideoDuration,
    isVideoDragging,
    setIsVideoDragging,
    existingVideoFileName,
    setExistingVideoFileName,
    handleDownloadVideo,
    // isDownloading,

    // Server video browser
    serverFileName,
    setServerFileName,
    serverVideos,
    serverSearch,
    setServerSearch,
    serverPage,
    serverTotalPages,
    serverTotal,
    serverVideosError,
    isLoadingServerVideos,
    showServerBrowser,
    setShowServerBrowser,
    loadServerVideos,
    openServerBrowser,
    closeServerBrowser,
    handleServerSearch,
    handleServerPageChange,
    handleServerVideoSelect,

    // Thumbnail
    thumbnailFile,
    setThumbnailFile,
    thumbnailUrl,
    setThumbnailUrl,
    existingThumbnailFileName,
    setExistingThumbnailFileName,

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

    // Video information
    title,
    setTitle,
    date,
    setDate,

    // Production
    production1,
    setProduction1,
    production2,
    setProduction2,
    productionLine,
    setProductionLine,

    // Sector / Translation
    sector,
    setSector,
    translation,
    setTranslation,

    // Authentication
    user,
    authLoading,
    isAuthenticated,
    isAdmin,
    currentUserId,

    // Lookup data
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

    // Video API
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

    // Permissions
    isSubmitted,
    isOwner,
    canEdit,
    canDelete,
    isLocked,

    // Product
    productType,
    setProductType,
    item,
    setItem,
    productName,
    setProductName,
    productSerial,
    setProductSerial,

    // Event
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

    // Hymn / Speaker / Channel
    hymnName,
    setHymnName,
    // speakerName,
    // setSpeakerName,

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

    // Error
    error,
    setError,

    // Layout
    formLayout,
    setFormLayout,
    changeFormLayout,

    // Unsaved changes
    hasUnsavedChanges,
    showUnsavedModal,
    setShowUnsavedModal,
    pendingNavigation,
    setPendingNavigation,
    confirmNavigation,
    cancelNavigation,

    // Handlers
    openDatePicker,
    handleVideoSelect,
    handleVideoDrop,
    handleRemoveVideo,
    handleThumbnailSelect,
    handleRemoveThumbnail,
    handleSave,
    handleSubmit,

    // Delete modal
    showDeleteModal,
    setShowDeleteModal,
    isDeletingVideo,
    handleDelete,

    uploadProgress,
    uploadPhase,
    isSavingUpdate,

    openAddModal,
    isAddModalOpen,
    handleAddItem,
    getAddModalTitle,
    newValue,
    setNewValue,
    closeAddModal


    // setIsFormInitialized,
    // isFormInitialized

  };
}
