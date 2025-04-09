"use client";

import BackupTableIcon from "@mui/icons-material/BackupTable";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const links = [
  { name: "Products", href: "/", icon: BackupTableIcon, refName: "product" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const pathnameRef = pathname.split("/");
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium bg-tanstack-btn hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "border border-solid border-tanstack-500 text-tanstack-500":
                  pathname === link.href || pathnameRef[1] === link.refName,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
