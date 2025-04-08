"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BackupTableIcon from "@mui/icons-material/BackupTable";

const links = [{ name: "Products Table", href: "/", icon: BackupTableIcon }];

export default function NavLinks() {
  const pathname = usePathname();
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
                  pathname === link.href,
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
