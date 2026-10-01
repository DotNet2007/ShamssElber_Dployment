// "use client";

// import { ChangeEvent, useEffect, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// import {
//   ArrowRight,
//   Building2,
//   Calendar,
//   CalendarDays,
//   ChevronDown,
//   FileVideo,
//   Folder,
//   Globe2,
//   Image as ImageIcon,
//   ImagePlus,
//   Layers,
//   ListOrdered,
//   Languages,
//   Music2,
//   Package,
//   Plus,
//   Save,
//   Share2,
//   Trash2,
//   UploadCloud,
//   User,
//   Video,
//   Workflow,
// } from "lucide-react";

// import { formatDuration, formatFileSize } from "@/app/helpers/videoHelper";

// import {
//   useGetEventsQuery,
//   useGetEventTypesQuery,
//   useGetItemTypesQuery,
//   useGetProdLinesQuery,
//   useGetProductEntityOneQuery,
//   useGetProductEntityTwoQuery,
//   useGetSectorsQuery,
//   useGetSongsQuery,
//   useGetSpeakersQuery,
// } from "@/app/services/sectors-api";

// import {
//   useGetVideoByCodeQuery,
//   useUpdateVideoMutation,
//   useSubmitVideoMutation,
// } from "@/app/services/videos-api";

// import { jwtDecode } from "jwt-decode";

// // ==================================================
// // AUTH HELPERS
// // ==================================================

// const getDecodedToken = (): any | null => {
//   try {
//     const token = localStorage.getItem("userToken");

//     if (!token) {
//       return null;
//     }

//     return jwtDecode<any>(token);
//   } catch {
//     return null;
//   }
// };

// // ==================================================
// // GET ADMIN STATUS
// // ==================================================

// const getIsAdminFromToken = (): boolean => {
//   const decoded = getDecodedToken();

//   if (!decoded) {
//     return false;
//   }

//   return (
//     decoded?.isAdmin === true ||
//     decoded?.isAdmin === "Y" ||
//     decoded?.role === "ADMIN"
//   );
// };

// // ==================================================
// // GET CURRENT USER ID
// // ==================================================

// const getCurrentUserIdFromToken = (): number | null => {
//   const decoded = getDecodedToken();

//   if (!decoded) {
//     return null;
//   }

//   if (decoded?.id == null) {
//     return null;
//   }

//   const id = Number(decoded.id);

//   return Number.isFinite(id) ? id : null;
// };

// // ==================================================
// // PAGE
// // ==================================================

// export default function EditVideoPage() {
//   const params = useParams<{ code: string }>();
//   const router = useRouter();

//   const code = Number(params?.code);

//   const videoInputRef =
//     useRef<HTMLInputElement>(null);

//   const thumbnailInputRef =
//     useRef<HTMLInputElement>(null);

//   // ==================================================
//   // VIDEO
//   // ==================================================

//   const [videoFile, setVideoFile] =
//     useState<File | null>(null);

//   const [videoUrl, setVideoUrl] =
//     useState("");

//   const [videoDuration, setVideoDuration] =
//     useState("");

//   // ==================================================
//   // THUMBNAIL
//   // ==================================================

//   const [thumbnailFile, setThumbnailFile] =
//     useState<File | null>(null);

//   const [thumbnailUrl, setThumbnailUrl] =
//     useState("");

//   const [mainUploadChannel, setMainUploadChannel] =
//     useState("");

//   const [youtubeLink, setYoutubeLink] =
//     useState("");

//   const [facebookLink, setFacebookLink] =
//     useState("");

//   const [instagramLink, setInstagramLink] =
//     useState("");

//   const [content1, setContent1] =
//     useState("");

//   const [content2, setContent2] =
//     useState("");

//   const [content3, setContent3] =
//     useState("");

//   const [content4, setContent4] =
//     useState("");

//   const [content5, setContent5] =
//     useState("");

//   // ==================================================
//   // VIDEO INFORMATION
//   // ==================================================

//   const [title, setTitle] =
//     useState("");

//   const [date, setDate] =
//     useState("");

//   // ==================================================
//   // PRODUCTION
//   // ==================================================

//   const [production1, setProduction1] =
//     useState("");

//   const [production2, setProduction2] =
//     useState("");

//   // ==================================================
//   // SECTOR / TRANSLATION
//   // ==================================================

//   const [sector, setSector] =
//     useState("");

//   const [translation, setTranslation] =
//     useState("");

//   // ==================================================
//   // DROPDOWNS
//   // ==================================================

//   const {
//     data: items = [],
//     isLoading: itemsIsLoading,
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
//   } = useGetEventsQuery();

//   // ==================================================
//   // VIDEO QUERY
//   // ==================================================

//   const {
//     data: videoResponse,
//     isLoading: isVideoLoading,
//     isError: isVideoError,
//     error: videoError,
//   } = useGetVideoByCodeQuery(code, {
//     skip: !Number.isFinite(code),
//   });

//   const video = videoResponse?.data;

//   // ==================================================
//   // PERMISSIONS
//   // ==================================================

//   const isAdmin =
//     getIsAdminFromToken();

//   const currentUserId =
//     getCurrentUserIdFromToken();

//   const isSubmitted =
//     String(video?.RecordStatus ?? "")
//       .toUpperCase() === "SUBMITTED";

//   const isOwner =
//     currentUserId !== null &&
//     Number(video?.Emp_Code) === currentUserId;

//   /*
//     Permission Matrix:

//     ADMIN
//       Draft     -> Edit
//       Submitted -> Edit

//     OWNER
//       Draft     -> Edit
//       Submitted -> Read Only

//     OTHER USER
//       Draft     -> Read Only
//       Submitted -> Read Only
//   */

//   const canEdit =
//     isAdmin ||
//     (!isSubmitted && isOwner);

//   const isLocked =
//     !canEdit;

//   // ==================================================
//   // MUTATIONS
//   // ==================================================

//   const [
//     updateVideo,
//     { isLoading: isSaving },
//   ] = useUpdateVideoMutation();

//   const [
//     submitVideo,
//     { isLoading: isSubmitting },
//   ] = useSubmitVideoMutation();

//   // ==================================================
//   // EXISTING FILES
//   // ==================================================

//   const [
//     existingVideoFileName,
//     setExistingVideoFileName,
//   ] = useState("");

//   const [
//     existingThumbnailFileName,
//     setExistingThumbnailFileName,
//   ] = useState("");

//   // ==================================================
//   // PRODUCT
//   // ==================================================

//   const [productType, setProductType] =
//     useState("");

//   const [productName, setProductName] =
//     useState("");

//   const [productSerial, setProductSerial] =
//     useState("");

//   // ==================================================
//   // EVENT
//   // ==================================================

//   const [eventType, setEventType] =
//     useState("");

//   const [eventName, setEventName] =
//     useState("");

//   // ==================================================
//   // PRODUCTION LINE
//   // ==================================================

//   const [productionLine, setProductionLine] =
//     useState("");

//   // ==================================================
//   // HYMN / SPEAKER
//   // ==================================================

//   const [hymnName, setHymnName] =
//     useState("");

//   const [speakerName, setSpeakerName] =
//     useState("");

//   // ==================================================
//   // REPEATED
//   // ==================================================

