// "use client";

// import { ChangeEvent, useEffect, useRef, useState } from "react";

// import { Building2, Calendar, CalendarDays, ChevronDown, FileVideo, Folder, Globe2, Image as ImageIcon, ImagePlus, Layers, ListOrdered, Languages, Music2, Package, Plus, RefreshCw, Save, Share2, Trash2, UploadCloud, User, Video, Workflow, Grid3X3, Grid2X2, Rows3 } from "lucide-react";


// import { formatDuration, formatFileSize } from "@/app/helpers/videoHelper";
// import { useGetChannelsQuery, useGetContentTypesQuery, useGetEventsQuery, useGetEventTypesQuery, useGetItemsQuery, useGetItemsSerQuery, useGetItemTypesQuery, useGetProdLinesQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetSectorsQuery, useGetSongsQuery, useGetSpeakersQuery, useGetTranslationsQuery } from "@/app/services/sectors-api";
// import { useCreateVideoMutation } from "@/app/services/videos-api";
// import { getCurrentDateTime } from "@/app/helpers/getCurentDate";
// import { getArabicDayName } from "@/app/helpers/getArabicDayName";
// import { jwtDecode } from "jwt-decode";
// import { toast } from "sonner";

// export default function AddVideoPage() {
//   const videoInputRef = useRef<HTMLInputElement>(null);
//   const thumbnailInputRef = useRef<HTMLInputElement>(null);

//   const getIsAdminFromToken = (): boolean => {
//     try {
//       const token = localStorage.getItem("userToken");
  
//       if (!token) return false;
  
//       const decoded: any = jwtDecode(token);
  
//       return (
//         decoded?.isAdmin === true ||
//         decoded?.isAdmin === "Y" ||
//         decoded?.role === "ADMIN"
//       );
//     } catch {
//       return false;
//     }
//   };
  
//   const getCurrentUserIdFromToken = (): number | null => {
//     try {
//       const token = localStorage.getItem("userToken");
  
//       if (!token) return null;
  
//       const decoded: any = jwtDecode(token);
  
//       if (decoded?.id == null) return null;
  
//       const id = Number(decoded.id);
  
//       return Number.isFinite(id) ? id : null;
//     } catch {
//       return null;
//     }
//   };

 
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [newValue, setNewValue] = useState("");

//   const [formLayout, setFormLayout] = useState<"grid3" | "grid2" | "full">("grid3");
  
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


//   const [contentType, setContentType] = useState("");

//   const isAdmin = getIsAdminFromToken();
//   // ==================================================
//   // PRODUCT
//   // ==================================================

//   const { data: itemsType = [], isLoading: itemsTypeIsLoading, refetch: refetchItemsType, isFetching: itemsTypeIsFetching, isError: itemsTypeIsError } = useGetItemTypesQuery();
//   const { data: eventTypes = [], isLoading: eventTypesIsLoading, refetch: refetchEventTypes, isFetching: eventTypesIsFetching, isError: eventTypesIsError } = useGetEventTypesQuery();
//   const { data: productionLines = [], isLoading: productionLinesIsLoading, refetch: refetchProductionLines, isFetching: productionLinesIsFetching, isError: productionLinesIsError } = useGetProdLinesQuery();
  
//   const { data: sectors = [], isLoading: sectorsIsLoading, refetch: refetchSectors, isFetching: sectorsIsFetching, isError: sectorsIsError } = useGetSectorsQuery();
//   const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading, refetch: refetchProductEntitiesOne, isFetching: productEntitiesOneIsFetching, isError: productEntitiesOneIsError } = useGetProductEntityOneQuery();
//   const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading, refetch: refetchProductEntitiesTwo, isFetching: productEntitiesTwoIsFetching, isError: productEntitiesTwoIsError } = useGetProductEntityTwoQuery();

//   const { data: songs = [], isLoading: songsIsLoading, refetch: refetchSongs, isFetching: songsIsFetching, isError: songsIsError } = useGetSongsQuery();
//   const { data: speakers = [], isLoading: speakersIsLoading, refetch: refetchSpeakers, isFetching: speakersIsFetching, isError: speakersIsError } = useGetSpeakersQuery();
//   const { data: events = [], isLoading: eventsIsLoading, refetch: refetchEvents, isFetching: eventsIsFetching, isError: eventsIsError } = useGetEventsQuery();

//   const { data: items = [], isLoading: itemsIsLoading, refetch: refetchItems, isFetching: itemsIsFetching, isError: itemsIsError } = useGetItemsQuery();
//   const { data: itemsSer = [], isLoading: itemsSerIsLoading, refetch: refetchItemsSer, isFetching: itemsSerIsFetching, isError: itemsSerIsError } = useGetItemsSerQuery();
//   const { data: channels = [], isLoading: channelsIsLoading, refetch: refetchChannels, isFetching: channelsIsFetching, isError: channelsIsError } = useGetChannelsQuery();
//   const { data: translations = [], isLoading: translationsIsLoading, refetch: refetchTranslations, isFetching: translationsIsFetching, isError: translationsIsError } = useGetTranslationsQuery();

