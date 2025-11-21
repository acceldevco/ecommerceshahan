"use client";

import Image from "next/image";

const Card = ({id,title,description,date,author,category,image}:any) => {
  return (
    <div className="">
      <div className="w-80 bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white">
        {/* تصویر */}
        <div className="relative h-48 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="منظره کوهستان"
         
            className="object-cover"
          />
        </div>

        {/* متن اصلی */}
        <div className="p-6">
          <div className="text-right mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">درود بر تو</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              امیدوارم این کارت پستال در سلامتی کامل به دستت برسد. آرزو می‌کنم
              همیشه شاد و موفق باشی و زندگی پر از خوشبختی داشته باشی.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
