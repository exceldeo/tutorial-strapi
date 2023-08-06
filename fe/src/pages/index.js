import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { getAllAccount, getAccountBySlug } from "@/api/services/account";
import Button from "@/components/buttons/Button";
import { redirect } from "next/dist/server/api-utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const getAllAccounts = async () => {
      const accounts = await getAllAccount();
      setAccounts(accounts.data.data);
    };
    getAllAccounts();
    // getAccountBySlug("exceldeo");
  }, []);

  useEffect(() => {
    console.log("accounts ", accounts);
  }, [accounts]);

  return (
    <main
      className={`flex min-h-screen w-full sm:max-w-2xl m-auto flex-col items-center p-8 sm:p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center gap-2 w-full mb-8">
        <h3 className="text-2xl font-bold ">Welwome to LinkFour</h3>
      </div>
      <div className="flex flex-col justify-center gap-5 w-full">
        <div className=" justify-center flex">
          <a href="/auth/register">
            <Button
              buttonType="primary"
              size="md"
              outlined={true}
              wide={false}
              className={"rounded-full"}
            >
              Sign Up
            </Button>
          </a>
        </div>
        <div className="flex flex-col justify-center gap-2 w-full">
          {accounts?.map((value, index) => {
            return (
              <a key={index} href={`/${value.attributes.slug}`}>
                <Button
                  buttonType="primary"
                  size="md"
                  className={"rounded-full w-full"}
                >
                  {value.attributes.fullname}
                </Button>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
