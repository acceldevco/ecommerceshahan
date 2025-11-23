// import React, { useState } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Search,
//   Folder,
//   FolderOpen,
//   X,
//   Edit3,
//   Trash2,
//   Plus,
//   Save,
//   RotateCcw,
// } from "lucide-react";
// import { useLoading } from "../hook/loadingData";
// import { json } from "stream/consumers";

// const NestedCategoryCheckbox = ({ onSelectionChange }: any) => {
//   const {
//     data,
//     loading,
//     error,
//     page,
//     total,
//     search,
//     setSearch,
//     loadMore,
//     refetch,
//     submitData,
//   } = useLoading({
//     url: "/api/getdata",
//     submitUrl: "/api/main",

//     initialData: {
//       table: "category",
//       filters: {
//         where: { parentId: null },
//         include: {
//           files: true,
//           subcategories: {
//             include: {
//               subcategories: {
//                 include: {
//                   subcategories: true, // up to 3 levels deep
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     // pageSize: 5,
//     // immediate: true,
//     // lazy: false,
//   });
//   const [categories, setCategories] = useState([
//     {
//       id: 1,
//       name: "الکترونیک",
//       children: [
//         {
//           id: 2,
//           name: "موبایل",
//           children: [
//             { id: 3, name: "سامسونگ", children: [] },
//             { id: 4, name: "اپل", children: [] },
//             { id: 5, name: "شیائومی", children: [] },
//           ],
//         },
//         {
//           id: 6,
//           name: "لپ‌تاپ",
//           children: [
//             { id: 7, name: "ایسوس", children: [] },
//             { id: 8, name: "لنوو", children: [] },
//             { id: 9, name: "اچ پی", children: [] },
//           ],
//         },
//         {
//           id: 10,
//           name: "لوازم جانبی",
//           children: [
//             { id: 11, name: "هدفون", children: [] },
//             { id: 12, name: "کیبورد", children: [] },
//           ],
//         },
//       ],
//     },
//     {
//       id: 13,
//       name: "پوشاک",
//       children: [
//         {
//           id: 14,
//           name: "مردانه",
//           children: [
//             { id: 15, name: "پیراهن", children: [] },
//             { id: 16, name: "شلوار", children: [] },
//           ],
//         },
//         {
//           id: 17,
//           name: "زنانه",
//           children: [
//             { id: 18, name: "مانتو", children: [] },
//             { id: 19, name: "شال و روسری", children: [] },
//           ],
//         },
//         {
//           id: 20,
//           name: "بچگانه",
//           children: [],
//         },
//       ],
//     },
//     {
//       id: 21,
//       name: "کتاب و لوازم تحریر",
//       children: [
//         { id: 22, name: "کتاب", children: [] },
//         { id: 23, name: "دفتر و کلاسور", children: [] },
//       ],
//     },
//   ]);

//   const [expandedIds, setExpandedIds] = useState(new Set([1, 13, 21]));
//   const [checkedIds, setCheckedIds] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newCategory, setNewCategory] = useState({ name: "", parentId: null });

//   // تابع برای پیدا کردن یک دسته بر اساس ID
//   const findCategory: any = (id, cats = null) => {
//     for (let cat of cats) {
//       if (cat.id === id) return cat;
//       if (cat.children && cat.children.length > 0) {
//         const found = findCategory(id, cat.children);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   // تابع برای پیدا کردن والدین یک دسته
//   const findCategoryParents: any = (id, cats = null, parents = []) => {
//     for (let cat of cats) {
//       if (cat.id === id) {
//         return parents;
//       }
//       if (cat.children && cat.children.length > 0) {
//         const found = findCategoryParents(id, cat.children, [...parents, cat]);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   // تابع برای به‌روزرسانی دسته‌ها
//   const updateCategories: any = (id, updatedData, cats = null) => {
//     return cats.map((cat) => {
//       if (cat.id === id) {
//         return { ...cat, ...updatedData };
//       }
//       if (cat.children && cat.children.length > 0) {
//         return {
//           ...cat,
//           children: updateCategories(id, updatedData, cat.children),
//         };
//       }
//       return cat;
//     });
//   };

//   // تابع برای حذف یک دسته
//   const deleteCategory: any = (id, cats = null) => {
//     let newCats = [];

//     for (let cat of cats) {
//       if (cat.id === id) {
//         continue; // این دسته را حذف کن
//       }

//       if (cat.children && cat.children.length > 0) {
//         newCats.push({
//           ...cat,
//           children: deleteCategory(id, cat.children),
//         });
//       } else {
//         newCats.push(cat);
//       }
//     }

//     return newCats;
//   };

//   // تابع برای اضافه کردن یک دسته جدید
//   const addCategory = (name, parentId = null) => {
//     const newId = Date.now(); // استفاده از timestamp به عنوان ID
//     const newCategory = { id: newId, name, children: [] };

//     if (!parentId) {
//       // اضافه کردن به سطح ریشه
//       setCategories([...data?.data, newCategory]);
//       setExpandedIds(new Set([...expandedIds, newId]));
//     } else {
//       // اضافه کردن به عنوان فرزند
//       const updatedCategories = data.data.map((cat) => {
//         if (cat.id === parentId) {
//           return {
//             ...cat,
//             categories: [...cat.categories, newCategory],
//           };
//         }

//         if (cat.categories && cat.categories.length > 0) {
//           return {
//             ...cat,
//             categories: addCategoryToChildren(
//               cat.categories,
//               parentId,
//               newCategory
//             ),
//           };
//         }

//         return cat;
//       });

//       setCategories(updatedCategories);
//       setExpandedIds(new Set([...expandedIds, parentId]));
//     }

//     setShowAddModal(false);
//     setNewCategory({ name: "", parentId: null });
//   };

//   // تابع کمکی برای اضافه کردن دسته به فرزندان
//   const addCategoryToChildren = (children, parentId, newCategory) => {
//     return children.map((child) => {
//       if (child.id === parentId) {
//         return {
//           ...child,
//           categories: [...child.categories, newCategory],
//         };
//       }

