'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, FiSettings, FiUser, FiBarChart2, 
  FiAlertCircle, FiBell, FiSearch, FiMoon, FiSun, FiChevronRight, FiChevronLeft
} from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Logo from '@/components/Logo';
import PerformanceChart from '@/components/PerformanceChart';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

export default function ReportsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration issue by only rendering charts on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Chart data for line chart
  const lineChartData = {
    labels: ['1 May', '5 May', '10 May', '15 May', '20 May', '25 May', '30 May'],
    datasets: [
      {
        label: 'عدد الإنذارات',
        data: [35, 32, 28, 38, 30, 32, 38],
        fill: false,
        borderColor: '#0D7490',
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#0D7490',
      },
      {
        label: 'المعدل',
        data: [30, 25, 20, 25, 27, 28, 30],
        fill: false,
        borderColor: '#38BDF8',
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#38BDF8',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 15,
        max: 45,
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

  // Doughnut chart data
  const doughnutData = {
    labels: ['متابعة', 'تسريب خفيف', 'تسريب حاد'],
    datasets: [
      {
        data: [54, 28, 30],
        backgroundColor: [
          '#0D7490',
          '#F97316',
          '#38BDF8',
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Stats data
  const statsData = [
    { title: 'إجمالي الاستهلاك', value: '126L', icon: <FiBarChart2 className="text-primary" size={24} /> },
    { title: 'التقرير المالي', value: '198,000 ريال', icon: <FiBarChart2 className="text-primary" size={24} /> },
    { title: 'الوقود المخزن حاليا', value: '920KWH', icon: <FiBarChart2 className="text-primary" size={24} /> },
  ];

  // Performance data for the new chart
  const performanceData = [
    { label: 'مكيف', value: 72, color: '#0A6E8A' }, // Dark teal color for مكيف
    { label: 'ثلاجة', value: 57, color: '#FF7043' }, // Orange color for ثلاجة
    { label: 'مجمد', value: 24, color: '#4AD295' }, // Green color for مجمد
  ];

  // Table data for member performance
  const memberPerformanceData = [
    { id: 4, name: 'الوحدة 4', status: 'سليم', lastMaintenance: '5 دقائق', activity: 'Activity Feed', condition: 4 },
    { id: 5, name: 'الوحدة 5', status: 'سليم', lastMaintenance: '10 دقائق', activity: 'Activity Feed', condition: 5 },
    { id: 6, name: 'الوحدة 6', status: 'خارج الخدمة', lastMaintenance: '4 دقائق', activity: 'Activity Feed', condition: 6 },
    { id: 4, name: 'الوحدة 4', status: 'معطل مؤقتا', lastMaintenance: '5 دقائق', activity: 'Activity Feed', condition: 4 },
    { id: 5, name: 'الوحدة 5', status: 'سليم', lastMaintenance: '6 دقائق', activity: 'Activity Feed', condition: 5 },
    { id: 6, name: 'الوحدة 6', status: 'خارج الخدمة', lastMaintenance: '4 دقائق', activity: 'Activity Feed', condition: 6 },
  ];

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'سليم':
        return 'text-green-500';
      case 'خارج الخدمة':
        return 'text-red-500';
      case 'معطل مؤقتا':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
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
            <h1 className="text-xl font-bold text-gray-800 ml-4">التقارير</h1>
            <Logo size="small" />
          </div>
        </header>

        {/* Dashboard content */}
        <div className="flex">
          {/* Main dashboard area */}
          <div className="flex-1 p-6">
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                  <div className="flex justify-between w-full mb-2">
                    <h3 className="text-sm text-gray-500">{stat.title}</h3>
                    <div>{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold mt-2 text-primary">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Performance Chart */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div></div> {/* Empty div for spacing */}
                </div>
                {isClient && <PerformanceChart data={performanceData} />}
              </div>

              {/* Doughnut chart */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">حالة الأنابيب</h2>
                </div>
                <div className="h-64 relative">
                  {isClient && <Doughnut data={doughnutData} options={doughnutOptions} />}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">112</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">متابعة (54%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-sm">تسريب خفيف (28%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-sky-400 mr-2"></div>
                    <span className="text-sm">تسريب حاد (30%)</span>
                  </div>
                </div>
              </div>

              {/* Line chart - spans 2 columns */}
              <div className="col-span-2 bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">عدد الإنذارات</h2>
                  <div className="flex items-center text-sm text-green-600">
                    <span>+13% من الشهر الماضي</span>
                  </div>
                </div>
                <div className="h-64">
                  {isClient && <Line data={lineChartData} options={chartOptions} />}
                </div>
                <div className="flex justify-center mt-4 space-x-4 space-x-reverse">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">38</span>
                  </div>
                </div>
              </div>

              {/* Member performance table - spans full width */}
              <div className="col-span-3 bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">أداء عضو</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الوحدة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المنتج
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          حالة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          آخر تحديث
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          النشاط
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {memberPerformanceData.map((member, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {member.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.name}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusColor(member.status)}`}>
                            {member.status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.lastMaintenance}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                            {member.activity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.condition}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 p-4">
            <div className="flex flex-col h-full">
              <div className="flex flex-col items-center mb-8">
                <Logo size="medium" />
              </div>
              
              <div className="space-y-4 flex-1">
                <a href="/dashboard" className="flex items-center justify-between w-full p-3 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="text-gray-700">لوحة المعلومات</span>
                  <div className="bg-primary bg-opacity-10 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                </a>
                
                <a href="/reports" className="flex items-center justify-between w-full p-3 bg-primary bg-opacity-5 rounded-lg transition-colors">
                  <span className="text-primary font-medium">التقارير</span>
                  <div className="bg-primary bg-opacity-10 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                </a>
                
                <a href="#" className="flex items-center justify-between w-full p-3 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="text-gray-700">جدولة الصيانة</span>
                  <div className="bg-primary bg-opacity-10 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                </a>
                
                <a href="#" className="flex items-center justify-between w-full p-3 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="text-gray-700">المساعد الشخصي</span>
                  <div className="bg-primary bg-opacity-10 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </a>
              </div>
              
              <div className="mt-auto">
                <a href="#" className="flex items-center justify-between w-full p-3 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="text-gray-700">المزيد</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </a>
                
                <a href="#" className="flex items-center justify-between w-full p-3 mt-4 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="text-gray-700">تسجيل الخروج</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </a>
                
                <div className="flex items-center mt-6 border-t pt-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full" />
                  <div className="mr-3">
                    <p className="font-medium">إبراهيم أحمد</p>
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
