
import prisma from "@/prisma/prisma";

export class DashboardService {
  /**
   * دریافت آمار کامل داشبورد (فقط سفارش‌های PAID برای revenue و purchased items)
   */
  async getStats() {
    try {
      const [
        revenue,
        revenuePrev,

        totalOrders,
        totalOrdersPrev,

        totalProducts,
        totalProductsPrev,
        getTotalProductValue,

        totalCustomers,
        totalCustomersPrev,

        totalUsers,
        totalUsersPrev,

        totalPurchasedItems,
        totalPurchasedItemsPrev,

        conversionRate,
        conversionRatePrev,

        funnelConversion,
        funnelConversionPrev,

        recentOrders,
      ] = await Promise.all([
        this.getTotalRevenue(),
        this.getTotalRevenuePrevious(),

        this.getOrderCount(),
        this.getOrderCountPrevious(),

        this.getProductCount(),
        this.getProductCountPrevious(),
        this.getTotalProductValue(),

        this.getCustomerCount(),
        this.getCustomerCountPrevious(),

        this.getUserCount(),
        this.getUserCountPrevious(),

        this.getTotalPurchasedItems(),
        this.getTotalPurchasedItemsPrevious(),

        this.getConversionRate(),
        this.getConversionRatePrevious(),

        this.getFunnelConversion(),
        this.getFunnelConversionPrevious(),

        this.getRecentOrders(10),
      ]);

      return {
        revenue: {
          current: revenue,
          previous: revenuePrev,
          change: this.getChangeStatus(revenue, revenuePrev),
        },
        orders: {
          current: totalOrders,
          previous: totalOrdersPrev,
          change: this.getChangeStatus(totalOrders, totalOrdersPrev),
        },
        products: {
          current: totalProducts,
          previous: totalProductsPrev,
          total:getTotalProductValue,
          change: this.getChangeStatus(totalProducts, totalProductsPrev),
        },
        customers: {
          current: totalCustomers,
          previous: totalCustomersPrev,
          change: this.getChangeStatus(totalCustomers, totalCustomersPrev),
        },
        users: {
          current: totalUsers,
          previous: totalUsersPrev,
          change: this.getChangeStatus(totalUsers, totalUsersPrev),
        },
        purchasedItems: {
          current: totalPurchasedItems,
          previous: totalPurchasedItemsPrev,
          change: this.getChangeStatus(
            totalPurchasedItems,
            totalPurchasedItemsPrev
          ),
        },
        conversionRate: {
          current: conversionRate,
          previous: conversionRatePrev,
          change: this.getChangeStatus(conversionRate, conversionRatePrev),
        },
        funnelConversion: {
          current: funnelConversion,
          previous: funnelConversionPrev,
          change: this.getChangeStatus(
            funnelConversion,
            funnelConversionPrev
          ),
        },
        recentOrders,
      };
    } catch (err) {
      console.error("DashboardService Error:", err);
      throw new Error("Failed to load dashboard stats.");
    }
  }

  // --------------------------
  // 💰 Revenue واقعی از OrderItem (فقط PAID)
  // --------------------------
  private async getTotalRevenue(): Promise<number> {
    const items = await prisma.orderItem.findMany({
      where: { order: { status: "PAID" } },
      select: { unitPrice: true, quantity: true },
    });

    return items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }

  private async getTotalRevenuePrevious(): Promise<number> {
    const items = await prisma.orderItem.findMany({
      where: {
        order: { status: "PAID", createdAt: { lt: this.previousDate() } },
      },
      select: { unitPrice: true, quantity: true },
    });

    return items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }

  // --------------------------
  // 🧾 تعداد کل سفارش‌ها (فقط PAID)
  // --------------------------
  private async getOrderCount(): Promise<number> {
    return prisma.order.count({ where: { status: "PAID" } });
  }

  private async getOrderCountPrevious(): Promise<number> {
    return prisma.order.count({
      where: { status: "PAID", createdAt: { lt: this.previousDate() } },
    });
  }

