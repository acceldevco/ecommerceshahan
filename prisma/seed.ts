

// import { PrismaClient } from '@prisma/client'
// import bcrypt from "bcryptjs";
// var prisma = new PrismaClient();
// // PrismaClient
// async function main() {
//   console.log("🌱 Seeding database...");

//   // 1) Store
//   const store = await prisma.store.create({
//     data: {
//       name: "Main Store",
//       currency: "USD",
//     },
//   });
// const passwordHash = await bcrypt.hash("defaultpassword", 10);
//   // 2) Users
//   const admin = await prisma.user.create({
//     data: {
//       name: "Admin",
//       email: "admin@test.com",
//       role: "ADMIN",
//       storeId: store.id,
//       password:passwordHash
//     },
//   });

//   const user = await prisma.user.create({
//     data: {
//       name: "User",
//       email: "user@test.com",
//       role: "CUSTOMER",
//       password:"admin"
//     },
//   });

//   // ─────────────────────────────────────────────
//   // 3) Nested Categories (Tree)
//   // ─────────────────────────────────────────────

//   // Level 1
//   const electronics = await prisma.category.create({
//     data: { name: "Electronics" },
//   });

//   // Level 2
//   const mobile = await prisma.category.create({
//     data: {
//       name: "Mobile",
//       parentId: electronics.id,
//     },
//   });

//   const laptops = await prisma.category.create({
//     data: {
//       name: "Laptops",
//       parentId: electronics.id,
//     },
//   });

//   // Level 3
//   const smartphones = await prisma.category.create({
//     data: {
//       name: "Smartphones",
//       parentId: mobile.id,
//     },
//   });

//   const accessories = await prisma.category.create({
//     data: {
//       name: "Accessories",
//       parentId: mobile.id,
//     },
//   });

//   const gamingLaptops = await prisma.category.create({
//     data: {
//       name: "Gaming Laptops",
//       parentId: laptops.id,
//     },
//   });

//   const ultrabooks = await prisma.category.create({
//     data: {
//       name: "Ultrabooks",
//       parentId: laptops.id,
//     },
//   });

//   // ۵ دسته اصلی + ۲ زیر دسته (مجموعاً ۷ رکورد)

//   // ─────────────────────────────────────────────
//   // 4) SubCategories برای یکی از دسته‌ها
//   // ─────────────────────────────────────────────
//   await prisma.subCategory.createMany({
//     data: [
//       {
//         title: "Flagship Phones",
//         url: "/smartphones/flagship",
//         size: 5,
//         categoryId: smartphones.id,
//       },
//       {
//         title: "Budget Phones",
//         url: "/smartphones/budget",
//         size: 5,
//         categoryId: smartphones.id,
//       },
//     ],
//   });

//   // ─────────────────────────────────────────────
//   // 5) Products (4 محصول)
//   // ─────────────────────────────────────────────

//   const iphone = await prisma.product.create({
//     data: {
//       name: "iPhone 15",
//       price: 1200,
//       stock: 30,
//       categories: {
//         connect: [{ id: smartphones.id }],
//       },
//       attributes: {
//         create: [
//           { key: "Color", value: "Black" },
//           { key: "Storage", value: "256GB" },
//         ],
//       },
//     },
//   });

//   const samsung = await prisma.product.create({
//     data: {
//       name: "Samsung S24",
//       price: 900,
//       stock: 40,
//       categories: {
//         connect: [{ id: smartphones.id }],
//       },
//     },
//   });

//   const rogLaptop = await prisma.product.create({
//     data: {
//       name: "ASUS ROG Strix",
//       price: 1800,
//       stock: 15,
//       categories: {
//         connect: [{ id: gamingLaptops.id }],
//       },
//     },
//   });

//   const macbook = await prisma.product.create({
//     data: {
//       name: "MacBook Air M3",
//       price: 1500,
//       stock: 20,
//       categories: {
//         connect: [{ id: ultrabooks.id }],
//       },
//     },
//   });

//   // ─────────────────────────────────────────────
//   // 6) Banner
//   // ─────────────────────────────────────────────
//   await prisma.banner.create({
//     data: {
//       title: "New Arrivals!",
//       imageUrl: "/banner/new.jpg",
//       position: "TOP",
//       isActive: true,
//       link: "/products/new",
//     },
//   });

