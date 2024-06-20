import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();


const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "An internal server error occurred" });
};

// Create User
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: { username, password },
  });
  res.status(201).json(user);
});


// Get all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(user);
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { username, password },
  });
  res.json(user);
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'User deleted' });
});


// TODO: Study this function
// Get all boards created by a user
router.get('/:userId/boards', async (req, res) => {
  const { userId } = req.params;

  // Validate the user ID
  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const boards = await prisma.board.findMany({
      where: { userId: parseInt(userId) },
    });

    res.json(boards);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
