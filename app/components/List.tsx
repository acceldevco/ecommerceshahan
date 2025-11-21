// components/AdvancedList.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useLoading } from "../hook/loadingData";

// انواع داده‌ها
interface ListItem {
  id: string | number;
  [key: string]: any;
}

interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  render?: (value: any, item: ListItem) => React.ReactNode;
  width?: string;
  className?: string;
}

interface AdvancedListProps {
  items: ListItem[];
  columns: ColumnConfig[];
  onItemClick?: (item: ListItem) => void;
  loading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  title?: string;
  actions?: React.ReactNode;
}

export default function AdvancedList({
  configFilter = [],
  loadmore=()=>{},
  items,
  columns,
  onItemClick,
  loadingmore,
  loading = false,
  emptyMessage = "No items found",
  searchable = true,
  sortable = true,
  selectable = false,
  pagination = false,
  itemsPerPage = 10,
  title = "تعداد نمایش",
  changesearch,
  actions,
}: any) {
  // return <></>
  const [search, setSearch]: any = useState("");
  const [searchTerm, setSearchTerm]: any = useState("");
  const [sortConfig, setSortConfig]: any = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedItems, setSelectedItems]: any = useState<(string | number)[]>(
    []
  );
  const [data, setdata]: any = useState<any>([]);
  const [showFilters, setShowFilters]: any = useState(false);
  const [currentPage, setCurrentPage]: any = useState(1);

  const [visibleColumns, setVisibleColumns]: any = useState<string[]>(
    columns.map((col: any) => col.key)
  );

  // var { data: search } = useLoading({});

  useEffect(() => {
    console.log(data);

    // console.log(
    //   columns
    //     .map((d: any) => d.key)
    //     .reduce(
    //       (a: any, f: any) => (
    //         a.push({ [f]: { contains: "q", mode: "insensitive" } }), a
    //       ),
    //       []
    //     )
    // );

    setdata(items);
  }, [items]);

  // ستون‌های قابل نمایش
  const displayColumns = useMemo(() => {
    return columns.filter((col: any) => visibleColumns.includes(col.key));
  }, [columns, visibleColumns]);

  // فیلتر و مرتب‌سازی آیتم‌ها
  const filteredAndSortedItems = useMemo(() => {
    console.log("data:", data, items);

    let filtered = data.filter((item: any) => {
      if (!searchTerm) return true;

      return columns.some((col: any) => {
        if (!col.searchable && col.key !== "title") return false;
        const value = item[col.key];
        return value
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    });

    // مرتب‌سازی
    if (sortConfig) {
      filtered.sort((a: any, b: any) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [items, searchTerm, sortConfig, columns]);

  // صفحه‌بندی
  const paginatedItems = useMemo(() => {
    if (!pagination) return filteredAndSortedItems;

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedItems, currentPage, itemsPerPage, pagination]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

  const handleSort = (key: string) => {
    if (!sortable) return;

    setSortConfig((current: any) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const handleSelectItem = (id: string | number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId: any) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedItems.map((item: any) => item.id));
    }
  };

  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) =>
      current.includes(columnKey)
        ? current.filter((key: any) => key !== columnKey)
        : [...current, columnKey]
    );
  };

  // رندر سلول
  const renderCell = (item: ListItem, column: ColumnConfig) => {
    const value = item[column.key];
    // return <>{JSON.stringify(value)}</>

    if (column.render) {
      return column.render(value, item);
    }

    // رندر پیش‌فرض بر اساس نوع داده
    if (value === null || value === undefined) {
      return <span className="text-gray-400">-</span>;
    }

    if (typeof value === "boolean") {
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
            value
              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
              : "bg-rose-100 text-rose-800 border border-rose-200"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full mr-2 ${
              value ? "bg-emerald-500" : "bg-rose-500"
            }`}
          ></span>
          {value ? "Active" : "Inactive"}
        </span>
      );
    }

    if (typeof value === "number") {
      return (
        <span className="font-mono text-slate-700 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
          {value.toLocaleString()}
        </span>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {value.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
            >
              {item}
            </span>
          ))}
          {value.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
              +{value.length - 3} more
            </span>
          )}
        </div>
      );
    }

    // تشخیص لینک
    if (
      typeof value === "string" &&
      (value.startsWith("http") || value.includes("@"))
    ) {
      return (
        <a
          href={value.startsWith("http") ? value : `mailto:${value}`}
          className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors truncate block"
          onClick={(e) => e.stopPropagation()}
        >
          {value}
        </a>
      );
    }

    // متن طولانی
    if (typeof value === "string" && value.length > 50) {
      return (
        <span className="text-slate-700" title={value}>
          {value.slice(0, 50)}...
        </span>
      );
    }

    return <span className="text-slate-700">{value.toString()}</span>;
  };

  if (loading) {
    return <ListSkeleton columns={displayColumns} selectable={selectable} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* هدر با کنترل‌ها */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex items-center gap-4">
            {/* {selectable && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    selectedItems.length === paginatedItems.length &&
                    paginatedItems.length > 0
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                />
              </div>
            )} */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {title}{" "}
                <span className="text-slate-500 font-normal">
                  ({filteredAndSortedItems.length})
                </span>
              </h2>
              {selectedItems.length > 0 && (
                <p className="text-sm text-blue-600 font-medium mt-1">
                  {selectedItems.length} item(s) selected
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {searchable && (
              <div className="relative">
                <div>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="جستجو..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      changesearch(e.target.value);
                    }}
                    className="w-full lg:w-80 pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all"
                  />
                </div>
              </div>
            )}
            <div className="relative">
              {/* <label
                htmlFor="status-select"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                وضعیت
                <span className="text-red-500 mr-1">*</span>
              </label> */}
              <div className="flex gap-5">
                {configFilter.map((s:any) => (
                  <div className="relative">
                    {/* آیکون */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-slate-400 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    <select
                      id="status-select"
                      className="w-full pr-10 pl-4 py-3.5 border-2 border-slate-200 rounded-xl 
                 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 
                 bg-white text-slate-700 font-medium
                 transition-all duration-200 ease-in-out
                 hover:border-slate-300 hover:bg-slate-50
                 appearance-none cursor-pointer
                 shadow-sm"
                      onChange={(e) => {
                        s.change(e.target.value);
                      }}
                    >
                      <option value="" selected>
                        انتخاب وضعیت
                      </option>
                      {s.select.map((d:any) => (
                        <option value={d} className="py-2">
                          {d}
                        </option>
                      ))}
                      {/* <option value="active" className="py-2">
                    ✅ فعال
                  </option>
                  <option value="inactive" className="py-2">
                    ⏸️ غیرفعال
                  </option>
                  <option value="pending" className="py-2">
                    🟡 در انتظار
                  </option>
                  <option value="rejected" className="py-2">
                    ❌ رد شده
                  </option> */}
                    </select>
                  </div>
                ))}
              </div>

              {/* راهنمای کوچک */}
              {/* <p className="mt-2 text-xs text-slate-500">
                وضعیت فعلی آیتم را انتخاب کنید
              </p> */}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                  showFilters
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                  />
                </svg>
                <span className="font-medium">فیلتر</span>
              </button>

              {actions}
            </div>
          </div>
        </div>

        {/* پنل فیلتر و ستون‌ها */}
        {showFilters && (
          <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* انتخاب ستون‌های قابل نمایش */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                  Visible Columns
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {columns.map((column: any) => (
                    <label
                      key={column.key}
                      className="flex items-center group cursor-pointer"
                    >
                      {/* <input
                        type="checkbox"
                        checked={visibleColumns.includes(column.key)}
                        onChange={() => toggleColumnVisibility(column.key)}
                        className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                      /> */}
                      <span className="ml-3 text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                        {column.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* مرتب‌سازی */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                  Sort By
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {columns
                    .filter((col: any) => col.sortable !== false)
                    .map((column: any) => (
                      <button
                        key={column.key}
                        onClick={() => handleSort(column.key)}
                        className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          sortConfig?.key === column.key
                            ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                            : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{column.label}</span>
                        {sortConfig?.key === column.key && (
                          <svg
                            className={`h-4 w-4 transition-transform ${
                              sortConfig.direction === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* جدول */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-75">
              {displayColumns.map((column: any) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider transition-all ${
                    column.sortable !== false
                      ? "cursor-pointer hover:bg-slate-100"
                      : ""
                  } ${column.width || ""} ${column.className || ""}`}
                  onClick={() =>
                    column.sortable !== false && handleSort(column.key)
                  }
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {sortConfig?.key === column.key && (
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          sortConfig.direction === "desc" ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {items?.length === 0 ? (
              <tr>
                <td
                  colSpan={displayColumns.length + (selectable ? 1 : 0)}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <svg
                      className="h-12 w-12 text-slate-300 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-lg font-medium text-slate-600 mb-2">
                      {emptyMessage}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              items?.map((item: any, index: any) => (
                <tr
                  key={item.id}
                  className={`transition-all duration-200 ${
                    onItemClick ? "cursor-pointer hover:bg-blue-50" : ""
                  } ${
                    selectedItems.includes(item.id)
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : "hover:bg-slate-50"
                  } ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                  onClick={() => onItemClick?.(item)}
                >
                  {/* {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                      />
                    </td>
                  )} */}
                  {displayColumns.map((column: any) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 ${column.className || ""}`}
                    >
                      <div className="flex items-center">
                        {renderCell(item, column)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
      <div className="flex justify-center">
        <button
        onClick={()=>{
          console.log('test');
          loadmore()
          
        }}
          // href="/admin/products/create"
          // onClick={handleAddEmployee}
          className="bg-[#b7b89e] m-2   text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm flex items-center gap-2"
        >
          {/* <span>{""}</span> */}
          نمایش بیشتر
        </button>
      </div>
    </div>
  );
}

// اسکلتون با طراحی بهبود یافته
function ListSkeleton({
  columns,
  selectable,
}: {
  columns: ColumnConfig[];
  selectable?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-pulse">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="h-7 bg-slate-200 rounded-lg w-48"></div>
          <div className="h-11 bg-slate-200 rounded-xl w-64"></div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {selectable && (
                <th className="px-6 py-4 w-12">
                  <div className="h-4 bg-slate-200 rounded w-4"></div>
                </th>
              )}
              {columns.map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {[...Array(6)].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                {selectable && (
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-4"></div>
                  </td>
                )}
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-32"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
