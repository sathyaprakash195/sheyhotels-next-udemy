"use client";
import { BookingType } from "@/interfaces";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import React from "react";
import CancelBookingModal from "./cancel-booking-modal";

function UserBookingsTable({ bookings }: { bookings: BookingType[] }) {
  const [showCancelBookingModal, setShowCancelBookingModal] =
    React.useState(false);
  const [selectedBooking, setSelectedBooking] =
    React.useState<BookingType | null>(null);

  const onCancel = async (booking: BookingType) => {
    setSelectedBooking(booking);
    setShowCancelBookingModal(true);
  };
  const columns = [
    {
      title: "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: string, record: BookingType) => record.hotel.name,
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (text: string, record: BookingType) => record.room.name,
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text: string, record: BookingType) => record.room.roomNumber,
    },
    {
      title: "Check In Date",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (text: string, record: BookingType) =>
        dayjs(record.checkInDate).format("MMM DD, YYYY"),
    },
    {
      title: "Check Out Date",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (text: string, record: BookingType) =>
        dayjs(record.checkOutDate).format("MMM DD, YYYY"),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text: string, record: BookingType) => record.totalAmount,
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string, record: BookingType) =>
        dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: BookingType) =>
        record.bookingStatus === "Booked" && (
          <span
            className="text-red-500 cursor-pointer text-sm"
            onClick={() => onCancel(record)}
          >
            Cancel
          </span>
        ),
    },
  ];
  return (
    <div>
      <Table dataSource={bookings} columns={columns} />

      {showCancelBookingModal && selectedBooking && (
        <CancelBookingModal
          showCancelBookingModal={showCancelBookingModal}
          setShowCancelBookingModal={setShowCancelBookingModal}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}

export default UserBookingsTable;
