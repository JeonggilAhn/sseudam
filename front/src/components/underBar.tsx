"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HandCoins, Home, User } from "lucide-react";
import { useState, useEffect } from "react";

const UnderBar = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname.includes("/signup") ||
      pathname.includes("/auth-redirect")
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname]);

  // 아직 hydration 안 됐을 때 (SSR 초기 렌더 방지)
  if (!pathname) return null;

  // "/" (홈) 일 때만 숨기기
  if (pathname === "/") return null;

  const menuList = [
    {
      href: "/saving",
      label: "Savings",
      icon: HandCoins,
    },
    {
      href: "/card",
      label: "Home",
      icon: Home,
    },
    {
      href: "/user",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <div>
      {show && (
        <nav className="fixed h-[5vh] min-h-15 bottom-0 left-0 right-0 bg-white border-t-2 border-t-[#539DF3] shadow z-[5000]">
          <ul className="flex justify-around">
            {menuList.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <li key={href} className="flex-1">
                  <Link href={href} className="flex flex-col items-center py-2">
                    <div className="flex flex-col items-center">
                      <Icon
                        className={`w-6 h-6 ${isActive ? "text-[#539DF3]" : "text-gray-600"}`}
                      />
                      <span
                        className={`text-sm font-semibold ${
                          isActive ? "text-[#539DF3]" : "text-gray-600"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default UnderBar;
