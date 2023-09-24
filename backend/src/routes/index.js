import { live } from "./liveRoute";
import { logIn } from "./logInRoute";
import { signUp } from "./singUpRoute";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute";

export const routes = [
  live, //
  signUp,
  logIn,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
];