//   const { data: contentTypes = [], isLoading: contentTypesIsLoading } = useGetContentTypesQuery(undefined, { skip: !isAdmin });

//   const [ createVideo, { isLoading: isSaving } ] = useCreateVideoMutation();

//   const [productType, setProductType] = useState("");

//   const [item, setItem] = useState("");

//   const [productName, setProductName] = useState("");
//   const [productSerial, setProductSerial] = useState("");

//   // ==================================================
//   // EVENT
//   // ==================================================

//   const [eventType, setEventType] = useState("");
//   const [eventName, setEventName] = useState("");

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

//   useEffect(() => {
//     const saved = localStorage.getItem("video-form-layout");

//     if (
//       saved === "grid3" ||
//       saved === "grid2" ||
//       saved === "full"
//     ) {
//       setFormLayout(saved);
//     }
//   }, []);

//   const changeFormLayout = (layout: "grid3" | "grid2" | "full") => {
//     setFormLayout(layout);
//     localStorage.setItem("video-form-layout", layout);
//   };


//   // ==================================================
//   // CLEANUP VIDEO URL
//   // ==================================================

//   useEffect(() => {
//     return () => {
//       if (videoUrl) {
//         URL.revokeObjectURL(videoUrl);
//       }
//     };
//   }, [videoUrl]);

//   // ==================================================
//   // CLEANUP THUMBNAIL URL
//   // ==================================================

//   useEffect(() => {
//     return () => {
//       if (thumbnailUrl) {
//         URL.revokeObjectURL(thumbnailUrl);
//       }
//     };
//   }, [thumbnailUrl]);

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

//     if (videoUrl) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     const url = URL.createObjectURL(file);

//     setVideoFile(file);
//     setVideoUrl(url);
//     setVideoDuration("");

//     const video = document.createElement("video");

//     video.preload = "metadata";

//     video.onloadedmetadata = () => {
//       window.URL.revokeObjectURL(video.src);

//       const duration = video.duration;

//       if (Number.isFinite(duration)) {
//         setVideoDuration(formatDuration(duration));
//       }
//     };

//     video.src = url;
//   };

//   // ==================================================
//   // REMOVE VIDEO
//   // ==================================================

//   const handleRemoveVideo = () => {
//     if (videoUrl) {
//       URL.revokeObjectURL(videoUrl);
//     }

//     setVideoFile(null);
//     setVideoUrl("");
//     setVideoDuration("");

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

//     if (thumbnailUrl) {
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
//     if (thumbnailUrl) {
//       URL.revokeObjectURL(thumbnailUrl);
//     }

//     setThumbnailFile(null);
//     setThumbnailUrl("");

//     if (thumbnailInputRef.current) {
//       thumbnailInputRef.current.value = "";
//     }
//   };

//   // ==================================================
//   // RESET
//   // ==================================================

//   const handleRefresh = () => {
//     setTitle("");

//     setProduction1("");
//     setProduction2("");

//     setSector("");
//     setTranslation("");

//     setProductType("");
//     setProductName("");
//     setProductSerial("");

//     setEventType("");
//     setEventName("");

//     setProductionLine("");

//     setHymnName("");
//     setSpeakerName("");

//     setIsRepeated(false);
//     setRepeatType("");

//     setYoutubeLink("");
//     setFacebookLink("");
//     setInstagramLink("");

//     setContent1("");
//     setContent2("");
//     setContent3("");
//     setContent4("");
//     setContent5("");

//     setError("");

//     handleRemoveVideo();
//     handleRemoveThumbnail();
//   };



//   // ==================================================
// // SAVE VIDEO
// // ==================================================

// const handleSave = async () => {
//   setError("");

//   // ==================================================
//   // VALIDATION
//   // ==================================================

//   if (!productName.trim()) {
//     setError("من فضلك أدخل اسم المنتج.");
//     return;
//   }

//   // if (!productSerial.trim()) {
//   //   setError("من فضلك اختر تسلسل المنتج.");
//   //   return;
//   // }

//   if (!videoFile) {
//     setError("من فضلك اختر ملف الفيديو.");
//     return;
//   }

//   // ==================================================
//   // CREATE FORMDATA
//   // ==================================================

//   const formData = new FormData();

//   // ==================================================
//   // BASIC INFORMATION
//   // ==================================================

//   formData.append("date", date || "");
//   formData.append("title", title.trim());

//   // ==================================================
//   // PRODUCTION
//   // ==================================================

//   formData.append("production1", production1 || "");
//   formData.append("production2", production2 || "");

//   // ==================================================
//   // SECTOR / TRANSLATION
//   // ==================================================

//   formData.append("sector", sector || "");
//   formData.append("translation", translation || "");

//   // ==================================================
//   // PRODUCT
//   // ==================================================

