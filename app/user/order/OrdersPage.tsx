"use client";
import { useState } from "react";
import List from "@/app/components/List";
import { useLoading } from "@/app/hook/loadingData";

// انواع داده‌ها
interface Order {
  id: number;
  userId: number;
  storeId?: number;
  total: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  store?: {
    id: number;
    name: string;
  };
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product: {
    id: number;
    name: string;
    image?: string;
  };
}

interface Column {
  key: keyof Order;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  responsive?: string;
  render?: (value: any, item: Order) => React.ReactNode;
}

// کامپوننت مودال ریسپانسیو برای مشاهده جزئیات سفارش
const OrderDetailsModal = ({
  order,
  isOpen,
  onClose,
  onStatusChange,
}: {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: number, newStatus: Order["status"]) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Order["status"]>(
    order?.status || "PENDING"
  );

  const handleStatusChange = () => {
    if (order && selectedStatus !== order.status) {
      onStatusChange(order.id, selectedStatus);
    }
  };

  const getStatusInfo = (status: Order["status"]) => {
    const statuses = {
      PENDING: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", text: "در انتظار" },
      PROCESSING: { color: "bg-blue-50 text-blue-700 border-blue-200", text: "در حال پردازش" },
      SHIPPED: { color: "bg-purple-50 text-purple-700 border-purple-200", text: "ارسال شده" },
      DELIVERED: { color: "bg-green-50 text-green-700 border-green-200", text: "تحویل شده" },
      CANCELLED: { color: "bg-red-50 text-red-700 border-red-200", text: "لغو شده" }
    };
    return statuses[status] || statuses.PENDING;
  };

  if (!isOpen || !order) return null;

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                جزئیات سفارش #{order.id}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(order.createdAt).toLocaleDateString('fa-IR')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* اطلاعات سفارش */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">اطلاعات مشتری</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">نام:</span>
                  <span className="font-medium">{order.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ایمیل:</span>
                  <span className="font-medium">{order.user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">کد کاربر:</span>
                  <span className="font-medium">#{order.userId}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">اطلاعات سفارش</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">وضعیت:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} border`}>
                    {statusInfo.text}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">فروشگاه:</span>
                  <span className="font-medium">
                    {order.store?.name || "نامشخص"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاریخ ایجاد:</span>
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* تغییر وضعیت */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">تغییر وضعیت سفارش</h3>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Order["status"])}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              >
                <option value="PENDING">در انتظار</option>
                <option value="PROCESSING">در حال پردازش</option>
                <option value="SHIPPED">ارسال شده</option>
                <option value="DELIVERED">تحویل شده</option>
                <option value="CANCELLED">لغو شده</option>
              </select>
              <button
                onClick={handleStatusChange}
                disabled={selectedStatus === order.status}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                اعمال تغییر
              </button>
            </div>
          </div>

          {/* آیتم‌های سفارش */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">محصولات سفارش</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                      {item.product.name[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-gray-500 text-sm">کد محصول: {item.productId}</p>
                    </div>
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="font-semibold text-gray-900">
                      {item.unitPrice.toLocaleString('fa-IR')} تومان
                    </p>
                    <p className="text-gray-500 text-sm">تعداد: {item.quantity}</p>
                    <p className="text-green-600 font-medium text-sm">
                      جمع: {(item.unitPrice * item.quantity).toLocaleString('fa-IR')} تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* جمع کل */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">مبلغ کل سفارش:</span>
              <span className="text-2xl font-bold text-green-600">
                {order.total.toLocaleString('fa-IR')} تومان
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

// کامپوننت کارت برای نمایش موبایل
const OrderMobileCard = ({
  order,
  onView,
  onStatusChange,
  isSelected,
  onSelect,
}: {
  order: Order;
  onView: (order: Order) => void;
  onStatusChange: (orderId: number, newStatus: Order["status"]) => void;
  isSelected: boolean;
  onSelect: (order: Order, selected: boolean) => void;
}) => {
  const getStatusInfo = (status: Order["status"]) => {
    const statuses = {
      PENDING: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", text: "در انتظار" },
      PROCESSING: { color: "bg-blue-50 text-blue-700 border-blue-200", text: "در حال پردازش" },
      SHIPPED: { color: "bg-purple-50 text-purple-700 border-purple-200", text: "ارسال شده" },
      DELIVERED: { color: "bg-green-50 text-green-700 border-green-200", text: "تحویل شده" },
      CANCELLED: { color: "bg-red-50 text-red-700 border-red-200", text: "لغو شده" }
    };
    return statuses[status] || statuses.PENDING;
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      } shadow-sm hover:shadow-md`}
    >
      <div className="p-4">
        {/* هدر کارت */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3 space-x-reverse rtl:space-x-reverse">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(order, e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium shadow-md">
              #{order.id}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onView(order)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs font-medium"
            >
              مشاهده
            </button>
          </div>
        </div>

        {/* اطلاعات اصلی */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900">سفارش #{order.id}</h3>
            <p className="text-blue-600 text-sm mt-1">{order.user.name}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} border`}>
              {statusInfo.text}
            </span>
            {order.store && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                {order.store.name}
              </span>
            )}
          </div>

          {/* اطلاعات اضافی */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <span className="text-xs text-gray-500">تعداد محصولات</span>
              <p className="text-sm font-medium text-gray-900">
                {order.items.length} محصول
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500">مبلغ کل</span>
              <p className="text-sm font-medium text-green-600">
                {order.total.toLocaleString('fa-IR')} تومان
              </p>
            </div>
          </div>

          {/* تاریخ */}
          <div className="pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">تاریخ ثبت</span>
            <p className="text-sm text-gray-700">
              {new Date(order.createdAt).toLocaleDateString('fa-IR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const config = {
    table: "order",
    filters: {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        store: {
          select: {
            id: true,
            name: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    },
  };

  const {
    fetchData,
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
  } = useLoading({
    url: "/api/getdata",
    submitUrl: "/api/main",
    initialData: config,
  });

  const sampleOrders: Order[] = data?.data ?? [];

  // ستون‌های جدول
  const columns: Column[] = [
    {
      key: "id",
      label: "شماره سفارش",
      sortable: true,
      render: (value: number, item: Order) => (
        <div className="flex items-center space-x-3 space-x-reverse rtl:space-x-reverse gap-5">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
              #{value}
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 truncate text-sm lg:text-base">
              سفارش #{value}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {new Date(item.createdAt).toLocaleDateString('fa-IR')}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "user",
      label: "مشتری",
      sortable: true,
      searchable: true,
      responsive: "hidden md:table-cell",
      render: (value: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 text-sm">
            {value.name}
          </span>
          <span className="text-blue-600 text-xs mt-1">
            {value.email}
          </span>
        </div>
      ),
    },
    {
      key: "total",
      label: "مبلغ",
      sortable: true,
      responsive: "hidden sm:table-cell",
      render: (value: number) => (
        <div className="text-left rtl:text-right">
          <span className="font-semibold text-green-600 text-sm lg:text-base">
            {value.toLocaleString('fa-IR')} تومان
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "وضعیت",
      sortable: true,
      responsive: "hidden sm:table-cell",
      render: (value: Order["status"]) => {
        const statuses = {
          PENDING: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", text: "در انتظار" },
          PROCESSING: { color: "bg-blue-50 text-blue-700 border-blue-200", text: "در حال پردازش" },
          SHIPPED: { color: "bg-purple-50 text-purple-700 border-purple-200", text: "ارسال شده" },
          DELIVERED: { color: "bg-green-50 text-green-700 border-green-200", text: "تحویل شده" },
          CANCELLED: { color: "bg-red-50 text-red-700 border-red-200", text: "لغو شده" }
        };
        const statusInfo = statuses[value] || statuses.PENDING;
        
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
            {statusInfo.text}
          </span>
        );
      },
    },
    {
      key: "store",
      label: "فروشگاه",
      sortable: true,
      responsive: "hidden lg:table-cell",
      render: (value: any) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          value
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-gray-50 text-gray-500 border border-gray-200"
        }`}>
          {value?.name || "نامشخص"}
        </span>
      ),
    },
    {
      key: "items",
      label: "تعداد محصولات",
      sortable: true,
      responsive: "hidden xl:table-cell",
      render: (value: OrderItem[]) => (
        <div className="text-center">
          <span className="font-semibold text-gray-900 text-sm">
            {value.length}
          </span>
          <span className="block text-xs text-gray-500">محصول</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "تاریخ ثبت",
      sortable: true,
      responsive: "hidden 2xl:table-cell",
      render: (value: string) => (
        <span className="text-gray-600 text-sm">
          {new Date(value).toLocaleDateString('fa-IR')}
        </span>
      ),
    },
  ];

  const [selectedItems, setSelectedItems] = useState<Order[]>([]);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [detailsModal, setDetailsModal] = useState<{
    isOpen: boolean;
    order: Order | null;
  }>({
    isOpen: false,
    order: null,
  });

  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const handleItemClick = (item: Order) => {
    setDetailsModal({
      isOpen: true,
      order: item,
    });
  };

  const handleSelectionChange = (items: Order[]) => {
    setSelectedItems(items);
  };

  const handleStatusChange = async (orderId: number, newStatus: Order["status"]) => {
    try {
      await submitData({
        id: orderId,
        nameTable: "order",
        action: "update",
        data: {
          status: newStatus
        }
      });
      refetch();
      setDetailsModal({ isOpen: false, order: null });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDeleteSelected = async () => {
    if (
      selectedItems.length > 0 &&
      confirm(
        `آیا از حذف ${selectedItems.length} سفارش انتخاب شده اطمینان دارید؟`
      )
    ) {
      try {
        for (const order of selectedItems) {
          await submitData({
            id: order.id,
            nameTable: "order",
            action: "delete",
          });
        }
        setSelectedItems([]);
        refetch();
      } catch (error) {
        console.error("Error deleting orders:", error);
      }
    }
  };

  const handleSelectOrder = (order: Order, selected: boolean) => {
    if (selected) {
      setSelectedItems((prev) => [...prev, order]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((item) => item.id !== order.id)
      );
    }
  };

  const columnsWithActions: Column[] = [
    ...columns,
    {
      key: "id" as keyof Order,
      label: "عملیات",
      width: "w-32",
      responsive: "hidden sm:table-cell",
      render: (value: number, item: Order) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
            //   setDetailsModal({ isOpen: true, order: item });
            }}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-[10px] font-medium shadow-sm"
          >

            ثبت دوباره خرید
          </button>
          {/* <button
            onClick={async (e) => {
              e.stopPropagation();
              if (confirm(`آیا از حذف سفارش #${item.id} اطمینان دارید؟`)) {
                await submitData({
                  id: item.id,
                  nameTable: "order",
                  action: "delete",
                });
                refetch();
              }
            }}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-xs font-medium shadow-sm"
          >
            حذف
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* هدر صفحه */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                مدیریت سفارشات
              </h1>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                مدیریت و پیگیری سفارشات مشتریان
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* انتخاب حالت نمایش */}
              {/* <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "table"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  📊 جدول
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  🏠 کارت
                </button>
              </div> */}

              {/* دکمه‌های عملیات */}
              <div className="flex gap-3">
                {selectedItems.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-sm shadow-lg flex items-center gap-2"
                  >
                    <span>🗑️</span>
                    حذف ({selectedItems.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* اطلاعات انتخاب شده */}
          {selectedItems.length > 0 && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700">
                    {selectedItems.length} سفارش انتخاب شده است
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  لغو انتخاب
                </button>
              </div>
            </div>
          )}
        </div>

        {/* نمایش کارت‌ها در حالت موبایل */}
        {viewMode === "grid" && (
          <div className="lg:hidden space-y-4">
            {orders.map((order) => (
              <OrderMobileCard
                key={order.id}
                order={order}
                onView={handleItemClick}
                onStatusChange={handleStatusChange}
                isSelected={selectedItems.some(
                  (item) => item.id === order.id
                )}
                onSelect={handleSelectOrder}
              />
            ))}
          </div>
        )}

        {/* کامپوننت لیست برای نمایش دسکتاپ و حالت جدول */}
        <div
          className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${
            viewMode === "grid" ? "hidden lg:block" : "block"
          }`}
        >
          <List
            changesearch={(p:any) => {
              const conditions = [
                { user: { name: { contains: p, mode: "insensitive" } } },
                { user: { email: { contains: p, mode: "insensitive" } } },
                { store: { name: { contains: p, mode: "insensitive" } } },
                { id: parseInt(p) ? { equals: parseInt(p) } : undefined }
              ].filter(condition => Object.values(condition)[0] !== undefined);

              fetchData(true, {
                ...config,
                filters: {
                  ...(p && {
                    where: {
                      OR: conditions
                    },
                  }),
                },
              });
            }}
            items={data?.data ?? []}
            columns={columnsWithActions}
            onItemClick={handleItemClick}
            onSelectionChange={handleSelectionChange}
            searchable={false}
            sortable={false}
            selectable={false}
            pagination={false}
            itemsPerPage={10}
            emptyMessage={
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  سفارشی یافت نشد
                </h3>
                <p className="text-gray-500 mb-4">
                  لطفا جستجو یا فیلترهای خود را تغییر دهید
                </p>
              </div>
            }
            searchPlaceholder="جستجو در شماره سفارش، نام مشتری، ایمیل..."
            className="rounded-2xl"
          />
        </div>

        {/* نمایش کارت‌ها در حالت گرید دسکتاپ */}
        {viewMode === "grid" && (
          <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 gap-6">
            {orders.map((order) => (
              <OrderMobileCard
                key={order.id}
                order={order}
                onView={handleItemClick}
                onStatusChange={handleStatusChange}
                isSelected={selectedItems.some(
                  (item) => item.id === order.id
                )}
                onSelect={handleSelectOrder}
              />
            ))}
          </div>
        )}

        {/* مودال جزئیات سفارش */}
        <OrderDetailsModal
          order={detailsModal.order}
          isOpen={detailsModal.isOpen}
          onClose={() => setDetailsModal({ isOpen: false, order: null })}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* استایل‌های سفارشی برای انیمیشن */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}