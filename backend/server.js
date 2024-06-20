import express, { json } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cardRoutes from "./routes/CardRoutes.js";
import boardRoutes from "./routes/BoardRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import commentRoutes from "./routes/CommentRoutes.js"

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const prisma = new PrismaClient();

app.use(json());

// START SERVER
app.listen(PORT, () => {
  console.log("SEVER STARTED 🚀");
});

app.get("/", (req, res) => {
    res.send("SERVER IS UP AND RUNNING");
});

// PRELOAD DATA
const preLoadData = async () => {
  const categories = [
    { id: 1, name: "recent" },
    { id: 2, name: "celebration" },
    { id: 3, name: "thank-you" },
    { id: 4, name: "inspiration" },
  ];
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        name: category.name,
      },
    });
  }
};

// SETTING UP ROUTES
app.use('/users', userRoutes);
app.use('/boards', boardRoutes);
app.use('/cards', cardRoutes);
app.use('/comments', commentRoutes )


// // // // // // // // // // HELPER FUNCTIONS // // // // // // // // // //
export const getCatergoryId = (category) => {
  const textToId = {
    "recent" : 1,
    "celebration": 2,
    "thank-you": 3,
    "inspiration": 4
  }

  return textToId[category]
}
