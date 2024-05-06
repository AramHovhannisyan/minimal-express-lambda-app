import { requestAllFromDB } from "../repositories/testRepository";

const getData = async () => {
  const allData = await requestAllFromDB();

  return allData;
};

export { getData };