  // --------------------------
  // 📦 تعداد کل محصولات
  // --------------------------
  private async getTotalProductValue(): Promise<number> {
  const products = await prisma.product.findMany({
    select: {
      price: true,
      stock: true, // اگر میخوای مبلغ کل موجودی انبار هم حساب بشه
    },
  });

  // جمع قیمت × موجودی
  return products.reduce((sum, product) => sum + product.price * product.stock, 0);
}
  private async getProductCount(): Promise<number> {
    return prisma.product.count();
  }

  private async getProductCountPrevious(): Promise<number> {
    return prisma.product.count({
      where: { createdAt: { lt: this.previousDate() } },
    });
  }

  // --------------------------
  // 👤 Customers
  // --------------------------
  private async getCustomerCount(): Promise<number> {
    return prisma.user.count({ where: { role: "CUSTOMER" } });
  }

  private async getCustomerCountPrevious(): Promise<number> {
    return prisma.user.count({
      where: { createdAt: { lt: this.previousDate() }, role: "CUSTOMER" },
    });
  }

  // --------------------------
  // 🧑 Users
  // --------------------------
  private async getUserCount(): Promise<number> {
    return prisma.user.count();
  }

  private async getUserCountPrevious(): Promise<number> {
    return prisma.user.count({
      where: { createdAt: { lt: this.previousDate() } },
    });
  }

  // --------------------------
  // 📦 مجموع تعداد خریداری‌شده (quantity) فقط PAID
  // --------------------------
  private async getTotalPurchasedItems(): Promise<number> {
    const items = await prisma.orderItem.findMany({
      where: { order: { status: "PAID" } },
      select: { quantity: true },
    });

    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  private async getTotalPurchasedItemsPrevious(): Promise<number> {
    const items = await prisma.orderItem.findMany({
      where: {
        order: { status: "PAID", createdAt: { lt: this.previousDate() } },
      },
      select: { quantity: true },
    });

    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // --------------------------
  // 📉 Conversion Rate
  // --------------------------
  private async getConversionRate(): Promise<number> {
    const totalUsers = await prisma.user.count();
    const totalOrders = await prisma.order.count();

    if (totalUsers === 0) return 0;

    return Number(((totalOrders / totalUsers) * 100).toFixed(2));
  }

  private async getConversionRatePrevious(): Promise<number> {
    const totalUsersPrev = await prisma.user.count({
      where: { createdAt: { lt: this.previousDate() } },
    });

    const totalOrdersPrev = await prisma.order.count({
      where: { createdAt: { lt: this.previousDate() } },
    });

    if (totalUsersPrev === 0) return 0;
    return Number(((totalOrdersPrev / totalUsersPrev) * 100).toFixed(2));
  }

  // --------------------------
  // 🔄 Funnel Conversion
  // --------------------------
  private async getFunnelConversion(): Promise<number> {
    const views = 1000;
    const orders = await prisma.order.count({ where: { status: "PAID" } });
    return Number(((orders / views) * 100).toFixed(2));
  }

  private async getFunnelConversionPrevious(): Promise<number> {
    const viewsPrev = 1000;
    const ordersPrev = await prisma.order.count({
      where: { status: "PAID", createdAt: { lt: this.previousDate() } },
    });
    return Number(((ordersPrev / viewsPrev) * 100).toFixed(2));
  }

  // --------------------------
  // 📅 Helpers
  // --------------------------
  private previousDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }

  private async getPreviousValue<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch {
      return 0 as T;
    }
  }

  private getChangeStatus(current: number, previous: number) {
    if (previous === 0) {
      return {
        change: current === 0 ? 0 : 100,
        status: current === 0 ? "unchanged" : "up",
      };
    }

    const diff = current - previous;
    const percent = (diff / previous) * 100;

    return {
      change: Number(percent.toFixed(2)),
      status:
        percent > 0 ? "up" : percent < 0 ? "down" : "unchanged",
    };
  }

  // --------------------------
  // 🕘 Recent Orders
  // --------------------------
  private async getRecentOrders(limit: number) {
    return prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        total: true,
        status: true,
        createdAt: true,
        user: { select: { id: true, name: true, email: true } },
        items: {
          select: {
            id: true,
            quantity: true,
            unitPrice: true,
            product: { select: { id: true, name: true, image: true } },
          },
        },
      },
    });
  }
}
