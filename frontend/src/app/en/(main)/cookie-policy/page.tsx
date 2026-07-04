import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy - WTR-LAB",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-violet-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Cookie Policy</span>
      </nav>
      <h1 className="text-3xl font-bold text-white mb-8">Cookie Policy</h1>
      <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-8 space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>This Cookie Policy explains how WTR-Lab uses cookies and similar technologies to recognize you when you visit our website.</p>
        <h2 className="text-lg font-semibold text-white mt-6">What are cookies?</h2>
        <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently and to provide reporting information.</p>
        <h2 className="text-lg font-semibold text-white mt-6">How we use cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Essential cookies:</strong> Required for the website to function properly (e.g., login sessions)</li>
          <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
        </ul>
        <h2 className="text-lg font-semibold text-white mt-6">Managing cookies</h2>
        <p>You can control and manage cookies in your browser settings. Please note that disabling certain cookies may affect the functionality of our website.</p>
      </div>
    </div>
  );
}
