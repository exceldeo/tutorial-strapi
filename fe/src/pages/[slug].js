import { Inter } from "next/font/google";
import { getAllAccount, getAccountBySlug } from "@/api/services/account";
import Image from "next/image";
import ButtonLinks from "@/components/buttons/ButtonLinks";
import { redirect } from "next/dist/server/api-utils";
import Button from "@/components/buttons/Button";

const inter = Inter({ subsets: ["latin"] });

export default function DetailAccount({ data }) {
  console.log(data);
  return (
    <main
      className={`flex min-h-screen w-full sm:max-w-2xl m-auto flex-col items-center p-8 sm:p-24 ${inter.className}`}
    >
      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-2">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.attributes.photo.data.attributes.url}`}
          alt="Picture of the author"
          className="relative "
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="flex flex-col items-center gap-2 w-full mb-2">
        <h3 className="text-2xl font-bold ">{data.attributes.fullname}</h3>
        <p className="text-lg">{data.attributes.bio}</p>
      </div>
      <a href={`/link/create/${data.id}`} className="mb-8">
        <Button
          buttonType="primary"
          size="md"
          outlined={true}
          wide={false}
          className={"rounded-full"}
        >
          Add Links
        </Button>
      </a>
      <div className="flex flex-col gap-5 w-full">
        {data.attributes.links.data.map((value, index) => {
          if (value.attributes.status === "active")
            return (
              <a href={value.attributes.url} target="_blank" key={index}>
                <ButtonLinks data={value.attributes} />
              </a>
            );
          else if (value.attributes.status === "suspend")
            return (
              <a key={index}>
                <ButtonLinks data={value.attributes} />
              </a>
            );
          else return <></>;
        })}
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  const accounts = await getAllAccount();
  const dataAccounts = await accounts.data.data;

  const paths = dataAccounts.map((value) => {
    return {
      params: { slug: value.attributes.slug },
    };
  });

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const selectedAccount = await getAccountBySlug(params.slug);

  if (!selectedAccount.data.data[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: selectedAccount.data.data[0],
    },
    revalidate: 10,
  };
}
