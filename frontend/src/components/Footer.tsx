import Link from "next/link";

const footerLinks = [
  { href: "/en/about-us", label: "About Us" },
  { href: "/en/contact-us", label: "Contact Us" },
  { href: "/en/trending", label: "Trending" },
  { href: "/en/recommendation", label: "Recommendations" },
  { href: "/en/news", label: "News" },
  { href: "/en/news?type=changelog", label: "Changelog" },
  { href: "/en/dmca", label: "DMCA" },
  { href: "/en/cookie-policy", label: "Cookie Policy" },
  { href: "/en/privacy-policy", label: "Privacy Policy" },
  { href: "/en/terms-of-use", label: "Terms of Use" },
  { href: "/en/public-stats", label: "Stats" },
  { href: "/en/profile/request-serie", label: "Request Series" },
  { href: "/en/profile/vote-serie", label: "Vote Series" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e3a] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6">
          <Link href="/en" className="hover:text-gray-300 transition-colors">Intro</Link>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-300 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          Copyright © 2022 - wtr-lab.com <span className="text-[#2193b0] ml-2">v1.13.4</span>
        </p>
      </div>
    </footer>
  );
}
