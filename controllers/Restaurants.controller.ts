import { IRating } from "../interfaces/IStores";
import {
  listStoreByIdService,
  listStoresService,
  listStoreByCategoryService,
  listStoreByEmailService,
  createRatingService,
} from "../services/Restaurants.service";

export const listStoresController = async (citySelected: string) => {
  return await listStoresService(citySelected);
};

export const listStoreByIdController = async (storeId: string) => {
  return await listStoreByIdService(storeId);
};

export const listStoreByCategoryController = async (category: string, citySelected : string) => {
  return await listStoreByCategoryService(category, citySelected);
};

export const listStoreByEmailController = async (email: string) => {
  return await listStoreByEmailService(email);
};

export const createRatingController = async (
  storeId: string,
  payload: IRating
) => {
  return await createRatingService(storeId, payload);
};
