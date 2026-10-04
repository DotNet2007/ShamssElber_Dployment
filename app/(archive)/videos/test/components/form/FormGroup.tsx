import { ReactNode } from "react";

interface FormGroupProps {
    label: string;
    children: ReactNode;
};



export default function FormGroup({ label, children }: FormGroupProps) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label className="text-xs font-semibold text-[#4a5568]">
        {label}
      </label>

      {children}
    </div>
  );
}