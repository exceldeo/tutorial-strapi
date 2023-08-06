import { api } from "../index";

const ENDPOINT = "/links";

const addLink = async (data) => {
  try {
    const response = await api.post(`${ENDPOINT}`, { data: data });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export { addLink };
