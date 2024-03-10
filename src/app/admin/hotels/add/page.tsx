import PageTitle from "@/components/page-title";
import React from "react";
import HotelForm from "../_common/hotel-form";

function AddHotelPage() {
  return (
    <div>
      <PageTitle title="Add Hotel" />
      <HotelForm type="add" />
    </div>
  );
}

export default AddHotelPage;
