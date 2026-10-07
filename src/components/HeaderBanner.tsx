'use client';

import { Plus, ChevronRight, Lock, ShoppingCart, Award } from 'lucide-react';

export default function HeaderBanner() {
  return (
    <div className="relative overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[358px] mb-0" style={{ backgroundImage: "url('/dash.png')", backgroundSize: "cover", backgroundPosition: "top", backgroundRepeat: "no-repeat" }}>

      {/* Left content block */}
      <div className="space-y-6 z-10 max-w-lg">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-[64px] font-normal text-white tracking-tight leading-tight">
            Hello, Colton!
          </h1>
          <p className="text-slate-300 text-base md:text-[24px] font-normal">
            Track projects, manage tasks, <br /> and stay productive.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r from-[#5897FF] to-[#488FFF] hover:from-[#488FFF] hover:to-[#5897FF] text-white px-6 py-3.5 rounded-[10px] font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20 cursor-pointer shadow-md group active:scale-95">
          <div className="flex items-center justify-center w-5 h-5 rounded-md  text-white transition-transform duration-300 group-hover:rotate-90">
            <Plus size={14} strokeWidth={2.5} />
          </div>
          New Order
        </button>
      </div>



    </div>
  );
}