//   formData.append("productType", productType || "");
//   formData.append("item", item || "");
//   formData.append("productName", productName.trim());
//   formData.append("productSerial", productSerial || "");

//   // ==================================================
//   // EVENT
//   // ==================================================

//   formData.append("eventType", eventType || "");
//   formData.append("eventName", eventName || "");

//   // ==================================================
//   // PRODUCTION LINE
//   // ==================================================

//   formData.append("productionLine", productionLine || "");

//   // ==================================================
//   // HYMN / SPEAKER
//   // ==================================================

//   formData.append("hymnName", hymnName || "");
//   formData.append("speakerName", speakerName || "");

//   // ==================================================
//   // EVENT STATUS
//   // ==================================================

//   formData.append("isRepeated", String(isRepeated));
//   formData.append("repeatType", repeatType || "");

//   // ==================================================
//   // CHANNEL
//   // ==================================================

//   // استخدم channelName لأن ده الـ state المرتبط بالـ select
//   formData.append("channelName", channelName || "");

//   // // لو الـ backend الحالي مستني mainUploadChannel
//   // // نرسل الاثنين لتجنب مشكلة اختلاف الاسم
//   // formData.append("mainUploadChannel", channelName || "");

//   // ==================================================
//   // SOCIAL LINKS
//   // ==================================================

//   formData.append("youtubeLink", youtubeLink.trim());
//   formData.append("facebookLink", facebookLink.trim());
//   formData.append("instagramLink", instagramLink.trim());

//   // ==================================================
//   // CONTENT
//   // ==================================================

//   formData.append("content1", content1.trim());
//   formData.append("content2", content2.trim());
//   formData.append("content3", content3.trim());
//   formData.append("content4", content4.trim());
//   formData.append("content5", content5.trim());

//   // ==================================================
//   // CONTENT TYPE - ADMIN
//   // ==================================================

//   if (isAdmin) {
//     formData.append("contentType", contentType || "");
//   }

//   // ==================================================
//   // VIDEO INFORMATION
//   // ==================================================

//   formData.append("duration", videoDuration || "");
//   // formData.append("description", description.trim());
//   // formData.append("notes", notes.trim());

//   // ==================================================
//   // VIDEO FILE
//   // ==================================================

//   formData.append("videoFile", videoFile, videoFile.name);

//   // ==================================================
//   // THUMBNAIL
//   // ==================================================

//   if (thumbnailFile) {
//     formData.append(
//       "thumbnailFile",
//       thumbnailFile,
//       thumbnailFile.name
//     );
//   }

//   // ==================================================
//   // DEBUG
//   // ==================================================

//   console.log("========== VIDEO FORM DATA ==========");

//   for (const [key, value] of formData.entries()) {
//     if (value instanceof File) {
//       console.log(key, {
//         name: value.name,
//         size: value.size,
//         type: value.type,
//       });
//     } else {
//       console.log(key, value);
//     }
//   }

//   console.log("====================================");

//   // ==================================================
//   // SAVE
//   // ==================================================

//   try {
//     const result = await createVideo(formData).unwrap();

//     console.log("Video created successfully:", result);

//     toast.success("تم حفظ الفيديو ك مسوده بنجاح");

//     handleRefresh();

//   } catch (error: any) {
//     // console.error("Create video error:", error);

//     let message = "حدث خطأ أثناء حفظ الفيديو.";

//     if (error?.data?.message) {
//       message = error.data.message;
//     } else if (error?.data?.error) {
//       message = error.data.error;
//     } else if (error?.error) {
//       message = error.error;
//     }

//     setError(message);
//     toast.error("حدث خطأ أثناء حفظ الفيديو");
//   }
// };




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
//           <h2 className="mb-1 text-2xl font-bold text-[#172033]">
//             إضافة فيديو
//           </h2>

//           <p className="text-[13px] text-[#718096]">
//             قم بإضافة فيديو جديد وتنظيمه داخل أرشيف الفيديوهات
//           </p>
//         </div>

//         <div className="flex items-center gap-2.5">
//           <button
//             type="button"
//             onClick={handleRefresh}
//             className="
//               inline-flex
//               h-10
//               items-center
//               justify-center
//               gap-2
//               rounded-[9px]
//               border
//               border-[#e6eaf0]
//               bg-white
//               px-4
//               text-xs
//               font-semibold
//               text-[#4a5568]
//               transition
//               hover:bg-[#eff6ff]
//               hover:text-[#2563eb]
//             "
//           >
//             <RefreshCw size={16} />
//             تحديث
//           </button>

//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={isSaving}
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
//             "
//           >
//             <Save size={16} />
//             حفظ الفيديو
//           </button>
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
//           mb-[22px]
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
//                 h-[38px]
//                 w-[38px]
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

//         <div className="p-[25px] max-[600px]:p-4">
//           <div
//            className={`
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
//               >
//                 <select
//                   value={item}
//                   onChange={(e) => setItem(e.target.value)}
//                   className={selectClass}
//                   disabled={itemsIsLoading}
//                 >
//                   <option value="">
//                     {itemsIsLoading
//                       ? "جاري تحميل الاصناف ..."
//                       : "اختر الصنف"}
//                   </option>

