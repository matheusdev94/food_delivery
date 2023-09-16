export const live = {
  path: "",
  method: "get",
  handler: async (req, res) => {
    res.status(200).json({ message: "server is up" });
  },
};
