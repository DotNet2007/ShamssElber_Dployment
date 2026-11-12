"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageForm from "@/app/components/forms/ImageForm";
import MainCategoryForm from "@/app/components/forms/MainCategoryForm";
import { useGetItemTypesQuery, useGetEventTypesQuery, useGetProdLinesQuery, useGetSectorsQuery, useGetProductEntityOneQuery, useGetProductEntityTwoQuery, useGetEventsQuery, useGetItemsQuery, useGetItemsSerQuery } from "@/app/services/sectors-api";
import { getCurrentDateTime } from "@/app/helpers/getCurentDate";

export default function AddImagePage() {
  const router = useRouter();

  const { data: itemsType = [], isLoading: itemsTypeIsLoading, refetch: refetchItemsType } = useGetItemTypesQuery();
  const { data: eventTypes = [], isLoading: eventTypesIsLoading, refetch: refetchEventTypes } = useGetEventTypesQuery();
  const { data: productionLines = [], isLoading: productionLinesIsLoading, refetch: refetchProductionLines } = useGetProdLinesQuery();
  
  const { data: sectors = [], isLoading: sectorsIsLoading, refetch: refetchSectors } = useGetSectorsQuery();
  const { data: productEntitiesOne = [], isLoading: productEntitiesOneIsLoading, refetch: refetchProductEntitiesOne } = useGetProductEntityOneQuery();
  const { data: productEntitiesTwo = [], isLoading: productEntitiesTwoIsLoading, refetch: refetchProductEntitiesTwo } = useGetProductEntityTwoQuery();

  const { data: events = [], isLoading: eventsIsLoading, refetch: refetchEvents } = useGetEventsQuery();

  const { data: items = [], isLoading: itemsIsLoading, refetch: refetchItems } = useGetItemsQuery();
  const { data: itemsSer = [], isLoading: itemsSerIsLoading, refetch: refetchItemsSer } = useGetItemsSerQuery();
  
  // const { data: contentTypes = [], isLoading: contentTypesIsLoading } = useGetContentTypesQuery(undefined, { skip: !isAdmin });

  // const [imageName, setImageName] = useState("");
  const [imageDate, setImageDate] = useState(getCurrentDateTime());

  const [item, setItem] = useState("");
  const [productType, setProductType] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");

  const [production1, setProduction1] = useState("");
  const [production2, setProduction2] = useState("");
  const [productionLine, setProductionLine] = useState("");

  const [sector, setSector] = useState("");
  const [productSerial, setProductSerial] = useState("");
  const [productName, setProductName] = useState("");

  // const [isRepeated, setIsRepeated] = useState(false);
  // const [mainCharachers, setMainCharachers] = useState("");






  



  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // const handleImageSelect = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];

  //   if (!file) return;

  //   if (!file.type.startsWith("image/")) {
  //     alert("من فضلك اختار ملف صورة صحيح.");
  //     event.target.value = "";
  //     return;
  //   }

  //   setImageFile(file);
  //   setPreviewUrl(URL.createObjectURL(file));

  //   // if (!imageName) {
  //   //   setImageName(file.name.replace(/\.[^/.]+$/, ""));
  //   // }
  // };

  // const handleRemoveImage = () => {
  //   setImageFile(null);
  //   setPreviewUrl("");
  // };

  const handleNew = () => {

    setItem("");
    setProduction1("");
    setProduction2("");
    setSector("");
    // setDescription("");
    setImageFile(null);
    setPreviewUrl("");
  };

  const handleSave = () => {

    if (!imageFile) {
      alert("من فضلك اختار صورة.");
      return;
    }

    // هنربط الحفظ بالـ Backend في الخطوة التالية.
    console.log({
      // imageName,
      imageDate,
      // description,
      imageFile,
      item,
      production1

    });
  };

  const handleSubmit = () => {
    handleSave();
  };

  const handleDelete = () => {
    handleNew();
  };

  return (
    <MainCategoryForm
    title="إضافة صورة جديدة"
    description="أدخل بيانات الصورة المطلوبة"
    showNew
    showSave
    showSubmit
    showDelete
    onClose={() => router.back()}
    onNew={handleNew}
    onSave={handleSave}
    onSubmit={handleSubmit}
    onDelete={handleDelete}
  >
  <ImageForm
    imageDate={imageDate}
    setImageDate={setImageDate}

    item={item}
    setItem={setItem}

    production1={production1}
    setProduction1={setProduction1}

    production2={production2}
    setProduction2={setProduction2}

    sector={sector}
    setSector={setSector}

    productType={productType}
    setProductType={setProductType}

    eventType={eventType}
    setEventType={setEventType}

    eventName={eventName}
    setEventName={setEventName}

    productionLine={productionLine}
    setProductionLine={setProductionLine}

    productSerial={productSerial}
    setProductSerial={setProductSerial}

    productName={productName}
    setProductName={setProductName}



    // description={description}
    // setDescription={setDescription}

    items={items}
    productEntitiesOne={productEntitiesOne}
    productEntitiesTwo={productEntitiesTwo}
    sectors={sectors}
    itemsType={itemsType}
    eventTypes={eventTypes}
    productionLines={productionLines}
    events={events}
    itemsSer={itemsSer}



    itemsIsLoading={itemsIsLoading}
    productEntitiesOneIsLoading={productEntitiesOneIsLoading}
    productEntitiesTwoIsLoading={productEntitiesTwoIsLoading}
    sectorsIsLoading={sectorsIsLoading}
    itemsTypeIsLoading={itemsTypeIsLoading}
    eventTypesIsLoading={eventTypesIsLoading}
    productionLinesIsLoading={productionLinesIsLoading}
    eventsIsLoading={eventsIsLoading}
    itemsSerIsLoading={itemsSerIsLoading}

    imageFile={imageFile}
    previewUrl={previewUrl}
    onImageSelect={(file) => {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));

      // if (!imageName) {
      //   setImageName(file.name.replace(/\.[^/.]+$/, ""));
      // }
    }}
    onRemoveImage={() => {
      setImageFile(null);
      setPreviewUrl("");
    }}
  />
  </MainCategoryForm>
  );
}
