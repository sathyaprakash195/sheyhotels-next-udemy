import PageTitle from "@/components/page-title";
import BookingModel from "@/models/booking-model";
import React from "react";
import AdminBookingsTable from "../_common/admin-bookings-table";

async function AdminBookingsPage() {
  const bookingsResponse = await BookingModel.find({})
    .populate("hotel")
    .populate("room")
    .populate("user")
    .sort({ createdAt: -1 });
    const bookings = JSON.parse(JSON.stringify(bookingsResponse));
  return (
    <div>
      <PageTitle title="Bookings" />
      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}

export default AdminBookingsPage;