//       if (child.categories && child.categories.length > 0) {
//         return {
//           ...child,
//           categories: addCategoryToChildren(
//             child.categories,
//             parentId,
//             newCategory
//           ),
//         };
//       }

//       return child;
//     });
//   };

//   // شروع ویرایش
//   const startEdit = (id) => {
//     const category = findCategory(id);
//     if (category) {
//       setEditingId(id);
//       setEditName(category.name);
//     }
//   };

//   // ذخیره ویرایش
//   const saveEdit = () => {
//     if (editName.trim()) {
//       setCategories(updateCategories(editingId, { name: editName.trim() }));
//       setEditingId(null);
//       setEditName("");
//     }
//   };

//   // لغو ویرایش
//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditName("");
//   };

//   // حذف دسته
//   const handleDelete = (id) => {
//     if (window.confirm("آیا از حذف این دسته اطمینان دارید؟")) {
//       // حذف از لیست انتخاب‌شده‌ها
//       const newChecked = new Set(checkedIds);
//       const allChildrenIds = getAllChildrenIds(findCategory(id));
//       allChildrenIds.forEach((childId) => newChecked.delete(childId));
//       setCheckedIds(newChecked);

//       // حذف از دسته‌بندی‌ها
//       setCategories(deleteCategory(id));

//       // به‌روزرسانی خروجی
//       onSelectionChange?.(getSelectedCategories(newChecked));
//     }
//   };

//   const toggleExpand = (id) => {
//     const newExpanded = new Set(expandedIds);
//     if (newExpanded.has(id)) {
//       newExpanded.delete(id);
//     } else {
//       newExpanded.add(id);
//     }
//     setExpandedIds(newExpanded);
//   };

//   const getAllChildrenIds = (category) => {
//     let ids = [category.id];
//     if (category.children) {
//       category.children.forEach((child) => {
//         ids = [...ids, ...getAllChildrenIds(child)];
//       });
//     }
//     return ids;
//   };

//   const getAllParentIds: any = (categoryId, cats, parents = []) => {
//     for (let cat of cats) {
//       if (cat.id === categoryId) {
//         return parents;
//       }
//       if (cat.children && cat.children.length > 0) {
//         const found = getAllParentIds(categoryId, cat.children, [
//           ...parents,
//           cat.id,
//         ]);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   const handleCheckboxChange = (category) => {
//     const newChecked = new Set(checkedIds);
//     const allChildrenIds = getAllChildrenIds(category);
//     console.log('test:',allChildrenIds);

//     if (newChecked.has(category.id)) {
//       // حذف این دسته و فرزندانش
//       allChildrenIds.forEach((id) => newChecked.delete(id));
//     } else {
//       // افزودن این دسته و فرزندانش
//       allChildrenIds.forEach((id) => newChecked.add(id));
//     }

//     setCheckedIds(newChecked);

//     // 🔄 بعد از تغییر، خروجی جدید رو بفرست
//     const selected = getSelectedCategories(newChecked);
//     console.log("selected::",selected);

//     onSelectionChange?.(selected);
//   };

//   const getCheckboxState = (category) => {
//     const allChildrenIds = getAllChildrenIds(category);
//     console.log('allChildrenIds:',allChildrenIds);

//     const checkedChildren = allChildrenIds.filter((id) => checkedIds.has(id));

//     if (checkedChildren.length === 0) {
//       return "unchecked";
//     } else if (checkedChildren.length === allChildrenIds.length) {
//       return "checked";
//     } else {
//       return "indeterminate";
//     }
//   };

//   const searchCategories = (cats, term, path = []) => {
//     let results = [];
//     console.log(cats);

//     return 0
//     cats.forEach((cat) => {
//       const currentPath = [...path, cat];
//       if (cat.name.toLowerCase().includes(term.toLowerCase())) {
//         results.push({ ...cat, path: currentPath });
//       }
//       if (cat.children && cat.children.length > 0) {
//         results = [
//           ...results,
//           ...searchCategories(cat.children, term, currentPath),
//         ];
//       }
//     });

//     return results;
//   };

//   const getFullPath = (path) => {
//     return path.map((p) => p.name).join(" / ");
//   };

//   const getSelectedCategories = (customChecked = checkedIds) => {
//     const selected = [];
//     const findCategory = (cats, path = []) => {
//       console.log(cats);

//       return 0
//       cats.forEach((cat) => {
//         const currentPath = [...path, cat];
//         if (customChecked.has(cat.id)) {
//           selected.push({ ...cat, path: currentPath });
//         }
//         if (cat.children && cat.children.length > 0) {
//           findCategory(cat.children, currentPath);
//         }
//       });
//     };
//     findCategory(data?.data);
//     return selected;
//   };

//   const removeSelected = (id) => {
//     const newChecked = new Set(checkedIds);
//     newChecked.delete(id);
//     setCheckedIds(newChecked);
//     onSelectionChange?.(getSelectedCategories(newChecked));
//   };

//   const clearAll = () => {
//     setCheckedIds(new Set());
//     onSelectionChange?.([]);
//   };

//   const CategoryItem = ({ category, level = 0, path = [] }) => {
//     console.log(category);

//     const hasChildren =
//       category.subcategories && category.subcategories.length > 0;
//     const isExpanded = expandedIds.has(category.id);
//     const checkboxState = getCheckboxState(category);
//     const currentPath = [...path, category];
//     const isEditing = editingId === category.id;

//     return (
//       <div>

//         <div
//           className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-150 group ${
//             checkedIds.has(category.id)
//               ? "bg-gradient-to-r from-blue-50 to-indigo-50"
//               : "hover:bg-gray-50"
//           }`}
//           style={{ paddingRight: `${level * 1.5 + 0.75}rem` }}
//         >
//           {hasChildren && (
//             <button
//               onClick={() => toggleExpand(category.id)}
//               className="p-1 hover:bg-blue-100 rounded transition-colors"
//             >
//               {isExpanded ? (
//                 <ChevronDown className="w-4 h-4 text-gray-600" />
//               ) : (
//                 <ChevronRight className="w-4 h-4 text-gray-600" />
//               )}
//             </button>
//           )}

