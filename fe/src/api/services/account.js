import { api } from "../index";

const ENDPOINT = "/accounts";

const getAllAccount = async () => {
  try {
    const response = await api.get(`${ENDPOINT}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getAccountBySlug = async (slug) => {
  try {
    const response = await api.get(
      `${ENDPOINT}?filters[slug][$eqi]=${slug}&populate[links][populate]=*&populate[photo][populate]=*`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const registerAccount = async (data) => {
  try {
    const response = await api.post(`${ENDPOINT}`, { data: data });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export { getAllAccount, getAccountBySlug, registerAccount };