//                   {items.map((item: any) => (
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
//               >
//                 <select
//                   value={production1}
//                   onChange={(e) => setProduction1(e.target.value)}
//                   className={selectClass}
//                   disabled={productEntitiesOneIsLoading}
//                 >
//                   <option value="">
//                     {productEntitiesOneIsLoading
//                       ? "جاري تحميل جهة الانتاج..."
//                       : "اختر جهة الانتاج"}
//                   </option>

//                   {productEntitiesOne.map((productEntityOne: any) => (
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
//               >

//                 <select
//                   value={production2}
//                   onChange={(e) => setProduction2(e.target.value)}
//                   className={selectClass}
//                   disabled={productEntitiesTwoIsLoading}
//                 >
//                   <option value="">
//                     {productEntitiesTwoIsLoading
//                       ? "جاري تحميل جهة الانتاج..."
//                       : "اختر جهة الانتاج"}
//                   </option>

//                   {productEntitiesTwo.map((productEntityTwo: any) => (
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
//               >
//                 <select
//                   value={sector}
//                   onChange={(e) => setSector(e.target.value)}
//                   className={selectClass}
//                   disabled={sectorsIsLoading}
//                 >
//                   <option value="">
//                     {sectorsIsLoading
//                       ? "جاري تحميل القطاعات..."
//                       : "اختر القطاعات "}
//                   </option>

//                   {sectors.map((sector: any) => (
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
//               >

//                 <select
//                   value={translation}
//                   onChange={(e) => setTranslation(e.target.value)}
//                   className={selectClass}
//                   disabled={translationsIsLoading}
//                 >
//                   <option value="">
//                     {translationsIsLoading
//                       ? "جاري تحميل الترجمات ..."
//                       : "اختر ترجمه للمنتج"}
//                   </option>

//                   {translations.map((translation: any) => (
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
//               >
//                 <select
//                   value={productType}
//                   onChange={(e) => setProductType(e.target.value)}
//                   className={selectClass}
//                   disabled={itemsTypeIsLoading}
//                 >
//                   <option value="">
//                     {itemsTypeIsLoading
//                       ? "جاري تحميل أنواع المنتجات..."
//                       : "اختر نوع المنتج"}
//                   </option>

//                   {itemsType.map((itemType: any) => (
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
//               >

//                 <select
//                   value={eventType}
//                   onChange={(e) => setEventType(e.target.value)}
//                   className={selectClass}
//                   disabled={eventTypesIsLoading}
//                 >
//                   <option value="">
//                     {eventTypesIsLoading
//                       ? "جاري تحميل أنواع الاحداث..."
//                       : "اختر نوع الحدث"}
//                   </option>

//                   {eventTypes.map((eventType: any) => (
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
//               >
//                 <select
//                   value={productionLine}
//                   onChange={(e) => setProductionLine(e.target.value)}
//                   className={selectClass}
//                   disabled={productionLinesIsLoading}
//                 >
//                   <option value="">
//                     {productionLinesIsLoading
//                       ? "جاري تحميل خطوط الانتاج..."
//                       : "اختر حط انتاج"}
//                   </option>

//                   {productionLines.map((productionLine: any) => (
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
//               >

//                 <select
//                   value={productSerial}
//                   onChange={(e) => setProductSerial(e.target.value)}
//                   className={selectClass}
//                   disabled={itemsSerIsLoading}
//                 >
//                   <option value="">
//                     {itemsSerIsLoading
//                       ? "جاري تحميل التسلسل ..."
//                       : "اختر تسلسل للمنتج"}
//                   </option>

//                   {itemsSer.map((itemSer: any) => (
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
//                       onChange={(e) => {
//                         const checked = e.target.checked;

//                         setIsRepeated(checked);

//                         // مسح اسم الحدث عند تغيير الحالة
//                         setEventName("");
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
//                       disabled={eventsIsLoading}
//                     >
//                       <option value="">
//                         {eventsIsLoading
//                           ? "جاري تحميل الأحداث..."
//                           : "اختر الحدث المكرر"}
//                       </option>

//                       {events
//                         .map((event: any) => (
//                           <option
//                             key={event.Code}
//                             value={event.Code}
//                           >
//                             {event.DescA}
//                           </option>
//                         ))}
//                     </select>
//                   </SelectWrapper>
//                 ) : (
//                   /* =========================================
//                     غير مكرر → TextBox
//                     ========================================= */

//                   <InputWrapper
//                     icon={<CalendarDays size={16} />}
//                   >
//                     <input
//                       type="text"
//                       value={eventName}
//                       onChange={(e) => {
//                         setEventName(e.target.value);
//                       }}
//                       placeholder="اكتب اسم الحدث"
//                       className={inputClass}
//                     />
//                   </InputWrapper>
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
//               >

