import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spinner from "@/components/spinner";
import Filters from "./_common/filters";

export default async function Home({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);

  console.log(searchParams);
  return (
    <div>
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Spinner fullHeight/>} key={suspenseKey}>
        <RoomsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
