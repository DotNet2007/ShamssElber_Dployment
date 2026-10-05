import { ReactNode } from "react";

interface FormGroupProps {
    label: string;
    children: ReactNode;
    required?: boolean;
};



export default function FormGroup({ label, children, required }: FormGroupProps) {
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


