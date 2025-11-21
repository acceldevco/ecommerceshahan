"use client"
import { useState, useMemo } from 'react';
import { Plus, Trash2, X, Edit2, Settings, Search, Filter, MoreVertical, Copy, Eye, EyeOff } from 'lucide-react';

interface ProductAttribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'color' | 'date';
  values?: string[];
  required: boolean;
  description?: string;
  sortOrder: number;
  isVisible: boolean;
  createdAt: Date;
}

interface AttributeManagerProps {
  attributes: ProductAttribute[];
  onAddAttribute: (attribute: Omit<ProductAttribute, 'id' | 'createdAt'>) => void;
  onUpdateAttribute: (id: string, attribute: Partial<ProductAttribute>) => void;
  onDeleteAttribute: (id: string) => void;
  onReorderAttributes?: (attributes: ProductAttribute[]) => void;
}

export const AttributeManager: React.FC<AttributeManagerProps> = ({
  attributes,
  onAddAttribute,
  onUpdateAttribute,
  onDeleteAttribute,
  onReorderAttributes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<ProductAttribute | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState({
    name: '',
    type: 'text' as ProductAttribute['type'],
    values: '',
    required: false,
    description: '',
    isVisible: true,
  });

  // Filter attributes
  const filteredAttributes = useMemo(() => {
    return attributes.filter(attr => {
      const matchesSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           attr.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || attr.type === typeFilter;
      return matchesSearch && matchesType;
    }).sort((a, b) => a.sortOrder - b.sortOrder);
  }, [attributes, searchTerm, typeFilter]);

  const attributeStats = useMemo(() => {
    const stats = {
      total: attributes.length,
      required: attributes.filter(attr => attr.required).length,
      visible: attributes.filter(attr => attr.isVisible).length,
      byType: {} as Record<string, number>
    };

    attributes.forEach(attr => {
      stats.byType[attr.type] = (stats.byType[attr.type] || 0) + 1;
    });

    return stats;
  }, [attributes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const attributeData: Omit<ProductAttribute, 'id' | 'createdAt'> = {
      name: formData.name.trim(),
      type: formData.type,
      required: formData.required,
      description: formData.description.trim(),
      isVisible: formData.isVisible,
      sortOrder: attributes.length,
      ...(formData.type === 'select' && { 
        values: formData.values.split(',').map(v => v.trim()).filter(Boolean)
      }),
      ...(formData.type === 'color' && {
        values: ['قرمز', 'آبی', 'سبز', 'مشکی', 'سفید', 'زرد', 'بنفش'] // Default colors
      }),
    };

    if (editingAttribute) {
      onUpdateAttribute(editingAttribute.id, attributeData);
    } else {
      onAddAttribute(attributeData);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (attribute: ProductAttribute) => {
    setEditingAttribute(attribute);
    setFormData({
      name: attribute.name,
      type: attribute.type,
      values: attribute.values?.join(', ') || '',
      required: attribute.required,
      description: attribute.description || '',
      isVisible: attribute.isVisible,
    });
    setIsModalOpen(true);
  };

  const handleDuplicate = (attribute: ProductAttribute) => {
    onAddAttribute({
      ...attribute,
      name: `${attribute.name} (کپی)`,
      sortOrder: attributes.length,
    });
  };

  const handleToggleVisibility = (id: string, isVisible: boolean) => {
    onUpdateAttribute(id, { isVisible });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'text',
      values: '',
      required: false,
      description: '',
      isVisible: true,
    });
    setEditingAttribute(null);
  };

  const handleModalClose = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const getAttributeTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      text: '📝',
      number: '🔢',
      select: '📋',
      boolean: '✅',
      color: '🎨',
      date: '📅',
    };
    return icons[type] || '📌';
  };

  const getAttributeTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      text: 'bg-blue-50 text-blue-700 border-blue-200',
      number: 'bg-green-50 text-green-700 border-green-200',
      select: 'bg-purple-50 text-purple-700 border-purple-200',
      boolean: 'bg-amber-50 text-amber-700 border-amber-200',
      color: 'bg-pink-50 text-pink-700 border-pink-200',
      date: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    };
    return colors[type] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-600" />
              مدیریت ویژگی‌ها
            </h1>
            <p className="text-gray-600 mt-2">
              تعریف و مدیریت ویژگی‌های سفارشی برای محصولات
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 group"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">ویژگی جدید</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-700">{attributeStats.total}</div>
            <div className="text-sm text-blue-600 mt-1">کل ویژگی‌ها</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-700">{attributeStats.required}</div>
            <div className="text-sm text-emerald-600 mt-1">الزامی</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-700">{attributeStats.visible}</div>
            <div className="text-sm text-purple-600 mt-1">قابل نمایش</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-amber-700">{Object.keys(attributeStats.byType).length}</div>
            <div className="text-sm text-amber-600 mt-1">انواع مختلف</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو در ویژگی‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
          >
            <option value="all">همه انواع</option>
            <option value="text">متنی</option>
            <option value="number">عددی</option>
            <option value="select">انتخابی</option>
            <option value="boolean">صحیح/غلط</option>
            <option value="color">رنگ</option>
            <option value="date">تاریخ</option>
          </select>

          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🏠
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋
              </button>
            </div>
            <div className="flex-1 text-sm text-gray-500 text-left">
              {filteredAttributes.length} ویژگی یافت شد
            </div>
          </div>
        </div>
      </div>

      {/* Attributes Grid/List */}
      {filteredAttributes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Settings className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">ویژگی‌ای یافت نشد</h3>
          <p className="text-gray-500 mb-6">با ایجاد ویژگی‌های سفارشی، اطلاعات محصولات را غنی‌تر کنید.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            ایجاد اولین ویژگی
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAttributes.map((attribute) => (
            <div
              key={attribute.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${getAttributeTypeColor(attribute.type)}`}>
                      {getAttributeTypeIcon(attribute.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {attribute.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {getAttributeTypeLabel(attribute.type)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleVisibility(attribute.id, !attribute.isVisible)}
                      className={`p-2 rounded-lg transition-all ${
                        attribute.isVisible 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {attribute.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                {attribute.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {attribute.description}
                  </p>
                )}

                {attribute.values && attribute.type === 'select' && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {attribute.values.slice(0, 3).map((value, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                        >
                          {value}
                        </span>
                      ))}
                      {attribute.values.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs">
                          +{attribute.values.length - 3} بیشتر
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    {attribute.required && (
                      <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs font-medium">
                        الزامی
                      </span>
                    )}
                    {!attribute.isVisible && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                        مخفی
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(attribute)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105"
                      title="ویرایش"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDuplicate(attribute)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105"
                      title="تکثیر"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteAttribute(attribute.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 hover:scale-105"
                      title="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    ویژگی
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    نوع
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    وضعیت
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    تاریخ ایجاد
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAttributes.map((attribute) => (
                  <tr key={attribute.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAttributeTypeColor(attribute.type)}`}>
                          <span className="text-sm">{getAttributeTypeIcon(attribute.type)}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{attribute.name}</div>
                          {attribute.description && (
                            <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                              {attribute.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                        {getAttributeTypeIcon(attribute.type)}
                        {getAttributeTypeLabel(attribute.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {attribute.required && (
                          <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs font-medium">
                            الزامی
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          attribute.isVisible 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {attribute.isVisible ? 'قابل نمایش' : 'مخفی'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(attribute.createdAt).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleVisibility(attribute.id, !attribute.isVisible)}
                          className={`p-2 rounded-lg transition-all ${
                            attribute.isVisible 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {attribute.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => handleEdit(attribute)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteAttribute(attribute.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Attribute Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-xl font-bold text-gray-900">
                {editingAttribute ? 'ویرایش ویژگی' : 'ایجاد ویژگی جدید'}
              </h3>
              <button
                onClick={handleModalClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    نام ویژگی *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                    placeholder="مثلاً: رنگ، سایز، وزن"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    نوع ویژگی *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      type: e.target.value as ProductAttribute['type'],
                      values: e.target.value === 'select' ? prev.values : ''
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                  >
                    <option value="text">📝 متنی</option>
                    <option value="number">🔢 عددی</option>
                    <option value="select">📋 انتخابی</option>
                    <option value="boolean">✅ صحیح/غلط</option>
                    <option value="color">🎨 رنگ</option>
                    <option value="date">📅 تاریخ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  توضیحات
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 resize-none"
                  placeholder="توضیحات اختیاری درباره این ویژگی..."
                />
              </div>

              {formData.type === 'select' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    مقادیر ممکن (با کاما جدا کنید) *
                  </label>
                  <input
                    type="text"
                    required={formData.type === 'select'}
                    value={formData.values}
                    onChange={(e) => setFormData(prev => ({ ...prev, values: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                    placeholder="مثلاً: قرمز, آبی, سبز, بزرگ, متوسط, کوچک"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    مقادیر را با کاما (,) از هم جدا کنید
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    id="required"
                    checked={formData.required}
                    onChange={(e) => setFormData(prev => ({ ...prev, required: e.target.checked }))}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="required" className="block text-sm font-medium text-gray-700 cursor-pointer">
                      ویژگی الزامی
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      کاربر باید این فیلد را پر کند
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    id="isVisible"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="isVisible" className="block text-sm font-medium text-gray-700 cursor-pointer">
                      قابل نمایش
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      نمایش این ویژگی در صفحه محصول
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="flex-1 px-6 py-3.5 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25"
                >
                  {editingAttribute ? 'بروزرسانی ویژگی' : 'ایجاد ویژگی'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function getAttributeTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    text: 'متنی',
    number: 'عددی',
    select: 'انتخابی',
    boolean: 'صحیح/غلط',
    color: 'رنگ',
    date: 'تاریخ',
  };
  return labels[type] || type;
}