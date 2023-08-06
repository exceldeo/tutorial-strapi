import api from "../index";

const ENDPOINT = "/links";

const addLink = async (data) => {
  try {
    const response = await api.post(`${ENDPOINT}`, data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export { getAllAccount, getAccountBySlug, registerAccount };
