import mongoose from "mongoose";
import dotenv from "dotenv";
import Comment from "./models/comment.js";
import { faker } from "@faker-js/faker";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const seedData = async () => {
  await Comment.deleteMany();

  const comments = [];

  for (let i = 1; i <= 1000; i++) {
    comments.push({
      postId: faker.number.int({ min: 1, max: 100 }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      body: faker.lorem.paragraph()
    });
  }

  await Comment.insertMany(comments);
  console.log("Seeded Successfully");
  process.exit();
};

seedData();