//                 <select
//                   value={hymnName}
//                   onChange={(e) => setHymnName(e.target.value)}
//                   className={selectClass}
//                   disabled={songsIsLoading}
//                 >
//                   <option value="">
//                     {songsIsLoading
//                       ? "جاري تحميل الترانيم..."
//                       : "اختر ترنيمه"}
//                   </option>

//                   {songs.map((song: any) => (
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
//               >

//                 <select
//                   value={speakerName}
//                   onChange={(e) => setSpeakerName(e.target.value)}
//                   className={selectClass}
//                   disabled={speakersIsLoading}
//                 >
//                   <option value="">
//                     {speakersIsLoading
//                       ? "جاري تحميل القائمين ع العمل..."
//                       : "اختر متكلم"}
//                   </option>

//                   {speakers.map((speaker: any) => (
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
//                     disabled={contentTypesIsLoading}
//                   >
//                     <option value="">
//                       {contentTypesIsLoading
//                         ? "جاري تحميل أنواع المحتوى..."
//                         : "اختر نوع المحتوى"}
//                     </option>

//                     {contentTypes.map((contentType: any) => (
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
//                   onAdd={() => console.log("إضافة قناة")}
//                 >

//                   <select
//                     value={channelName}
//                     onChange={(e) => setChannelName(e.target.value)}
//                     className={selectClass}
//                     disabled={channelsIsLoading}
//                   >
//                     <option value="">
//                       {channelsIsLoading
//                         ? "جاري تحميل القنوات..."
//                         : "اختر قناة"}
//                     </option>

//                     {channels.map((channel: any) => (
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
//           mb-[22px]
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
//             hidden
//           />

//           {!videoFile ? (
//             <button
//               type="button"
//               onClick={() =>
//                 videoInputRef.current?.click()
//               }
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
//                       {videoFile.name}
//                     </div>

//                     <div className="mt-1 flex gap-4 text-[11px] text-[#94a3b8]">
//                       <span>
//                         {formatFileSize(
//                           videoFile.size
//                         )}
//                       </span>

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

          
//         </div>
//       </section>

//       {/* ==================================================
//           صور تعريفية
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
//   required = false,
// }: {
//   label: string;
//   children: React.ReactNode;
//   required?: boolean;
// }) {
//   return (
//     <div className="flex flex-col gap-[7px]">
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

// // function FormGroup({
// //   label,
// //   children,
// // }: {
// //   label: string;
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <div className="flex flex-col gap-[7px]">
// //       <label className="text-xs font-semibold text-[#4a5568]">
// //         {label}
// //       </label>

// //       {children}
// //     </div>
// //   );

  
// // }

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

// // function SelectWrapper({
// //   icon,
// //   children,
// //   onAdd,
// // }: {
// //   icon: React.ReactNode;
// //   children: React.ReactNode;
// //   onAdd?: () => void;
// // }) {
// //   return (
// //     <div className="flex w-full items-center gap-2">
// //       <div className="relative min-w-0 flex-1">
// //         <span
// //           className="
// //             pointer-events-none absolute right-3 top-1/2 z-10
// //             flex -translate-y-1/2 items-center justify-center
// //             text-[#a0aec0]
// //           "
// //         >
// //           {icon}
// //         </span>

// //         <span
// //           className="
// //             pointer-events-none absolute left-3 top-1/2 z-10
// //             flex -translate-y-1/2 items-center justify-center
// //             text-[#718096]
// //           "
// //         >
// //           <ChevronDown size={16} strokeWidth={2} />
// //         </span>

// //         {children}
// //       </div>

// //       <button
// //         type="button"
// //         title="إضافة"
// //         aria-label="إضافة"
// //         onClick={onAdd}
// //         className="
// //           flex h-11 w-11 shrink-0 items-center justify-center
// //           rounded-[9px] border border-[#dfe5ed] bg-white
// //           text-[#718096] transition-all duration-200
// //           hover:border-[#2563eb] hover:bg-[#eff6ff] hover:text-[#2563eb]
// //           active:scale-95
// //         "
// //       >
// //         <Plus size={18} strokeWidth={2} />
// //       </button>
// //     </div>
// //   );
// // }

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
// `;



"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { Building2, Calendar, CalendarDays, ChevronDown, FileVideo, Folder, Globe2, Image as ImageIcon, ImagePlus, Layers, ListOrdered, Languages, Music2, Package, Plus, RefreshCw, Save, Share2, Trash2, UploadCloud, User, Video, Workflow, Grid3X3, Grid2X2, Rows3 } from "lucide-react";


import { formatDuration, formatFileSize } from "@/app/helpers/videoHelper";
import { useGetChannelsQuery, useGetContentTypesQuery, useGetEventsQuery, useGetEventTypesQuery, useGetItemsQuery, useGetItemsSerQuery, useGetItemTypesQuery, useGetProdLinesQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetSectorsQuery, useGetSongsQuery, useGetSpeakersQuery, useGetTranslationsQuery, useAddProductEntityOneMutation,
  useAddProductEntityTwoMutation, useAddSectorMutation, useAddItemTypeMutation, useAddEventTypeMutation, useAddProdLineMutation, useAddSongMutation, useAddSpeakerMutation, useAddItemMutation, useAddItemSerMutation, useAddTranslationMutation, useAddChannelMutation, 
  useAddEventMutation} from "@/app/services/sectors-api";
