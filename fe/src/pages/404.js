import React from "react";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-base-200">
      <div className="relative h-[200px] w-[300px] sm:h-64 sm:w-96 md:h-[20rem] md:w-[30rem]">
        <Image src={"/404.svg"} alt="404" fill className="object-cover" />
      </div>
      <p className="opacity-70">
        Sorry, the page you are looking for could not be found
      </p>
      <a className="mt-6" href="/">
        Go Home
      </a>
    </div>
  );
};

export default NotFoundPage;
