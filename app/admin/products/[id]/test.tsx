'use client';

import { useState } from 'react';
import { useProducts } from '@/app/hooks/useProducts';
import { ProductsList } from '@/app/components/ProductsList';
import { ProductForm } from '@/app/components/ProductForm';
import { AttributeManager } from '@/app/components/AttributeManager';
import { Plus, Package, Settings, List } from 'lucide-react';

// کامپوننت NestedCategoryCheckbox - اضافه شده
const NestedCategoryCheckbox = ({ selectedCategories, onCategoriesChange }) => {
  const [categories] = useState([
    {
      id: 1,
      name: 'الکترونیک',
      children: [
        {
          id: 2,
          name: 'موبایل',
          children: [
            { id: 3, name: 'سامسونگ', children: [] },
            { id: 4, name: 'اپل', children: [] },
            { id: 5, name: 'شیائومی', children: [] }
          ]
        },
        {
          id: 6,
          name: 'لپ‌تاپ',
          children: [
            { id: 7, name: 'ایسوس', children: [] },
            { id: 8, name: 'لنوو', children: [] },
            { id: 9, name: 'اچ پی', children: [] }
          ]
        },
        {
          id: 10,
          name: 'لوازم جانبی',
          children: [
            { id: 11, name: 'هدفون', children: [] },
            { id: 12, name: 'کیبورد', children: [] }
          ]
        }
      ]
    },
    {
      id: 13,
      name: 'پوشاک',
      children: [
        {
          id: 14,
          name: 'مردانه',
          children: [
            { id: 15, name: 'پیراهن', children: [] },
            { id: 16, name: 'شلوار', children: [] }
          ]
        },
        {
          id: 17,
          name: 'زنانه',
          children: [
            { id: 18, name: 'مانتو', children: [] },
            { id: 19, name: 'شال و روسری', children: [] }
          ]
        },
        {
          id: 20,
          name: 'بچگانه',
          children: []
        }
      ]
    },
    {
      id: 21,
      name: 'کتاب و لوازم تحریر',
      children: [
        { id: 22, name: 'کتاب', children: [] },
        { id: 23, name: 'دفتر و کلاسور', children: [] }
      ]
    }
  ]);

  const [expandedIds, setExpandedIds] = useState(new Set([1, 13, 21]));
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const getAllChildrenIds = (category) => {
    let ids = [category.id];
    if (category.children) {
      category.children.forEach(child => {
        ids = [...ids, ...getAllChildrenIds(child)];
      });
    }
    return ids;
  };

  const handleCheckboxChange = (category) => {
    const newChecked = new Set(selectedCategories);
    const allChildrenIds = getAllChildrenIds(category);

    if (newChecked.has(category.id)) {
      // Remove this category and all its children
      allChildrenIds.forEach(id => newChecked.delete(id));
    } else {
      // Add this category and all its children
      allChildrenIds.forEach(id => newChecked.add(id));
    }

    onCategoriesChange(newChecked);
  };

  const getCheckboxState = (category) => {
    const allChildrenIds = getAllChildrenIds(category);
    const checkedChildren = allChildrenIds.filter(id => selectedCategories.has(id));

    if (checkedChildren.length === 0) {
      return 'unchecked';
    } else if (checkedChildren.length === allChildrenIds.length) {
      return 'checked';
    } else {
      return 'indeterminate';
    }
  };

  const searchCategories = (cats, term, path = []) => {
    let results = [];
    
    cats.forEach(cat => {
      const currentPath = [...path, cat];
      if (cat.name.toLowerCase().includes(term.toLowerCase())) {
        results.push({ ...cat, path: currentPath });
      }
      if (cat.children && cat.children.length > 0) {
        results = [...results, ...searchCategories(cat.children, term, currentPath)];
      }
    });
    
    return results;
  };

  const getFullPath = (path) => {
    return path.map(p => p.name).join(' / ');
  };

  const CategoryItem = ({ category, level = 0, path = [] }) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedIds.has(category.id);
    const checkboxState = getCheckboxState(category);
    const currentPath = [...path, category];

    return (
      <div>
        <div
          className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-150 group ${
            selectedCategories.has(category.id)
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50'
              : 'hover:bg-gray-50'
          }`}
          style={{ paddingRight: `${level * 1.5 + 0.75}rem` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpand(category.id)}
              className="p-1 hover:bg-blue-100 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          
          {!hasChildren && <div className="w-6" />}

          <input
            type="checkbox"
            checked={checkboxState === 'checked'}
            onChange={() => handleCheckboxChange(category)}
            className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
            ref={el => {
              if (el) el.indeterminate = checkboxState === 'indeterminate';
            }}
          />
          
          <span className={`text-sm font-medium transition-colors ${
            selectedCategories.has(category.id) ? 'text-blue-700' : 'text-gray-700'
          }`}>
            {category.name}
          </span>

          {hasChildren && (
            <span className="text-xs text-gray-400 mr-auto">
              ({category.children.length})
            </span>
          )}
        </div>

        {isExpanded && hasChildren && (
          <div className="border-r-2 border-gray-200 mt-1" style={{ marginRight: `${level * 1.5 + 1.5}rem` }}>
            {category.children.map(child => (
              <CategoryItem
                key={child.id}
                category={child}
                level={level + 1}
                path={currentPath}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const getSelectedCategories = () => {
    const selected = [];
    const findCategory = (cats, path = []) => {
      cats.forEach(cat => {
        const currentPath = [...path, cat];
        if (selectedCategories.has(cat.id)) {
          selected.push({ ...cat, path: currentPath });
        }
        if (cat.children && cat.children.length > 0) {
          findCategory(cat.children, currentPath);
        }
      });
    };
    findCategory(categories);
    return selected;
  };

  const removeSelected = (id) => {
    const newChecked = new Set(selectedCategories);
    newChecked.delete(id);
    onCategoriesChange(newChecked);
  };

  const clearAll = () => {
    onCategoriesChange(new Set());
  };

  const searchResults = searchTerm ? searchCategories(categories, searchTerm) : null;
  const selectedCategoriesList = getSelectedCategories();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <List className="w-5 h-5" />
          دسته‌بندی‌های محصول
        </h3>
        {selectedCategoriesList.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            <X className="w-4 h-4" />
            پاک کردن همه
          </button>
        )}
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجوی دسته..."
            className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="border border-gray-200 rounded-lg p-3 mb-4 max-h-64 overflow-y-auto">
        {searchResults ? (
          searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map(result => (
                <div
                  key={result.id}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                    selectedCategories.has(result.id)
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(result.id)}
                    onChange={() => handleCheckboxChange(result)}
                    className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{result.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {getFullPath(result.path)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">نتیجه‌ای یافت نشد</p>
            </div>
          )
        ) : (
          categories.map(category => (
            <CategoryItem key={category.id} category={category} />
          ))
        )}
      </div>

      {/* Selected Items */}
      {selectedCategoriesList.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">
              دسته‌های انتخاب شده ({selectedCategoriesList.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategoriesList.map(cat => (
              <div
                key={cat.id}
                className="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-sm border border-blue-200 group hover:shadow-md transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-800">{cat.name}</span>
                  <span className="text-xs text-gray-500">{getFullPath(cat.path)}</span>
                </div>
                <button
                  onClick={() => removeSelected(cat.id)}
                  className="p-1 hover:bg-red-100 rounded transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// آیکون‌های مورد نیاز
const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function ProductsManagementPage() {
  const {
    products,
    attributes,
    addProduct,
    updateProduct,
    deleteProduct,
    addAttribute,
    deleteAttribute,
  } = useProducts();

  const [activeTab, setActiveTab] = useState<'products' | 'attributes' | 'categories'>('products');
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const handleAddProduct = (productData: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) => {
    addProduct(productData);
    setIsProductFormOpen(false);
  };

  const handleEditProduct = (productData: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
      setIsProductFormOpen(false);
    }
  };

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsProductFormOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">مدیریت محصولات</h1>
          <p className="mt-2 text-gray-600">مدیریت محصولات، ویژگی‌ها و دسته‌بندی‌های فروشگاه</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Package size={20} />
                محصولات ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('attributes')}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'attributes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings size={20} />
                ویژگی‌ها ({attributes.length})
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'categories'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <List size={20} />
                دسته‌بندی‌ها
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">همه محصولات</h2>
              <button
                onClick={() => setIsProductFormOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                افزودن محصول
              </button>
            </div>

            <ProductsList
              products={products}
              onEdit={handleEditClick}
              onDelete={handleDeleteProduct}
            />
          </div>
        )}

        {activeTab === 'attributes' && (
          <AttributeManager
            attributes={attributes}
            onAddAttribute={addAttribute}
            onDeleteAttribute={deleteAttribute}
          />
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">مدیریت دسته‌بندی‌ها</h2>
              <p className="text-gray-600">دسته‌بندی‌های سلسله مراتبی محصولات</p>
            </div>
            
            <NestedCategoryCheckbox 
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
            />
          </div>
        )}

        {/* Product Form Modal */}
        {isProductFormOpen && (
          <ProductForm
            attributes={attributes}
            onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={handleCancelEdit}
            initialData={editingProduct || undefined}
          />
        )}
      </div>
    </div>
  );
}