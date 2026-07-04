import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - WTR-LAB",
  description: "Get in touch with WTR-Lab support team.",
};

export default function ContactUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-violet-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Contact Us</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Email</h2>
          <p className="text-sm text-gray-400">
            For general inquiries and support:
          </p>
          <a
            href="mailto:admin@wtr-lab.com"
            className="text-violet-400 hover:text-violet-300 text-sm transition-colors mt-1 inline-block"
          >
            admin@wtr-lab.com
          </a>
        </div>

        {/* Discord */}
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Discord</h2>
          <p className="text-sm text-gray-400 mb-3">
            Join our Discord community for bug reports and discussions:
          </p>
          <a
            href="https://discord.gg/wtrlab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white text-sm rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
            </svg>
            Join Discord
          </a>
        </div>

        {/* Patreon */}
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Support Us</h2>
          <p className="text-sm text-gray-400 mb-3">
            Like what we do? Support us on Patreon:
          </p>
          <a
            href="https://patreon.com/wtrlab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF424D] hover:bg-[#e63945] text-white text-sm rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.82 2.41C18.78 2.41 22 5.65 22 9.62C22 13.58 18.78 16.8 14.82 16.8C10.85 16.8 7.61 13.58 7.61 9.62C7.61 5.65 10.85 2.41 14.82 2.41M2 21.59H5.81V2.41H2V21.59Z" />
            </svg>
            Support on Patreon
          </a>
        </div>

        {/* Bug Reports */}
        <div className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Bug Reports</h2>
          <p className="text-sm text-gray-400 mb-3">
            Found a bug? Please report it on our Discord server.
          </p>
          <a
            href="https://discord.gg/wtrlab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
          >
            discord.gg/wtrlab →
          </a>
        </div>
      </div>
    </div>
  );
}
