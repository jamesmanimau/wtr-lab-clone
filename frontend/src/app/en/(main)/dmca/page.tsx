import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DMCA - WTR-LAB",
};

export default function DMCAPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-violet-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">DMCA</span>
      </nav>
      <h1 className="text-3xl font-bold text-white mb-8">DMCA Notice</h1>
      <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-8 space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>WTR-Lab respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged copyright infringement.</p>
        <p>If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest</li>
          <li>A description of the copyrighted work that you claim has been infringed</li>
          <li>A description of where the material that you claim is infringing is located on the site</li>
          <li>Your address, telephone number, and email address</li>
          <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law</li>
          <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner&apos;s behalf</li>
        </ul>
        <p>Please contact us at <a href="mailto:admin@wtr-lab.com" className="text-violet-400 hover:text-violet-300">admin@wtr-lab.com</a> for DMCA-related inquiries.</p>
      </div>
    </div>
  );
}
