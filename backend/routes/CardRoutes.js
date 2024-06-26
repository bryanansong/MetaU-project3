import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();
const userId = 1;

// Helper function for error handling
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "An internal server error occurred" });
};

// Create a new card
router.post("/", async (req, res) => {
  const { title, claimPost, boardId, image } = req.body;

  // Validate input
  if (!title || !userId || !boardId) {
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

    // Check if the board exists
    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const card = await prisma.card.create({
      data: {
        title,
        userId,
        boardId,
        image,
        createdAt: new Date(),
      },
    });
    res.status(201).json(card);
  } catch (error) {
    handleError(res, error);
  }
});

// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    handleError(res, error);
  }
});

// Get all comments related to a card
router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;

  // Validate the card ID
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid card ID" });
  }

  try {
    // Check if the card exists
    const card = await prisma.card.findUnique({
      where: { id: parseInt(id) },
    });

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    // Retrieve all comments for the card
    const comments = await prisma.comment.findMany({
      where: { cardId: parseInt(id) },
      orderBy: { createdAt: "asc" }, // Optional: to order comments by creation time
    });

    res.json(comments);
  } catch (error) {
    handleError(res, error);
  }
});

// Get a single card by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const card = await prisma.card.findUnique({
      where: { id: parseInt(id) },
    });

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json(card);
  } catch (error) {
    handleError(res, error);
  }
});

// Update a card by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, boardId } = req.body;

  // Validate input
  if (!title || !boardId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if the board exists
    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const card = await prisma.card.update({
      where: { id: parseInt(id) },
      data: {
        title,
        image,
        boardId,
      },
    });

    res.json(card);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Card not found" });
    }
    handleError(res, error);
  }
});

// Delete a card by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cardId = parseInt(id);

    // Validate the card ID
    if (isNaN(cardId)) {
      return res.status(400).json({ error: "Invalid card ID" });
    }

    // Check if the card exists
    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    // Delete reactions associated with the card
    await prisma.reaction.deleteMany({
      where: { cardId },
    });

    // Delete comments associated with the card
    await prisma.comment.deleteMany({
      where: { cardId },
    });

    // Delete the card
    await prisma.card.delete({
      where: { id: cardId },
    });

    res.json({
      message: "Card, associated reactions, and comments deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Card not found" });
    }
    handleError(res, error);
  }
});

export default router;
