"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "/public/topoLogo.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Logo UMADJUF"
            width={120}
            height={40}
            className="object-contain h-10 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