//           {!hasChildren && <div className="w-6" />}

//           {isExpanded && hasChildren ? (
//             <FolderOpen className="w-5 h-5 text-amber-500" />
//           ) : (
//             <Folder className="w-5 h-5 text-blue-500" />
//           )}

//           <div className="flex items-center gap-3 flex-1">
//             <div className="relative">
//               <input
//                 type="checkbox"
//                 checked={checkboxState === "checked"}
//                 onChange={() => handleCheckboxChange(category)}
//                 className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
//                 ref={(el) => {
//                   if (el) el.indeterminate = checkboxState === "indeterminate";
//                 }}
//               />
//               {checkboxState === "indeterminate" && (
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <div className="w-2.5 h-0.5 bg-blue-600 rounded"></div>
//                 </div>
//               )}
//             </div>

//             {isEditing ? (
//               <div className="flex items-center gap-2 flex-1">
//                 <input
//                   type="text"
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                   className="flex-1 px-2 py-1 border border-blue-300 rounded text-sm"
//                   autoFocus
//                 />
//                 <button
//                   onClick={saveEdit}
//                   className="p-1 text-green-600 hover:bg-green-100 rounded"
//                 >
//                   <Save className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={cancelEdit}
//                   className="p-1 text-gray-600 hover:bg-gray-100 rounded"
//                 >
//                   <RotateCcw className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <span
//                   className={`text-sm font-medium transition-colors ${
//                     checkedIds.has(category.id)
//                       ? "text-blue-700"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {category.name}
//                 </span>

//                 {hasChildren && (
//                   <span className="text-xs text-gray-400 mr-auto">
//                     ({category.subcategories.length})
//                   </span>
//                 )}

//                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => startEdit(category.id)}
//                     className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                     title="ویرایش"
//                   >
//                     <Edit3 className="w-3.5 h-3.5" />
//                   </button>
//                   <button
//                     onClick={() =>
//                       setNewCategory({ name: "", parentId: category.id })
//                     }
//                     className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
//                     title="افزودن زیردسته"
//                   >
//                     <Plus className="w-3.5 h-3.5" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(category.id)}
//                     className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                     title="حذف"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {isExpanded && hasChildren && (
//           <div
//             className="border-r-2 border-gray-200 mt-1"
//             style={{ marginRight: `${level * 1.5 + 1.5}rem` }}
//           >
//             {/* {JSON.stringify(category)} */}
//             {category.subcategories.map((child) => (
//               <CategoryItem
//                 key={child.id}
//                 category={child}
//                 level={level + 1}
//                 path={currentPath}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const searchResults = searchTerm
//     ? searchCategories(data?.data, searchTerm)
//     : null;
//   const selectedCategories = getSelectedCategories();

//   return (
//     <>
//     {JSON.stringify(data)}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               مدیریت دسته‌بندی‌ها
//             </h1>

//             <div className="flex items-center gap-3">
//               {selectedCategories.length > 0 && (
//                 <button
//                   onClick={clearAll}
//                   className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm"
//                 >
//                   <X className="w-4 h-4" />
//                   پاک کردن همه
//                 </button>
//               )}
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm"
//               >
//                 <Plus className="w-4 h-4" />
//                 افزودن دسته جدید
//               </button>
//             </div>
//           </div>

//           {/* Search Box */}
//           <div className="mb-6">
//             <div className="relative">
//               <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="جستجوی دسته..."
//                 className="w-full pr-12 pl-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
//               />
//             </div>
//           </div>

//           {/* Categories List */}
//           <div className="border-2 border-gray-200 rounded-xl p-4 mb-6 max-h-96 overflow-y-auto">
//             {searchResults ? (
//               searchResults.length > 0 ? (
//                 <div className="space-y-2">
//                   {searchResults.map((result) => (
//                     <div
//                       key={result.id}
//                       className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
//                         checkedIds.has(result.id)
//                           ? "bg-gradient-to-r from-blue-50 to-indigo-50"
//                           : "hover:bg-gray-50"
//                       }`}
//                     >
//                       <Folder className="w-5 h-5 text-blue-500" />
//                       <div className="flex items-center gap-3 flex-1">
//                         <input
//                           type="checkbox"
//                           checked={checkedIds.has(result.id)}
//                           onChange={() => handleCheckboxChange(result)}
//                           className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                         />
//                         <div className="flex-1">
//                           <div className="text-sm font-medium text-gray-800">
//                             {result.name}
//                           </div>
//                           <div className="text-xs text-gray-500 mt-0.5">
//                             {getFullPath(result.path)}
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => startEdit(result.id)}
//                             className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                             title="ویرایش"
//                           >
//                             <Edit3 className="w-3.5 h-3.5" />
//                           </button>
//                           <button
//                             onClick={() =>
//                               setNewCategory({ name: "", parentId: result.id })
//                             }
//                             className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
//                             title="افزودن زیردسته"
//                           >
//                             <Plus className="w-3.5 h-3.5" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(result.id)}
//                             className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                             title="حذف"
//                           >
//                             <Trash2 className="w-3.5 h-3.5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="py-12 text-center text-gray-400">
//                   <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                   <p>نتیجه‌ای یافت نشد</p>
//                 </div>
//               )
//             ) : (
//               // categories
//               data?.data?.map((category) => (
//                 <>
//                   <CategoryItem key={category.id} category={category} />
//                 </>
//               ))
//             )}
//           </div>

