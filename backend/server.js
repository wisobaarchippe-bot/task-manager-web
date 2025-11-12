const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

app.listen(5000, () => console.log("🚀 Serveur démarré sur le port 5000"));
