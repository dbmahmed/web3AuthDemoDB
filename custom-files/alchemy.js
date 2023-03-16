import axios from "axios";
const baseURL =
  "https://eth-mainnet.g.alchemy.com/v2/RkrG6kWMEZKcqrVq_yl57AseGTpRNWH5";

export const getNFTsByAddress = async (address) => {
  const url = `${baseURL}/getNFTs/?owner=${address}`;
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
