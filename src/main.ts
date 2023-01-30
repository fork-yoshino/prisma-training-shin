import { PrismaClient } from '@prisma/client';
import express from 'express';
import 'express-async-errors';

const PORT = process.env.APP_PORT ?? '3000';
const app = express();

const prisma = new PrismaClient();

app.use(express.json());

// Post一覧を取得
app.get('/', async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.status(200).json(posts);
});

// Postを1件取得
app.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return res.status(200).json(post);
});

// Postを投稿
app.post('/', async (req, res) => {
  const { title, body } = req.body;

  const posts = await prisma.post.create({
    data: {
      title,
      body,
    },
  });
  return res.status(201).json(posts);
});

// Postを更新
app.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { body } = req.body;

  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      body,
    },
  });
  return res.status(201).json(updatedPost);
});

// Postを削除
app.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(deletedPost);
});

app.listen(PORT, () => {
  console.log('サーバーが起動中…');
});
