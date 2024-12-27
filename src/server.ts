import express from "express";
import router from "./routes/urlRoutes";
import dotenv from 'dotenv'
import connectDB from "./config/db";


dotenv.config()

const app = express();
connectDB()

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
