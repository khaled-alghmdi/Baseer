import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PerformanceChartProps {
  title?: string;
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ title = 'اداء الانواع', data }) => {
  // Prepare data for Chart.js
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderWidth: 0,
        cutout: '80%',
        circumference: 360,
        borderRadius: 20,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: 270, // Start from top
  };

  return (
    <div className="flex flex-col items-end w-full">
      <h3 className="text-xl font-bold mb-6 text-right text-gray-700" dir="rtl">{title}</h3>
      <div className="flex w-full">
        <div className="relative w-[160px] h-[160px]">
          <Doughnut data={chartData} options={options} />
          
          {/* Center content - white circle with light gray background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] bg-gray-50 rounded-full flex items-center justify-center">
              <div className="w-[95%] h-[95%] bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex-1 flex flex-col justify-center space-y-5 pr-8" dir="rtl">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-end gap-3">
              <span className="text-sm font-medium text-gray-600">{item.value}%</span>
              <span className="text-sm font-medium text-gray-700 ml-2">{item.label}</span>
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
