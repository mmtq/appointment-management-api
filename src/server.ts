import express, { json, urlencoded } from "express";
import { setupSwagger } from "./swagger/swagger";
import appointmentsRouter from "./routes/appointments";
import { notFound } from "./middleware/not-found";
import { error } from "./middleware/error";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", appointmentsRouter);

setupSwagger(app);

app.get("/", (req, res) => res.send({ message: "Welcome to Appointment Management API" }));

app.use(notFound);
app.use(error);

export default app;