//   console.log("🌱 Seed completed!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
////////////////////////////////////
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 در حال اضافه کردن داده‌های اولیه فروشگاه خیاطی...");

  // ─────────────────────────────────────────────
  // 1) فروشگاه
  // ─────────────────────────────────────────────
  const store = await prisma.store.create({
    data: {
      name: "فروشگاه لوازم خیاطی",
      currency: "IRR",
    },
  });

  // ─────────────────────────────────────────────
  // 2) کاربران
  // ─────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "ادمین",
      email: "admin@sewing.com",
      role: "ADMIN",
      storeId: store.id,
      password: adminPassword
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "مشتری",
      email: "customer@sewing.com",
      role: "CUSTOMER",
      password: customerPassword
    },
  });

  // ─────────────────────────────────────────────
  // 3) دسته‌بندی‌ها (Nested Categories)
  // ─────────────────────────────────────────────

  // Level 1 - دسته‌های اصلی
  const fabrics = await prisma.category.create({ data: { name: "پارچه" } });
  const tools = await prisma.category.create({ data: { name: "لوازم خیاطی" } });
  const machines = await prisma.category.create({ data: { name: "چرخ خیاطی" } });
  const threads = await prisma.category.create({ data: { name: "نخ‌ها" } });
  const patterns = await prisma.category.create({ data: { name: "الگوها" } });

  // Level 2 - زیر دسته‌ها
  const cotton = await prisma.category.create({ data: { name: "پارچه نخی", parentId: fabrics.id } });
  const velvet = await prisma.category.create({ data: { name: "پارچه مخمل", parentId: fabrics.id } });

  const needles = await prisma.category.create({ data: { name: "سوزن‌ها", parentId: tools.id } });
  const scissors = await prisma.category.create({ data: { name: "قیچی‌ها", parentId: tools.id } });

  const manualMachines = await prisma.category.create({ data: { name: "چرخ خیاطی دستی", parentId: machines.id } });
  const electricMachines = await prisma.category.create({ data: { name: "چرخ خیاطی برقی", parentId: machines.id } });

  const cottonThreads = await prisma.category.create({ data: { name: "نخ نخی", parentId: threads.id } });
  const polyesterThreads = await prisma.category.create({ data: { name: "نخ پلی‌استر", parentId: threads.id } });

  const dressPatterns = await prisma.category.create({ data: { name: "الگو لباس", parentId: patterns.id } });
  const bagPatterns = await prisma.category.create({ data: { name: "الگو کیف", parentId: patterns.id } });

  // Level 3 - زیرشاخه‌ها
  const thinCotton = await prisma.category.create({ data: { name: "نخی نازک", parentId: cotton.id } });
  const thickCotton = await prisma.category.create({ data: { name: "نخی ضخیم", parentId: cotton.id } });

  const smallScissors = await prisma.category.create({ data: { name: "قیچی کوچک", parentId: scissors.id } });
  const largeScissors = await prisma.category.create({ data: { name: "قیچی بزرگ", parentId: scissors.id } });

  // ─────────────────────────────────────────────
  // 4) زیر دسته‌ها (SubCategories)
  // ─────────────────────────────────────────────
  await prisma.subCategory.createMany({
    data: [
      { title: "نخی طرح‌دار", url: "/fabrics/cotton/printed", size: 5, categoryId: thinCotton.id },
      { title: "نخی ساده", url: "/fabrics/cotton/plain", size: 5, categoryId: thickCotton.id },
    ],
  });

  // ─────────────────────────────────────────────
  // 5) محصولات
  // ─────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        name: "پارچه نخی طرح‌دار",
        price: 250000,
        stock: 100,
        
        // categories: { connect: [{ id: thinCotton.id }] } as any,
      },
      {
        name: "قیچی خیاطی کوچک",
        price: 180000,
        stock: 50,
        // categories: { connect: [{ id: smallScissors.id }] } as any,
      },
      {
        name: "چرخ خیاطی پروانه",
        price: 4800000,
        stock: 10,
        // categories: { connect: [{ id: electricMachines.id }] } as any,
      },
      {
        name: "بسته سوزن خیاطی",
        price: 50000,
        stock: 200,
        // categories: { connect: [{ id: needles.id }] } as any,
      },
      {
        name: "نخ نخی سفید",
        price: 15000,
        stock: 500,
        // categories: { connect: [{ id: cottonThreads.id }] } as any,
      },
    ],
    
  });

  // ─────────────────────────────────────────────
  // 6) بنر نمونه
  // ─────────────────────────────────────────────
  await prisma.banner.create({
    data: {
      title: "پارچه‌های جدید رسید!",
      imageUrl: "/banner/sewing.jpg",
      position: "TOP",
      isActive: true,
      link: "/fabrics/new",
    },
  });

  console.log("🌱 Seed فروشگاه خیاطی با موفقیت انجام شد!");
}

// اجرای Seed
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
