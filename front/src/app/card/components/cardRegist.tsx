"use client";

import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  CircleX,
  CreditCard,
  Calendar,
  Lock,
  User,
  CheckCircle2,
} from "lucide-react";

//상태관리
import {
  toggleIsRegistModalOpen,
  setNumber,
  setExpiry,
  setCvc,
  setName,
  setFocus,
} from "@/stores/slices/cardSlice";

const CardRegist = () => {
  const dispatch = useAppDispatch();
  const { isRegistModalOpen, number, expiry, cvc, name, focus } =
    useAppSelector((state) => state.card);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.name == "cardNumber") {
//       dispatch(setNumber(e.target.value));
//     } else if (e.target.name == "expiry") {
//       dispatch(setExpiry(e.target.value));
//     } else if (e.target.name == "cvc") {
//       dispatch(setCvc(e.target.value));
//     } else if (e.target.name == "name") {
//       dispatch(setName(e.target.value));
//     } else if (e.target.name == "focus") {
//       dispatch(setFocus(e.target.value));
//     }
//   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 카드 등록 로직 추가
    alert("카드가 등록되었습니다!");
    dispatch(toggleIsRegistModalOpen());
  };

  return (
    <AnimatePresence>
      {isRegistModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backdropFilter: "blur(10px)" }}
          className="relative h-screen flex items-center justify-center z-[1000] -translate-y-[40%]"
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
              onClick={() => dispatch(toggleIsRegistModalOpen())}
              className="absolute top-1 right-1 text-gray-600 z-[1000]"
            >
              <CircleX size={24} />
            </button>

            {/* 카드 미리보기 */}
            <div className="mb-4 transition-transform overflow-hidden w-full h-fit">
              <Cards
                number={number}
                expiry={expiry}
                cvc={cvc}
                name={name}
                focused={focus as Focused}
              />
            </div>

            {/* 입력 폼 */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 flex flex-col justify-between h-auto"
            >
              <div className="space-y-2">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  카드번호
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <CreditCard size={16} />
                  </div>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={number}
                    onChange={(e) => {
                      const cardNumber =
                        e.target.value
                          .replace(/\D/g, "")
                          .match(/.{1,4}/g)
                          ?.join(" ") || "";
                      dispatch(setNumber(cardNumber));
                    }}
                    onFocus={() => dispatch(setFocus("number"))}
                    className="pl-10 w-full py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#F29F05] focus:border-[#F29F05] transition-all shadow-sm"
                    required
                    maxLength={19}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    만료일
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Calendar size={18} />
                    </div>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => {
                        const expiryDate =
                          e.target.value
                            .replace(/\D/g, "")
                            .match(/.{1,2}/g)
                            ?.join("/") || "";
                        dispatch(setExpiry(expiryDate));
                      }}
                      onFocus={() => dispatch(setFocus("expiry"))}
                      className="pl-10 w-full py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#F29F05] focus:border-[#F29F05] transition-all shadow-sm"
                      required
                      maxLength={5}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="text"
                      name="cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => {
                        const cvcNumber = e.target.value.replace(/\D/g, "");
                        dispatch(setCvc(cvcNumber));
                      }}
                      onFocus={() => dispatch(setFocus("cvc"))}
                      className="pl-10 w-full py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#F29F05] focus:border-[#F29F05] transition-all shadow-sm"
                      required
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  카드 소유자 이름
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="영어로 입력해주세요"
                    value={name}
                    onChange={(e) => {
                      const masterName = e.target.value.replace(/[0-9]/g, "");
                      dispatch(setName(masterName));
                    }}
                    onFocus={() => dispatch(setFocus("name"))}
                    className="pl-10 w-full py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    required
                    maxLength={20}
                  />
                </div>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent bg-[#F29F05] rounded-xl shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all mt-4"
              >
                <CheckCircle2 size={20} className="mr-2" />
                카드 등록하기
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardRegist;