import { useCreateVideoMutation } from "@/app/services/videos-api";
import { getCurrentDateTime } from "@/app/helpers/getCurentDate";
import { getArabicDayName } from "@/app/helpers/getArabicDayName";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import AddItemModal from "./AddItemModal";

export default function AddVideoPage() {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

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

 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [addType, setAddType] = useState<
    | "item"
    | "production1"
    | "production2"
    | "sector"
    | "translation"
    | "productType"
    | "eventType"
    | "productionLine"
    | "productSerial"
    // | "event"
    | "song"
    | "speaker"
    | "channel"
    | null
  >(null);

  // const handleAddItem = () => {
  //   if (!newValue.trim() || !addType) return;

  //   console.log("Add:", {
  //     type: addType,
  //     value: newValue.trim(),
  //   });

  //   closeAddModal();
  // };

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

    } catch (error: any) {
      // console.error(error);
      toast.error(
        error?.data?.message ||
        error?.message ||
        "حدث خطأ أثناء الإضافة"
      );
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
      // case "event": return "إضافة حدث";
      case "song": return "إضافة ترنيمة";
      case "speaker": return "إضافة متكلم";
      case "channel": return "إضافة قناة";
      default: return "إضافة عنصر";
    }
  };
  
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


  const [contentType, setContentType] = useState("");

  const isAdmin = getIsAdminFromToken();
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

  const [ createVideo, { isLoading: isSaving } ] = useCreateVideoMutation();

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
  const [addEvent] = useAddEventMutation();

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
  const [showEventSuggestions, setShowEventSuggestions] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

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

  const filteredEvents = events.filter((event: any) =>
    event.DescA
      ?.toLowerCase()
      .includes(eventNameText.trim().toLowerCase())
  );


  // ==================================================
  // CLEANUP VIDEO URL
  // ==================================================

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  // ==================================================
  // CLEANUP THUMBNAIL URL
  // ==================================================

  useEffect(() => {
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);

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
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(null);
    setVideoUrl("");
    setVideoDuration("");

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

  const handleRefresh = () => {
    setTitle("");

    setProduction1("");
    setProduction2("");

    setSector("");
    setTranslation("");

    setProductType("");
    setProductName("");
    setProductSerial("");

    setEventType("");
    setEventName("");

    setProductionLine("");

    setHymnName("");
    setSpeakerName("");

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

    setError("");

    handleRemoveVideo();
    handleRemoveThumbnail();
  };



  // ==================================================
// SAVE VIDEO
// ==================================================

const handleSave = async () => {
  setError("");

  // ==================================================
  // VALIDATION
  // ==================================================

  if (!productName.trim()) {
    setError("من فضلك أدخل اسم المنتج.");
    return;
  }

  // if (!productSerial.trim()) {
  //   setError("من فضلك اختر تسلسل المنتج.");
  //   return;
  // }

  if (!videoFile) {
    setError("من فضلك اختر ملف الفيديو.");
    return;
  }

  // ==================================================
  // CREATE FORMDATA
  // ==================================================

  const formData = new FormData();

  // ==================================================
  // BASIC INFORMATION
  // ==================================================

  formData.append("date", date || "");
  formData.append("title", title.trim());

  // ==================================================
  // PRODUCTION
  // ==================================================

  formData.append("production1", production1 || "");
  formData.append("production2", production2 || "");

  // ==================================================
  // SECTOR / TRANSLATION
  // ==================================================

  formData.append("sector", sector || "");
  formData.append("translation", translation || "");

  // ==================================================
  // PRODUCT
  // ==================================================

  formData.append("productType", productType || "");
  formData.append("item", item || "");
  formData.append("productName", productName.trim());
  formData.append("productSerial", productSerial || "");

  // ==================================================
  // EVENT
  // ==================================================

  formData.append("eventType", eventType || "");
  formData.append("eventName", eventName || "");

  // ==================================================
  // PRODUCTION LINE
  // ==================================================

  formData.append("productionLine", productionLine || "");

  // ==================================================
  // HYMN / SPEAKER
  // ==================================================

  formData.append("hymnName", hymnName || "");
  formData.append("speakerName", speakerName || "");

  // ==================================================
  // EVENT STATUS
  // ==================================================

  formData.append("isRepeated", String(isRepeated));
  formData.append("repeatType", repeatType || "");

  // ==================================================
  // CHANNEL
  // ==================================================

  // استخدم channelName لأن ده الـ state المرتبط بالـ select
  formData.append("channelName", channelName || "");

  // // لو الـ backend الحالي مستني mainUploadChannel
  // // نرسل الاثنين لتجنب مشكلة اختلاف الاسم
  // formData.append("mainUploadChannel", channelName || "");

  // ==================================================
  // SOCIAL LINKS
  // ==================================================

  formData.append("youtubeLink", youtubeLink.trim());
  formData.append("facebookLink", facebookLink.trim());
  formData.append("instagramLink", instagramLink.trim());

  // ==================================================
  // CONTENT
  // ==================================================

  formData.append("content1", content1.trim());
  formData.append("content2", content2.trim());
  formData.append("content3", content3.trim());
  formData.append("content4", content4.trim());
  formData.append("content5", content5.trim());

  // ==================================================
  // CONTENT TYPE - ADMIN
  // ==================================================

  if (isAdmin) {
    formData.append("contentType", contentType || "");
  }

  // ==================================================
  // VIDEO INFORMATION
  // ==================================================

  formData.append("duration", videoDuration || "");
  // formData.append("description", description.trim());
  // formData.append("notes", notes.trim());

  // ==================================================
  // VIDEO FILE
  // ==================================================

  formData.append("videoFile", videoFile, videoFile.name);

  // ==================================================
  // THUMBNAIL
  // ==================================================

  if (thumbnailFile) {
    formData.append(
      "thumbnailFile",
      thumbnailFile,
      thumbnailFile.name
    );
  }

  // ==================================================
  // DEBUG
  // ==================================================

  console.log("========== VIDEO FORM DATA ==========");

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(key, {
        name: value.name,
        size: value.size,
        type: value.type,
      });
    } else {
      console.log(key, value);
    }
  }

  console.log("====================================");

  // ==================================================
  // SAVE
  // ==================================================

  try {
    const result = await createVideo(formData).unwrap();

    console.log("Video created successfully:", result);

    toast.success("تم حفظ الفيديو ك مسوده بنجاح");

    handleRefresh();

  } catch (error: any) {
    // console.error("Create video error:", error);

    let message = "حدث خطأ أثناء حفظ الفيديو.";

    if (error?.data?.message) {
      message = error.data.message;
    } else if (error?.data?.error) {
      message = error.data.error;
    } else if (error?.error) {
      message = error.error;
    }

    setError(message);
    toast.error("حدث خطأ أثناء حفظ الفيديو");
  }
};




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
          <h2 className="mb-1 text-2xl font-bold text-[#172033]">
            إضافة فيديو
          </h2>

          <p className="text-[13px] text-[#718096]">
            قم بإضافة فيديو جديد وتنظيمه داخل أرشيف الفيديوهات
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
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
            <RefreshCw size={16} />
            تحديث
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
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
            "
          >
            <Save size={16} />
            حفظ الفيديو
          </button>
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
                onAdd={() => openAddModal("item")}
              >
                <select
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className={selectClass}
                  disabled={itemsIsLoading}
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
                onAdd={() => openAddModal("production1")}
              >
                <select
                  value={production1}
                  onChange={(e) => setProduction1(e.target.value)}
                  className={selectClass}
                  disabled={productEntitiesOneIsLoading}
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
                onAdd={() => openAddModal("production2")}
              >

                <select
                  value={production2}
                  onChange={(e) => setProduction2(e.target.value)}
                  className={selectClass}
                  disabled={productEntitiesTwoIsLoading}
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
                onAdd={() => openAddModal("sector")}
              >
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className={selectClass}
                  disabled={sectorsIsLoading}
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
                onAdd={() => openAddModal("translation")}
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
                onAdd={() => openAddModal("productType")}
              >
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className={selectClass}
                  disabled={itemsTypeIsLoading}
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
                onAdd={() => openAddModal("eventType")}
              >

                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className={selectClass}
                  disabled={eventTypesIsLoading}
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
                onAdd={() => openAddModal("productionLine")}
              >
                <select
                  value={productionLine}
                  onChange={(e) => setProductionLine(e.target.value)}
                  className={selectClass}
                  disabled={productionLinesIsLoading}
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
                onAdd={() => openAddModal("productSerial")}
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
      icon={<CalendarDays size={16} />}
    >
      <select
        value={eventName}
        onChange={(e) => {
          setEventName(e.target.value);
        }}
        className={selectClass}
        disabled={eventsIsLoading}
      >
        <option value="">
          {eventsIsLoading
            ? "جاري تحميل الأحداث..."
            : "اختر الحدث المكرر"}
        </option>

        {events.map((event: any) => (
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
       غير مكرر → Autocomplete TextBox
       ========================================= */

    <div className="relative w-full">

      <InputWrapper icon={<CalendarDays size={16} />}>

        <input
          type="text"
          value={eventNameText}

          onChange={(e) => {
            const value = e.target.value;

            setEventNameText(value);

            // بمجرد أن يكتب اسم جديد،
            // نمسح الـ Code القديم
            setEventName("");

            setShowEventSuggestions(
              value.trim().length > 0
            );
          }}

          onFocus={() => {
            if (eventNameText.trim()) {
              setShowEventSuggestions(true);
            }
          }}

          onBlur={() => {
            setTimeout(() => {
              setShowEventSuggestions(false);
            }, 150);
          }}

          placeholder="اكتب اسم الحدث"
          className={inputClass}
        />

      </InputWrapper>


      {/* =========================================
          AUTOCOMPLETE
          ========================================= */}

      {showEventSuggestions && eventNameText.trim() && (

        <div
          className="
            absolute
            right-0
            left-0
            top-[calc(100%+6px)]
            z-50
            overflow-hidden
            rounded-[9px]
            border
            border-[#e6eaf0]
            bg-white
            shadow-[0_10px_30px_rgba(15,23,42,0.10)]
          "
        >

          {filteredEvents.length > 0 ? (

            /* =====================================
               نتائج موجودة
               ===================================== */

            <div className="max-h-[220px] overflow-y-auto py-1">

              {filteredEvents.map((event: any) => (

                <button
                  key={event.Code}
                  type="button"

                  onMouseDown={(e) => {
                    e.preventDefault();

                    // الاسم الظاهر
                    setEventNameText(event.DescA);

                    // الكود الذي سيذهب للـ Form
                    setEventName(String(event.Code));

                    setShowEventSuggestions(false);
                  }}

                  className="
                    flex
                    w-full
                    items-center
                    gap-2
                    px-3
                    py-2.5
                    text-right
                    text-xs
                    text-[#334155]
                    transition
                    hover:bg-[#f5f8ff]
                    hover:text-[#2563eb]
                  "
                >

                  <CalendarDays
                    size={14}
                    className="shrink-0 text-[#94a3b8]"
                  />

                  <span className="truncate">
                    {event.DescA}
                  </span>

                </button>

              ))}

            </div>

          ) : (

            /* =====================================
               لا يوجد → إضافة جديدة
               ===================================== */

            <div className="p-3">

              <div className="mb-2 text-[11px] text-[#718096]">
                لا يوجد حدث مطابق
              </div>

              <button
                type="button"

                disabled={isAddingEvent}

                onMouseDown={(e) => {
                  e.preventDefault();
                }}

                onClick={async () => {

                  const value = eventNameText.trim();

                  if (!value || isAddingEvent) return;

                  try {

                    setIsAddingEvent(true);

                    // هنا POST
                    const result = await addEvent({
                      DescA: value,
                    }).unwrap();

                    console.log(
                      "New Event:",
                      result
                    );

                    // حسب شكل الـ response
                    const newCode =
                      result?.Code ??
                      result?.data?.Code;

                    if (!newCode) {
                      toast.error(
                        "تمت إضافة الحدث ولكن لم يتم إرجاع الكود"
                      );
                      return;
                    }

                    // الاسم الظاهر
                    setEventNameText(value);

                    // الكود الذي سيذهب للـ Form
                    setEventName(
                      String(newCode)
                    );

                    // نغلق الاقتراحات
                    setShowEventSuggestions(false);

                    // تحديث قائمة الأحداث
                    await refetchEvents();

                    toast.success(
                      "تمت إضافة الحدث بنجاح"
                    );

                  } catch (error: any) {

                    console.error(
                      "Add Event Error:",
                      error
                    );

                    toast.error(
                      error?.data?.message ||
                      error?.data?.error ||
                      error?.message ||
                      "حدث خطأ أثناء إضافة الحدث"
                    );

                  } finally {

                    setIsAddingEvent(false);

                  }

                }}

                className="
                  flex
                  h-9
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[8px]
                  bg-[#2563eb]
                  px-3
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#1d4ed8]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <Plus size={15} />

                {isAddingEvent
                  ? "جاري الإضافة..."
                  : `إضافة "${eventNameText.trim()}"`}

              </button>

            </div>

          )}

        </div>

      )}

    </div>
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
                onAdd={() => openAddModal("song")}
              >

                <select
                  value={hymnName}
                  onChange={(e) => setHymnName(e.target.value)}
                  className={selectClass}
                  disabled={songsIsLoading}
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
                onAdd={() => openAddModal("speaker")}
              >

                <select
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                  className={selectClass}
                  disabled={speakersIsLoading}
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
                  onAdd={() => openAddModal("channel")}
                >

                  <select
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className={selectClass}
                    disabled={channelsIsLoading}
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
            hidden
          />

          {!videoFile ? (
            <button
              type="button"
              onClick={() =>
                videoInputRef.current?.click()
              }
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
                      {videoFile.name}
                    </div>

                    <div className="mt-1 flex gap-4 text-[11px] text-[#94a3b8]">
                      <span>
                        {formatFileSize(
                          videoFile.size
                        )}
                      </span>

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



      {/* ==================================================
          ADD ITEM MODAL
          ================================================== */}

      <AddItemModal
        isOpen={isAddModalOpen}
        title={getAddModalTitle()}
        value={newValue}
        onChange={setNewValue}
        onClose={closeAddModal}
        onSave={handleAddItem}
      />

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
`;