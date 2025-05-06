'use client';

import React, { useState } from 'react';
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

  // Chart data
  const lineChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'متوسط أداء أنواع الوقود',
        data: [65, 85, 70, 90, 65, 75, 80, 70, 90, 85, 75, 80],
        fill: true,
        backgroundColor: 'rgba(13, 116, 144, 0.1)',
        borderColor: '#0D7490',
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#0D7490',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 50,
        max: 100,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Performance data for circular progress
  const performanceData = [
    { name: 'عادي', percentage: 75, color: '#0D7490' },
    { name: 'نقي', percentage: 57, color: '#F97316' },
    { name: 'محسن', percentage: 24, color: '#10B981' },
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
    { title: 'عدد الإنذارات', value: '42', icon: <FiBell className="text-primary" size={24} /> },
    { title: 'زمن الاستجابة للمشكلة', value: '6 أيام', icon: <FiAlertCircle className="text-primary" size={24} /> },
    { title: 'معدل الضخ المتوسط', value: '3L/ساعة', icon: <FiBarChart2 className="text-primary" size={24} /> },
    { title: 'كفاءة الوقود', value: '67%', icon: <FiBarChart2 className="text-primary" size={24} /> },
  ];

  // Function to render circular progress
  const renderCircularProgress = (percentage: number, color: string, size = 120) => {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const dash = (percentage * circumference) / 100;
    
    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  // Calendar tile content
  const tileContent = ({ date, view }: any) => {
    if (view === 'month' && date.getDate() === 5) {
      return (
        <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto">
          {date.getDate()}
        </div>
      );
    }
    return null;
  };

  // Handle calendar date change with proper typing
  const handleDateChange = (value: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 rtl" dir="rtl">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث..."
                className="bg-gray-100 rounded-lg pl-10 pr-10 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>
            <button 
              className="p-2 rounded-full bg-gray-100"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button className="p-2 rounded-full bg-gray-100">
              <FiBell size={18} />
            </button>
          </div>

          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800 ml-4">لوحة المعلومات</h1>
            <div className="w-10 h-10">
              <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M120 30C85 30 55 60 50 95C55 130 85 160 120 160C155 160 185 130 190 95C185 60 155 30 120 30Z" stroke="#0D7490" strokeWidth="3" fill="none"/>
                <path d="M120 60C100 60 85 75 85 95C85 115 100 130 120 130C140 130 155 115 155 95C155 75 140 60 120 60Z" stroke="#0D7490" strokeWidth="3" fill="none"/>
                <path d="M120 80C112 80 105 87 105 95C105 103 112 110 120 110C128 110 135 103 135 95C135 87 128 80 120 80Z" fill="#0D7490"/>
                <path d="M120 85L120 105M115 90L125 100M125 90L115 100M112 95L128 95" stroke="white" strokeWidth="1"/>
              </svg>
            </div>
            <span className="text-primary text-xl font-bold">بصير</span>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="flex">
          {/* Main dashboard area */}
          <div className="flex-1 p-6">
            {/* Stats cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                  <div className="flex justify-between w-full mb-2">
                    <h3 className="text-sm text-gray-500">{stat.title}</h3>
                    <div>{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold mt-2">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Performance chart - spans 2 columns */}
              <div className="col-span-2 bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">متابعة جودة الأداء</h2>
                  <div className="flex items-center text-sm text-green-600">
                    <span>تحسن 30%</span>
                  </div>
                </div>
                <div className="h-64">
                  <Line data={lineChartData} options={chartOptions} />
                </div>
                <div className="text-center mt-4 text-sm text-gray-500">
                  <p>متوسط أداء أنواع الوقود</p>
                </div>
              </div>

              {/* Performance indicators */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">أداء الأنواع</h2>
                <div className="space-y-6">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-20 h-20 relative">
                        {renderCircularProgress(item.percentage, item.color, 80)}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold">{item.percentage}%</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                          <span className="font-medium">{item.name}</span>
                        </div>
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
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">2025 مايو</h2>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                      <FiChevronRight size={16} />
                    </button>
                    <button className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                      <FiChevronLeft size={16} />
                    </button>
                  </div>
                </div>
                <div className="calendar-container">
                  <Calendar
                    value={date}
                    onChange={handleDateChange}
                    tileContent={tileContent}
                    locale="ar-SA"
                    next2Label={null}
                    prev2Label={null}
                    nextLabel={null}
                    prevLabel={null}
                    showNeighboringMonth={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 p-4">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">تصفية</h2>
                <FiSettings size={18} className="text-gray-500" />
              </div>
              
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-sm font-medium mb-3">جدولة الصيانة</h3>
                  <button className="flex items-center justify-between w-full bg-gray-100 rounded-lg p-3 hover:bg-gray-200">
                    <span>عرض الجدول</span>
                    <FiCalendar size={18} />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">التقارير</h3>
                  <button className="flex items-center justify-between w-full bg-gray-100 rounded-lg p-3 hover:bg-gray-200">
                    <span>عرض التقارير</span>
                    <FiBarChart2 size={18} />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">المساعد الشخصي</h3>
                  <button className="flex items-center justify-between w-full bg-gray-100 rounded-lg p-3 hover:bg-gray-200">
                    <span>فتح المساعد</span>
                    <FiUser size={18} />
                  </button>
                </div>
              </div>
              
              <div className="mt-auto">
                <button className="flex items-center justify-between w-full bg-gray-100 rounded-lg p-3 hover:bg-gray-200">
                  <span>المزيد</span>
                  <FiChevronLeft size={18} />
                </button>
                
                <button className="flex items-center justify-between w-full bg-gray-100 rounded-lg p-3 mt-4 hover:bg-gray-200">
                  <span>تسجيل الخروج</span>
                  <FiChevronLeft size={18} />
                </button>
                
                <div className="flex items-center mt-6 border-t pt-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full" />
                  <div className="mr-3">
                    <p className="font-medium">محمد أحمد</p>
                    <p className="text-xs text-gray-500">مهندس تشغيل</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
