import Button from "@/components/buttons/Button";
import TextInput from "@/components/inputText/inputText";
import Link from "next/link";
import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { registerAccount, uploadPhoto } from "@/api/services/account";

function RegisterPage() {
  const registrationForm = useFormik({
    initialValues: {
      fullname: "",
      bio: "",
      slug: "",
      photo: null,
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      bio: Yup.string(),
      slug: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      if (values.photo === null) {
        registerAccount({
          fullname: values.fullname,
          bio: values.bio,
          slug: values.slug,
        });
        return;
      }

      uploadPhoto(values.photo).then((response) => {
        const fileId = response.data[0].id;
        registerAccount({
          fullname: values.fullname,
          bio: values.bio,
          slug: values.slug,
          photo: fileId,
        }).then((res) => {
          if (res.status === 200) {
            alert("berhasil");
            registrationForm.resetForm();
          }
        });
      });
    },
  });

  return (
    <div className="flex min-h-screen">
      <div className="sm:flex-0 z-10 w-screen flex-1 px-6 shadow-2xl ">
        <div className="max-w-[8rem] py-6 first-letter:">
          <Link href={"/"}>kembali</Link>
        </div>
        <form
          onSubmit={registrationForm.handleSubmit}
          className="mt-3 flex flex-col gap-4
          justify-center w-1/2 m-auto items-center
          "
        >
          <div className="my-4 text-xl font-bold">Register</div>
          {/* register your input into the hook by invoking the "register" function */}

          <TextInput
            type="text"
            name="fullname"
            placeholder="John Doe"
            required
            full
            label="Full Name"
            onChange={registrationForm.handleChange}
            value={registrationForm.values.fullname}
            errorMsg={
              registrationForm.values.fullname !== "" &&
              registrationForm.errors.fullname
                ? registrationForm.errors.fullname
                : ""
            }
          />
          <TextInput
            type="text"
            name="bio"
            placeholder="Bla bla bla"
            full
            label="Bio"
            onChange={registrationForm.handleChange}
            value={registrationForm.values.bio}
            errorMsg={
              registrationForm.values.bio !== "" && registrationForm.errors.bio
                ? registrationForm.errors.bio
                : ""
            }
          />

          <TextInput
            type="text"
            name="slug"
            placeholder="Bla bla bla"
            required
            full
            label="Slug"
            onChange={registrationForm.handleChange}
            value={registrationForm.values.slug}
            errorMsg={
              registrationForm.values.slug !== "" &&
              registrationForm.errors.slug
                ? registrationForm.errors.slug
                : ""
            }
          />

          <input
            type="file"
            name="photo"
            onChange={(event) => {
              registrationForm.setFieldValue(
                "photo",
                event.currentTarget.files[0]
              );
            }}
          />

          <Button
            buttonType="primary"
            size="sm"
            type="submit"
            className={"rounded-full"}
            wide={true}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
