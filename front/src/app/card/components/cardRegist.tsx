"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { CreditCard, Calendar, Lock, User, CheckCircle2 } from "lucide-react";
import AnimatedModal from "@/components/animatedModal";
import { RegistCard } from "../api/postCard";
import { GetCardInfo } from "../api/getCard";

//상태관리
import {
  setNumber,
  setExpiry,
  setCvc,
  setName,
  setFocus,
} from "@/stores/slices/cardSlice";
import { setCurrentCard } from "@/stores/slices/cardSlice";
import { toggleIsModalOpen } from "@/stores/slices/aniModalSlice";
import { encryptCardInfo } from "../utils/cardInfoEncryptor";

const CardRegist = () => {
  const dispatch = useAppDispatch();
  const { number, expiry, cvc, name, focus } = useAppSelector(
    (state) => state.card
  );
  const { isModalOpen } = useAppSelector((state) => state.aniModal);

  useEffect(() => {
    dispatch(setNumber(""));
    dispatch(setExpiry(""));
    dispatch(setCvc(""));
    dispatch(setName(""));
    dispatch(setFocus(""));
  }, [isModalOpen, dispatch]);

  const handleClose = async () => {
    const cardInfo = await GetCardInfo();
    dispatch(setCurrentCard(cardInfo?.data));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const secret = await encryptCardInfo(number.replaceAll(" ", ""), cvc);
    const response = await RegistCard({
      cardNo: secret.card_no,
      cvc: secret.cvc,
      keyInfo: secret.key_info,
      userName: name,
      expiryDate: expiry.replaceAll("/", ""),
    });

    if (response && response.status === 200) {
      handleClose();
      dispatch(toggleIsModalOpen());
    }
  };

  const children = (
    <div id="card-regist">
      {/* 카드 미리보기 */}
      <div className="mb-4 transition-transform overflow-hidden w-full h-fit p-4">
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
              id="cardNumber"
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
              className="text-black pl-10 w-full py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#F29F05] focus:border-[#F29F05] transition-all shadow-sm"
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
                id="expiry"
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
                className="text-black pl-10 w-full py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#F29F05] focus:border-[#F29F05] transition-all shadow-sm"
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
                id="cvc"
                type="text"
                name="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => {
                  const cvcNumber = e.target.value.replace(/\D/g, "");
                  dispatch(setCvc(cvcNumber));
                }}
                onFocus={() => dispatch(setFocus("cvc"))}
                className="text-black pl-10 w-full py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#F29F05] focus:border-[#F29F05] transition-all shadow-sm"
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
              id="name"
              type="text"
              name="name"
              placeholder="영어로 입력해주세요"
              value={name}
              onChange={(e) => {
                const masterName = e.target.value.replace(/[0-9]/g, "");
                dispatch(setName(masterName));
              }}
              onFocus={() => dispatch(setFocus("name"))}
              className="text-black pl-10 w-full py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#F29F05] focus:border-[#F29F05] transition-all shadow-sm"
              required
              maxLength={20}
            />
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          id="registCard"
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent bg-[#F29F05] rounded-xl shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all mt-4"
        >
          <CheckCircle2 size={20} className="mr-2" />
          카드 등록하기
        </button>
      </form>
    </div>
  );

  return <AnimatedModal onClose={handleClose}>{children}</AnimatedModal>;
};

export default CardRegist;
