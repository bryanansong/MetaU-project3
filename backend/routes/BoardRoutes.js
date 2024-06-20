import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { getCatergoryId } from "../server.js";

const prisma = new PrismaClient();
const router = Router();
const userId = 1;

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "An internal server error occurred" });
};

// Create a new board
router.post("/", async (req, res) => {
  const { title, description, image, category, claimPost } = req.body;

  const categoryId = getCatergoryId(category);
  console.log("Category ID used: ", categoryId);

  // Validate input
  if (!title || !userId || !categoryId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const board = await prisma.board.create({
      data: {
        title,
        description,
        userId: claimPost ? userId : 1,
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

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    handleError(res, error);
  }
});

// Get all recent boards
router.get("/recent", async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(boards);
  } catch (error) {
    handleError(res, error);
  }
});

// Get all boards that contain a substring of a search query in their title
router.get("/search/:searchQuery", async (req, res) => {
  const query = req.params.searchQuery;

  // Validate input
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Invalid or missing search query" });
  }

  try {
    const boards = await prisma.board.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    if (boards) {
      res.json(boards);
    } else {
      res.json([]);
    }
  } catch (error) {
    handleError(res, error);
  }
});

// Get all cards on a board
router.get("/:boardId/cards", async (req, res) => {
  const { boardId } = req.params;

  // Validate the board ID
  if (isNaN(parseInt(boardId))) {
    return res.status(400).json({ error: "Invalid board ID" });
  }

  try {
    // Check if the board exists
    const board = await prisma.board.findUnique({
      where: { id: parseInt(boardId) },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const cards = await prisma.card.findMany({
      where: { boardId: parseInt(boardId) },
    });

    res.json(cards);
  } catch (error) {
    handleError(res, error);
  }
});

// Get a single board by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const board = await prisma.board.findUnique({
      where: { id: parseInt(id) },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    handleError(res, error);
  }
});

// Update a board by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, image, category } = req.body;

  const categoryId = getCatergoryId(category);

  // Validate input
  if (!title || !description || !categoryId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const board = await prisma.board.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        image,
        categoryId,
      },
    });

    res.json(board);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Board not found" });
    }
    handleError(res, error);
  }
});

// Delete a board by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.board.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Board not found" });
    }
    handleError(res, error);
  }
});

// Get all boards in a category
router.get("/categories/:category", async (req, res) => {
  const { category } = req.params;

  const categoryId = getCatergoryId(category);

  // Validate the category ID
  if (isNaN(parseInt(categoryId))) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const boards = await prisma.board.findMany({
      where: { categoryId: parseInt(categoryId) },
    });

    res.json(boards);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
