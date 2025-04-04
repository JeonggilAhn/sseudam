"use client";

import { useState, useEffect } from "react";

//페이지 전환 애니메이션
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export const TransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    const timeOut = setTimeout(() => {
      setIsReady(true);
    }, 300);
    return () => clearTimeout(timeOut);
  }, [pathname]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 1, filter: "blur(2.5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 1, filter: "blur(2.5px)" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        {isReady && children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionWrapper;
