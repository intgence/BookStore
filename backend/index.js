import express, { request, response } from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from 'cors';

import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.use(express.json({ extened: false }));

app.use(cors());

app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET',' POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }
))

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello!");
});

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening from port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
