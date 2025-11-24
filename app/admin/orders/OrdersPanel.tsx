"use client";
import List from "@/app/components/List";
import { ContextMain } from "@/app/context/context";
import { useLoading } from "@/app/hook/loadingData";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Info,
} from "lucide-react";
import { useContext, useState } from "react";

const statusConfig = {
  PAID: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
  },
  PROCESSING: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Package,
  },
  SENT: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Truck,
  },
  DELIVERED: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  CANCELED: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

const paymentConfig = {
  paid: {
    color: "bg-green-50 text-green-700 border-green-200",
    text: "پرداخت شده",
  },
  pending: {
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    text: "در انتظار پرداخت",
  },
  refunded: {
    color: "bg-gray-50 text-gray-700 border-gray-200",
    text: "عودت داده شده",
  },
  failed: {
    color: "bg-red-50 text-red-700 border-red-200",
    text: "پرداخت ناموفق",
  },
};

// توابع مدیریت سفارشات
const handleViewOrder = (order: any) => {
  console.log("مشاهده سفارش:", order);
  // نمایش جزئیات سفارش
};

const handleEditOrder = (order: any) => {
  console.log("ویرایش سفارش:", order);
  // باز کردن مودال ویرایش
};

const handleDeleteOrder = (order: any) => {
  console.log("حذف سفارش:", order);
  if (confirm(`آیا از حذف سفارش ${order.id} اطمینان دارید؟`)) {
    // حذف سفارش
  }
};

const handleMoreActions = (order: any) => {
  console.log("عملیات بیشتر برای سفارش:", order);
  // نمایش منوی عملیات بیشتر
};

// کامپوننت آمار سفارشات

