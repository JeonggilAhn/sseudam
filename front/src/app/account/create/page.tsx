import React from "react";
import PageSetting from "@/app/pageSetting";
import InsurancePolicy from "./insurePolicy";
import PasswordAndRatio from "./passwordAndRatio";
import CreateDetail3 from "./detail3";

function CreateAccount() {
  return (
    <>
      <PageSetting pageTitle="쓰담 통장 만들기">
        {/* 통장 개설 */}
        {/* <InsurancePolicy /> */}
        {/* <PasswordAndRatio /> */}
        <CreateDetail3 />
      </PageSetting>
    </>
  );
}

export default CreateAccount;
