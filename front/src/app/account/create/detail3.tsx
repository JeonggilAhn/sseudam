import React from "react";
import { InputPassword } from "../components/selectNumber";

function CreateDetail3() {
  return (
    <>
      <div className="flex flex-col">
        <div className="mb-10">
          <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-3">
            출금 계좌번호
          </label>
        </div>

        <div className="mb-10">
          <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-3">
            출금 은행 선택
          </label>
        </div>

        <div className="mb-10">
          <label htmlFor="" className="text-[#7b7b7b]/80 font-bold">
            타행계좌 확인
          </label>
          <div className="mt-5">
            <InputPassword />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDetail3;
