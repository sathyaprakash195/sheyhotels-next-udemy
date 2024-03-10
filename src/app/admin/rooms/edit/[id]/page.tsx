import PageTitle from "@/components/page-title";
import HotelModel from "@/models/hotel-model";
import RoomModel from "@/models/room-model";
import React from "react";
import RoomsForm from "../../_common/rooms-form";

async function EditRoomPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await RoomModel.findById(params.id);
  const room = JSON.parse(JSON.stringify(response));

  const hotelsReponse = await HotelModel.find();
  const hotels = JSON.parse(JSON.stringify(hotelsReponse));
  return (
    <div>
      <PageTitle title="Edit Room" />
      <RoomsForm initialData={room} type="edit" hotels={hotels} />
    </div>
  );
}

export default EditRoomPage;
