import { IStores } from "../interfaces/IStores";

export const calcRating = (restaurant: IStores) => {
    if (restaurant!.rating.length === 0) {
      return 5;
    } else {
      const sum = restaurant!.rating.reduce(
        (partialSum, a) => partialSum + a.ratingValue,
        0
      );
      return sum / restaurant!.rating.length;
    }
  };