import PageTitle from "@/components/page-title";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import dayjs from "dayjs";
import React from "react";

async function ProfilePage() {
  const response = await GetCurrentUserFromMongoDB();
  const user = JSON.parse(JSON.stringify(response.data));

  const bookingsCount = await BookingModel.countDocuments({ user: user._id });

  const renderUserProperty = (label: string, value: string) => {
    return (
      <div className="flex flex-col  text-gray-600">
        <span className="text-xs">{label}</span>
        <span className="text-sm font-semibold"> {value}</span>
      </div>
    );
  };

  return (
    <div>
      <PageTitle title="Profile" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {renderUserProperty("Name", user.name)}
        {renderUserProperty("Email", user.email)}
        {renderUserProperty("User Id", user._id)}
        {renderUserProperty("Role", user.isAdmin ? "Admin" : "User")}
        {renderUserProperty(
          "Joined At",
          dayjs(user.createdAt).format("MMM DD, YYYY hh:mm A")
        )}

        {renderUserProperty("Total Bookings", bookingsCount.toString())}
      </div>
    </div>
  );
}

export default ProfilePage;
