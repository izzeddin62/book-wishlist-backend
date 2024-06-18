import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";
import { errors } from "celebrate";
import cors from "cors";

const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome to Kaadol backend");
});

app.use("/api", routes);
app.use(errors());

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
