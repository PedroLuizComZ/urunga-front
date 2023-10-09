import { IRating } from "../interfaces/IStores";
import { privateApi } from "./api";

export const listStoresService = async (citySelected = "") => {
  let city = citySelected !== "" ? `?city=${citySelected}` : "";
  return privateApi
    .get(`/store${city}`)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const listStoreByIdService = async (storeId: string) => {
  return privateApi
    .get(`/store/${storeId}`)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const listStoreByCategoryService = async (category: string, citySelected : string) => {
  let city = citySelected !== "" ? `?city=${citySelected}` : "";
  return privateApi
    .get(`/store/list-by-category/${category}${city}`)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const listStoreByEmailService = async (email: string) => {
  return privateApi
    .get(`/store/list-by-email/${email}`)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const createRatingService = async (storeId:string, payload: IRating) => {
  return privateApi
    .put(`/store/rating/${storeId}`, payload)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};
