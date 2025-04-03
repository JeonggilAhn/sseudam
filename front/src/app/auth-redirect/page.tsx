"use client";

import { UserAuth } from "@/utils/userAuth";

const RedirectPage = () => {
  return (
    <div>
      RedirectPage
      <button onClick={UserAuth} className="border-1">
        액세스 토큰 발급받기
      </button>
    </div>
  );
};

export default RedirectPage;
