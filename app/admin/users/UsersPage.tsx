"use client";
import { useContext, useState } from "react";
import List from "@/app/components/List";
import { useLoading } from "@/app/hook/loadingData";
import { ContextMain } from "@/app/context/context";

// انواع داده‌ها
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: "CUSTOMER" | "ADMIN" | "SELLER";
  storeId?: number;
  store?: {
    id: number;
    name: string;
  };
  orders?: any[];
  cart?: any;
}

interface Column {
  key: keyof User;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  responsive?: string;
  render?: (value: any, item: User) => React.ReactNode;
}

// کامپوننت مودال ریسپانسیو
const EditUserModal = ({
  user,
  isOpen,
  onClose,
  onSave,
}: {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: User) => void;
}) => {
  
  const [formData, setFormData] = useState<User>(
    user || ({} as User)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {user?.id ? "ویرایش اطلاعات کاربر" : "افزودن کاربر جدید"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام کامل
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تلفن
              </label>
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                placeholder="09xxxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نقش
              </label>
              <select
                value={formData.role || "CUSTOMER"}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                required
              >
                <option value="CUSTOMER">مشتری</option>
                <option value="ADMIN">مدیر</option>
                <option value="SELLER">فروشنده</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                آدرس
              </label>
              <textarea
                value={formData.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                placeholder="آدرس کامل..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                شناسه فروشگاه
              </label>
              <input
                type="number"
                value={formData.storeId || ""}
                onChange={(e) => handleChange("storeId", e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                placeholder="اختیاری"
                min="1"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium order-2 sm:order-1"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm order-1 sm:order-2"
            >
              {user?.id ? "ذخیره تغییرات" : "افزودن کاربر"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// کامپوننت کارت برای نمایش موبایل
const UserMobileCard = ({
  user,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
}: {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  isSelected: boolean;
  onSelect: (user: User, selected: boolean) => void;
}) => {
  var ui =useContext(ContextMain)
  const getRoleBadge = (role: string) => {
    const roles = {
      ADMIN: { color: "bg-red-50 text-red-700 border-red-200", text: "مدیر" },
      SELLER: { color: "bg-purple-50 text-purple-700 border-purple-200", text: "فروشنده" },
      CUSTOMER: { color: "bg-blue-50 text-blue-700 border-blue-200", text: "مشتری" }
    };
    return roles[role as keyof typeof roles] || roles.CUSTOMER;
  };

  const roleInfo = getRoleBadge(user.role);

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
              onChange={(e) => onSelect(user, e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium shadow-md">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                ui.open('edituser',{...user})
                
                // onEdit(user)
              }}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs font-medium"
            >
              ویرایش
            </button>
            <button
              onClick={() => onDelete(user)}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium"
            >
              حذف
            </button>
          </div>
        </div>

        {/* اطلاعات اصلی */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {user.name}
            </h3>
            <p className="text-blue-600 text-sm mt-1">{user.email}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleInfo.color} border`}>
              {roleInfo.text}
            </span>
            {user.store && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                فروشگاه: {user.store.name}
              </span>
            )}
          </div>

          {/* اطلاعات اضافی */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            {user.phone && (
              <div>
                <span className="text-xs text-gray-500">تلفن</span>
                <p className="text-sm font-medium text-gray-900">
                  {user.phone}
                </p>
              </div>
            )}
            {user.orders && (
              <div>
                <span className="text-xs text-gray-500">سفارشات</span>
                <p className="text-sm font-medium text-gray-900">
                  {user.orders.length} سفارش
                </p>
              </div>
            )}
          </div>

          {/* آدرس */}
          {user.address && (
            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500 block mb-2">آدرس</span>
              <p className="text-sm text-gray-700 line-clamp-2">
                {user.address}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function UsersPage() {
  const config = {
    table: "user",
    filters: {
      include: {
        // store: true,
        orders: true,
        cart: true,
      },
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

  const sampleUsers: User[] = data?.data ?? [];

  // ستون‌های جدول
  const columns: Column[] = [
    {
      key: "name",
      label: "نام کاربر",
      sortable: true,
      searchable: true,
      render: (value: string, item: User) => (
        <div className="flex items-center space-x-3 space-x-reverse rtl:space-x-reverse gap-5">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
              {value.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 truncate text-sm lg:text-base">
              {value}
            </span>
            <span className="text-xs text-gray-500 mt-1">کد: {item.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "ایمیل",
      sortable: true,
      searchable: true,
      responsive: "hidden md:table-cell",
      render: (value: string) => (
        <span className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium text-sm truncate">
          {value}
        </span>
      ),
    },
    {
      key: "phone",
      label: "تلفن",
      sortable: true,
      responsive: "hidden lg:table-cell",
      render: (value: string) => (
        <span className="text-gray-600 text-sm">
          {value || "---"}
        </span>
      ),
    },
    {
      key: "role",
      label: "نقش",
      sortable: true,
      responsive: "hidden sm:table-cell",
      render: (value: string) => {
        const roles = {
          ADMIN: { color: "bg-red-50 text-red-700 border-red-200", text: "مدیر" },
          SELLER: { color: "bg-purple-50 text-purple-700 border-purple-200", text: "فروشنده" },
          CUSTOMER: { color: "bg-blue-50 text-blue-700 border-blue-200", text: "مشتری" }
        };
        const roleInfo = roles[value as keyof typeof roles] || roles.CUSTOMER;
        
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${roleInfo.color}`}>
            {roleInfo.text}
          </span>
        );
      },
    },
    {
      key: "store",
      label: "فروشگاه",
      sortable: true,
      responsive: "hidden xl:table-cell",
      render: (value: any) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          value
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-gray-50 text-gray-500 border border-gray-200"
        }`}>
          {value?.name || "ندارد"}
        </span>
      ),
    },
    {
      key: "orders",
      label: "سفارشات",
      sortable: true,
      responsive: "hidden 2xl:table-cell",
      render: (value: any[]) => (
        <div className="text-center">
          <span className="font-semibold text-gray-900 text-sm">
            {value?.length || 0}
          </span>
          <span className="block text-xs text-gray-500">سفارش</span>
        </div>
      ),
    },
  ];

  const [selectedItems, setSelectedItems] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null,
  });

  var ui =useContext(ContextMain)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const handleItemClick = (item: User) => {
    setEditModal({
      isOpen: true,
      user: item,
    });
  };

  const handleSelectionChange = (items: User[]) => {
    setSelectedItems(items);
  };

  const handleEditSave = (updatedUser: User) => {
    if (updatedUser.id) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } else {
      const newUser = {
        ...updatedUser,
        id: Math.max(...users.map((u) => u.id), 0) + 1,
      };
      setUsers((prev) => [...prev, newUser]);
    }
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: 0,
      name: "کاربر جدید",
      email: "new@example.com",
      phone: "",
      address: "",
      role: "CUSTOMER",
    };

    setEditModal({
      isOpen: true,
      user: newUser,
    });
  };

  const handleDeleteSelected = () => {
    if (
      selectedItems.length > 0 &&
      confirm(
        `آیا از حذف ${selectedItems.length} کاربر انتخاب شده اطمینان دارید؟`
      )
    ) {
      setUsers((prev) =>
        prev.filter(
          (user) => !selectedItems.some((selected) => selected.id === user.id)
        )
      );
      setSelectedItems([]);
    }
  };

  const handleDeleteUser = (user: User) => {
    if (confirm(`آیا از حذف ${user.name} اطمینان دارید؟`)) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
  };

  const handleSelectUser = (user: User, selected: boolean) => {
    if (selected) {
      setSelectedItems((prev) => [...prev, user]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((item) => item.id !== user.id)
      );
    }
  };

  const columnsWithActions: Column[] = [
    ...columns,
    {
      key: "id" as keyof User,
      label: "عملیات",
      width: "w-32",
      responsive: "hidden sm:table-cell",
      render: (value: number, item: User) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              ui.open('edituser',{...item,submitData:submitData})
              // setEditModal({ isOpen: true, user: item });
            }}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-xs font-medium shadow-sm"
          >
            ویرایش
          </button>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              if (confirm(`آیا از حذف ${item.name} اطمینان دارید؟`)) {
                await submitData({
                  id: item.id,
                  nameTable: "user",
                  action: "delete",
                });
                refetch();
              }
            }}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-xs font-medium shadow-sm"
          >
            حذف
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-4 md:py-8">
      {/* {JSON.stringify(data)} */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* هدر صفحه */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-[#b7b89e] bg-clip-text text-transparent">
                مدیریت کاربران
              </h1>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                مدیریت اطلاعات کاربران و سطوح دسترسی
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
             


             
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
                <button
                  onClick={
                    ()=>{
                      ui.open('edituser',{submitData:submitData})
                    }
                    // handleAddUser
                  }
                  className="bg-[#b7b89e] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm flex items-center gap-2"
                >
                  <span>+</span>
                  افزودن کاربر
                </button>
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
                    {selectedItems.length} کاربر انتخاب شده است
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
            {users.map((user) => (
              <UserMobileCard
                key={user.id}
                user={user}
                onEdit={handleItemClick}
                onDelete={handleDeleteUser}
                isSelected={selectedItems.some(
                  (item) => item.id === user.id
                )}
                onSelect={handleSelectUser}
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
          loadmore={loadMore}
            changesearch={(p:any) => {
              const conditions = ["name", "email", "phone"].reduce(
                (a: any, f: any) => (
                  a.push({ [f]: { contains: p, mode: "insensitive" } }), a
                ),
                []
              );
              fetchData(true, {
                ...config,
                filters: {
                  ...(p && {
                    where: {
                      OR: conditions,
                    },
                  }),
                },
              });
            }}
            items={data?.data ?? []}
            columns={columnsWithActions}
            onItemClick={handleItemClick}
            onSelectionChange={handleSelectionChange}
            searchable={true}
            sortable={true}
            selectable={true}
            pagination={true}
            itemsPerPage={5}
            emptyMessage={
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  کاربری یافت نشد
                </h3>
                <p className="text-gray-500 mb-4">
                  لطفا جستجو یا فیلترهای خود را تغییر دهید
                </p>
                <button
                  onClick={handleAddUser}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  افزودن اولین کاربر
                </button>
              </div>
            }
            searchPlaceholder="جستجو در نام، ایمیل، تلفن..."
            className="rounded-2xl"
          />
        </div>

        {/* نمایش کارت‌ها در حالت گرید دسکتاپ */}
        {viewMode === "grid" && (
          <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 gap-6">
            {users.map((user) => (
              <UserMobileCard
                key={user.id}
                user={user}
                onEdit={handleItemClick}
                onDelete={handleDeleteUser}
                isSelected={selectedItems.some(
                  (item) => item.id === user.id
                )}
                onSelect={handleSelectUser}
              />
            ))}
          </div>
        )}

        {/* مودال ویرایش */}
        <EditUserModal
          user={editModal.user}
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, user: null })}
          onSave={handleEditSave}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}