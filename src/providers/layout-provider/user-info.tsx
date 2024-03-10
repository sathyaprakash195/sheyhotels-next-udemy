import { UserType } from "@/interfaces";
import { User } from "lucide-react";
import React from "react";
import Sidebar from "./sidebar";

function UserInfo({ loggedInUserData }: { loggedInUserData: UserType }) {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div className="p-5 border-0 lg:border-l border-solid flex items-center gap-5">
      <span className="text-gray-500 text-sm">{loggedInUserData.name}</span>
      <User
        className="text-gray-500 cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      />

      {showSidebar && (
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} 
         loggedInUserData={loggedInUserData}
        />
      )}
    </div>
  );
}

export default UserInfo;
