"use client";
import { UserAuth } from "@/utils/userAuth";
const Login = () => {
  return (
    <div>
      <button className="cursor-pointer" onClick={UserAuth}>
        Google 로그인
      </button>
    </div>
  );
};
export default Login;
