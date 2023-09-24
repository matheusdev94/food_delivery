export const live = {
  path: "/live",
  method: "get",
  handler: async (req, res) => {
    const clientIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(`IP da Requisição: ${clientIp}`);
    res.status(200).json({ message: "seu ip: " + clientIp });
  },
};
