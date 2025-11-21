// import { NextResponse } from 'next/server';
// import * as XLSX from 'xlsx';
// // import { PrismaClient } from '@prisma/client';
// import  prisma  from "@/prisma/prisma";
// // const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get('file') as File;

//   if (!file) return NextResponse.json({ error: 'فایل پیدا نشد' }, { status: 400 });

//   // خواندن فایل به صورت باینری
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const workbook = XLSX.read(buffer, { type: 'buffer' });

//   // گرفتن داده‌های اولین شیت
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const jsonData = XLSX.utils.sheet_to_json(worksheet);

//   // فرض می‌کنیم ستون‌های اکسل: name | price | description هستند
//   const products = jsonData.map((row: any) => ({
//     name: row.name || row.Name,
//     price: parseFloat(row.price || row.Price),
//     description: row.description || row.Description || '',
//   }));

//   // درج در دیتابیس
//   await prisma.product.createMany({
//     data: products,
//     skipDuplicates: true,
//   });

//   return NextResponse.json({ success: true, count: products.length });
// }
///////////////////////////////////
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import prisma from '@/prisma/prisma';

// const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const table = formData.get('table') as string;

  if (!file || !table) return NextResponse.json({ error: 'فایل یا جدول مشخص نشده' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  // اطمینان از وجود مدل در Prisma
  if (!(table.toLowerCase() in prisma)) {
    return NextResponse.json({ error: `مدل ${table} در Prisma یافت نشد` }, { status: 400 });
  }

  try {
    // درج داده‌ها به صورت داینامیک
    // @ts-ignore
    const result = await prisma[table.toLowerCase()].createMany({
      data: jsonData,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
