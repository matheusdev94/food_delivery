import { getGoogleOauthUrl } from "../utils/getGoogleOauthUrl";

export const getGoogleOauthUrlRoute = {
  path: "/auth/google",
  method: "get",
  handler: (req, res) => {
    const url = getGoogleOauthUrl();
    res.status(200).json({ url });
  },
};
