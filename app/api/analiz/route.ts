import { DashboardService } from "@/app/modules/dashboard/dashboard.service";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  //   const [revenue, orders, products, customers, recent] = await Promise.all([
  //     prisma.order.aggregate({ _sum: { total: true } }),
  //     prisma.order.count(),
  //     prisma.product.count(),
  //     prisma.user.count({ where: { role: 'CUSTOMER' } }),
  //     prisma.order.findMany({
  //       orderBy: { createdAt: 'desc' },
  //       take: 5,
  //       include: {
  //         user: true,
  //         items: { include: { product: true } }
  //       }
  //     })
  //   ]);

  //   return {
  //     totalRevenue: revenue._sum.total || 0,
  //     totalOrders: orders,
  //     totalProducts: products,
  //     totalCustomers: customers,
  //     recentOrders: recent,
  //   };

  const data = await new DashboardService().getStats();

  return Response.json({
    success: true,
    data,
  });
}
