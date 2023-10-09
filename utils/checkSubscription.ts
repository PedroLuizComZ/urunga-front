import Cookies from "js-cookie";
import { parseJwt } from "./parseJwt";
import { getUserProfileController } from "../controllers/Auth.controller";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const checkSubscription = async () => {
    let jwtToken: any = Cookies.get("token");
  
    const parsedJwt = await parseJwt(jwtToken);

    const userProfile = await getUserProfileController(parsedJwt.data._id);

    try {
      const session = await stripe.checkout.sessions.retrieve(
        userProfile?.checkoutSessionId
      );

      if (session && session.status === "complete") {
        return session
      }

      return false
    } catch (error) {
      console.log(error);
      return false
    }
};
