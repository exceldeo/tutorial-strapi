import { api } from "../index";

const uploadPhoto = async (data) => {
  try {
    var formData = new FormData();
    formData.append("files", data, data.name);

    const response = await api.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export { uploadPhoto };
