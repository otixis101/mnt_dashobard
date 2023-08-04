import React from "react";
import BrandLogo from "public/logo.webp";
import Image from "next/image";
import Link from "next/link";
import Facebook from "public/assets/icon/facebook--ff.svg";
import Instagram from "public/assets/icon/instagram-ff.svg";
import Twitter from "public/assets/icon/twitter--ff.svg";
import LinkedIn from "public/assets/icon/linkedin--ff.svg";

const socials = [
  { icon: Facebook, name: "Facebook", url: "#" },
  { icon: Twitter, name: "Twitter", url: "#" },
  { icon: LinkedIn, name: "LinkedIn", url: "#" },
  { icon: Instagram, name: "Instagram", url: "#" },
];

// const links = [
//   { name: "About", url: "#about" },
//   { name: "Pricing", url: "#pricing" },
//   { name: "FAQs", url: "#faqs" },
//   { name: "Demo", url: "#demo" },
// ];

const Footer = () => (
  <footer className="bg-[hsla(0,_0%,_8%,_1)] px-5 py-10 md:py-20">
    <div className="mx-auto w-full max-w-sm space-y-8">
      <Link className="mx-auto block w-fit" href="/">
        <Image
          height={47}
          width={157}
          priority
          src={BrandLogo}
          alt="My Native Tree"
        />
      </Link>
      {/* <div className="flex items-center justify-between gap-4 text-sm text-white">
        {links.map(({ url, name }) => (
          <Link className="w-full max-w-[40px]" href={url} key={name}>
            {name}
          </Link>
        ))}
      </div> */}
      <div className="flex items-center justify-center gap-5">
        {socials.map(({ name, icon, url }) => (
          <Link href={url} key={name}>
            <span className="sr-only">{name}</span>
            <Image src={icon} alt={name} />
          </Link>
        ))}
      </div>
      <div className="text-center text-white">
        Copyright My Native Tree {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
