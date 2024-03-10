import { UserType } from "@/interfaces";
import React from "react";
import ProjectTitle from "./project-title";
import { Button } from "antd";
import UserInfo from "./user-info";

function Header({ loggedInUserData }: { loggedInUserData: UserType | null }) {
  if (!loggedInUserData) {
    return (
      <div className="flex justify-between items-center">
        <ProjectTitle />
        <Button type="link">Sign In</Button>
      </div>
    );
  }

  return (
    <div className="lg:px-20">
      <div className="flex justify-between items-center border border-t-0 border-solid">
        <ProjectTitle />
        <UserInfo loggedInUserData={loggedInUserData} />
      </div>
    </div>
  );
}

export default Header;
