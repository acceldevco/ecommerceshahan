"use client";
import { useState } from "react";
import List from "@/app/components/List";
import { useLoading } from "@/app/hook/loadingData";

// انواع داده‌ها
interface Employee {
  id: number;
  name: string;
  email: string;
  age: number;
  status: "active" | "inactive";
  role: string;
  salary: number;
  joinDate: string;
  projects: string[];
  isAdmin: boolean;
}

interface Column {
  key: keyof Employee;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  responsive?: string; // کلاس‌های ریسپانسیو برای نمایش/عدم نمایش
  render?: (value: any, item: Employee) => React.ReactNode;
}
// کامپوننت مودال ریسپانسیو
// const EditEmployeeModal = ({
//   employee,
//   isOpen,
//   onClose,
//   onSave,
// }: {
//   employee: Employee | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (data: Employee) => void;
// }) => {
//   const [formData, setFormData] = useState<Employee>(
//     employee || ({} as Employee)
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   const handleChange = (field: keyof Employee, value: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   if (!isOpen) return null;

//   // return (
//   //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
//   //     <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
//   //       <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
//   //         <div className="flex justify-between items-center">
//   //           <h2 className="text-xl font-bold text-gray-900">
//   //             {employee?.id ? "ویرایش اطلاعات کارمند" : "افزودن کارمند جدید"}
//   //           </h2>
//   //           <button
//   //             onClick={onClose}
//   //             className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
//   //           >
//   //             ×
//   //           </button>
//   //         </div>
//   //       </div>

//   //       <form onSubmit={handleSubmit} className="p-6 space-y-6">
//   //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//   //           <div className="col-span-1 md:col-span-2">
//   //             <label className="block text-sm font-medium text-gray-700 mb-2">
//   //               نام کامل
//   //             </label>
//   //             <input
//   //               type="text"
//   //               value={formData.name}
//   //               onChange={(e) => handleChange("name", e.target.value)}
//   //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //               required
//   //             />
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-gray-700 mb-2">
//   //               ایمیل
//   //             </label>
//   //             <input
//   //               type="email"
//   //               value={formData.email}
//   //               onChange={(e) => handleChange("email", e.target.value)}
//   //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //               required
//   //             />
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-gray-700 mb-2">
//   //               سن
//   //             </label>
//   //             <input
//   //               type="number"
//   //               value={formData.age}
//   //               onChange={(e) => handleChange("age", parseInt(e.target.value))}
//   //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //               min="18"
//   //               max="65"
//   //               required
//   //             />
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-gray-700 mb-2">
//   //               سمت
//   //             </label>
//   //             <select
//   //               value={formData.role}
//   //               onChange={(e) => handleChange("role", e.target.value)}
//   //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //               required
//   //             >
//   //               <option value="توسعه‌دهنده ارشد">توسعه‌دهنده ارشد</option>
//   //               <option value="طراح UI/UX">طراح UI/UX</option>
//   //               <option value="مدیر محصول">مدیر محصول</option>
//   //               <option value="توسعه‌دهنده فرانت‌اند">
//   //                 توسعه‌دهنده فرانت‌اند
//   //               </option>
//   //               <option value="مهندس DevOps">مهندس DevOps</option>
//   //             </select>
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-gray-700 mb-2">
//   //               حقوق (تومان)
//   //             </label>
//   //             <input
//   //               type="number"
//   //               value={formData.salary}
//   //               onChange={(e) =>
//   //                 handleChange("salary", parseInt(e.target.value))
//   //               }
//   //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //               required
//   //             />
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-gray-700 mb-2">
//   //               وضعیت
//   //             </label>
//   //             <select
//   //               value={formData.status}
//   //               onChange={(e) => handleChange("status", e.target.value)}
//   //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //               required
//   //             >
//   //               <option value="active">فعال</option>
//   //               <option value="inactive">غیرفعال</option>
//   //             </select>
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-gray-700 mb-2">
//   //               سطح دسترسی
//   //             </label>
//   //             <select
//   //               value={formData.isAdmin ? "true" : "false"}
//   //               onChange={(e) =>
//   //                 handleChange("isAdmin", e.target.value === "true")
//   //               }
//   //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //               required
//   //             >
//   //               <option value="false">کاربر عادی</option>
//   //               <option value="true">مدیر</option>
//   //             </select>
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-gray-700 mb-2">
//   //               تاریخ عضویت
//   //             </label>
//   //             <input
//   //               type="date"
//   //               value={formData.joinDate}
//   //               onChange={(e) => handleChange("joinDate", e.target.value)}
//   //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //               required
//   //             />
//   //           </div>
//   //         </div>

//   //         <div>
//   //           <label className="block text-sm font-medium text-gray-700 mb-2">
//   //             پروژه‌ها (با کاما جدا کنید)
//   //           </label>
//   //           <input
//   //             type="text"
//   //             value={formData.projects?.join(", ") || ""}
//   //             onChange={(e) =>
//   //               handleChange(
//   //                 "projects",
//   //                 e.target.value.split(",").map((p) => p.trim())
//   //               )
//   //             }
//   //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
//   //             placeholder="پروژه اول, پروژه دوم, ..."
//   //           />
//   //         </div>

//   //         <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
//   //           <button
//   //             type="button"
//   //             onClick={onClose}
//   //             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium order-2 sm:order-1"
//   //           >
//   //             انصراف
//   //           </button>
//   //           <button
//   //             type="submit"
//   //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm order-1 sm:order-2"
//   //           >
//   //             {employee?.id ? "ذخیره تغییرات" : "افزودن کارمند"}
//   //           </button>
//   //         </div>
//   //       </form>
//   //     </div>
//   //   </div>
//   // );
// };

// کامپوننت کارت برای نمایش موبایل
const EmployeeMobileCard = ({
  employee,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
}: {
  employee: Employee;
  onEdit: (emp: Employee) => void;
  onDelete: (emp: Employee) => void;
  isSelected: boolean;
  onSelect: (emp: Employee, selected: boolean) => void;
}) => {
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
              onChange={(e) => onSelect(employee, e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium shadow-md">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(employee)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs font-medium"
            >
              ویرایش
            </button>
            <button
              onClick={() => onDelete(employee)}
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
              {employee.name}
            </h3>
            <p className="text-blue-600 text-sm mt-1">{employee.email}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                employee.status === "active"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {employee.status === "active" ? "فعال" : "غیرفعال"}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
              {employee.role}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {employee.isAdmin ? "مدیر" : "کاربر"}
            </span>
          </div>

          {/* اطلاعات اضافی */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <span className="text-xs text-gray-500">سن</span>
              <p className="text-sm font-medium text-gray-900">
                {employee.age} سال
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500">حقوق</span>
              <p className="text-sm font-medium text-green-600">
                {employee.salary.toLocaleString("fa-IR")} تومان
              </p>
            </div>
          </div>

          {/* پروژه‌ها */}
          {employee.projects && employee.projects.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500 block mb-2">پروژه‌ها</span>
              <div className="flex flex-wrap gap-2">
                {employee.projects.slice(0, 3).map((project, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200"
                  >
                    {project}
                  </span>
                ))}
                {employee.projects.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600">
                    +{employee.projects.length - 3} بیشتر
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  var config = {
    table: "product",
    filters: {
      include: {
        categories: true,
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
    // pageSize: 5,
    // immediate: true,
    // lazy: false,
  });

  // داده نمونه
  const sampleProducts: any = data?.data ?? [];
  //  [
  //   ...data?.data ?? []
  //   // {
  //   //   id: 1,
  //   //   name: "گوشی هوشمند سامسونگ",
  //   //   description: "گوشی پرچمدار با دوربین حرفه‌ای و نمایشگر AMOLED",
  //   //   price: 28900000,
  //   //   image: null,
  //   //   stock: 12,
  //   //   categoryId: 3,
  //   //   storeId: 2,
  //   // },
  //   // {
  //   //   id: 2,
  //   //   name: "لپ‌تاپ ایسوس",
  //   //   description: "مدل ROG برای بازی و طراحی گرافیکی",
  //   //   price: 56500000,
  //   //   image: null,
  //   //   stock: 8,
  //   //   categoryId: 2,
  //   //   storeId: 1,
  //   // },
  //   // {
  //   //   id: 3,
  //   //   name: "هدفون بی‌سیم سونی",
  //   //   description: "کیفیت صدای بالا با حذف نویز فعال",
  //   //   price: 9200000,
  //   //   image: null,
  //   //   stock: 0,
  //   //   categoryId: 5,
  //   //   storeId: 1,
  //   // },
  // ];

  // ستون‌ها
  const columns:any = [
    {
      key: "name",
      label: "نام محصول",
      sortable: true,
      searchable: true,
      render: (value:any, item:any) => (
        <div className="flex items-center space-x-3 space-x-reverse rtl:space-x-reverse gap-5">
          <div className="flex-shrink-0">
            {item.image ? (
              <img
                src={item.image}
                alt={value}
                className="w-10 h-10 rounded-lg object-cover shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow">
                {value[0]}
              </div>
            )}
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
      key: "description",
      label: "توضیحات",
      searchable: true,
      responsive: "hidden md:table-cell",
      render: (value: string) => (
        <span className="text-gray-600 text-xs lg:text-sm truncate block max-w-[200px]">
          {value}
        </span>
      ),
    },
    {
      key: "price",
      label: "قیمت",
      sortable: true,
      responsive: "hidden sm:table-cell",
      render: (value: number) => (
        <span className="font-semibold text-green-600 text-sm lg:text-base">
          {value.toLocaleString("fa-IR")} تومان
        </span>
      ),
    },
    {
      key: "stock",
      label: "موجودی",
      sortable: true,
      responsive: "hidden sm:table-cell",
      render: (value: number) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
            value > 0
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {value > 0 ? `${value} عدد` : "ناموجود"}
        </span>
      ),
    },
    {
      key: "categories",
      label: "شناسه دسته",
      sortable: true,
      responsive: "hidden lg:table-cell",
      render: (value:any) => (
        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
          {value?.map((d:any)=>d.name).join(',')}
          {/* {JSON.stringify()} */}
        </span>
      ),
    },
    {
      key: "storeId",
      label: "فروشگاه",
      sortable: true,
      responsive: "hidden xl:table-cell",
      render: (value: number | null) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
            value
              ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200"
              : "bg-gray-50 text-gray-500 border border-gray-200"
          }`}
        >
          {value ? `شناسه ${value}` : "نامشخص"}
        </span>
      ),
    },
  ];

  const [selectedItems, setSelectedItems] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>(sampleProducts);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    employee: Employee | null;
  }>({
    isOpen: false,
    employee: null,
  });

  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const handleItemClick = (item: Employee) => {
    setEditModal({
      isOpen: true,
      employee: item,
    });
  };

  const handleSelectionChange = (items: Employee[]) => {
    setSelectedItems(items);
  };

  const handleEditSave = (updatedEmployee: Employee) => {
    if (updatedEmployee.id) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        )
      );
    } else {
     
      const newEmployee = {
        ...updatedEmployee,
        id: Math.max(...employees.map((e) => e.id), 0) + 1,
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }
  };

  const handleAddEmployee = () => {
    const newEmployee: Employee = {
      id: 0, // ID موقت
      name: "کارمند جدید",
      email: "new@example.com",
      age: 25,
      status: "active",
      role: "توسعه‌دهنده",
      salary: 50000000,
      joinDate: new Date().toISOString().split("T")[0],
      projects: ["پروژه جدید"],
      isAdmin: false,
    };

    setEditModal({
      isOpen: true,
      employee: newEmployee,
    });
  };

  const handleDeleteSelected = () => {
    if (
      selectedItems.length > 0 &&
      confirm(
        `آیا از حذف ${selectedItems.length} کارمند انتخاب شده اطمینان دارید؟`
      )
    ) {
      setEmployees((prev) =>
        prev.filter(
          (emp) => !selectedItems.some((selected) => selected.id === emp.id)
        )
      );
      setSelectedItems([]);
    }
  };

  const handleDeleteEmployee = (employee: Employee) => {
    if (confirm(`آیا از حذف ${employee.name} اطمینان دارید؟`)) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id));
    }
  };

  const handleSelectEmployee = (employee: Employee, selected: boolean) => {
    if (selected) {
      setSelectedItems((prev) => [...prev, employee]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((item) => item.id !== employee.id)
      );
    }
  };

  const columnsWithActions: Column[] = [
    ...columns,
    {
      key: "id" as keyof Employee,
      label: "عملیات",
      width: "w-32",
      responsive: "hidden sm:table-cell",
      render: (value: number, item: Employee) => (
        <div className="flex gap-2">
          <a
            target="_black"
            href={`./products/${item.id}`}
            onClick={(e) => {
              e.stopPropagation();
              console.log(item);

              // setEditModal({ isOpen: true, employee: item });
            }}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-xs font-medium shadow-sm"
          >
            ویرایش
          </a>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              console.log(item.id);

              await submitData({
                id: item.id,
                nameTable: "product",
                action: "delete",
              });
              // handleDeleteEmployee(item);
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-[#777C6D] bg-clip-text text-transparent">
                مدیریت محصولات
              </h1>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                مدیریت اطلاعات محصولات و ویرایش مشخصات
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
                <a
                  href="/admin/products/create"
                  // onClick={handleAddEmployee}
                  className="bg-[#b7b89e]  text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm flex items-center gap-2"
                >
                  <span>{"+"}</span>
                  افزودن محصول
                </a>
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
                    {selectedItems.length} محصولات انتخاب شده است
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
            {data.data.map((employee:any) => (
              <EmployeeMobileCard
                key={employee.id}
                employee={employee}
                onEdit={handleItemClick}
                onDelete={handleDeleteEmployee}
                isSelected={selectedItems.some(
                  (item) => item.id === employee.id
                )}
                onSelect={handleSelectEmployee}
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
          {/* {data?.data?.length > 0 && (

          )} */}
          <List
          loadmore={loadMore}
            changesearch={(p:any) => {
              const conditions = ["name", "description"].reduce(
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
              console.log(p);
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
            emptyMessage="هیچ محصولی یافت نشد"
            // emptyMessage={
            //   <div className="text-center py-12">
            //     <div className="text-gray-400 text-6xl mb-4">👥</div>
            //     <h3 className="text-lg font-medium text-gray-900 mb-2">
            //       کارمندی یافت نشد
            //     </h3>
            //     <p className="text-gray-500 mb-4">
            //       لطفا جستجو یا فیلترهای خود را تغییر دهید
            //     </p>
            //     <button
            //       onClick={handleAddEmployee}
            //       className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            //     >
            //       افزودن اولین کارمند
            //     </button>
            //   </div>
            // }
            searchPlaceholder="جستجو در نام، ایمیل، سمت، پروژه‌ها..."
            className="rounded-2xl"
          />
        </div>

        {/* نمایش کارت‌ها در حالت گرید دسکتاپ */}
        {/* {viewMode === "grid" && (
          <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 gap-6">
            {employees.map((employee) => (
              <EmployeeMobileCard
                key={employee.id}
                employee={employee}
                onEdit={handleItemClick}
                onDelete={handleDeleteEmployee}
                isSelected={selectedItems.some(
                  (item) => item.id === employee.id
                )}
                onSelect={handleSelectEmployee}
              />
            ))}
          </div>
        )} */}

        {/* مودال ویرایش */}
        {/* <EditEmployeeModal
          employee={editModal.employee}
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, employee: null })}
          onSave={handleEditSave}
        /> */}
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
