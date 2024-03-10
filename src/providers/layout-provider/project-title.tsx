import React from "react";
import { useRouter } from "next/navigation";

function ProjectTitle() {
  const router = useRouter();
  return (
    <div
      className="p-5 text-2xl font-bold border-0 lg:border-r border-solid cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    >
      SHEY HOTELS
    </div>
  );
}

export default ProjectTitle;
