"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyRevenueData {
  months: string[];
  revenues: number[];
}

export default function MonthlyRevenueChart() {
  const [chartData, setChartData] = useState<MonthlyRevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isClient, setIsClient] = useState(false);

  const fetchRevenueData = async (year: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/chart?year=${year}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchRevenueData(selectedYear);
  }, [selectedYear]);

  const years = [2023, 2024, 2025];

  // تنظیمات ریسپانسیو برای Chart.js
  const getChartOptions = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            font: {
              size: isMobile ? 12 : isTablet ? 14 : 16,
            },
          },
        },
        title: {
          display: true,
          text: `درآمد ماهانه ${selectedYear}`,
          font: {
            size: isMobile ? 14 : isTablet ? 16 : 18,
          },
        },
        tooltip: {
          titleFont: {
            size: isMobile ? 12 : 14,
          },
          bodyFont: {
            size: isMobile ? 12 : 14,
          },
          padding: isMobile ? 8 : 12,
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: isMobile ? 10 : isTablet ? 12 : 14,
            },
            maxRotation: isMobile ? 45 : 0,
            minRotation: isMobile ? 45 : 0,
          },
          grid: {
            display: !isMobile,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: isMobile ? 10 : isTablet ? 12 : 14,
            },
            callback: function (value: any) {
              // برای موبایل فرمت کوتاه‌تر
              if (isMobile && value >= 1000000) {
                return (value / 1000000).toFixed(1) + "M";
              }
              if (isMobile && value >= 1000) {
                return (value / 1000).toFixed(0) + "K";
              }
              return (
                new Intl.NumberFormat("fa-IR").format(value) +
                (isMobile ? "" : " تومان")
              );
            },
          },
          grid: {
            display: !isMobile,
          },
        },
      },
      layout: {
        padding: {
          left: isMobile ? 5 : 10,
          right: isMobile ? 5 : 10,
          top: isMobile ? 5 : 10,
          bottom: isMobile ? 5 : 10,
        },
      },
    };
  };

  const data = {
    labels: chartData?.months || [],
    datasets: [
      {
        label: "درآمد",
        data: chartData?.revenues || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: isClient && window.innerWidth < 768 ? 0.6 : 0.8,
        categoryPercentage: isClient && window.innerWidth < 768 ? 0.8 : 0.9,
      },
    ],
  };

  return (
    <div>
      <label
        htmlFor="year-select"
        className="block text-sm sm:text-base lg:text-lg font-medium text-gray-700 mb-2 sm:mb-3"
      >
        انتخاب سال:
      </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      {/* <div>da</div> */}
      {loading ? (
        <div>
          درحال بارگیری...
        </div>
      ) : (
        <div><Bar height={500} options={getChartOptions()} data={data} /></div>
      )}
    </div>
  );
  // برای جلوگیری از hydration mismatch

  //   if (!isClient) {
  //     return (
  //       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
  //         <div className="animate-pulse">
  //           <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
  //           <div className="h-64 sm:h-80 bg-gray-200 rounded"></div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-7xl mx-auto">
  //       {/* هدر ریسپانسیو */}
  //       <div className="mb-4 sm:mb-6 lg:mb-8">
  //         <label
  //           htmlFor="year-select"
  //           className="block text-sm sm:text-base lg:text-lg font-medium text-gray-700 mb-2 sm:mb-3"
  //         >
  //           انتخاب سال:
  //         </label>
  //         <select
  //           id="year-select"
  //           value={selectedYear}
  //           onChange={(e) => setSelectedYear(Number(e.target.value))}
  //           className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //         >
  //           {years.map((year) => (
  //             <option key={year} value={year}>
  //               {year}
  //             </option>
  //           ))}
  //         </select>
  //       </div>

  //       {/* حالت لودینگ */}
  //       {loading ? (
  //         <div className="flex justify-center items-center py-8 sm:py-12 lg:py-16">
  //           <div className="text-center">
  //             <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
  //             <p className="text-sm sm:text-base lg:text-lg text-gray-600">در حال بارگذاری...</p>
  //           </div>
  //         </div>
  //       ) : (
  //         // کانتینر نمودار با سایزهای ریسپانسیو
  //         <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] 2xl:h-[600px]">

  //         </div>
  //       )}

  //       {/* راهنمای ریسپانسیو برای موبایل */}
  //       <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 text-center lg:hidden">
  //         <p>برای مشاهده جزئیات بیشتر، نمودار را به طرفین بکشید</p>
  //       </div>
  //     </div>
  //   );
}
