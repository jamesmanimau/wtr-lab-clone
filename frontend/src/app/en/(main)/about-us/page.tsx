import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - WTR-LAB",
  description: "Learn more about WTR-Lab, the machine translation novel platform.",
};

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-violet-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">About Us</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-8">About Us</h1>

      <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-8 space-y-6">
        <p className="text-sm text-gray-300 leading-relaxed">
          WTR-Lab is a RAW Novels translator site using automatic Machine Translation (MTL),
          so we can translate the novels faster than human translation.
        </p>

        <p className="text-sm text-gray-300 leading-relaxed">
          The reason for making this site is because there are only a few manual translator
          and it is a bit slow in translating light novels manually. Therefore, if you are
          not patient enough waiting for the manual translation of your favorite novels,
          WTR-Lab with its machine translation is the solution for you.
        </p>

        <p className="text-sm text-gray-300 leading-relaxed">
          Unlike other platforms, WTR-Lab doesn&apos;t dictate what novels you read.
          Our community drives the content! Users can request novels from supported raw
          websites, vote on their favorite requests, or use tickets to fast-release popular
          titles. You decide what gets translated next.
        </p>

        <div className="pt-4 border-t border-[#1e1e3a]">
          <p className="text-sm text-gray-500">
            If you have any questions or suggestions for us, you might contact us or
            email us at{" "}
            <a href="mailto:admin@wtr-lab.com" className="text-violet-400 hover:text-violet-300 transition-colors">
              admin@wtr-lab.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
