import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "An internal server error occurred" });
};

router.get("/", async (req, res) => {
    try {
        const category = await prisma.category.findMany();
        res.send(category);
    } catch ( error) {
        handleError(res, error)
    }
});

router.get("/:id", async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });
        res.json(category);
    } catch ( error) {
        handleError(res, error)
    }
});

export default router;
