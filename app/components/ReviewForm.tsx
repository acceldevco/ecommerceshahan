"use client"
import { MessageCircle, Send, Star } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface ReviewFormData {
  rating: number;
  comment: string;
  name: string;
}

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
  colorPalette: {
    primary: string;
    secondary: string;
    text: string;
    textLight?: string;
  };
  isSubmitting?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  colorPalette,
  isSubmitting = false
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      comment: "",
      name: "reza"
    },
    mode: "onChange"
  });

  const [hoverRating, setHoverRating] = useState(0);
  
  const currentRating = watch("rating");
  const currentComment = watch("comment");
  const currentName = watch("name");

  const handleStarClick = (rating: number) => {
    setValue("rating", rating, { shouldValidate: true });
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => {
      const ratingValue = index + 1;
      const isFilled = interactive 
        ? ratingValue <= (hoverRating || currentRating)
        : ratingValue <= rating;

      return (
        <button
          key={index}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => onStarClick?.(ratingValue) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(ratingValue) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          className={`transition-all duration-200 ${
            interactive 
              ? "transform hover:scale-110 cursor-pointer" 
              : "cursor-default"
          }`}
          disabled={!interactive}
        >
          <Star
            size={interactive ? 24 : 18}
            className={`${
              isFilled
                ? "fill-current"
                : "text-gray-300 dark:text-gray-600"
            } transition-colors duration-200`}
            style={{
              color: isFilled ? colorPalette.primary : undefined,
            }}
          />
        </button>
      );
    });
  };

  const isFormValid = currentRating > 0 && 
                     currentComment.trim().length > 0 && 
                     currentName.trim().length > 0;

  return (
    <div 
      className="bg-white dark:bg-gray-800 mb-5 rounded-2xl shadow-lg border p-6 transition-all duration-300 hover:shadow-xl"
      style={{ borderColor: `${colorPalette.primary}20` }}
    >
      <h3 
        className="text-xl font-bold mb-6 flex items-center gap-2"
        style={{ color: colorPalette.text }}
      >
        <MessageCircle size={24} style={{ color: colorPalette.primary }} />
        ثبت نظر جدید
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* فیلد نام */}
        <div>
          {/* <label 
            htmlFor="name"
            className="block text-sm font-medium mb-2"
            style={{ color: colorPalette.text }}
          >
            نام شما *
          </label> */}
          <input
            type="hidden"
            id="name"
            // {...register("name", {
            //   required: "نام الزامی است",
            //   minLength: {
            //     value: 2,
            //     message: "نام باید حداقل ۲ کاراکتر باشد"
            //   }
            // })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:outline-none transition-all duration-200"
            style={{
              backgroundColor: 'transparent',
              color: colorPalette.text,
              borderColor: errors.name ? '#ef4444' : undefined
            }}
            placeholder="نام خود را وارد کنید"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* بخش امتیازدهی */}
        <div>
          <label 
            className="block text-sm font-medium mb-3"
            style={{ color: colorPalette.text }}
          >
            امتیاز شما *
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {renderStars(currentRating, true, handleStarClick)}
            </div>
            <span 
              className="text-lg font-bold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${colorPalette.primary}15`,
                color: colorPalette.primary,
              }}
            >
              {currentRating > 0 ? `${currentRating}.0` : "۰.۰"}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        {/* فیلد نظر */}
        <div>
          <label 
            htmlFor="comment"
            className="block text-sm font-medium mb-2"
            style={{ color: colorPalette.text }}
          >
            نظر شما *
          </label>
          <textarea
            id="comment"
            {...register("comment", {
              required: "نظر الزامی است",
              minLength: {
                value: 10,
                message: "نظر باید حداقل ۱۰ کاراکتر باشد"
              },
              maxLength: {
                value: 500,
                message: "نظر نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"
              }
            })}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:outline-none transition-all duration-200 resize-none"
            style={{
              backgroundColor: 'transparent',
              color: colorPalette.text,
              borderColor: errors.comment ? '#ef4444' : undefined
            }}
            placeholder="نظر خود را در اینجا بنویسید..."
            disabled={isSubmitting}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
        </div>

        {/* دکمه ارسال */}
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary})`,
          }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              در حال ارسال...
            </>
          ) : (
            <>
              <Send size={18} />
              ارسال نظر
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;