//   const [isRepeated, setIsRepeated] =
//     useState(false);

//   const [repeatType, setRepeatType] =
//     useState("");

//   // ==================================================
//   // OTHER
//   // ==================================================

//   const [description, setDescription] =
//     useState("");

//   const [notes, setNotes] =
//     useState("");

//   // ==================================================
//   // ERROR
//   // ==================================================

//   const [error, setError] =
//     useState("");

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

//   const getFileUrl = (
//     fileName: string | null | undefined
//   ) => {
//     if (!fileName) {
//       return "";
//     }

//     const value = fileName.trim();

//     if (!value) {
//       return "";
//     }

//     if (
//       value.startsWith("http://") ||
//       value.startsWith("https://")
//     ) {
//       return value;
//     }

//     if (value.startsWith("/")) {
//       return `${API_URL}${value}`;
//     }

//     return `${API_URL}/uploads/videos/${encodeURIComponent(
//       value
//     )}`;
//   };

//   // ==================================================
//   // LOAD VIDEO DATA
//   // ==================================================

//   useEffect(() => {
//     if (!video) {
//       return;
//     }

//     setTitle(video.ItemName ?? "");

//     if (video.TDate) {
//       const parsedDate =
//         new Date(video.TDate);

//       if (
//         !Number.isNaN(
//           parsedDate.getTime()
//         )
//       ) {
//         const localDate =
//           new Date(
//             parsedDate.getTime() -
//               parsedDate.getTimezoneOffset() *
//                 60000
//           )
//             .toISOString()
//             .slice(0, 16);

//         setDate(localDate);
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
//       video.Sec_Code != null
//         ? String(video.Sec_Code)
//         : ""
//     );

//     setTranslation(
//       video.Translate ?? ""
//     );

//     setProductType(
//       video.ItemType_Code != null
//         ? String(video.ItemType_Code)
//         : ""
//     );

//     setProductName(
//       video.ItemName ?? ""
//     );

//     setProductSerial(
//       video.ItemSer ?? ""
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

//     setSpeakerName(
//       video.Speaker_Code != null
//         ? String(video.Speaker_Code)
//         : ""
//     );

//     setMainUploadChannel(
//       video.ChannelName ?? ""
//     );

//     setYoutubeLink(
//       video.YouTubeLink ?? ""
//     );

//     setFacebookLink(
//       video.FaceBookLink ?? ""
//     );

//     setInstagramLink(
//       video.InstagramLink ?? ""
//     );

//     setExistingVideoFileName(
//       video.FileName ?? ""
//     );

//     setExistingThumbnailFileName(
//       video.ImageLink ?? ""
//     );

//     if (video.FileName) {
//       setVideoUrl(
//         getFileUrl(video.FileName)
//       );
//     }

//     if (video.ImageLink) {
//       setThumbnailUrl(
//         getFileUrl(video.ImageLink)
//       );
//     }
//   }, [video]);

//   // ==================================================
//   // VIDEO SELECT
//   // ==================================================

//   const handleVideoSelect = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     const file =
//       event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     setError("");

//     if (!file.type.startsWith("video/")) {
//       setError(
//         "من فضلك اختر ملف فيديو صالح."
//       );

//       return;
//     }

//     if (videoUrl) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     const url =
//       URL.createObjectURL(file);

//     setVideoFile(file);
//     setVideoUrl(url);
//     setVideoDuration("");

//     const videoElement =
//       document.createElement("video");

//     videoElement.preload =
//       "metadata";

//     videoElement.onloadedmetadata =
//       () => {
//         window.URL.revokeObjectURL(
//           videoElement.src
//         );

//         const duration =
//           videoElement.duration;

//         if (
//           Number.isFinite(duration)
//         ) {
//           setVideoDuration(
//             formatDuration(duration)
//           );
//         }
//       };

//     videoElement.src = url;
//   };

//   // ==================================================
//   // REMOVE VIDEO
//   // ==================================================

//   const handleRemoveVideo = () => {
//     if (videoUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     setVideoFile(null);
//     setVideoDuration("");

//     if (existingVideoFileName) {
//       setVideoUrl(
//         getFileUrl(
//           existingVideoFileName
//         )
//       );
//     } else {
//       setVideoUrl("");
//     }

//     if (videoInputRef.current) {
//       videoInputRef.current.value =
//         "";
//     }
//   };

//   // ==================================================
//   // THUMBNAIL SELECT
//   // ==================================================

//   const handleThumbnailSelect = (
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     const file =
//       event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     setError("");

//     if (!file.type.startsWith("image/")) {
//       setError(
//         "من فضلك اختر صورة صالحة."
//       );

//       return;
//     }

//     if (thumbnailUrl) {
//       URL.revokeObjectURL(
//         thumbnailUrl
//       );
//     }

//     const url =
//       URL.createObjectURL(file);

//     setThumbnailFile(file);
//     setThumbnailUrl(url);
//   };

//   // ==================================================
//   // REMOVE THUMBNAIL
//   // ==================================================

//   const handleRemoveThumbnail = () => {
//     if (thumbnailUrl) {
//       URL.revokeObjectURL(
//         thumbnailUrl
//       );
//     }

//     setThumbnailFile(null);
//     setThumbnailUrl("");

//     if (thumbnailInputRef.current) {
//       thumbnailInputRef.current.value =
//         "";
//     }
//   };

//   // ==================================================
//   // SAVE VIDEO
//   // ==================================================

//   const handleSave = async () => {

//     // IMPORTANT:
//     // Frontend permission guard
//     if (!canEdit) {
//       setError(
//         "ليس لديك صلاحية لتعديل هذا الفيديو."
//       );

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

//     if (!title.trim()) {
//       setError(
//         "من فضلك أدخل الصنف."
//       );

//       return;
//     }

//     if (!productName.trim()) {
//       setError(
//         "من فضلك أدخل اسم المنتج."
//       );

//       return;
//     }

//     if (!productSerial.trim()) {
//       setError(
//         "من فضلك أدخل تسلسل المنتج."
//       );

//       return;
//     }

//     if (
//       !videoFile &&
//       !existingVideoFileName
//     ) {
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

//     // ==================================================
//     // UPLOAD CHANNELS
//     // ==================================================

//     if (mainUploadChannel) {
//       formData.append(
//         "mainUploadChannel",
//         mainUploadChannel
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
//     // CONTENT
//     // ==================================================

//     if (content1.trim()) {
//       formData.append(
//         "content1",
//         content1
//       );
//     }

//     if (content2.trim()) {
//       formData.append(
//         "content2",
//         content2
//       );
//     }

//     if (content3.trim()) {
//       formData.append(
//         "content3",
//         content3
//       );
//     }

//     if (content4.trim()) {
//       formData.append(
//         "content4",
//         content4
//       );
//     }

//     if (content5.trim()) {
//       formData.append(
//         "content5",
//         content5
//       );
//     }

//     // ==================================================
//     // VIDEO INFORMATION
//     // ==================================================

//     formData.append(
//       "duration",
//       videoDuration
//     );

//     if (description.trim()) {
//       formData.append(
//         "description",
//         description
//       );
//     }

//     if (notes.trim()) {
//       formData.append(
//         "notes",
//         notes
//       );
//     }

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
//     // SEND
//     // ==================================================

