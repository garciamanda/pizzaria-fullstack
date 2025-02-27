import { forwardRef } from "react";
import { cn } from "../utils/cn";
import Logo from "/assets/logo.png";

export const Sidebar = forwardRef(({}, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[270px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-950"
      )}
    >
      <div className="flex gap-x-3 p-3">
        <img src={Logo} alt="" className="w-[70px] rounded-[50%]" />
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
