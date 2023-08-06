import api from "../index";

const ENDPOINT = "/accounts";

const getAllAccount = async () => {
  try {
    const response = await api.get(`${ENDPOINT}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { getAllAccount };
