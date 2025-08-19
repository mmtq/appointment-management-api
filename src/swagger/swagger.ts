import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { appointmentsSwagger } from "./appointmentsSwagger";

export const setupSwagger = (app: Express) => {
  const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Appointment Management API",
      version: "1.0.0",
      description: "API documentation for Appointment Management API",
    },
    paths: {},
    components: {}
  };

  Object.assign(swaggerDocument.paths, appointmentsSwagger.paths);
  Object.assign(swaggerDocument.components, appointmentsSwagger.components);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/docs-json", (req, res) => res.json(swaggerDocument));
};
