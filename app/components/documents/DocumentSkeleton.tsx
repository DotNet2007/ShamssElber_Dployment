export default function DocumentSkeleton() {
  return (
    <div className="w-full">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="
            flex
            items-center
            gap-[14px]
            border-b
            border-slate-100
            px-4
            py-[14px]
          "
        >

          {/* ICON */}

          <div
            className="
              h-[42px]
              w-[42px]
              shrink-0
              animate-pulse
              rounded-[9px]
              bg-slate-200
            "
          />


          {/* CONTENT */}

          <div className="min-w-0 flex-1">

            <div
              className="
                mb-[9px]
                h-[11px]
                w-[55%]
                animate-pulse
                rounded-md
                bg-slate-200
              "
            />

            <div
              className="
                h-[11px]
                w-[30%]
                animate-pulse
                rounded-md
                bg-slate-200
              "
            />

          </div>


          {/* ACTIONS */}

          <div className="flex items-center gap-[7px]">

            <div className="
              h-8
              w-8
              animate-pulse
              rounded-[7px]
              bg-slate-200
            " />

            <div className="
              h-8
              w-8
              animate-pulse
              rounded-[7px]
              bg-slate-200
            " />

          </div>

        </div>
      ))}

    </div>
  );
}

