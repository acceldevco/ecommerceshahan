import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // محاسبه درآمد ماهانه برای 12 ماه گذشته
    const monthlyRevenue = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1),
        },
        status: {
          in: ['PAID', 'DELIVERED'] // فقط سفارشات پرداخت شده و تحویل شده
        }
      },
      _sum: {
        total: true,
      },
    });

    // گروه‌بندی بر اساس ماه و سال
    const revenueByMonth = monthlyRevenue.reduce((acc: any, item:any) => {
      const date = new Date(item.createdAt);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += item._sum.total || 0;
      
      return acc;
    }, {});

    // ایجاد آرایه‌ای برای 12 ماه گذشته
    const months = [];
    const revenues = [];
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      const monthName = date.toLocaleString('fa-IR', { month: 'long' });
      
      months.push(monthName);
      revenues.push(revenueByMonth[monthYear] || 0);
    }

    return NextResponse.json({
      months,
      revenues
    });
  } catch (error) {
    console.error('Error fetching monthly revenue:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت اطلاعات' },
      { status: 500 }
    );
  }
}