import dotenv from "dotenv"
import path from "path"

dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

import app from "./app"
import cors from "cors";

const PORT = process.env.PORT || 4000

app.use(cors({
  origin: "*", // we will lock later
  methods: ["GET","POST"]
}));

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
