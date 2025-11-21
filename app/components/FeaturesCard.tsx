"use client"
import React from "react";
import { Plus, Trash2 } from "lucide-react";

/**
 * FeaturesCard Component
 * نمایش لیست ویژگی‌ها با قابلیت حذف و افزودن
 *
 * Props:
 * - features: آرایه‌ای از ویژگی‌ها [{ id, name, icon, status }]
 * - colorPalette: پالت رنگ شامل:
 *    { background, border, textPrimary, textSecondary }
 * - onAddFeature: تابع افزودن ویژگی جدید
 * - onDeleteFeature: تابع حذف ویژگی (id را می‌گیرد)
 */

const FeaturesCard = ({ features = [], colorPalette, onAddFeature, onDeleteFeature }:any) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border overflow-hidden"
      style={{ borderColor: colorPalette.border }}
    >
      {/* Header */}
      <div
        className="p-6 border-b"
        style={{ borderColor: colorPalette.border }}
      >
        <h2
          className="text-xl font-semibold"
          style={{ color: colorPalette.textPrimary }}
        >
          ویژگی‌ها
        </h2>
      </div>

      {/* Features List */}
      <div className="p-6">
        <div className="space-y-3">
          {features.map((feature:any) => (
            <div
              key={feature.id}
              className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm"
              style={{
                backgroundColor: colorPalette.background,
                borderColor: colorPalette.border,
              }}
            >
              <span className="text-lg">{feature.icon}</span>
              <span
                className="flex-1"
                style={{ color: colorPalette.textPrimary }}
              >
                {feature.name}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    feature.status ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <button
                  onClick={() => onDeleteFeature?.(feature.id)}
                  className="transition-colors hover:text-red-500"
                  style={{ color: colorPalette.textSecondary }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={onAddFeature}
          className="w-full mt-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium border"
          style={{
            backgroundColor: colorPalette.background,
            borderColor: colorPalette.border,
            color: colorPalette.textSecondary,
          }}
        >
          <Plus size={18} />
          افزودن ویژگی جدید
        </button>
      </div>
    </div>
  );
};

export default FeaturesCard;