//           {/* Selected Items */}
//           {selectedCategories.length > 0 && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-semibold text-gray-700">
//                   دسته‌های انتخاب شده ({selectedCategories.length})
//                 </h3>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {selectedCategories.map((cat) => (
//                   <div
//                     key={cat.id}
//                     className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-blue-200 group hover:shadow-md transition-all"
//                   >
//                     <Folder className="w-4 h-4 text-blue-500" />
//                     <div className="flex flex-col">
//                       <span className="text-sm font-medium text-gray-800">
//                         {cat.name}
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         {getFullPath(cat.path)}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => removeSelected(cat.id)}
//                       className="p-1 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
//                     >
//                       <X className="w-3.5 h-3.5 text-red-500" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Modal برای افزودن دسته جدید */}
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//               <h3 className="text-xl font-bold mb-4">افزودن دسته جدید</h3>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   نام دسته
//                 </label>
//                 <input
//                   type="text"
//                   value={newCategory.name}
//                   onChange={(e) =>
//                     setNewCategory({ ...newCategory, name: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="نام دسته را وارد کنید"
//                 />
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   والد (اختیاری)
//                 </label>
//                 <select
//                   value={newCategory.parentId || ""}
//                   onChange={(e) =>
//                     setNewCategory({
//                       ...newCategory,
//                       parentId: e.target.value
//                         ? parseInt(e.target.value)
//                         : null,
//                     })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">بدون والد (دسته اصلی)</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   انصراف
//                 </button>
//                 <button
//                   onClick={() =>
//                     addCategory(newCategory.name, newCategory.parentId)
//                   }
//                   disabled={!newCategory.name.trim()}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   افزودن
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modal برای افزودن زیردسته */}
//         {newCategory.parentId && !showAddModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//               <h3 className="text-xl font-bold mb-4">
//                 افزودن زیردسته به {findCategory(newCategory.parentId)?.name}
//               </h3>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   نام زیردسته
//                 </label>
//                 <input
//                   type="text"
//                   value={newCategory.name}
//                   onChange={(e) =>
//                     setNewCategory({ ...newCategory, name: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="نام زیردسته را وارد کنید"
//                 />
//               </div>
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setNewCategory({ name: "", parentId: null })}
//                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   انصراف
//                 </button>
//                 <button
//                   onClick={() =>
//                     addCategory(newCategory.name, newCategory.parentId)
//                   }
//                   disabled={!newCategory.name.trim()}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   افزودن
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default NestedCategoryCheckbox;
// ///////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Search,
//   Folder,
//   FolderOpen,
//   X,
//   Edit3,
//   Trash2,
//   Plus,
//   Save,
//   RotateCcw,
// } from "lucide-react";
// import { useLoading } from "../hook/loadingData";

// const NestedCategoryCheckbox = ({
//   onSelectionChange,
//   showcnt = true,
//   selected = [],
// }: any) => {
//   const { data, loading, error } = useLoading({
//     url: "/api/getdata",
//     submitUrl: "/api/main",
//     pageSize: 100,
//     initialData: {
//       table: "category",

//       filters: {
//         where: { parentId: null },
//         include: {
//           subcategories: {
//             include: {
//               subcategories: {
//                 include: {
//                   subcategories: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });

//   // داده‌های اصلی
//   const [categories, setCategories] = useState<any[]>([]);
//   const [expandedIds, setExpandedIds] = useState(new Set<number>());
//   const [checkedIds, setCheckedIds] = useState(new Set<number>());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editName, setEditName] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newCategory, setNewCategory] = useState({ name: "", parentId: null });

//   // useEffect(() => {
//   //   console.log('selected',selected.map((d) => d.id));

//   //   setCheckedIds(selected.map((d) => d.id));
//   //   //  selected.find((d) => d.id === category.id)
//   // }, [checkedIds,selected]);
//   useEffect(() => {
//     setCheckedIds(new Set(selected.map((d) => d.id)));
//   }, [selected]);

//   // زمانی که داده‌ها از سرور آمد، داخل state بریز
//   useEffect(() => {
//     if (data?.data) {
//       setCategories(data.data);
//       const defaultExpanded: any = new Set(data.data.map((c: any) => c.id));
//       setExpandedIds(defaultExpanded);
//     }
//   }, [data]);

//   // پیدا کردن دسته
//   const findCategory = (id: number, cats = categories): any => {
//     for (let cat of cats) {
//       if (cat.id === id) return cat;
//       if (cat.subcategories?.length > 0) {
//         const found = findCategory(id, cat.subcategories);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   // حذف دسته
//   const deleteCategory: any = (id: number, cats = categories) => {
//     return cats
//       .filter((cat) => cat.id !== id)
//       .map((cat) => ({
//         ...cat,
//         subcategories:
//           cat.subcategories && cat.subcategories.length > 0
//             ? deleteCategory(id, cat.subcategories)
//             : [],
//       }));
//   };

//   // اضافه کردن دسته جدید
//   const addCategory = (name: string, parentId: number | null = null) => {
//     const newCat = { id: Date.now(), name, subcategories: [] };

//     if (!parentId) {
//       setCategories([...categories, newCat]);
//       setExpandedIds(new Set([...expandedIds, newCat.id]));
//     } else {
//       const addToParent: any = (cats: any[]) =>
//         cats.map((cat) => {
//           if (cat.id === parentId) {
//             return {
//               ...cat,
//               subcategories: [...(cat.subcategories || []), newCat],
//             };
//           }
//           if (cat.subcategories?.length > 0) {
//             return { ...cat, subcategories: addToParent(cat.subcategories) };
//           }
//           return cat;
//         });
//       setCategories(addToParent(categories));
//       setExpandedIds(new Set([...expandedIds, parentId]));
//     }

//     setNewCategory({ name: "", parentId: null });
//     setShowAddModal(false);
//   };

//   // ویرایش دسته
//   const startEdit = (id: number) => {
//     const cat = findCategory(id);
//     if (cat) {
//       setEditingId(id);
//       setEditName(cat.name);
//     }
//   };

//   const saveEdit = () => {
//     const update = (cats: any[]): any[] =>
//       cats.map((cat) => {
//         if (cat.id === editingId) return { ...cat, name: editName };
//         if (cat.subcategories?.length > 0)
//           return { ...cat, subcategories: update(cat.subcategories) };
//         return cat;
//       });
//     setCategories(update(categories));
//     setEditingId(null);
//     setEditName("");
//   };

//   // مدیریت انتخاب‌ها
//   const getAllChildrenIds = (cat: any): number[] => {
//     let ids = [cat.id];
//     cat.subcategories?.forEach((child: any) => {
//       ids = [...ids, ...getAllChildrenIds(child)];
//     });
//     return ids;
//   };

