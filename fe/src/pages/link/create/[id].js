import Button from "@/components/buttons/Button";
import TextInput from "@/components/inputText/inputText";
import Link from "next/link";
import React, { useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadPhoto } from "@/api/services/uploadFile";
import statusLink from "@/data/statusLink";
import { addLink } from "@/api/services/link";

function LinkCreatePage({ id }) {
  const linkForm = useFormik({
    initialValues: {
      title: "",
      status: "active",
      url: "",
      icon: null,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      status: Yup.string(),
      url: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      if (values.icon === null) {
        addLink({
          title: values.title,
          status: values.status,
          url: values.url,
          account: id,
        });
        return;
      }

      uploadPhoto(values.icon).then((response) => {
        const fileId = response.data[0].id;
        addLink({
          title: values.title,
          status: values.status,
          url: values.url,
          account: parseInt(id, 10),
          icon: fileId,
        }).then((res) => {
          if (res.status === 200) {
            alert("berhasil");
            linkForm.resetForm();
          }
        });
      });
    },
  });

  useEffect(() => {
    console.log(statusLink);
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="sm:flex-0 z-10 w-screen flex-1 px-6 shadow-2xl ">
        <div className="max-w-[8rem] py-6 first-letter:">
          <Link href={"/"}>kembali ke home</Link>
        </div>
        <form
          onSubmit={linkForm.handleSubmit}
          className="mt-3 flex flex-col gap-4
          justify-center w-1/2 m-auto items-center
          "
        >
          <div className="my-4 text-xl font-bold">Add Link</div>

          <TextInput
            type="text"
            name="title"
            placeholder="John Doe"
            required
            full
            label="Title"
            onChange={linkForm.handleChange}
            value={linkForm.values.title}
            errorMsg={
              linkForm.values.title !== "" && linkForm.errors.title
                ? linkForm.errors.title
                : ""
            }
          />
          <div className=" w-full flex flex-col gap-2">
            <label className="text-sm  text-gray-700 tracking-wide">
              Status
            </label>
            <select
              name="status"
              onChange={linkForm.handleChange}
              value={linkForm.values.status}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:border-indigo-500"
            >
              {statusLink.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          <TextInput
            type="text"
            name="url"
            placeholder="Bla bla bla"
            required
            full
            label="URL"
            onChange={linkForm.handleChange}
            value={linkForm.values.url}
            errorMsg={
              linkForm.values.url !== "" && linkForm.errors.url
                ? linkForm.errors.url
                : ""
            }
          />

          <input
            type="file"
            name="icon"
            onChange={(event) => {
              linkForm.setFieldValue("icon", event.currentTarget.files[0]);
            }}
          />

          <Button
            buttonType="primary"
            size="sm"
            type="submit"
            className={"rounded-full"}
            wide={true}
          >
            Add Link
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LinkCreatePage;

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps({ params }) {
  if (!params.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: params.id,
    },
    revalidate: 10,
  };
}
