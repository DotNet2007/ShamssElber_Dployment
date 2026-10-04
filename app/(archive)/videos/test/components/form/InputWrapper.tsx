import { ReactNode } from "react";

interface InputWrapperProps {
    icon: ReactNode;
    children: ReactNode;
};

export default function InputWrapper({ icon, children }: InputWrapperProps) {
  return (
    <div className="relative w-full">
      <span className=" pointer-events-none absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#a0aec0] ">
        {icon}
      </span>

      {children}
    </div>
  );
}