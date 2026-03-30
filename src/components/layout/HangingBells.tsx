"use client";

import Image from "next/image";

export default function HangingBells() {
  return (
    <>
      {/* Left bell */}
      <div className="pointer-events-none absolute left-0 top-0 z-50 hidden sm:block">
        <div className="animate-[swingBell_4s_ease-in-out_infinite] origin-top">
          <Image
            src="/images/gallery/hanging-gantalu.png"
            alt=""
            width={100}
            height={216}
            className="h-auto w-[70px] drop-shadow-[0_4px_16px_rgba(218,165,32,0.4)] sm:w-[85px] lg:w-[100px]"
            priority
          />
        </div>
      </div>

      {/* Right bell */}
      <div className="pointer-events-none absolute right-0 top-0 z-50 hidden sm:block">
        <div className="animate-[swingBellSlow_5s_ease-in-out_0.6s_infinite] origin-top">
          <Image
            src="/images/gallery/hanging-gantalu.png"
            alt=""
            width={100}
            height={216}
            className="h-auto w-[70px] -scale-x-100 drop-shadow-[0_4px_16px_rgba(218,165,32,0.4)] sm:w-[85px] lg:w-[100px]"
            priority
          />
        </div>
      </div>
    </>
  );
}
