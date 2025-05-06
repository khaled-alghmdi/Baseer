'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, FiSettings, FiUser, FiBarChart2, 
  FiAlertCircle, FiBell, FiSearch, FiMoon, FiSun, FiChevronRight, FiChevronLeft
} from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import '../../styles/calendar.css';
import Logo from '@/components/Logo';
import Link from 'next/link';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage() {
  const [date, setDate] = useState(new Date(2025, 4, 5)); // May 5, 2025
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fix hydration issue by only rendering calendar on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Chart data
  const lineChartData = {
    labels: ['ديس', 'نوف', 'أكت', 'سبت', 'أغس', 'يول', 'يون', 'ماي', 'أبر', 'مار', 'فبر', 'ينا'],
    datasets: [
      {
        label: 'متوسط أداء أجهزة التبريد',
        data: [60, 40, 85, 50, 95, 60, 35, 75, 50, 90, 65, 80],
        fill: true,
        backgroundColor: 'rgba(13, 116, 144, 0.1)',
        borderColor: '#0D7490',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: '#0D7490',
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointBorderColor: '#0D7490',
        pointHoverBorderColor: '#fff',
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 10,
          },
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          stepSize: 20,
          color: '#9CA3AF',
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  // Performance data for circular progress
  const performanceData = [
    { name: 'مكيف', percentage: 72, color: '#0D7490' },
    { name: 'ثلاجة', percentage: 57, color: '#F97316' },
    { name: 'مجمد', percentage: 24, color: '#10B981' },
  ];

  // Alerts data
  const alerts = [
    { id: 1, title: 'انخفاض غير طبيعي في ضغط الوقود', unit: 'الوحدة 1' },
    { id: 2, title: 'ارتفاع التكثيف عن الحد المسموح', unit: 'الوحدة 2' },
    { id: 3, title: 'فقدان نسبة المبرد يتجاوز 10%', unit: 'الوحدة 1' },
    { id: 4, title: 'موعد الصيانة قريب', unit: 'الوحدة 4' },
    { id: 5, title: 'استبدال الفلتر بعد المعايرة', unit: 'الوحدة 4' },
  ];

  // Stats data
  const statsData = [
    { title: 'عدد الإنذارات', value: '42', icon: <div className="h-6 w-1 bg-primary rounded-sm relative before:absolute before:h-4 before:w-1 before:bg-primary before:rounded-sm before:top-1 before:right-2 before:opacity-70 before:content-['']"></div> },
    { title: 'زمن الاستجابة للتحذير', value: '6 أيام', icon: <div className="h-6 w-1 bg-primary rounded-sm relative before:absolute before:h-4 before:w-1 before:bg-primary before:rounded-sm before:top-1 before:right-2 before:opacity-70 before:content-['']"></div> },
    { title: 'معدل التسرب المكتشف', value: '3L/ساعة', icon: <div className="h-6 w-1 bg-primary rounded-sm relative before:absolute before:h-4 before:w-1 before:bg-primary before:rounded-sm before:top-1 before:right-2 before:opacity-70 before:content-['']"></div> },
    { title: 'كفاءة التبريد', value: '67%', icon: <div className="h-6 w-1 bg-primary rounded-sm relative before:absolute before:h-4 before:w-1 before:bg-primary before:rounded-sm before:top-1 before:right-2 before:opacity-70 before:content-['']"></div> },
  ];

  // Function to render circular progress
  const renderCircularProgress = (percentage: number, color: string) => {
    // Calculate the start and end angles for the arc
    const radius = 40;
    const endAngle = (percentage / 100) * 360;
    
    return (
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Progress arc only - no background circle */}
          <path
            d={describeArc(60, 60, radius, -90, endAngle - 90)}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  };
  
  // Helper function to create an arc path
  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  }

  // Calendar tile content
  const tileContent = ({ date, view }: any) => {
    if (view === 'month') {
      const day = date.getDate();
      
      // Add special indicators for specific dates
      if (day === 5) {
        return <div className="custom-calendar-tile-content">ا</div>;
      } else if (day === 15) {
        return <div className="custom-calendar-tile-content">و</div>;
      } else if (day === 25) {
        return <div className="custom-calendar-tile-content">ر</div>;
      }
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 rtl" dir="rtl">
      {/* Right sidebar - full version */}
      <div className={`${sidebarCollapsed ? 'hidden' : 'w-64'} bg-white border-l border-gray-200 p-4 transition-all duration-300`}>
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center mb-8 relative">
            <Logo size="medium" />
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute -left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            >
              <FiChevronLeft size={16} className="text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            <Link href="/dashboard" className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg bg-blue-50 text-primary">
              <FiBarChart2 size={20} />
              <span>لوحة المعلومات</span>
            </Link>
            <Link href="/reports" className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-100">
              <FiBarChart2 size={20} />
              <span>التقارير</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-100">
              <FiCalendar size={20} />
              <span>الجدول الزمني</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-100">
              <FiUser size={20} />
              <span>المستخدمين</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-100">
              <FiSettings size={20} />
              <span>الإعدادات</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mini sidebar - collapsed version */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'hidden'} bg-white border-l border-gray-200 py-4 transition-all duration-300`}>
        <div className="flex flex-col h-full items-center">
          <div className="mb-8 relative">
            <Logo size="small" showText={false} />
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute -left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            >
              <FiChevronRight size={16} className="text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-6 flex-1 flex flex-col items-center">
            <Link href="/dashboard" className="p-2 rounded-lg bg-blue-50 text-primary">
              <FiBarChart2 size={20} />
            </Link>
            <Link href="/reports" className="p-2 rounded-lg hover:bg-gray-100">
              <FiBarChart2 size={20} />
            </Link>
            <Link href="#" className="p-2 rounded-lg hover:bg-gray-100">
              <FiCalendar size={20} />
            </Link>
            <Link href="#" className="p-2 rounded-lg hover:bg-gray-100">
              <FiUser size={20} />
            </Link>
            <Link href="#" className="p-2 rounded-lg hover:bg-gray-100">
              <FiSettings size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800 ml-4">لوحة المعلومات</h1>
            <Logo size="small" />
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="بحث..."
                className="bg-gray-100 rounded-lg pl-4 pr-10 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiBell size={20} className="text-gray-600" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <FiSun size={20} className="text-gray-600" />
              ) : (
                <FiMoon size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="flex">
          {/* Main dashboard area */}
          <div className="flex-1 p-6">
            {/* Stats cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4 transition-all hover:shadow-md">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm text-gray-500 font-medium">{stat.title}</h3>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-indigo-900">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Performance chart - spans 2 columns */}
              <div className="bg-white rounded-xl shadow-sm p-6 col-span-2 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">متابعة جودة الأداء</h2>
                  <div className="flex flex-col items-center bg-blue-50 px-3 py-1 rounded-lg">
                    <span className="text-gray-500 text-xs">تحسن</span>
                    <span className="text-primary font-bold">30%</span>
                  </div>
                </div>
                <div className="h-64">
                  {isClient && (
                    <Line data={lineChartData} options={chartOptions} />
                  )}
                </div>
                <div className="text-center mt-6 text-sm text-gray-500 bg-gray-50 py-2 rounded-lg">
                  <p>متوسط أداء أجهزة التبريد</p>
                </div>
              </div>

              {/* Performance indicators */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-8 text-right">أداء الأنواع</h2>
                <div className="flex flex-col items-center space-y-24">
                  {performanceData.map((item, index) => (
                    <div key={index} className="w-full flex flex-col items-center">
                      <div className="relative">
                        {renderCircularProgress(item.percentage, item.color)}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-lg font-bold text-gray-800">{item.percentage}%</div>
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <span className="text-sm font-medium bg-gray-50 px-5 py-1 rounded-md">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts - spans 2 columns */}
              <div className="col-span-2 bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">التنبيهات</h2>
                  <span className="text-sm text-gray-500">2025 مايو</span>
                </div>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-center border-r-4 border-orange-500 bg-orange-50 pr-4 p-3 rounded-md">
                      <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                        <span>{alert.id < 10 ? `0${alert.id}` : alert.id}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-gray-500">{alert.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">التقويم</h2>
                <div className="calendar-container">
                  {isClient && (
                    <Calendar
                      value={date}
                      onChange={(value) => {
                        if (value instanceof Date) {
                          setDate(value);
                        }
                      }}
                      tileContent={tileContent}
                      locale="ar-SA"
                      showNavigation={false}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
