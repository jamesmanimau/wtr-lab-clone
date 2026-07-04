import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - WTR-LAB",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-violet-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Privacy Policy</span>
      </nav>
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-8 space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>Your privacy is important to us. This Privacy Policy explains how WTR-Lab collects, uses, and protects your personal information.</p>
        <h2 className="text-lg font-semibold text-white mt-6">Information We Collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Account Information:</strong> Username, email address, and password (encrypted) when you register</li>
          <li><strong>Reading Data:</strong> Your reading history, bookmarks, and preferences</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, and interactions with the site</li>
        </ul>
        <h2 className="text-lg font-semibold text-white mt-6">How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To provide and maintain our service</li>
          <li>To personalize your reading experience</li>
          <li>To improve our website and features</li>
          <li>To communicate with you about updates and changes</li>
        </ul>
        <h2 className="text-lg font-semibold text-white mt-6">Data Protection</h2>
        <p>We implement appropriate security measures to protect your personal information. Passwords are encrypted and we never share your data with third parties without your consent.</p>
        <h2 className="text-lg font-semibold text-white mt-6">Contact</h2>
        <p>For privacy-related inquiries, please contact us at <a href="mailto:admin@wtr-lab.com" className="text-violet-400 hover:text-violet-300">admin@wtr-lab.com</a>.</p>
      </div>
    </div>
  );
}