//   const handleCheckboxChange = (cat: any) => {
//     const newChecked = new Set(checkedIds);
//     const allIds = getAllChildrenIds(cat);

//     if (newChecked.has(cat.id)) {
//       allIds.forEach((id) => newChecked.delete(id));
//     } else {
//       allIds.forEach((id) => newChecked.add(id));
//     }

//     setCheckedIds(newChecked);
//     onSelectionChange?.(getSelectedCategories(newChecked));
//   };

//   const getCheckboxState = (cat: any) => {
//     const allIds = getAllChildrenIds(cat);
//     const checkedCount = allIds.filter((id) => checkedIds.has(id)).length;
//     if (checkedCount === 0) return "unchecked";
//     if (checkedCount === allIds.length) return "checked";
//     return "indeterminate";
//   };

//   // برگرداندن دسته‌های انتخاب‌شده
//   const getSelectedCategories = (customChecked = checkedIds) => {
//     const selected: any[] = [];
//     const traverse = (cats: any[], path: any[] = []) => {
//       cats.forEach((cat) => {
//         const current = [...path, cat];
//         if (customChecked.has(cat.id)) selected.push({ ...cat, path: current });
//         if (cat.subcategories?.length > 0) traverse(cat.subcategories, current);
//       });
//     };
//     traverse(categories);
//     return selected;
//   };

//   const toggleExpand = (id: number) => {
//     const newExpanded = new Set(expandedIds);
//     if (newExpanded.has(id)) newExpanded.delete(id);
//     else newExpanded.add(id);
//     setExpandedIds(newExpanded);
//   };

//   const clearAll = () => {
//     setCheckedIds(new Set());
//     onSelectionChange?.([]);
//   };

//   const searchCategories = (cats: any[], term: string, path: any[] = []) => {
//     let res: any[] = [];
//     cats.forEach((cat) => {
//       const current = [...path, cat];
//       if (cat.name.toLowerCase().includes(term.toLowerCase()))
//         res.push({ ...cat, path: current });
//       if (cat.subcategories?.length > 0)
//         res = [...res, ...searchCategories(cat.subcategories, term, current)];
//     });
//     return res;
//   };

//   const getFullPath = (path: any[]) => path.map((p) => p.name).join(" / ");

//   const removeSelected = (id: number) => {
//     const newChecked = new Set(checkedIds);
//     newChecked.delete(id);
//     setCheckedIds(newChecked);

//     onSelectionChange?.(getSelectedCategories(newChecked));
//   };

//   const CategoryItem = ({ category, level = 0 }: any) => {
//     const hasChildren = category.subcategories?.length > 0;
//     const isExpanded = expandedIds.has(category.id);
//     const checkboxState = getCheckboxState(category);
//     const isEditing = editingId === category.id;

//     return (
//       <div>
//         <div
//           dir="rtl"
//           className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
//             checkedIds.has(category.id) ? "bg-blue-50" : "hover:bg-gray-50"
//           }`}
//           style={{ paddingRight: `${level * 1.5 + 0.75}rem` }}
//         >
//           {hasChildren ? (
//             <button onClick={() => toggleExpand(category.id)}>
//               {isExpanded ? (
//                 <ChevronDown className="w-4 h-4 text-gray-600" />
//               ) : (
//                 <ChevronRight className="w-4 h-4 text-gray-600" />
//               )}
//             </button>
//           ) : (
//             <div className="w-4" />
//           )}

//           {/* {isExpanded && hasChildren ? (
//             <FolderOpen className="w-5 h-5 text-amber-500" />
//           ) : (
//             <Folder className="w-5 h-5 text-blue-500" />
//           )} */}

//           <div className="flex items-center flex-1 gap-2">
//             <input
//               type="checkbox"
//               checked={checkboxState === "checked"}
//               onChange={() => handleCheckboxChange(category)}
//               className="w-4 h-4 cursor-pointer"
//               ref={(el) => {
//                 // if (el) el.indeterminate = checkboxState === "indeterminate";
//               }}
//             />

