import axios from "axios";

const apiUrl = "http://localhost:9999/brand";
export const getAllBrand = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
