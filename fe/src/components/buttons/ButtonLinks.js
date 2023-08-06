import React from "react";
import Image from "next/image";

function ButtonLinks({ data }) {
  console.log("button", data);
  return (
    <div className="cursor-pointer transition-all h-full w-full bg-gray-200 rounded-full flex gap-2 items-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 py-2 px-4 hover:scale-105">
      {data?.icon?.data.attributes.url ? (
        <div className="relative w-6 h-6 rounded-full overflow-hidden ">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.icon.data.attributes.url}`}
            alt="Picture of the author"
            className="relative "
            objectFit="cover"
            layout="fill"
          />
        </div>
      ) : (
        <></>
      )}
      <p className="">{data.title}</p>
    </div>
  );
}

export default ButtonLinks;
