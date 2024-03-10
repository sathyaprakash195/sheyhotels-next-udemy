import PageTitle from "@/components/page-title";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import React from "react";
import UserBookingsTable from "./_common/user-bookings-table";

async function BookingsPage() {
  const userResponse = await GetCurrentUserFromMongoDB();
  const userBookingsResponse = await BookingModel.find({
    user: userResponse.data._id,
  })
    .populate("room")
    .populate("hotel")
    .sort({ createdAt: -1 });
  const userBookings = JSON.parse(JSON.stringify(userBookingsResponse));
  return (
    <div>
      <PageTitle title="My Bookings" />
      <UserBookingsTable bookings={userBookings} />
    </div>
  );
}

export default BookingsPage;
