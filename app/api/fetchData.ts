"use server";

//fetch data from api

import axios from "axios";

async function fetchDataTable() {
  const res = await axios.get(process.env.CARSFORM_URL as string);
  console.log(res.data);
  return {
    props: {
      data: res.data,
    },
    revalidate: 5, //  In seconds 5 seconds
}
}

export default fetchDataTable;
