import React, { useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2'; // Import Doughnut
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Content() {
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [65, 59, 80, 81, 56, 55, 40],
            },
        ],
    };

    const doughnutData = {
        labels: ['Direct', 'Referral', 'Social', 'Email'],
        datasets: [
            {
                label: 'Traffic Sources',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                data: [300, 50, 100, 150],
            },
        ],
    };

    // Sample monthly expenses data
    const monthlyExpenses = [
        { month: 'January', amount: 500 },
        { month: 'February', amount: 300 },
        { month: 'March', amount: 450 },
        { month: 'April', amount: 600 },
        { month: 'May', amount: 700 },
        { month: 'June', amount: 400 },
        { month: 'July', amount: 550 },
    ];

    useEffect(() => {
        // This effect will run once to register the chart components
        return () => {
            // Cleanup function to destroy the chart if needed
        };
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Financial Overview</h3>
                    <p className="text-gray-600">This is a summary of your financial performance.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Revenue Chart</h3>
                    <div className="h-64 md:h-80"> {/* Set a height for responsiveness */}
                        <Bar data={barData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Traffic Sources</h3>
                    <div className="h-64 md:h-80"> {/* Set a height for responsiveness */}
                        <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>

            {/* Monthly Expenses Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                <h3 className="text-lg font-semibold mb-2">Monthly Expenses</h3>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Month</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {monthlyExpenses.map((expense, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-600">{expense.month}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">${expense.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Content;