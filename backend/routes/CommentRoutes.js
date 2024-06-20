import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Helper function for error handling
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'An internal server error occurred' });
};

// Create a new comment
router.post('/comments', async (req, res) => {
  const { userId, cardId, description } = req.body;

  // Validate input
  if (!userId || !cardId || !description) {
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

    // Check if the card exists
    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        userId,
        cardId,
        description,
        createdAt: new Date(),
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    handleError(res, error);
  }
});

// Get all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (error) {
    handleError(res, error);
  }
});

// Get a single comment by ID
router.get('/comments/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the comment ID
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid comment ID' });
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    handleError(res, error);
  }
});

// Update a comment by ID
router.put('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  // Validate input
  if (!description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate the comment ID
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid comment ID' });
  }

  try {
    const comment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { description },
    });

    res.json(comment);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Comment not found' });
    }
    handleError(res, error);
  }
});

// Delete a comment by ID
router.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the comment ID
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid comment ID' });
  }

  try {
    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Comment not found' });
    }
    handleError(res, error);
  }
});


export default router;
