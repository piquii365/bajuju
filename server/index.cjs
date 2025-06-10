require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "PUT", "POST", "OPTIONS", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//routes
app.use("/cars", require("./routes/cars.router.cjs"));
app.use("/accessories", require("./routes/accessories.route.cjs"));
app.use("/transmission", require("./routes/transmission.route.cjs"));
app.use("/categories", require("./routes/categories.route.cjs"));
app.use("/countries", require("./routes/countries.route.cjs"));
app.use("/drive", require("./routes/drive.route.cjs"));
app.use("/make", require("./routes/make.route.cjs"));
app.use("/fuel", require("./routes/fuel.route.cjs"));
//Server initialization
const port = process.env.PORT || 3000;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
