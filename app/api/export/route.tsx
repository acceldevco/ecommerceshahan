import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import * as XLSX from 'xlsx';



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get('table');

    if (!table) {
      return NextResponse.json({ error: 'نام جدول الزامی است (مثلاً ?table=Product)' }, { status: 400 });
    }

    const lower = table.toLowerCase();

    if (!(lower in prisma)) {
      return NextResponse.json({ error: `مدل ${table} در Prisma وجود ندارد` }, { status: 400 });
    }

    // @ts-ignore
    const records = await prisma[lower].findMany();

    if (!records.length) {
      return NextResponse.json({ error: `جدول ${table} خالی است` }, { status: 404 });
    }

    // ساخت شیت Excel از داده‌ها
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, table);

    // تبدیل به باینری
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // ارسال فایل به عنوان پاسخ
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${table}.xlsx"`,
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  } catch (err: any) {
    console.error('❌ خطا در export:', err);
    return NextResponse.json(
      { error: err.message || 'خطای ناشناخته در خروجی Excel' },
      { status: 500 }
    );
  }
}
