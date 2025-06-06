import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',"July","Aug","Sept","Oct","Nov","Dec"],
    datasets: [
      {
        label: 'Crop Yield (tons)',
        data: [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });


  const [inputValues, setInputValues] = useState({
    jan: '',
    feb: '',
    mar: '',
    apr: '',
    may: '',
    jun: '',
    july:'',
    aug:'',
    sept:'',
    oct:'',
    nov:'',
    dec:'',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = [
      parseInt(inputValues.jan) || 0,
      parseInt(inputValues.feb) || 0,
      parseInt(inputValues.mar) || 0,
      parseInt(inputValues.apr) || 0,
      parseInt(inputValues.may) || 0,
      parseInt(inputValues.jun) || 0,
      parseInt(inputValues.july) || 0,
      parseInt(inputValues.aug) || 0,
      parseInt(inputValues.sept) || 0,
      parseInt(inputValues.oct) || 0,
      parseInt(inputValues.nov) || 0,
      parseInt(inputValues.dec) || 0,
    ];
    
    setChartData(prev => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: newData
        }
      ]
    }));
  };


  const totalYield = chartData.datasets[0].data.reduce((sum, value) => sum + value, 0);
  const averageYield = Math.round(totalYield / chartData.datasets[0].data.length);
  const growthRate = ((chartData.datasets[0].data[chartData.datasets[0].data.length - 1] - 
                      chartData.datasets[0].data[0]) / chartData.datasets[0].data[0] * 100).toFixed(1);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Crop Yield Trends',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Farm Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Yield Analysis</h2>
          <div className="h-[400px] mb-6">
            <Line options={options} data={chartData} />
          </div>
          
          {/* Data input form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Enter Yield Data (tons)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="jan" className="block text-sm font-medium text-gray-700 mb-1">January</label>
                <input
                  type="number"
                  id="jan"
                  name="jan"
                  value={inputValues.jan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="feb" className="block text-sm font-medium text-gray-700 mb-1">February</label>
                <input
                  type="number"
                  id="feb"
                  name="feb"
                  value={inputValues.feb}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="mar" className="block text-sm font-medium text-gray-700 mb-1">March</label>
                <input
                  type="number"
                  id="mar"
                  name="mar"
                  value={inputValues.mar}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="apr" className="block text-sm font-medium text-gray-700 mb-1">April</label>
                <input
                  type="number"
                  id="apr"
                  name="apr"
                  value={inputValues.apr}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="may" className="block text-sm font-medium text-gray-700 mb-1">May</label>
                <input
                  type="number"
                  id="may"
                  name="may"
                  value={inputValues.may}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="jun" className="block text-sm font-medium text-gray-700 mb-1">June</label>
                <input
                  type="number"
                  id="jun"
                  name="jun"
                  value={inputValues.jun}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="july" className="block text-sm font-medium text-gray-700 mb-1">July</label>
                <input
                  type="number"
                  id="july"
                  name="july"
                  value={inputValues.july}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="aug" className="block text-sm font-medium text-gray-700 mb-1">August</label>
                <input
                  type="number"
                  id="aug"
                  name="aug"
                  value={inputValues.aug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="sept" className="block text-sm font-medium text-gray-700 mb-1">September</label>
                <input
                  type="number"
                  id="sept"
                  name="sept"
                  value={inputValues.sept}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="oct" className="block text-sm font-medium text-gray-700 mb-1">October</label>
                <input
                  type="number"
                  id="oct"
                  name="oct"
                  value={inputValues.oct}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="nov" className="block text-sm font-medium text-gray-700 mb-1">November</label>
                <input
                  type="number"
                  id="nov"
                  name="nov"
                  value={inputValues.nov}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="dec" className="block text-sm font-medium text-gray-700 mb-1">December</label>
                <input
                  type="number"
                  id="dec"
                  name="dec"
                  value={inputValues.dec}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Chart
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Summary</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Total Yield</h3>
              <p className="text-3xl font-bold text-green-600">{totalYield} tons</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Average Monthly Yield</h3>
              <p className="text-3xl font-bold text-blue-600">{averageYield} tons</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800">Growth Rate</h3>
              <p className="text-3xl font-bold text-purple-600">{growthRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;