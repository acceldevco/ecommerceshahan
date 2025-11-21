"use client"
import { useState } from 'react';
// import { Product, ProductAttribute } from '@/types/product';
import { Plus, Upload, X } from 'lucide-react';

// interface ProductFormProps {
//   attributes: ProductAttribute[];
//   onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
//   onCancel: () => void;
//   initialData?: Product;
// }

export const ProductForm: React.FC<any> = ({
  attributes,
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || '',
    sku: initialData?.sku || '',
    stock: initialData?.stock || 0,
    status: initialData?.status || 'draft',
    images: initialData?.images || [],
  });

  const [attributeValues, setAttributeValues] = useState<Record<string, any>>(
    initialData?.attributes || {}
  );

  const [newImage, setNewImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData: Omit<any, 'id' | 'createdAt' | 'updatedAt'> = {
      ...formData,
      attributes: attributeValues,
    };

    onSubmit(productData);
  };

  const addImage = () => {
    if (newImage && !formData.images.includes(newImage)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_:any, i:any) => i !== index)
    }));
  };

  const renderAttributeInput = (attribute: any) => {
    const value = attributeValues[attribute.name] || '';

    switch (attribute.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setAttributeValues(prev => ({
              ...prev,
              [attribute.name]: e.target.value
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={attribute.required}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => setAttributeValues(prev => ({
              ...prev,
              [attribute.name]: parseFloat(e.target.value) || 0
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={attribute.required}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setAttributeValues(prev => ({
              ...prev,
              [attribute.name]: e.target.value
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={attribute.required}
          >
            <option value="">انتخاب کنید</option>
            {attribute.values?.map((val:any) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        );
      
      case 'boolean':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => setAttributeValues(prev => ({
                ...prev,
                [attribute.name]: e.target.checked
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="mr-2 text-sm text-gray-700">بله</span>
          </label>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'ویرایش محصول' : 'افزودن محصول جدید'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام محصول *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="نام محصول"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته‌بندی
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="دسته‌بندی محصول"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                قیمت (تومان) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                موجودی *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                کد SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="کد محصول"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وضعیت
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">پیش‌نویس</option>
                <option value="active">فعال</option>
                <option value="inactive">غیرفعال</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="توضیحات محصول"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تصاویر محصول
            </label>
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="آدرس URL تصویر"
              />
              <button
                type="button"
                onClick={addImage}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Upload size={18} />
                افزودن
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formData.images.map((image:any, index:any) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 left-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Attributes */}
          {attributes.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">ویژگی‌های محصول</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attributes.map((attribute:any) => (
                  <div key={attribute.id} className="border rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {attribute.name}
                      {attribute.required && <span className="text-red-500 mr-1">*</span>}
                    </label>
                    {renderAttributeInput(attribute)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? 'بروزرسانی محصول' : 'ایجاد محصول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};