// کامپوننت فیلترهای سفارشات
function OrderFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) {
  const [filters, setFilters] = useState({
    status: "",
    payment: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          فیلترهای پیشرفته
        </h3>
        <Filter className="w-5 h-5 text-gray-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            وضعیت سفارش
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="pending">در انتظار</option>
            <option value="processing">در حال پردازش</option>
            <option value="shipped">ارسال شده</option>
            <option value="delivered">تحویل داده شده</option>
            <option value="cancelled">لغو شده</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            وضعیت پرداخت
          </label>
          <select
            value={filters.payment}
            onChange={(e) => handleFilterChange("payment", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="paid">پرداخت شده</option>
            <option value="pending">در انتظار پرداخت</option>
            <option value="refunded">عودت داده شده</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            از تاریخ
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تا تاریخ
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default function OrdersPanel() {
  const ui = useContext(ContextMain);
  // var [filterselect, setfilterselect] = useState<any>("");
  var config = {
    pageSize: 5,
    table: "order",
    filters: {
      // ...(filterselect ? { status: filterselect } : {}),
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    },
  };
  const {
    data,
    loading,
    error,
    page,
    total,
    // search,
    // setSearch,
    loadMore,
    refetch,
    submitData,
    fetchData,
  } = useLoading({
    url: "/api/getdata",
    submitUrl: "/api/main",

    initialData: config,
    // pageSize: 5,
    // immediate: true,
    // lazy: false,
  });

  const ordersData = [
    {
      id: "ORD-2024-001",
      customer: "علی محمدی",
      email: "ali.mohammadi@example.com",
      phone: "09123456789",
      total: 1250000,
      status: "delivered",
      payment: "paid",
      items: 3,
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      address: "تهران، خیابان ولیعصر",
      products: ["گوشی موبایل", "قاب محافظ", "هدفون"],
    },
    {
      id: "ORD-2024-002",
      customer: "فاطمه احمدی",
      email: "fateme.ahmadi@example.com",
      phone: "09129876543",
      total: 850000,
      status: "processing",
      payment: "paid",
      items: 2,
      orderDate: "2024-01-16",
      deliveryDate: "2024-01-20",
      address: "اصفهان، خیابان چهارباغ",
      products: ["لپ تاپ", "ماوس"],
    },
    {
      id: "ORD-2024-003",
      customer: "محمد رضایی",
      email: "mohammad.rezaei@example.com",
      phone: "09121234567",
      total: 450000,
      status: "shipped",
      payment: "paid",
      items: 1,
      orderDate: "2024-01-14",
      deliveryDate: "2024-01-19",
      address: "مشهد، بلوار وکیل آباد",
      products: ["تبلت"],
    },
    {
      id: "ORD-2024-004",
      customer: "زهرا کریمی",
      email: "zahra.karimi@example.com",
      phone: "09127654321",
      total: 2200000,
      status: "pending",
      payment: "pending",
      items: 4,
      orderDate: "2024-01-17",
      deliveryDate: "2024-01-22",
      address: "شیراز، خیابان زند",
      products: ["کامپیوتر رومیزی", "مانیتور", "کیبورد", "میز"],
    },
    {
      id: "ORD-2024-005",
      customer: "رضا حسینی",
      email: "reza.hosseini@example.com",
      phone: "09123459876",
      total: 680000,
      status: "cancelled",
      payment: "refunded",
      items: 2,
      orderDate: "2024-01-13",
      deliveryDate: "2024-01-16",
      address: "تبریز، خیابان امام",
      products: ["دوربین", "کارت حافظه"],
    },
    {
      id: "ORD-2024-006",
      customer: "سارا نجفی",
      email: "sara.najafi@example.com",
      phone: "09128765432",
      total: 3200000,
      status: "delivered",
      payment: "paid",
      items: 5,
      orderDate: "2024-01-12",
      deliveryDate: "2024-01-15",
      address: "اهواز، خیابان نادری",
      products: ["تلویزیون", "سینمای خانگی", "اسپیکر", "کابل HDMI", "کنترل"],
    },
    {
      id: "ORD-2024-007",
      customer: "امیر عباسی",
      email: "amir.abbasi@example.com",
      phone: "09124561234",
      total: 950000,
      status: "processing",
      payment: "paid",
      items: 3,
      orderDate: "2024-01-18",
      deliveryDate: "2024-01-23",
      address: "کرج، بلوار مولوی",
      products: ["گیمینگ", "هدست", "دسته بازی"],
    },
    {
      id: "ORD-2024-008",
      customer: "نازنین قاسمی",
      email: "nazanin.ghasemi@example.com",
      phone: "09127894561",
      total: 1500000,
      status: "shipped",
      payment: "paid",
      items: 2,
      orderDate: "2024-01-16",
      deliveryDate: "2024-01-21",
      address: "قم، خیابان صفاییه",
      products: ["مبل", "میز تلویزیون"],
    },
  ];

  function OrderStats() {
    const stats = [
      {
        title: "کل سفارشات",
        value: data?.data?.length ?? 0,
        icon: Package,
        color: "bg-blue-500",
      },
      {
        title: "در حال پردازش",
        value:
          data?.data?.filter((order: any) => order.status === "PROCESSING")
            .length ?? 0,
        icon: Clock,
        color: "bg-yellow-500",
      },
      {
        title: "ارسال شده",
        value:
          data?.data?.filter((order: any) => order.status === "SENT").length ??
          0,
        icon: Truck,
        color: "bg-purple-500",
      },
      {
        title: "تحویل داده شده",
        value:
          data?.data
            // .filter((order) => order.status === "DELIVERED")

            ?.filter((order: any) => order.status === "DELIVERED").length ?? 0,
        icon: CheckCircle,
        color: "bg-green-500",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                  <Icon
                    className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const columns = [
    {
      key: "id",
      label: "شماره سفارش",
      sortable: true,
      searchable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-bold text-gray-900 font-mono">{value}</span>
        </div>
      ),
    },
    {
      key: "user",
      label: "مشتری",
      sortable: true,
      searchable: true,
      render: (value: any, item: any) => (
        <div className="space-y-1">
          <span className="font-semibold text-gray-900 block">
            {value.name}
          </span>
          <span className="text-sm text-gray-500 block">{value.phone}</span>
          <span className="text-xs text-blue-600 block truncate max-w-[150px]">
            {value.email}
          </span>
        </div>
      ),
    },
    {
      key: "total",
      label: "مبلغ",
      sortable: true,
      render: (value: number) => (
        <div className="text-left">
          <span className="font-bold text-gray-900 text-lg">
            {value.toLocaleString("fa-IR")}
          </span>
          <span className="text-gray-500 text-sm mr-1">تومان</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "وضعیت",
      sortable: true,
      render: (value: string) => {
        const config = statusConfig[value as keyof typeof statusConfig];
        const Icon = config.icon;
        return (
          <div
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border ${config?.color}`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium text-sm">
              {value === "PAID" && "در انتظار"}
              {value === "PROCESSING" && "در حال پردازش"}
              {value === "SENT" && "ارسال شده"}
              {value === "DELIVERED" && "تحویل داده شده"}
              {value === "CANCELED" && "لغو شده"}
            </span>
          </div>
        );
      },
    },
    // {
    //   key: "payment",
    //   label: "پرداخت",
    //   sortable: true,
    //   render: (value: string) => {
    //     const config = paymentConfig[value as keyof typeof paymentConfig];
    //     return (
    //       <span
    //         className={`inline-flex items-center px-3 py-1 rounded-lg border text-sm font-medium ${config?.color}`}
    //       >
    //         {config?.text}
    //       </span>
    //     );
    //   },
    // },
    {
      key: "items",
      label: "تعداد آیتم",
      sortable: true,
      render: (value: any) => {
        // console.log('value',value.length);

        return (
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-bold text-gray-700">
              {value.length}
            </span>
          </div>
        );
      },
    },
    {
      key: "createdAt",
      label: "تاریخ سفارش",
      sortable: true,
      render: (value: string) => (
        <div className="space-y-1">
          <span className="font-medium text-gray-900 block">
            {new Date(value).toLocaleDateString("fa-IR")}
          </span>
          <span className="text-xs text-gray-500 block">
            {new Date(value).toLocaleTimeString("fa-IR")}
          </span>
        </div>
      ),
    },
    {
      key: "products",
      label: "عملیات",
      render: (value: string[], item: any) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // handleViewOrder(item);
              // console.log(value, item);

              ui.open("dialogorder", { item });
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="مشاهده سفارش"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // handleEditOrder(item);
            }}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="ویرایش سفارش"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteOrder(item);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="حذف سفارش"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoreActions(item);
            }}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="عملیات بیشتر"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const [filteredData, setFilteredData] = useState(ordersData);

  const handleFilterChange = (filters: any) => {
    let filtered = ordersData;

    if (filters.status) {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    if (filters.payment) {
      filtered = filtered.filter((order) => order.payment === filters.payment);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (order) => new Date(order.orderDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (order) => new Date(order.orderDate) <= new Date(filters.dateTo)
      );
    }

    setFilteredData(filtered);
  };

  const handleItemClick = (order: any) => {
    console.log("سفارش انتخاب شد:", order);
    // نمایش جزئیات سفارش در مودال یا صفحه جدید
  };

  var [filterselect, setfilterselect] = useState<any>("");

  const configFilter = [
    {
      name: "status",
      select: ["PROCESSING", "PAID", "SENT", "DELIVERED", "CANCELED"],
      change: (e: any) => {
        fetchData(true, {
          pageSize: 5,
          table: "order",
          filters: {
            ...(e ? { where: { status: e } } : {}),
            orderBy: { createdAt: "desc" },
            include: {
              user: true,
              items: {
                include: {
                  product: true,
                },
              },
            },
          },
        });
        // setfilterselect(e);
        // refetch();
        // console.log(e);
      },
    },
  ];

  // return (<></>)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* هدر صفحه */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                مدیریت سفارشات
              </h1>
              <p className="text-gray-600 mt-2">
                مدیریت و پیگیری سفارشات مشتریان
              </p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                خروجی Excel
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#b7b89e] text-white rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                سفارش جدید
              </button>
            </div>
          </div>
        </div>

        {/* آمار */}
        <OrderStats />

        {/* فیلترها */}
        {/* <OrderFilters onFilterChange={handleFilterChange} /> */}

        {/* لیست سفارشات */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* {JSON.stringify(data.data)} */}
                      <List
              loadmore={loadMore}
              configFilter={configFilter}
              searchable={false}
              changesearch={(p: any) => {
                const conditions = ["name", "email"].reduce(
                  (a: any, f: any) => (
                    a.push({ [f]: { contains: "q", mode: "insensitive" } }), a
                  ),
                  []
                );
                fetchData(true, {});
                console.log(p);
              }}
              items={data?.data?.length > 0 ? data?.data : []}
              columns={columns}
              loadingmore={true}
              onItemClick={handleItemClick}
              // searchable={true}
              sortable={true}
              selectable={true}
              pagination={true}
              itemsPerPage={8}
              title="لیست سفارشات"
              emptyMessage="هیچ سفارشی یافت نشد"
            />
          {/* {data?.data?.length > 0 ? (

          ) : (
            ""
          )} */}
        </div>
        {/* {JSON.stringify(data)} */}
      </div>
    </div>
  );
}
