import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use - WTR-LAB",
};

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-violet-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Terms of Use</span>
      </nav>
      <h1 className="text-3xl font-bold text-white mb-8">Terms of Use</h1>
      <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-8 space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>By using WTR-Lab, you agree to the following terms and conditions.</p>
        <h2 className="text-lg font-semibold text-white mt-6">Acceptance of Terms</h2>
        <p>By accessing or using our website, you agree to be bound by these Terms of Use. If you do not agree, please do not use our service.</p>
        <h2 className="text-lg font-semibold text-white mt-6">User Accounts</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>You are responsible for maintaining the confidentiality of your account</li>
          <li>You must not share your account with others</li>
          <li>You must not use the service for any illegal purpose</li>
        </ul>
        <h2 className="text-lg font-semibold text-white mt-6">Content</h2>
        <p>The novels on this site are machine-translated. We do not claim ownership of the original works. If you are a copyright holder and believe your rights have been infringed, please contact us via our DMCA page.</p>
        <h2 className="text-lg font-semibold text-white mt-6">Limitation of Liability</h2>
        <p>WTR-Lab is provided &quot;as is&quot; without any warranties. We are not liable for any damages arising from the use of our service.</p>
        <h2 className="text-lg font-semibold text-white mt-6">Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes via our news section.</p>
      </div>
    </div>
  );
}
