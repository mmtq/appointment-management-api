import { Express } from "express"
import path from "path"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
export const setupSwagger = (app: Express) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Appointment Management API",
                version: "1.0.0",
                description: "API documentation for Appointment Management API",
            }
        },
        apis: [
            process.env.NODE_ENV === 'production'
                ? path.join(__dirname, 'routes/*.js')
                : path.join(__dirname, '../src/routes/*.ts'),
            process.env.NODE_ENV === 'production'
                ? path.join(__dirname, 'server.js')
                : path.join(__dirname, '../src/server.ts'),
        ],
    }
    const specs = swaggerJSDoc(options);
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
    app.get("/docs-json", (req, res) => res.json(specs));

}