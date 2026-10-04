import { ReactNode } from "react";
import { ChevronDown, Plus } from "lucide-react";

interface SelectWrapperProps {
    icon: ReactNode;
    children: ReactNode;
    onAdd?: () => void;
    disabled?: boolean;
    isAdmin?: boolean;
};

export default function SelectWrapper({ icon, children, onAdd, disabled = false, isAdmin = false }: SelectWrapperProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative min-w-0 flex-1">

        <span
          className=" pointer-events-none absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#a0aec0] ">
          {icon}
        </span>

        <span className=" pointer-events-none absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#718096] ">
          <ChevronDown size={16} strokeWidth={2} />
        </span>

        {children}
      </div>

      {isAdmin && (
        <button
          type="button"
          title="إضافة"
          aria-label="إضافة"
          onClick={onAdd}
          disabled={disabled}
          className=" flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] border border-[#dfe5ed] bg-white text-[#718096] transition-all duration-200 hover:border-[#2563eb] hover:bg-[#eff6ff] hover:text-[#2563eb] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ">
          <Plus size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}