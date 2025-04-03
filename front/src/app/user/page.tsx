import React from "react";
import PageSetting from "../pageSetting";
import { MyBanner1, MyBanner2 } from "./mypage/myBanner";

const UserInfo = () => {
  return (
    <>
      <PageSetting headerLink="/" pageTitle="마이페이지">
        개인정보
        <MyBanner1 />
        설정
        <MyBanner2 />
      </PageSetting>
    </>
  );
};

export default UserInfo;
