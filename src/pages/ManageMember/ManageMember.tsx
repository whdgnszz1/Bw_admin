import React, { useState } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Wrapper from "../../components/layout/Wrapper";
import ApproveMember from "./ApproveMember";
import InquireMember from "./InquireMember";
import MemberLeftSideBar from "./MemberLeftSideBar";

function ManageMember() {
  const [selectedTab, setSelectedTab] = useState("approve");

  return (
    <DefaultLayout>
      <Wrapper>
        <MemberLeftSideBar onTabChange={setSelectedTab} />
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-3/4 h-5/6 flex flex-col bg-white rounded-lg p-8">
            {selectedTab === "approve" && <ApproveMember />}
            {selectedTab === "inquire" && <InquireMember />}
          </div>
        </div>
      </Wrapper>
    </DefaultLayout>
  );
}

export default ManageMember;
