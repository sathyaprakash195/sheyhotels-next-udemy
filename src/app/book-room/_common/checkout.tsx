"use client";
import { RoomType } from "@/interfaces";
import { CheckRoomAvailability } from "@/server-actions/bookings";
import { GetStripeClientSecretKey } from "@/server-actions/payments";
import { Button, Form, Input, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModal from "./payment-modal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function Checkout({ room }: { room: RoomType }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const checkAvailability = async () => {
    try {
      const response = await CheckRoomAvailability({
        roomId: room._id,
        reqCheckInDate: checkIn,
        reqCheckOutDate: checkOut,
      });
      if (response.success) {
        setIsAvailable(true);
        message.success("Room is available");

        const totalDaysTemp = dayjs(checkOut).diff(dayjs(checkIn), "day");
        setTotalDays(totalDaysTemp);
        setTotalAmount(totalDaysTemp * room.rentPerDay);
      } else {
        setIsAvailable(false);
        message.error("Room is not available");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onBookRoom = async () => {
    try {
      setLoading(true);
      const response = await GetStripeClientSecretKey({ amount: totalAmount });
      if (response.success) {
        setClientSecret(response.data);
        setShowPaymentModal(true);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsAvailable(false);
  }, [checkIn, checkOut]);

  return (
    <div className="p-5 border border-gray-300 border-solid">
      <Form layout="vertical" className="flex flex-col gap-5  text-gray-500">
        <Form.Item label="Check In">
          <Input
            type="date"
            onChange={(e) => setCheckIn(e.target.value)}
            value={checkIn}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </Form.Item>

        <Form.Item label="Check Out">
          <Input
            type="date"
            onChange={(e) => setCheckOut(e.target.value)}
            value={checkOut}
            min={dayjs(checkIn).add(1, "day").format("YYYY-MM-DD")}
            disabled={!checkIn}
          />
        </Form.Item>

        <Button
          type="primary"
          className="w-full"
          disabled={!checkIn || !checkOut || isAvailable}
          loading={loading}
          onClick={checkAvailability}
        >
          Check Availability
        </Button>

        {isAvailable && (
          <>
            <div className="flex justify-between">
              <span>Total Days</span>
              <span>{totalDays}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span>${totalAmount}</span>
            </div>
            <Button
              type="primary"
              className="w-full"
              loading={loading}
              onClick={onBookRoom}
            >
              Book Your Room
            </Button>
          </>
        )}
      </Form>

      {showPaymentModal && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <PaymentModal
            room={room}
            totalDays={totalDays}
            totalAmount={totalAmount}
            checkInDate={checkIn}
            checkOutDate={checkOut}
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
          />
        </Elements>
      )}
    </div>
  );
}

export default Checkout;
