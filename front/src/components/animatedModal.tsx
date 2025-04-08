"use client";

import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { CircleX } from "lucide-react";

//상태관리
import { toggleIsModalOpen } from "@/stores/slices/aniModalSlice";

const AnimatedModal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.aniModal);

  const handleClose = () => {
    dispatch(toggleIsModalOpen());
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backdropFilter: "blur(10px)" }}
          className="relative h-[100vh] flex items-center justify-center z-[1000] -translate-y-[15vh]"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            style={{ backdropFilter: "blur(10px)" }}
            className="relative h-fit w-[95vw] max-w-md bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-2xl overflow-hidden -translate-y-[3.5vh] justify-between"
          >
            {/* 닫기 버튼 */}
            <button
              onClick={handleClose}
              className="absolute top-1 right-1 text-gray-600 z-[1000]"
            >
              <CircleX className="text-gray-600 w-[6vw] max-w-[50px] h-auto" />
            </button>
            {/* 여기 원하는 컨텐츠를 넣으면 됩니다. */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
