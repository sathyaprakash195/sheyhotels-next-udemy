import { BookingType } from "@/interfaces";
import { CancelBooking } from "@/server-actions/bookings";
import { Modal, message } from "antd";
import dayjs from "dayjs";
import React from "react";

function CancelBookingModal({
  booking,
  showCancelBookingModal,
  setShowCancelBookingModal,
}: {
  booking: BookingType;
  showCancelBookingModal: boolean;
  setShowCancelBookingModal: (show: boolean) => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const onCancelBooking = async () => {
    try {
      setLoading(true);
      const response = await CancelBooking({
        bookingId: booking._id,
        paymentId: booking.paymentId,
      });

      if (response.success) {
        setShowCancelBookingModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<div className="text-red-700 font-bold">Cancel Booking</div>}
      open={showCancelBookingModal}
      onCancel={() => setShowCancelBookingModal(false)}
      centered
      okText="Yes, Cancel"
      onOk={onCancelBooking}
      okButtonProps={{ loading }}
    >
      <div className="text-sm text-gray-600 mb-7">
        <div className="flex justify-between text-sx">
          <span>Check In Date</span>
          <span>{dayjs(booking.checkInDate).format("MMM DD, YYYY")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Check Out Date</span>
          <span>{dayjs(booking.checkOutDate).format("MMM DD, YYYY")}</span>
        </div>
      </div>

      <span className="text-gray-600 text-sm">
        Are you sure you want to cancel the booking? This action cannot be
        undone.
      </span>
    </Modal>
  );
}

export default CancelBookingModal;
