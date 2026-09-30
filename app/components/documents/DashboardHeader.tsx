export default function DashboardHeader() {
  return (
    <div className="mb-[30px]">
      <h1
        className="
          mb-[7px]
          text-[28px]
          font-bold
          text-slate-900

          max-[600px]:text-[24px]
        "
      >
        ملفاتي
      </h1>

      <p className="text-sm text-slate-500">
        قم برفع وإدارة والبحث داخل جميع مستندات PDF الخاصة بك.
      </p>
    </div>
  );
}

