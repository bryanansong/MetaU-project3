import express, { json } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cardRoutes from "./routes/CardRoutes.js"
// import homePageRoutes from "./routes/HomePageRoutes.js";
// import kudoBoardRoutes from "./routes/KudoBoardPageRoutes";
import loginRoutes from "./routes/LoginRoutes.js";

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

// SETTING UP ROUTES
app.use('/users', loginRoutes);
// app.use('/home', homePageRoutes);
app.use('/cards', cardRoutes);
// // // // // // // // // // // // // // // //


// // // // // // // // // // HOME PAGE ROUTES // // // // // // // // // //
// Create a new board
app.post('/boards', async (req, res) => {
  const { title, description, userId, image, categoryId } = req.body;

  // Validate input
  if (!title || !description || !userId || !categoryId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const board = await prisma.board.create({
      data: {
        title,
        description,
        userId,
        image,
        categoryId,
        createdAt: new Date(),
      },
    });
    res.status(201).json(board);
  } catch (error) {
    handleError(res, error);
  }
});




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