//     try {
//       const result =
//         await updateVideo({
//           code,
//           formData,
//         }).unwrap();

//       console.log(
//         "Video updated:",
//         result
//       );

//       alert(
//         "تم تحديث الفيديو بنجاح."
//       );

//       router.push("/videos");

//     } catch (error: any) {

//       console.error(
//         "Update video error:",
//         error
//       );

//       const message =
//         error?.data?.message ||
//         "حدث خطأ أثناء تحديث الفيديو.";

//       setError(message);
//     }
//   };

//   // ==================================================
//   // SUBMIT VIDEO
//   // ==================================================

//   const handleSubmit = async () => {

//     // IMPORTANT:
//     // Frontend permission guard
//     if (!canEdit) {
//       setError(
//         "ليس لديك صلاحية لتقديم هذا الفيديو."
//       );

//       return;
//     }

//     // Only Draft can be submitted
//     if (!isSubmitted) {

//       setError("");

//       try {

//         await submitVideo(code).unwrap();

//         alert(
//           "تم تقديم الفيديو للمراجعة بنجاح."
//         );

//         router.push("/videos");

//       } catch (error: any) {

//         console.error(
//           "Submit video error:",
//           error
//         );

//         const message =
//           error?.data?.message ||
//           "حدث خطأ أثناء تقديم الفيديو.";

//         setError(message);
//       }
//     }
//   };

//   // ==================================================
//   // LOADING
//   // ==================================================

//   if (isVideoLoading) {
//     return (
//       <main
//         dir="rtl"
//         className="mx-auto w-full max-w-[1200px] px-5 py-[70px]"
//       >
//         <div className="rounded-[14px] border border-[#e6eaf0] bg-white p-8 text-center text-sm text-[#718096]">
//           جاري تحميل بيانات الفيديو...
//         </div>
//       </main>
//     );
//   }

//   // ==================================================
//   // ERROR
//   // ==================================================

//   if (isVideoError || !video) {
//     return (
//       <main
//         dir="rtl"
//         className="mx-auto w-full max-w-[1200px] px-5 py-[70px]"
//       >
//         <div className="rounded-[14px] border border-red-100 bg-red-50 p-8 text-center text-sm text-red-700">
//           {((videoError as any)?.data?.message) ||
//             "تعذر تحميل بيانات الفيديو."}
//         </div>
//       </main>
//     );
//   }

//   // ==================================================
//   // PAGE
//   // ==================================================

//   return (
//     <main
//       dir="rtl"
//       className="
//         mx-auto
//         w-full
//         max-w-[1200px]
//         px-5
//         py-[70px]
//         max-[768px]:px-3
//         max-[768px]:py-[35px]
//       "
//     >

//       {/* ==================================================
//           PAGE HEADING
//           ================================================== */}

//       <div
//         className="
//           mb-[25px]
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

//           {/* NEW */}

//           <button
//             type="button"
//             onClick={() =>
//               router.push("/videos/add")
//             }
//             className="
//               inline-flex
//               items-center
//               gap-2
//               rounded-lg
//               border
//               border-slate-200
//               bg-white
//               px-4
//               py-2
//               text-sm
//               font-semibold
//               text-slate-700
//               transition
//               hover:bg-slate-50
//             "
//           >
//             <Plus size={16} />
//             جديد
//           </button>

//           {/* SAVE */}

//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={
//               isSaving ||
//               isSubmitting ||
//               !canEdit
//             }
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

//             {isSaving
//               ? "جاري الحفظ..."
//               : "حفظ التعديلات"}
//           </button>

//           {/* SUBMIT */}

