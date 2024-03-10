import PageTitle from "@/components/page-title";
import UserModel from "@/models/user-model";
import React from "react";
import UsersTable from "./_common/users-table";

async function UsersPage() {
  const response = await UserModel.find().sort({ createdAt: -1 });
  const users = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="Users" />

      <UsersTable users={users} />
    </div>
  );
}

export default UsersPage;
