import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ticketsRouter } from "./routes/tickets.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); //frontend
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/tickets", ticketsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
