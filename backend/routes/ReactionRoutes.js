import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "An internal server error occurred" });
};

// Get all reactions for a specific card
router.get("/:cardId", async (req, res) => {
  const { cardId } = req.params;

  // Validate the card ID
  if (isNaN(parseInt(cardId))) {
    return res.status(400).json({ error: "Invalid card ID" });
  }

  try {
    const reactions = await prisma.reaction.findMany({
      where: { cardId: parseInt(cardId) },
    });

    res.json(reactions);
  } catch (error) {
    handleError(res, error);
  }
});

// Add a reaction to a card
router.post('/', async (req, res) => {
  const { userId, cardId, reactionType } = req.body;

  // Validate input
  if (isNaN(parseInt(userId)) || isNaN(parseInt(cardId)) || !reactionType) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    // Check if the card exists
    const card = await prisma.card.findUnique({
      where: { id: parseInt(cardId) },
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const reaction = await prisma.reaction.create({
      data: {
        userId: parseInt(userId),
        cardId: parseInt(cardId),
        reactionType,
      },
    });

    res.status(201).json(reaction);
  } catch (error) {
    handleError(res, error);
  }
});

// Remove last entry
router.delete("/delete-last", async (req, res) => {
  // Find the most recent entry
  const latestEntry = await prisma.reaction.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (latestEntry) {
    // Delete the entry
    await prisma.reaction.delete({
      where: {
        id: latestEntry.id,
      },
    });
    res.status(201).json(latestEntry);
  } else {
    res.status(500).send({message: "Could not find entry"})
  }
});

// Remove a reaction from a card
router.delete('/:reactionId', async (req, res) => {
  const { reactionId } = req.params;

  // Validate the reaction ID
  if (isNaN(parseInt(reactionId))) {
    return res.status(400).json({ error: 'Invalid reaction ID' });
  }

  try {
    const reaction = await prisma.reaction.findUnique({
      where: { id: parseInt(reactionId) },
    });

    if (!reaction) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    await prisma.reaction.delete({
      where: { id: parseInt(reactionId) },
    });

    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
});


export default router;
