import express from "express";
import { routes } from "./routes";
// import { initializeDbConnection } from "./db";
import { initializeDbConnection } from "./database/db";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swaggerConfig";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  cors({
    origin: "*",
  })
);
//import routes:
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

initializeDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