//           {video.RecordStatus === "DRAFT" &&
//             canEdit && (
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={
//                   isSaving ||
//                   isSubmitting ||
//                   !canEdit
//                 }
//                 className="
//                   inline-flex
//                   h-10
//                   items-center
//                   justify-center
//                   gap-2
//                   rounded-[9px]
//                   bg-emerald-600
//                   px-4
//                   text-xs
//                   font-semibold
//                   text-white
//                   transition
//                   hover:bg-emerald-700
//                   disabled:cursor-not-allowed
//                   disabled:opacity-60
//                 "
//               >
//                 <Share2 size={16} />

//                 {isSubmitting
//                   ? "جاري التقديم..."
//                   : "تقديم"}
//               </button>
//             )}

//         </div>
//       </div>

//       {/* ==================================================
//           PERMISSION MESSAGE
//           ================================================== */}

//       {!canEdit && (
//         <div
//           className="
//             mb-5
//             rounded-[9px]
//             border
//             border-amber-200
//             bg-amber-50
//             px-4
//             py-3
//             text-xs
//             leading-7
//             text-amber-800
//           "
//         >
//           هذا الفيديو للعرض فقط، وليس لديك صلاحية لتعديله.
//         </div>
//       )}

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
//           mb-[22px]
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
//             justify-between
//             border-b
//             border-[#e6eaf0]
//             px-6
//             py-5
//             max-[600px]:px-4
//           "
//         >

//           <div className="flex items-center gap-3">

//             <div
//               className="
//                 flex
//                 h-[38px]
//                 w-[38px]
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

//         </div>

//         <div className="p-[25px] max-[600px]:p-4">

//           <div
//             className="
//               grid
//               grid-cols-3
//               gap-5
//               max-[900px]:grid-cols-2
//               max-[600px]:grid-cols-1
//             "
//           >

//             {/* 1 */}

//             <FormGroup label="التاريخ">

//               <InputWrapper
//                 icon={<Calendar size={16} />}
//               >

//                 <input
//                   type="datetime-local"
//                   value={date}
//                   onChange={(e) =>
//                     setDate(e.target.value)
//                   }
//                   className={inputClass}
//                   disabled={isLocked}
//                 />

//               </InputWrapper>

//             </FormGroup>

//             {/* 2 */}

//             <FormGroup label="الصنف">

//               <InputWrapper
//                 icon={<Folder size={16} />}
//               >

//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) =>
//                     setTitle(e.target.value)
//                   }
//                   placeholder="أدخل الصنف"
//                   className={inputClass}
//                   disabled={isLocked}
//                 />

//               </InputWrapper>

//             </FormGroup>

//             {/* 3 */}

//             <FormGroup label="جهة انتاج 1">

//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Building2 size={16} />}
//                 onAdd={() =>
//                   console.log(
//                     "إضافة جهة إنتاج 1"
//                   )
//                 }
//                 disabled={isLocked}
//               >

//                 <select
//                   value={production1}
//                   onChange={(e) =>
//                     setProduction1(
//                       e.target.value
//                     )
//                   }
//                   className={selectClass}
//                   disabled={
//                     isLocked ||
//                     productEntitiesOneIsLoading
//                   }
//                 >

//                   <option value="">
//                     {productEntitiesOneIsLoading
//                       ? "جاري تحميل جهة الانتاج..."
//                       : "اختر جهة الانتاج"}
//                   </option>

//                   {productEntitiesOne.map(
//                     (item: any) => (
//                       <option
//                         key={item.Code}
//                         value={item.Code}
//                       >
//                         {item.DescA}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </SelectWrapper>

//             </FormGroup>

//             {/* 4 */}

//             <FormGroup label="جهة انتاج 2">

//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Building2 size={16} />}
//                 onAdd={() =>
//                   console.log(
//                     "إضافة جهة إنتاج 2"
//                   )
//                 }
//                 disabled={isLocked}
//               >

//                 <select
//                   value={production2}
//                   onChange={(e) =>
//                     setProduction2(
//                       e.target.value
//                     )
//                   }
//                   className={selectClass}
//                   disabled={
//                     isLocked ||
//                     productEntitiesTwoIsLoading
//                   }
//                 >

//                   <option value="">
//                     {productEntitiesTwoIsLoading
//                       ? "جاري تحميل جهة الانتاج..."
//                       : "اختر جهة الانتاج"}
//                   </option>

//                   {productEntitiesTwo.map(
//                     (item: any) => (
//                       <option
//                         key={item.Code}
//                         value={item.Code}
//                       >
//                         {item.DescA}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </SelectWrapper>

//             </FormGroup>

//             {/* 5 */}

//             <FormGroup label="القطاع">

//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Layers size={16} />}
//                 onAdd={() =>
//                   console.log(
//                     "إضافة قطاع"
//                   )
//                 }
//                 disabled={isLocked}
//               >

//                 <select
//                   value={sector}
//                   onChange={(e) =>
//                     setSector(
//                       e.target.value
//                     )
//                   }
//                   className={selectClass}
//                   disabled={
//                     isLocked ||
//                     sectorsIsLoading
//                   }
//                 >

//                   <option value="">
//                     {sectorsIsLoading
//                       ? "جاري تحميل القطاعات..."
//                       : "اختر القطاعات"}
//                   </option>

//                   {sectors.map(
//                     (item: any) => (
//                       <option
//                         key={item.Code}
//                         value={item.Code}
//                       >
//                         {item.DescA}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </SelectWrapper>

//             </FormGroup>

//             {/* 6 */}

//             <FormGroup label="الترجمه">

//               <InputWrapper
//                 icon={<Languages size={16} />}
//               >

//                 <input
//                   type="text"
//                   value={translation}
//                   onChange={(e) =>
//                     setTranslation(
//                       e.target.value
//                     )
//                   }
//                   placeholder="ترجمة"
//                   className={inputClass}
//                   disabled={isLocked}
//                 />

//               </InputWrapper>

//             </FormGroup>

//             {/* 7 */}

//             <FormGroup label="نوع المنتج">

//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Package size={16} />}
//                 onAdd={() =>
//                   console.log(
//                     "إضافة نوع منتج"
//                   )
//                 }
//                 disabled={isLocked}
//               >

//                 <select
//                   value={productType}
//                   onChange={(e) =>
//                     setProductType(
//                       e.target.value
//                     )
//                   }
//                   className={selectClass}
//                   disabled={
//                     isLocked ||
//                     itemsIsLoading
//                   }
//                 >

//                   <option value="">
//                     {itemsIsLoading
//                       ? "جاري تحميل أنواع المنتجات..."
//                       : "اختر نوع المنتج"}
//                   </option>

//                   {items.map(
//                     (item: any) => (
//                       <option
//                         key={item.Code}
//                         value={item.Code}
//                       >
//                         {item.DescA}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </SelectWrapper>

//             </FormGroup>

//             {/* 8 */}

//             <FormGroup label="نوع الحدث">

//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<CalendarDays size={16} />}
//                 onAdd={() =>
//                   console.log(
//                     "إضافة نوع حدث"
//                   )
//                 }
//                 disabled={isLocked}
//               >

//                 <select
//                   value={eventType}
//                   onChange={(e) =>
//                     setEventType(
//                       e.target.value
//                     )
//                   }
//                   className={selectClass}
//                   disabled={
//                     isLocked ||
//                     eventTypesIsLoading
//                   }
//                 >

//                   <option value="">
//                     {eventTypesIsLoading
//                       ? "جاري تحميل أنواع الاحداث..."
//                       : "اختر نوع الحدث"}
//                   </option>

//                   {eventTypes.map(
//                     (item: any) => (
//                       <option
//                         key={item.Code}
//                         value={item.Code}
//                       >
//                         {item.DescA}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </SelectWrapper>

//             </FormGroup>

//             {/* 9 */}

//             <FormGroup label="خط الانتاج">

//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Workflow size={16} />}
//                 onAdd={() =>
//                   console.log(
//                     "إضافة خط إنتاج"
//                   )
//                 }
//                 disabled={isLocked}
//               >

//                 <select
//                   value={productionLine}
//                   onChange={(e) =>
//                     setProductionLine(
//                       e.target.value
//                     )
//                   }
//                   className={selectClass}
//                   disabled={
//                     isLocked ||
//                     productionLinesIsLoading
//                   }
//                 >

//                   <option value="">
//                     {productionLinesIsLoading
//                       ? "جاري تحميل خطوط الانتاج..."
//                       : "اختر خط انتاج"}
//                   </option>

//                   {productionLines.map(
//                     (item: any) => (
//                       <option
//                         key={item.Code}
//                         value={item.Code}
//                       >
//                         {item.DescA}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </SelectWrapper>

//             </FormGroup>

//             {/* 10 */}

//             <FormGroup label="اسم المنتج">

//               <InputWrapper
//                 icon={<Package size={16} />}
//               >

//                 <input
//                   type="text"
//                   value={productName}
//                   onChange={(e) =>
//                     setProductName(
//                       e.target.value
//                     )
//                   }
//                   placeholder="اسم المنتج"
//                   className={inputClass}
//                   disabled={isLocked}
//                 />

//               </InputWrapper>

//             </FormGroup>

//             {/* 11 */}

//             <FormGroup label="تسلسل المنتج">

//               <InputWrapper
//                 icon={<ListOrdered size={16} />}
//               >

//                 <input
//                   type="text"
//                   value={productSerial}
//                   onChange={(e) =>
//                     setProductSerial(
//                       e.target.value
//                     )
//                   }
//                   placeholder="تسلسل المنتج"
//                   className={inputClass}
//                   disabled={isLocked}
//                 />

//               </InputWrapper>

//             </FormGroup>

//             {/* EVENT STATUS / EVENT NAME */}

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
//                     {isRepeated
//                       ? "مكرر"
//                       : "غير مكرر"}
//                   </span>

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
//                       onChange={(e) => {

//                         if (isLocked) {
//                           return;
//                         }

//                         const checked =
//                           e.target.checked;

//                         setIsRepeated(
//                           checked
//                         );

//                         setEventName("");
//                       }}
//                       disabled={isLocked}
//                       className="peer sr-only"
//                     />

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

//                     <span
//                       className="
//                         absolute
//                         right-[18px]
//                         top-[2px]
//                         h-4
//                         w-4
//                         rounded-full
//                         bg-white
//                         shadow-sm
//                         transition-all
//                         duration-200
//                         peer-checked:right-[2px]
//                       "
//                     />

//                   </label>

//                 </div>

//               </FormGroup>

//               <FormGroup label="اسم الحدث">

//                 {isRepeated ? (

//                   <SelectWrapper
//                     isAdmin={isAdmin}
//                     icon={
//                       <CalendarDays size={16} />
//                     }
//                     disabled={isLocked}
//                   >

//                     <select
//                       value={eventName}
//                       onChange={(e) =>
//                         setEventName(
//                           e.target.value
//                         )
//                       }
//                       className={selectClass}
//                       disabled={
//                         isLocked ||
//                         eventsIsLoading
//                       }
//                     >

//                       <option value="">
//                         {eventsIsLoading
//                           ? "جاري تحميل الأحداث..."
//                           : "اختر الحدث المكرر"}
//                       </option>

//                       {events
//                         .filter(
//                           (event: any) =>
//                             event.IsRepeated ===
//                             true
//                         )
//                         .map(
//                           (event: any) => (
//                             <option
//                               key={event.Code}
//                               value={event.Code}
//                             >
//                               {event.DescA}
//                             </option>
//                           )
//                         )}

//                     </select>

//                   </SelectWrapper>

//                 ) : (

//                   <InputWrapper
//                     icon={
//                       <CalendarDays size={16} />
//                     }
//                   >

//                     <input
//                       type="text"
//                       value={eventName}
//                       onChange={(e) =>
//                         setEventName(
//                           e.target.value
//                         )
//                       }
//                       placeholder="اكتب اسم الحدث"
//                       className={inputClass}
//                       disabled={isLocked}
//                     />

//                   </InputWrapper>

//                 )}

//               </FormGroup>

//             </div>

//             {/* 13 */}

//             <FormGroup label="اسم الترنيمه">

//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<Music2 size={16} />}
//                 onAdd={() =>
//                   console.log(
//                     "إضافة ترنيمة"
//                   )
//                 }
//                 disabled={isLocked}
//               >

//                 <select
//                   value={hymnName}
//                   onChange={(e) =>
//                     setHymnName(
//                       e.target.value
//                     )
//                   }
//                   className={selectClass}
//                   disabled={
//                     isLocked ||
//                     songsIsLoading
//                   }
//                 >

//                   <option value="">
//                     {songsIsLoading
//                       ? "جاري تحميل الترانيم..."
//                       : "اختر ترنيمه"}
//                   </option>

//                   {songs.map(
//                     (song: any) => (
//                       <option
//                         key={song.Code}
//                         value={song.Code}
//                       >
//                         {song.DescA}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </SelectWrapper>

//             </FormGroup>

//             {/* 14 */}

//             <FormGroup label="اسم المتكلم">

//               <SelectWrapper
//                 isAdmin={isAdmin}
//                 icon={<User size={16} />}
//                 onAdd={() =>
//                   console.log(
//                     "إضافة متكلم"
//                   )
//                 }
//                 disabled={isLocked}
//               >

//                 <select
//                   value={speakerName}
//                   onChange={(e) =>
//                     setSpeakerName(
//                       e.target.value
//                     )
//                   }
//                   className={selectClass}
//                   disabled={
//                     isLocked ||
//                     speakersIsLoading
//                   }
//                 >

//                   <option value="">
//                     {speakersIsLoading
//                       ? "جاري تحميل القائمين ع العمل..."
//                       : "اختر متكلم"}
//                   </option>

//                   {speakers.map(
//                     (speaker: any) => (
//                       <option
//                         key={speaker.Code}
//                         value={speaker.Code}
//                       >
//                         {speaker.DescA}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </SelectWrapper>

//             </FormGroup>

//           </div>

//           {/* ==================================================
//               UPLOAD CHANNELS
//               ================================================== */}

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

//               <FormGroup label="قناة / صفحة الرفع الرئيسية">

//                 <SelectWrapper
//                   isAdmin={isAdmin}
//                   icon={<Video size={16} />}
//                   onAdd={() =>
//                     console.log(
//                       "إضافة قناة رفع"
//                     )
//                   }
//                   disabled={isLocked}
//                 >

//                   <select
//                     value={mainUploadChannel}
//                     onChange={(e) =>
//                       setMainUploadChannel(
//                         e.target.value
//                       )
//                     }
//                     className={selectClass}
//                     disabled={isLocked}
//                   >

//                     <option value="">
//                       اختر قناة / صفحة الرفع
//                     </option>

//                     <option value="youtube">
//                       YouTube
//                     </option>

//                     <option value="facebook">
//                       Facebook
//                     </option>

//                     <option value="instagram">
//                       Instagram
//                     </option>

//                     <option value="all">
//                       جميع المنصات
//                     </option>

//                   </select>

//                 </SelectWrapper>

//               </FormGroup>

//               <FormGroup label="رابط YouTube">

//                 <InputWrapper
//                   icon={<Video size={16} />}
//                 >

//                   <input
//                     type="url"
//                     value={youtubeLink}
//                     onChange={(e) =>
//                       setYoutubeLink(
//                         e.target.value
//                       )
//                     }
//                     placeholder="رابط YouTube"
//                     className={inputClass}
//                     disabled={isLocked}
//                   />

//                 </InputWrapper>

//               </FormGroup>

//               <FormGroup label="رابط Facebook">

//                 <InputWrapper
//                   icon={<Share2 size={16} />}
//                 >

//                   <input
//                     type="url"
//                     value={facebookLink}
//                     onChange={(e) =>
//                       setFacebookLink(
//                         e.target.value
//                       )
//                     }
//                     placeholder="رابط Facebook"
//                     className={inputClass}
//                     disabled={isLocked}
//                   />

//                 </InputWrapper>

//               </FormGroup>

//               <FormGroup label="رابط Instagram">

//                 <InputWrapper
//                   icon={<Globe2 size={16} />}
//                 >

//                   <input
//                     type="url"
//                     value={instagramLink}
//                     onChange={(e) =>
//                       setInstagramLink(
//                         e.target.value
//                       )
//                     }
//                     placeholder="رابط Instagram"
//                     className={inputClass}
//                     disabled={isLocked}
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
//                         flex h-10 items-center justify-center gap-2
//                         rounded-[9px]
//                         border border-red-200
//                         bg-white
//                         px-3
//                         text-xs
//                         font-semibold
//                         text-red-600
//                         transition
//                         hover:bg-red-50
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
//                         flex h-10 items-center justify-center gap-2
//                         rounded-[9px]
//                         border border-blue-200
//                         bg-white
//                         px-3
//                         text-xs
//                         font-semibold
//                         text-blue-600
//                         transition
//                         hover:bg-blue-50
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
//                         flex h-10 items-center justify-center gap-2
//                         rounded-[9px]
//                         border border-pink-200
//                         bg-white
//                         px-3
//                         text-xs
//                         font-semibold
//                         text-pink-600
//                         transition
//                         hover:bg-pink-50
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
//               h-[38px]
//               w-[38px]
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

//             {[1, 2, 3, 4, 5].map(
//               (number) => {

//                 const values = [
//                   content1,
//                   content2,
//                   content3,
//                   content4,
//                   content5,
//                 ];

//                 const setters = [
//                   setContent1,
//                   setContent2,
//                   setContent3,
//                   setContent4,
//                   setContent5,
//                 ];

//                 return (
//                   <FormGroup
//                     key={number}
//                     label={`المحتوى ${number}`}
//                   >

//                     <InputWrapper
//                       icon={
//                         <Package size={16} />
//                       }
//                     >

//                       <input
//                         type="text"
//                         value={
//                           values[number - 1]
//                         }
//                         onChange={(e) =>
//                           setters[number - 1](
//                             e.target.value
//                           )
//                         }
//                         placeholder={`المحتوى ${number}`}
//                         className={inputClass}
//                         disabled={isLocked}
//                       />

//                     </InputWrapper>

//                   </FormGroup>
//                 );
//               }
//             )}

//           </div>

//         </div>

//       </section>

//       {/* ==================================================
//           VIDEO FILE
//           ================================================== */}

//       <section
//         className="
//           mb-[22px]
//           mt-5
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
//             min-h-[78px]
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
//                 h-[38px]
//                 w-[38px]
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
//                 : "لم يتم اختيار فيديو"}

//           </span>

//         </div>

//         <div className="p-6 max-[600px]:p-4">

//           <input
//             ref={videoInputRef}
//             type="file"
//             accept="video/mp4,video/webm,video/ogg,.mkv,.avi,.mov"
//             onChange={handleVideoSelect}
//             disabled={isLocked}
//             hidden
//           />

//           {!videoFile &&
//           !existingVideoFileName ? (

//             <button
//               type="button"
//               onClick={() =>
//                 videoInputRef.current?.click()
//               }
//               disabled={isLocked}
//               className="
//                 flex
//                 min-h-[230px]
//                 w-full
//                 flex-col
//                 items-center
//                 justify-center
//                 rounded-xl
//                 border
//                 border-dashed
//                 border-[#cbd5e1]
//                 bg-[#f8fafc]
//                 px-5
//                 text-center
//                 transition
//                 hover:border-blue-400
//                 hover:bg-[#eff6ff]
//               "
//             >

//               <div
//                 className="
//                   mb-4
//                   flex
//                   h-16
//                   w-16
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-[#dbeafe]
//                   text-[#2563eb]
//                 "
//               >
//                 <UploadCloud size={30} />
//               </div>

//               <h3 className="mb-1 text-sm font-bold text-[#334155]">
//                 لم يتم اختيار ملف فيديو
//               </h3>

//               <p className="text-xs text-[#64748b]">
//                 اضغط هنا لاختيار الفيديو من جهازك
//               </p>

//               <span className="mt-3 text-[11px] text-[#94a3b8]">
//                 MP4 · WebM · MOV · AVI · MKV
//               </span>

//             </button>

//           ) : (

//             <div className="overflow-hidden rounded-xl border border-[#e6eaf0] bg-[#0f172a]">

//               <div className="flex min-h-[250px] items-center justify-center bg-black">

//                 <video
//                   src={videoUrl}
//                   controls
//                   className="
//                     max-h-[500px]
//                     w-full
//                     object-contain
//                   "
//                 />

//               </div>

//               <div
//                 className="
//                   flex
//                   items-center
//                   justify-between
//                   gap-4
//                   bg-white
//                   p-4
//                   max-[600px]:flex-col
//                   max-[600px]:items-stretch
//                 "
//               >

//                 <div className="flex min-w-0 items-center gap-3">

//                   <div
//                     className="
//                       flex
//                       h-11
//                       w-11
//                       shrink-0
//                       items-center
//                       justify-center
//                       rounded-lg
//                       bg-red-50
//                       text-red-500
//                     "
//                   >
//                     <FileVideo size={21} />
//                   </div>

//                   <div className="min-w-0">

//                     <div className="truncate text-sm font-semibold text-[#172033]">
//                       {videoFile
//                         ? videoFile.name
//                         : existingVideoFileName ||
//                           "الفيديو الحالي"}
//                     </div>

//                     <div className="mt-1 flex gap-4 text-[11px] text-[#94a3b8]">

//                       {videoFile ? (
//                         <span>
//                           {formatFileSize(
//                             videoFile.size
//                           )}
//                         </span>
//                       ) : (
//                         existingVideoFileName && (
//                           <span>
//                             الفيديو الحالي
//                           </span>
//                         )
//                       )}

//                       {videoDuration && (
//                         <span>
//                           {videoDuration}
//                         </span>
//                       )}

//                     </div>

//                   </div>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleRemoveVideo}
//                   disabled={isLocked}
//                   className="
//                     inline-flex
//                     h-9
//                     shrink-0
//                     items-center
//                     justify-center
//                     gap-2
//                     rounded-lg
//                     border
//                     border-red-200
//                     bg-white
//                     px-3
//                     text-xs
//                     font-semibold
//                     text-red-500
//                     transition
//                     hover:bg-red-50
//                   "
//                 >
//                   <Trash2 size={15} />
//                   حذف الفيديو
//                 </button>

//               </div>

//             </div>
//           )}

//           {!videoFile && (

//             <button
//               type="button"
//               onClick={() =>
//                 videoInputRef.current?.click()
//               }
//               disabled={isLocked}
//               className="
//                 mt-4
//                 flex
//                 min-h-[64px]
//                 w-full
//                 items-center
//                 gap-3.5
//                 rounded-[10px]
//                 border
//                 border-dashed
//                 border-[#cbd5e1]
//                 bg-[#f8fafc]
//                 px-[18px]
//                 py-3
//                 text-right
//                 transition
//                 hover:border-blue-400
//                 hover:bg-[#eff6ff]
//               "
//             >

//               <div
//                 className="
//                   flex
//                   h-[38px]
//                   w-[38px]
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-lg
//                   bg-[#dbeafe]
//                   text-[#2563eb]
//                 "
//               >
//                 <Plus size={20} />
//               </div>

//               <div className="flex flex-1 flex-col gap-[3px]">

//                 <div className="text-sm font-bold text-[#1e293b]">
//                   إضافة ملف فيديو
//                 </div>

//                 <div className="text-xs text-[#64748b]">
//                   اضغط هنا لاختيار فيديو من جهازك
//                 </div>

//               </div>

//               <ArrowRight
//                 size={18}
//                 className="text-[#94a3b8]"
//               />

//             </button>

//           )}

//         </div>

//       </section>

//       {/* ==================================================
//           THUMBNAIL
//           ================================================== */}

//       <section
//         className="
//           mb-[22px]
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
//               h-[38px]
//               w-[38px]
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
//                 h-[180px]
//                 w-[280px]
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

//                 <img
//                   src={thumbnailUrl}
//                   alt="Video thumbnail"
//                   className="h-full w-full object-cover"
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
//                   onClick={
//                     handleRemoveThumbnail
//                   }
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

//     </main>
//   );
// }

// // ==================================================
// // FORM GROUP
// // ==================================================

// function FormGroup({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex flex-col gap-[7px]">

//       <label className="text-xs font-semibold text-[#4a5568]">
//         {label}
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
//   icon: React.ReactNode;
//   children: React.ReactNode;
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
//   icon: React.ReactNode;
//   children: React.ReactNode;
//   onAdd?: () => void;
//   disabled?: boolean;
//   isAdmin?: boolean;
// }) {
//   return (
//     <div className="flex w-full items-center gap-2">

//       <div className="relative min-w-0 flex-1">

//         <span
//           className="
//             pointer-events-none
//             absolute
//             right-3
//             top-1/2
//             z-10
//             flex
//             -translate-y-1/2
//             items-center
//             justify-center
//             text-[#a0aec0]
//           "
//         >
//           {icon}
//         </span>

//         <span
//           className="
//             pointer-events-none
//             absolute
//             left-3
//             top-1/2
//             z-10
//             flex
//             -translate-y-1/2
//             items-center
//             justify-center
//             text-[#718096]
//           "
//         >
//           <ChevronDown
//             size={16}
//             strokeWidth={2}
//           />
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
//             flex
//             h-11
//             w-11
//             shrink-0
//             items-center
//             justify-center
//             rounded-[9px]
//             border
//             border-[#dfe5ed]
//             bg-white
//             text-[#718096]
//             transition-all
//             duration-200
//             hover:border-[#2563eb]
//             hover:bg-[#eff6ff]
//             hover:text-[#2563eb]
//             active:scale-95
//             disabled:cursor-not-allowed
//             disabled:opacity-50
//           "
//         >
//           <Plus
//             size={18}
//             strokeWidth={2}
//           />
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


"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { ArrowRight, Building2, Calendar, CalendarDays, ChevronDown, FileVideo, Folder, Globe2, Image as ImageIcon, ImagePlus, Layers, ListOrdered, Languages, Music2, Package, Plus, Save, Share2, Trash2, UploadCloud, User, Video, Workflow } from "lucide-react";



import { formatDuration, formatFileSize } from "@/app/helpers/videoHelper";
import { useGetEventsQuery, useGetEventTypesQuery, useGetItemTypesQuery, useGetProdLinesQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetSectorsQuery, useGetSongsQuery, useGetSpeakersQuery } from "@/app/services/sectors-api";
import {
  useGetVideoByCodeQuery,
  useUpdateVideoMutation,
  useSubmitVideoMutation,
  useDeleteVideoMutation,
} from "@/app/services/videos-api";
import { jwtDecode } from "jwt-decode";



const getIsAdminFromToken = (): boolean => {
  try {
    const token = localStorage.getItem("userToken");

    if (!token) return false;

    const decoded: any = jwtDecode(token);

    return (
      decoded?.isAdmin === true ||
      decoded?.isAdmin === "Y" ||
      decoded?.role === "ADMIN"
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

export default function EditVideoPage() {
  const params = useParams<{ code: string }>();
  const router = useRouter();
  const code = Number(params?.code);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

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

  const [mainUploadChannel, setMainUploadChannel] = useState("");

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
  const [date, setDate] = useState("");

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
  // PRODUCT
  // ==================================================

  const { data: items = [], isLoading: itemsIsLoading, refetch: refetchItems, isFetching: itemsIsFetching, isError: itemsIsError } = useGetItemTypesQuery();
  const { data: eventTypes = [], isLoading: eventTypesIsLoading, refetch: refetchEventTypes, isFetching: eventTypesIsFetching, isError: eventTypesIsError } = useGetEventTypesQuery();
  const { data: productionLines = [], isLoading: productionLinesIsLoading, refetch: refetchProductionLines, isFetching: productionLinesIsFetching, isError: productionLinesIsError } = useGetProdLinesQuery();
  
  const { data: sectors = [], isLoading: sectorsIsLoading, refetch: refetchSectors, isFetching: sectorsIsFetching, isError: sectorsIsError } = useGetSectorsQuery();
  const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading, refetch: refetchProductEntitiesOne, isFetching: productEntitiesOneIsFetching, isError: productEntitiesOneIsError } = useGetProductEntityOneQuery();
  const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading, refetch: refetchProductEntitiesTwo, isFetching: productEntitiesTwoIsFetching, isError: productEntitiesTwoIsError } = useGetProductEntityTwoQuery();

  const { data: songs = [], isLoading: songsIsLoading, refetch: refetchSongs, isFetching: songsIsFetching, isError: songsIsError } = useGetSongsQuery();
  const { data: speakers = [], isLoading: speakersIsLoading, refetch: refetchSpeakers, isFetching: speakersIsFetching, isError: speakersIsError } = useGetSpeakersQuery();
  const { data: events = [], isLoading: eventsIsLoading, refetch: refetchEvents, isFetching: eventsIsFetching, isError: eventsIsError } = useGetEventsQuery();

  const {
    data: videoResponse,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError,
    refetch: refetchVideo,
  } = useGetVideoByCodeQuery(code, { skip: !Number.isFinite(code) });

  const video = videoResponse?.data;

  // ==================================================
  // PERMISSIONS / LOCK STATE
  // ==================================================

  const isAdmin = getIsAdminFromToken();
  const currentUserId = getCurrentUserIdFromToken();

  const isSubmitted =
    String(video?.RecordStatus ?? "").toUpperCase() === "SUBMITTED";

  const isOwner =
    currentUserId !== null &&
    Number(video?.Emp_Code) === currentUserId;

  // Admin can edit any video.
  // Non-admin users can edit only their own DRAFT videos.
  const canEdit =
    isAdmin ||
    (!isSubmitted && isOwner);

  // Admin can delete any video.
  // Non-admin users can delete only their own DRAFT videos.
  const canDelete =
    isAdmin ||
    (!isSubmitted && isOwner);

  const isLocked = !canEdit;

  const [updateVideo, { isLoading: isSaving }] = useUpdateVideoMutation();

  const [submitVideo, { isLoading: isSubmitting }] =
    useSubmitVideoMutation();

  const [deleteVideo, { isLoading: isDeleting }] =
    useDeleteVideoMutation();

  const [existingVideoFileName, setExistingVideoFileName] = useState("");
  const [existingThumbnailFileName, setExistingThumbnailFileName] = useState("");

  const [productType, setProductType] = useState("");

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

  const [productionLine, setProductionLine] =
    useState("");

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
  // OTHER
  // ==================================================

  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  // ==================================================
  // ERROR
  // ==================================================

  const [error, setError] = useState("");






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

    setProduction1(
      video.ProdEntity1_Code != null ? String(video.ProdEntity1_Code) : ""
    );
    setProduction2(
      video.ProdEntity2_Code != null ? String(video.ProdEntity2_Code) : ""
    );
    setSector(video.Sec_Code != null ? String(video.Sec_Code) : "");
    setTranslation(video.Translate ?? "");
    setProductType(
      video.ItemType_Code != null ? String(video.ItemType_Code) : ""
    );
    setProductName(video.ItemName ?? "");
    setProductSerial(video.ItemSer ?? "");
    setEventType(
      video.EventType_Code != null ? String(video.EventType_Code) : ""
    );
    setEventName(
      video.Event_Code != null ? String(video.Event_Code) : ""
    );
    setProductionLine(
      video.ProdLine_Code != null ? String(video.ProdLine_Code) : ""
    );
    setHymnName(video.Song_Code != null ? String(video.Song_Code) : "");
    setSpeakerName(
      video.Speaker_Code != null ? String(video.Speaker_Code) : ""
    );

    setMainUploadChannel(video.ChannelName ?? "");
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

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    const url = URL.createObjectURL(file);

    setVideoFile(file);
    setVideoUrl(url);
    setVideoDuration("");

    const video = document.createElement("video");

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);

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
    // If the user selected a replacement video, remove only
    // the newly selected file and restore the existing database video.
    if (videoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(null);
    setVideoDuration("");

    if (existingVideoFileName) {
      setVideoUrl(getFileUrl(existingVideoFileName));
    } else {
      setVideoUrl("");
    }

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

    if (!file.type.startsWith("image/")) {
      setError("من فضلك اختر صورة صالحة.");
      return;
    }

    if (thumbnailUrl) {
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
  // RESET
  // ==================================================

  // const handleRefresh = () => {
  //   setError("");
  //   refetchVideo();
  // };

  // ==================================================
  // SAVE
  // ==================================================

  // const handleSave = () => {
  //   setError("");

  //   if (!date) {
  //     setError("من فضلك أدخل التاريخ.");
  //     return;
  //   }

  //   if (!title.trim()) {
  //     setError("من فضلك أدخل الصنف.");
  //     return;
  //   }

  //   if (!productName.trim()) {
  //     setError("من فضلك أدخل اسم المنتج.");
  //     return;
  //   }

  //   if (!productSerial.trim()) {
  //     setError("من فضلك أدخل تسلسل المنتج.");
  //     return;
  //   }

  //   if (!videoFile) {
  //     setError("من فضلك اختر ملف الفيديو.");
  //     return;
  //   }

  //   console.log({
  //     // 1
  //     date,

  //     // 2
  //     title,

  //     // 3
  //     production1,

  //     // 4
  //     production2,

  //     // 5
  //     sector,

  //     // 6
  //     translation,

  //     // 7
  //     productType,

  //     // 8
  //     eventType,

  //     // 9
  //     productionLine,

  //     // 10
  //     productName,

  //     // 11
  //     productSerial,

  //     // 12
  //     eventName,

  //     // 13
  //     hymnName,

  //     // 14
  //     speakerName,

  //     // Repeated
  //     isRepeated,
  //     repeatType,

  //     // Upload channels
  //     mainUploadChannel,
  //     youtubeLink,
  //     facebookLink,
  //     instagramLink,

  //     // Product content
  //     content1,
  //     content2,
  //     content3,
  //     content4,
  //     content5,

  //     // Video
  //     duration: videoDuration,
  //     description,
  //     notes,
  //     videoFile,

  //     // Images
  //     thumbnailFile,
  //   });

  //   alert("تم تجهيز بيانات الفيديو للحفظ.");
  // };

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


    if (!title.trim()) {

      setError(
        "من فضلك أدخل الصنف."
      );

      return;
    }


    if (!productName.trim()) {

      setError(
        "من فضلك أدخل اسم المنتج."
      );

      return;
    }


    if (!productSerial.trim()) {

      setError(
        "من فضلك أدخل تسلسل المنتج."
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


    // ==================================================
    // UPLOAD CHANNELS
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
    // CONTENT
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
    // VIDEO INFORMATION
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


      alert(
        "تم تحديث الفيديو بنجاح."
      );

      router.push("/videos");

    }

    catch (error: any) {

      console.error(
        "Create video error:",
        error
      );


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

  if (isVideoLoading) {
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
          <div className="flex items-center gap-3">
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
        </div>

        {/* BODY */}

        <div className="p-[25px] max-[600px]:p-4">
          <div
            className="
              grid
              grid-cols-3
              gap-5
              max-[900px]:grid-cols-2
              max-[600px]:grid-cols-1
            "
          >
            {/* ==================================================
                1. التاريخ
                ================================================== */}

            <FormGroup label="التاريخ">
              <InputWrapper icon={<Calendar size={16} />}>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* ==================================================
                2. الصنف
                ================================================== */}

            <FormGroup label="الصنف">
              <InputWrapper icon={<Folder size={16} />}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="أدخل الصنف"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
            </FormGroup>

            {/* ==================================================
                3. جهة انتاج 1
                ================================================== */}

            <FormGroup label="جهة انتاج 1">
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

            <FormGroup label="القطاع">
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
              <InputWrapper
                icon={<Languages size={16} />}
              >
                <input
                  type="text"
                  value={translation}
                  onChange={(e) =>
                    setTranslation(e.target.value)
                  }
                  placeholder="ترجمة"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
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
                  disabled={isLocked || itemsIsLoading}
                >
                  <option value="">
                    {itemsIsLoading
                      ? "جاري تحميل أنواع المنتجات..."
                      : "اختر نوع المنتج"}
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
                      : "اختر حط انتاج"}
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

            <FormGroup label="اسم المنتج">
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
              <InputWrapper
                icon={<ListOrdered size={16} />}
              >
                <input
                  type="text"
                  value={productSerial}
                  onChange={(e) =>
                    setProductSerial(e.target.value)
                  }
                  placeholder="تسلسل المنتج"
                  className={inputClass}
                   disabled={isLocked}
                />
              </InputWrapper>
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
                  onAdd={() => console.log("إضافة قناة رفع")}
                 disabled={isLocked}
                >
                  <select
                    value={mainUploadChannel}
                    onChange={(e) => {
                      setMainUploadChannel(e.target.value);
                    }}
                    className={selectClass}
                    disabled={isLocked}
                  >
                    <option value="">
                      اختر قناة / صفحة الرفع
                    </option>

                    <option value="youtube">
                      YouTube
                    </option>

                    <option value="facebook">
                      Facebook
                    </option>

                    <option value="instagram">
                      Instagram
                    </option>

                    <option value="all">
                      جميع المنصات
                    </option>
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

          {!videoFile && (
            <button
              type="button"
              onClick={() =>
                videoInputRef.current?.click()
              }
              disabled={isLocked}
              className="
                mt-4
                flex
                min-h-[64px]
                w-full
                items-center
                gap-3.5
                rounded-[10px]
                border
                border-dashed
                border-[#cbd5e1]
                bg-[#f8fafc]
                px-[18px]
                py-3
                text-right
                transition
                hover:border-blue-400
                hover:bg-[#eff6ff]
              "
            >
              <div
                className="
                  flex
                  h-[38px]
                  w-[38px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#dbeafe]
                  text-[#2563eb]
                "
              >
                <Plus size={20} />
              </div>

              <div className="flex flex-1 flex-col gap-[3px]">
                <div className="text-sm font-bold text-[#1e293b]">
                  إضافة ملف فيديو
                </div>

                <div className="text-xs text-[#64748b]">
                  اضغط هنا لاختيار فيديو من جهازك
                </div>
              </div>

              <ArrowRight
                size={18}
                className="text-[#94a3b8]"
              />
            </button>
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
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label className="text-xs font-semibold text-[#4a5568]">
        {label}
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

// function SelectWrapper({
//   icon,
//   children,
//   onAdd,
//   disabled = false,
// }: {
//   icon: React.ReactNode;
//   children: React.ReactNode;
//   onAdd?: () => void;
//   disabled?: boolean;
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

//       <button
//         type="button"
//         title="إضافة"
//         aria-label="إضافة"
//         onClick={onAdd}
//         disabled={disabled}
//         className="
//           flex h-11 w-11 shrink-0 items-center justify-center
//           rounded-[9px] border border-[#dfe5ed] bg-white
//           text-[#718096] transition-all duration-200
//           hover:border-[#2563eb] hover:bg-[#eff6ff] hover:text-[#2563eb]
//           active:scale-95
//         "
//       >
//         <Plus size={18} strokeWidth={2} />
//       </button>
//     </div>
//   );
// }

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