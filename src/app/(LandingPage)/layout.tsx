import Header from "@/component/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Guide",
  description: "Solar decision guide and solar system sizing",
};

export default function LandingPageLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        {/* Large sunlight glow from top-right */}
        <div
          className="
            absolute
            -right-32
            -top-32
            h-[600px]
            w-[600px]
            rounded-full
            bg-yellow-400/[0.07]
            blur-[100px]
          "
        />

        {/* Actual sun */}
        <div
          className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-yellow-300/20
            blur-[35px]
          "
        />

        {/* Bright center of the sun */}
        <div
          className="
            absolute
            right-4
            top-4
            h-24
            w-24
            rounded-full
            bg-yellow-200/30
            blur-[18px]
          "
        />

        {/* Soft light spreading downward */}
        <div
          className="
            absolute
            right-[15%]
            top-20
            h-[500px]
            w-[250px]
            rotate-[25deg]
            bg-gradient-to-b
            from-yellow-300/[0.08]
            via-yellow-400/[0.025]
            to-transparent
            blur-[45px]
          "
        />

        {/* Secondary atmospheric glow */}
        <div
          className="
            absolute
            -left-40
            top-[45%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-orange-500/[0.025]
            blur-[120px]
          "
        />

        {/* Very subtle bottom glow */}
        <div
          className="
            absolute
            bottom-[-200px]
            right-[30%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-yellow-500/[0.02]
            blur-[120px]
          "
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <Header />

        {children}
      </div>
    </div>
  );
}