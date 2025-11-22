// import prisma from "./prisma";
// const prisma = new PrismaClient();
// import prisma from "./prisma";
// import { PrismaClient } from "@prisma/client";
// prisma
// var prisma = new PrismaClient();

import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
var prisma = new PrismaClient();
// PrismaClient
async function main() {
  console.log("🌱 Seeding database...");

  // 1) Store
  const store = await prisma.store.create({
    data: {
      name: "Main Store",
      currency: "USD",
    },
  });
const passwordHash = await bcrypt.hash("defaultpassword", 10);
  // 2) Users
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      role: "ADMIN",
      storeId: store.id,
      password:passwordHash
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "User",
      email: "user@test.com",
      role: "CUSTOMER",
      password:"admin"
    },
  });

  // ─────────────────────────────────────────────
  // 3) Nested Categories (Tree)
  // ─────────────────────────────────────────────

  // Level 1
  const electronics = await prisma.category.create({
    data: { name: "Electronics" },
  });

  // Level 2
  const mobile = await prisma.category.create({
    data: {
      name: "Mobile",
      parentId: electronics.id,
    },
  });

  const laptops = await prisma.category.create({
    data: {
      name: "Laptops",
      parentId: electronics.id,
    },
  });

  // Level 3
  const smartphones = await prisma.category.create({
    data: {
      name: "Smartphones",
      parentId: mobile.id,
    },
  });

  const accessories = await prisma.category.create({
    data: {
      name: "Accessories",
      parentId: mobile.id,
    },
  });

  const gamingLaptops = await prisma.category.create({
    data: {
      name: "Gaming Laptops",
      parentId: laptops.id,
    },
  });

  const ultrabooks = await prisma.category.create({
    data: {
      name: "Ultrabooks",
      parentId: laptops.id,
    },
  });

  // ۵ دسته اصلی + ۲ زیر دسته (مجموعاً ۷ رکورد)

  // ─────────────────────────────────────────────
  // 4) SubCategories برای یکی از دسته‌ها
  // ─────────────────────────────────────────────
  await prisma.subCategory.createMany({
    data: [
      {
        title: "Flagship Phones",
        url: "/smartphones/flagship",
        size: 5,
        categoryId: smartphones.id,
      },
      {
        title: "Budget Phones",
        url: "/smartphones/budget",
        size: 5,
        categoryId: smartphones.id,
      },
    ],
  });

  // ─────────────────────────────────────────────
  // 5) Products (4 محصول)
  // ─────────────────────────────────────────────

  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 15",
      price: 1200,
      stock: 30,
      categories: {
        connect: [{ id: smartphones.id }],
      },
      attributes: {
        create: [
          { key: "Color", value: "Black" },
          { key: "Storage", value: "256GB" },
        ],
      },
    },
  });

  const samsung = await prisma.product.create({
    data: {
      name: "Samsung S24",
      price: 900,
      stock: 40,
      categories: {
        connect: [{ id: smartphones.id }],
      },
    },
  });

  const rogLaptop = await prisma.product.create({
    data: {
      name: "ASUS ROG Strix",
      price: 1800,
      stock: 15,
      categories: {
        connect: [{ id: gamingLaptops.id }],
      },
    },
  });

  const macbook = await prisma.product.create({
    data: {
      name: "MacBook Air M3",
      price: 1500,
      stock: 20,
      categories: {
        connect: [{ id: ultrabooks.id }],
      },
    },
  });

  // ─────────────────────────────────────────────
  // 6) Banner
  // ─────────────────────────────────────────────
  await prisma.banner.create({
    data: {
      title: "New Arrivals!",
      imageUrl: "/banner/new.jpg",
      position: "TOP",
      isActive: true,
      link: "/products/new",
    },
  });

  console.log("🌱 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
