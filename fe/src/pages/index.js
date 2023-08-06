import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center gap-2 w-full mb-8">
        <h3 className="text-2xl font-bold ">Name</h3>
        <p className="text-lg">Description</p>
      </div>
      <div className="flex flex-col gap-5 w-full">
        {[...Array(10)].map((_, i) => (
          <div className="cursor-pointer transition-all h-full w-full bg-gray-200 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 py-2 px-3 hover:scale-105">
            <p className="">Hello World!</p>
          </div>
        ))}
      </div>
    </main>
  );
}