//             {isEditing ? (
//               <>
//                 <input
//                   type="text"
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                   className="border px-1 py-0.5 rounded text-sm flex-1"
//                 />
//                 <button onClick={saveEdit} className="text-green-600">
//                   <Save size={14} />
//                 </button>
//                 <button
//                   onClick={() => {
//                     setEditingId(null);
//                     setEditName("");
//                   }}
//                   className="text-gray-500"
//                 >
//                   <RotateCcw size={14} />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <span>{category.name}</span>
//                 <div className="ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => startEdit(category.id)}
//                     className="text-blue-500"
//                   >
//                     <Edit3 size={14} />
//                   </button>
//                   <button
//                     onClick={() =>
//                       setNewCategory({ name: "", parentId: category.id })
//                     }
//                     className="text-green-500"
//                   >
//                     <Plus size={14} />
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (window.confirm("آیا از حذف این دسته اطمینان دارید؟"))
//                         setCategories(deleteCategory(category.id));
//                     }}
//                     className="text-red-500"
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {isExpanded && hasChildren && (
//           <div
//             className="border-r border-gray-200 ml-4"
//             style={{ marginRight: `${level * 1.5 + 1.5}rem` }}
//           >
//             {category.subcategories.map((child: any) => (
//               <CategoryItem key={child.id} category={child} level={level + 1} />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const searchResults =
//     searchTerm.trim() !== "" ? searchCategories(categories, searchTerm) : null;
//   const selectedCategories = getSelectedCategories();

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white rounded-2xl shadow-xl p-6">
//         {showcnt && (
//           <div className="flex justify-between mb-4">
//             <h2 className="text-xl font-bold text-blue-600">
//               مدیریت دسته‌بندی‌ها
//             </h2>
//             <div className="flex gap-2">
//               {selectedCategories.length > 0 && (
//                 <button
//                   onClick={clearAll}
//                   className="bg-red-500 text-white px-3 py-1 rounded-lg"
//                 >
//                   پاک‌کردن همه
//                 </button>
//               )}
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-green-500 text-white px-3 py-1 rounded-lg"
//               >
//                 افزودن
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="relative mb-4">
//           <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="جستجو..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border-gray-600 shadow rounded-lg pr-10 pl-3 py-2"
//           />
//         </div>

//         <div className="border-gray-600 shadow rounded-lg p-3 max-h-96 overflow-y-auto">
//           {loading ? (
//             <div className="text-center text-gray-400 py-8">
//               در حال بارگذاری...
//             </div>
//           ) : searchResults ? (
//             searchResults.length > 0 ? (
//               searchResults.map((r) => (
//                 <div
//                   key={r.id}
//                   className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
//                 >
//                   {/* <Folder className="w-4 h-4 text-blue-500" /> */}
//                   <input
//                     type="checkbox"
//                     checked={checkedIds.has(r.id)}
//                     onChange={() => handleCheckboxChange(r)}
//                     className="w-4 h-4"
//                   />
//                   <div className="flex flex-col">
//                     <span>{r.name}</span>
//                     <span className="text-xs text-gray-400">
//                       {getFullPath(r.path)}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-400 py-8">
//                 نتیجه‌ای یافت نشد
//               </div>
//             )
//           ) : (
//             categories.map((cat) => (
//               <CategoryItem key={cat.id} category={cat} />
//             ))
//           )}
//         </div>

//         {selectedCategories.length > 0 && (
//           <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
//             <h4 className="text-sm font-semibold mb-2">
//               دسته‌های انتخاب شده ({selectedCategories.length})
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {selectedCategories.map((cat) => (
//                 <div
//                   key={cat.id}
//                   className="flex items-center gap-2 bg-white border px-3 py-1 rounded-lg shadow-sm"
//                 >
//                   {/* <Folder className="w-4 h-4 text-blue-500" /> */}
//                   <div>
//                     <div className="text-sm font-medium">{cat.name}</div>
//                     <div className="text-xs text-gray-400">
//                       {getFullPath(cat.path)}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeSelected(cat.id)}
//                     className="text-red-500 hover:bg-red-50 p-1 rounded"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//             <h3 className="text-lg font-bold mb-4">افزودن دسته جدید</h3>
//             <input
//               type="text"
//               placeholder="نام دسته"
//               value={newCategory.name}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, name: e.target.value })
//               }
//               className="w-full border rounded-lg px-3 py-2 mb-4"
//             />
//             <select
//               value={newCategory.parentId || ""}
//               onChange={(e) =>
//                 setNewCategory({
//                   ...newCategory,
//                   parentId: e.target.value ? parseInt(e.target.value) : null,
//                 })
//               }
//               className="w-full border rounded-lg px-3 py-2 mb-4"
//             >
//               <option value="">بدون والد</option>
//               {categories.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 className="px-3 py-1 text-gray-600"
//               >
//                 انصراف
//               </button>
//               <button
//                 onClick={() =>
//                   addCategory(newCategory.name, newCategory.parentId)
//                 }
//                 disabled={!newCategory.name.trim()}
//                 className="bg-blue-600 text-white px-4 py-1 rounded-lg disabled:opacity-50"
//               >
//                 افزودن
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NestedCategoryCheckbox;
/////////////////////////////////////////////////////////////////////////
"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Edit3,
  Trash2,
  Plus,
  Save,
  Image,
} from "lucide-react";
import ImageManagerPanel from "./ImageManagerPanel";
import { useLoading } from "../hook/loadingData";
import { useStorage } from "../hook/localstorage";
// import { useLoading } from "../hook/loadingData";

const NestedCategoryCheckbox = ({
  onSelectionChange,
  showcnt = true,
  selected = [],
  datacat = [],
  files = []
}: any) => {
  const { data, loading, error, submitData }: any = datacat; // {}

  // useLoading({
  //   url: "/api/getdata",
  //   submitUrl: "/api/main",

  //   initialData: {
  //     pageSize: 10000,
  //     table: "category",
  //     filters: {
  //       where: { parentId: null },
  //       include: {
  //         subcategories: {
  //           include: {
  //             subcategories: {
  //               include: {
  //                 subcategories: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const [categories, setCategories] = useState<any[]>([]);
  const [expandedIds, setExpandedIds] = useState(new Set<number>());
  const [checkedIds, setCheckedIds] = useState(new Set<number>());
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [addingParentId, setAddingParentId] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [dialog, setDialog] = useState(false);


  // var files: any = useLoading({
  //   url: "/api/getdata",
  //   submitUrl: "/api/main",
  //   initialData: {
  //     table: "file",
  //   },
  // });
  var [imgcate, setimgcat] = useStorage('image', {})
  const handleImageSelect = (imageUrl: any) => {
    console.log('test00',imageUrl, dialog);
    var id = dialog;
    submitData({
      nameTable: "category",
      action: "update",
      data: {
        imageUrl: imageUrl?.[0]?.url,
      },
      id: id,
    }).then((d) => {
      setimgcat(imageUrl)
      // setValue("imageUrl", imageUrl?.[0]?.url);
      setDialog(false);
    });






  };
  // useEffect(() => {
  //   setCheckedIds(new Set(selected.map((d) => d.id)));
  // }, [selected]);
  useEffect(() => {
    console.log("selected", selected.length > 0);

    if (selected.length > 0) {
      setCheckedIds(
        // new Set([1])
        new Set(selected.map((d: any) => d.id))
      );
    }
  }, [selected]);

  useEffect(() => {
    if (data?.data) {
      setCategories(data.data);
      const defaultExpanded: any = new Set(data.data.map((c: any) => c.id));
      setExpandedIds(defaultExpanded);
    }
  }, [data]);

  const findCategory = (id: number, cats = categories): any => {
    for (let cat of cats) {
      if (cat.id === id) return cat;
      if (cat.subcategories?.length > 0) {
        const found = findCategory(id, cat.subcategories);
        if (found) return found;
      }
    }
    return null;
  };

  const deleteCategory: any = (id: number, cats = categories) => {
    return cats
      .filter((cat) => cat.id !== id)
      .map((cat) => ({
        ...cat,
        subcategories:
          cat.subcategories && cat.subcategories.length > 0
            ? deleteCategory(id, cat.subcategories)
            : [],
      }));
  };

  const addCategory = (name: string, parentId: number | null = null) => {
    if (!name.trim()) return;

    const newCat = { id: Date.now(), name, subcategories: [] };

    if (!parentId) {
      setCategories([...categories, newCat]);
      setExpandedIds(new Set([...expandedIds, newCat.id]));
    } else {
      const addToParent: any = (cats: any[]) =>
        cats.map((cat) => {
          if (cat.id === parentId) {
            return {
              ...cat,
              subcategories: [...(cat.subcategories || []), newCat],
            };
          }
          if (cat.subcategories?.length > 0) {
            return { ...cat, subcategories: addToParent(cat.subcategories) };
          }
          return cat;
        });
      setCategories(addToParent(categories));
      setExpandedIds(new Set([...expandedIds, parentId]));
    }

    setNewCategoryName("");
    setAddingParentId(null);
  };

  const startEdit = (id: number) => {
    const cat = findCategory(id);
    if (cat) {
      setEditingId(id);
      setEditName(cat.name);
    }
  };

  const saveEdit = () => {
    const update = (cats: any[]): any[] =>
      cats.map((cat) => {
        if (cat.id === editingId) return { ...cat, name: editName };
        if (cat.subcategories?.length > 0)
          return { ...cat, subcategories: update(cat.subcategories) };
        return cat;
      });
    setCategories(update(categories));
    setEditingId(null);
    setEditName("");
  };

  const getAllChildrenIds = (cat: any): number[] => {
    let ids = [cat.id];
    cat.subcategories?.forEach((child: any) => {
      ids = [...ids, ...getAllChildrenIds(child)];
    });
    return ids;
  };

  const handleCheckboxChange = (cat: any) => {
    const newChecked = new Set(checkedIds);
    const allIds = getAllChildrenIds(cat);

    if (newChecked.has(cat.id)) {
      allIds.forEach((id) => newChecked.delete(id));
    } else {
      allIds.forEach((id) => newChecked.add(id));
    }

    setCheckedIds(newChecked);
    onSelectionChange?.(getSelectedCategories(newChecked));
  };

  const getCheckboxState = (cat: any) => {


    const allIds = getAllChildrenIds(cat);

    const checkedCount = allIds.filter((id) => checkedIds.has(id)).length;
    // console.log("getCheckboxState", checkedCount,checkedCount,allIds,cat,allIds.length);
    if (checkedCount === 0) return "unchecked";
    // if (checkedCount === allIds.length) return "checked";
    // console.log('selected',selected.find((d) => d === cat.id) !==undefined);

    if (selected.find((d: any) => d.id === cat.id) !== undefined) return "checked";

    // console.log(selected.find((d) => d.id === cat.id) !==undefined);
    return "indeterminate";
  };

  const getSelectedCategories = (customChecked = checkedIds) => {
    const selected: any[] = [];
    const traverse = (cats: any[], path: any[] = []) => {
      cats.forEach((cat) => {
        const current = [...path, cat];
        if (customChecked.has(cat.id)) selected.push({ ...cat, path: current });
        if (cat.subcategories?.length > 0) traverse(cat.subcategories, current);
      });
    };
    traverse(categories);
    return selected;
  };

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedIds(newExpanded);
  };

  const clearAll = () => {
    setCheckedIds(new Set());
    onSelectionChange?.([]);
  };

  const searchCategories = (cats: any[], term: string, path: any[] = []) => {
    let res: any[] = [];
    cats.forEach((cat) => {
      const current = [...path, cat];
      if (cat.name.toLowerCase().includes(term.toLowerCase()))
        res.push({ ...cat, path: current });
      if (cat.subcategories?.length > 0)
        res = [...res, ...searchCategories(cat.subcategories, term, current)];
    });
    return res;
  };

  const getFullPath = (path: any[]) => path.map((p) => p.name).join(" / ");

  const removeSelected = (id: number) => {
    const newChecked = new Set(checkedIds);
    newChecked.delete(id);
    setCheckedIds(newChecked);
    onSelectionChange?.(getSelectedCategories(newChecked));
  };

  const CategoryItem = ({ category, level = 0 }: any) => {
    // console.log("category", category);

    const hasChildren = category.subcategories?.length > 0;
    const isExpanded = expandedIds.has(category.id);
    const checkboxState = getCheckboxState(category);
    const isEditing = editingId === category.id;
    const isAddingChild = addingParentId === category.id;

    return (
      <div>
        <div
          dir="rtl"
          className={`flex items-center gap-3 py-2 px-3 rounded-lg group ${checkedIds.has(category.id) ? "bg-[#b7b89e]/10" : "hover:bg-gray-50"
            }`}
          style={{ paddingRight: `${level * 1.5 + 0.75}rem` }}
        >
          {hasChildren ? (
            <button onClick={() => toggleExpand(category.id)}>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}

          <div className="flex items-center flex-1 gap-2">
            {category.imageUrl && <img width={40} height={40} src={category.imageUrl} alt={category.name} srcset="" />}

            <input
              type="checkbox"
              checked={checkboxState === "checked"}
              onChange={() => handleCheckboxChange(category)}
              className="w-4 h-4 cursor-pointer"
            />

            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") {
                      setEditingId(null);
                      setEditName("");
                    }
                  }}
                  className="border px-2 py-1 rounded text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#b7b89e]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    submitData({
                      nameTable: "category",
                      action: "update",
                      data: {
                        name: editName,
                      },
                      id: category.id,
                    });
                  }}
                  // onClick={saveEdit}
                  className="text-white bg-[#b7b89e] hover:bg-[#a3a488] p-1 rounded transition-colors"
                  title="ذخیره"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditName("");
                  }}
                  className="text-gray-500 hover:bg-gray-200 p-1 rounded transition-colors"
                  title="انصراف"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{category.name}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {showcnt && (
                    <>
                      <button onClick={() => {
                        setDialog(category.id)

                      }} className="text-[#b7b89e] hover:bg-[#b7b89e] hover:text-white p-1 rounded transition-colors">
                        <Image size={16} />
                      </button>
                      <button
                        onClick={() => startEdit(category.id)}
                        className="text-[#b7b89e] hover:bg-[#b7b89e] hover:text-white p-1 rounded transition-colors"
                        title="ویرایش"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setAddingParentId(category.id);
                          setExpandedIds(
                            new Set([...expandedIds, category.id])
                          );
                        }}
                        className="text-[#b7b89e] hover:bg-[#b7b89e] hover:text-white p-1 rounded transition-colors"
                        title="افزودن زیرمجموعه"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm("آیا از حذف این دسته اطمینان دارید؟")
                          )
                            setCategories(deleteCategory(category.id));
                        }}
                        className="text-red-500 hover:bg-red-100 p-1 rounded transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>

                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {isAddingChild && (
          <div
            className="flex items-center gap-2 py-2 px-3 bg-[#b7b89e]/10 rounded-lg mt-1"
            style={{ marginRight: `${(level + 1) * 1.5 + 0.75}rem` }}
          >
            <div className="w-4" />
            {showcnt && (
              <>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      addCategory(newCategoryName, category.id);
                    if (e.key === "Escape") {
                      setAddingParentId(null);
                      setNewCategoryName("");
                    }
                  }}
                  placeholder="نام دسته جدید..."
                  className="border px-2 py-1 rounded text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#b7b89e]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    submitData({
                      nameTable: "category",
                      action: "create",
                      data: {
                        name: newCategoryName,
                        parentId: category.id,
                      },
                      // id: category.id,
                    });

                    addCategory(newCategoryName, category.id);
                  }}
                  disabled={!newCategoryName.trim()}
                  className="text-white bg-[#b7b89e] hover:bg-[#a3a488] p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="افزودن"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={() => {
                    setAddingParentId(null);
                    setNewCategoryName("");
                  }}
                  className="text-gray-500 hover:bg-gray-200 p-1 rounded transition-colors"
                  title="انصراف"
                >
                  <X size={16} />
                </button>

              </>
            )}
          </div>
        )}

        {isExpanded && hasChildren && (
          <div
            className="border-r border-gray-200 ml-4"
            style={{ marginRight: `${level * 1.5 + 1.5}rem` }}
          >
            {category.subcategories.map((child: any) => (
              <CategoryItem key={child.id} category={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const searchResults =
    searchTerm.trim() !== "" ? searchCategories(categories, searchTerm) : null;
  const selectedCategories = getSelectedCategories();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        {showcnt && (
          <div className="flex justify-between mb-4">
            {/* <h2 className="text-xl font-bold" style={{ color: '#b7b89e' }}>
              مدیریت دسته‌بندی‌ها
            </h2> */}
            <div className="flex gap-2">
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearAll}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  پاک‌کردن همه
                </button>
              )}
              <button
                onClick={() => setAddingParentId(-1)}
                className="text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                style={{ backgroundColor: "#b7b89e" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#a3a488")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b7b89e")
                }
              >
                <Plus size={18} />
                افزودن دسته اصلی
              </button>
            </div>
          </div>
        )}

        <div className="relative mb-4">
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-gray-300 shadow rounded-lg pr-10 pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7b89e] focus:border-[#b7b89e]"
          />
        </div>

        <div className="border border-gray-300 shadow rounded-lg p-3 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center text-gray-400 py-8">
              در حال بارگذاری...
            </div>
          ) : searchResults ? (
            searchResults.length > 0 ? (
              searchResults.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    checked={checkedIds.has(r.id)}
                    onChange={() => handleCheckboxChange(r)}
                    className="w-4 h-4"
                  />
                  <div className="flex flex-col">
                    <span>{r.name}</span>
                    <span className="text-xs text-gray-400">
                      {getFullPath(r.path)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                نتیجه‌ای یافت نشد
              </div>
            )
          ) : (
            <>
              {addingParentId === -1 && (
                <div className="flex items-center gap-2 py-2 px-3 bg-[#b7b89e]/10 rounded-lg mb-2">
                  <div className="w-4" />
                  {showcnt && (
                    <>
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => {
                          setNewCategoryName(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            addCategory(newCategoryName, null);
                          if (e.key === "Escape") {
                            setAddingParentId(null);
                            setNewCategoryName("");
                          }
                        }}
                        placeholder="نام دسته اصلی جدید..."
                        className="border px-2 py-1 rounded text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#b7b89e]"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          // console.log(r.id);

                          submitData({
                            nameTable: "category",
                            action: "create",
                            data: {
                              name: newCategoryName,
                            },
                            // id: r.id,
                          });

                          addCategory(newCategoryName, null);
                        }}
                        disabled={!newCategoryName.trim()}
                        className="text-white bg-[#b7b89e] hover:bg-[#a3a488] p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="افزودن"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setAddingParentId(null);
                          setNewCategoryName("");
                        }}
                        className="text-gray-500 hover:bg-gray-200 p-1 rounded transition-colors"
                        title="انصراف"
                      >
                        <X size={16} />
                      </button>
                    </>
                  )}
                </div>
              )}
              {categories.map((cat) => (
                <CategoryItem key={cat.id} category={cat} />
              ))}
            </>
          )}
        </div>

        {selectedCategories.length > 0 && (
          <div
            className="mt-4 p-4 rounded-lg border"
            style={{ backgroundColor: "#b7b89e20", borderColor: "#b7b89e" }}
          >
            <h4
              className="text-sm font-semibold mb-2"
              style={{ color: "#b7b89e" }}
            >
              دسته‌های انتخاب شده ({selectedCategories.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 bg-white border px-3 py-1 rounded-lg shadow-sm"
                  style={{ borderColor: "#b7b89e" }}
                >
                  <div>
                    <div className="text-sm font-medium">{cat.name}</div>
                    <div className="text-xs text-gray-400">
                      {getFullPath(cat.path)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeSelected(cat.id)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ImageManagerPanel
        files={files ?? {}}
        radio={true}
        onImageToggle={handleImageSelect}
        onClose={() => setDialog(false)}
        mode="dialog"
        isOpen={dialog}
      />
    </div>
  );
};

export default NestedCategoryCheckbox;
