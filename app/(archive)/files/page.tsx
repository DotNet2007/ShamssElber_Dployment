"use client";

import AiAnswerModal from "@/app/components/documents/AiAnswerModal";
import AiHistoryModal from "@/app/components/documents/AiHistoryModal";
import AiSearchCard from "@/app/components/documents/AiSearchCard";
import DashboardHeader from "@/app/components/documents/DashboardHeader";
import DocumentsCard from "@/app/components/documents/DocumentsCard";
import { useState } from "react";



export default function DashboardPage() {
  const [showAiModal, setShowAiModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-[1200px]
        max-w-[calc(100%-40px)]
        py-[70px]

        max-[1250px]:max-w-[calc(100%-32px)]

        max-[768px]:
          max-w-[calc(100%-24px)]
          py-[35px]
      "
    >

      <DashboardHeader />

      <AiSearchCard
        onOpenHistory={() => setShowHistoryModal(true)}
        onSearch={() => setShowAiModal(true)}
      />

      <div className="mt-6 w-full">
        <DocumentsCard
          onAddFile={() => {
            console.log("Add file");
          }}
          onView={(document) => {
            console.log("View:", document);
          }}
          onDownload={(document) => {
            console.log("Download:", document);
          }}
          onDelete={(document) => {
            console.log("Delete:", document);
          }}
        />
      </div>

      <AiAnswerModal
        open={showAiModal}
        onClose={() => setShowAiModal(false)}
      />

      <AiHistoryModal
        open={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />

    </main>
  );
}