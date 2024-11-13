import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layouts';
import axios from 'axios';
import { FaUser, FaUsers } from 'react-icons/fa'; // Importing Font Awesome icons
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const DashboardPage = ({ onLogout, isLoggedIn }) => {
    const [students, setStudents] = useState([]);
    const [studentCount, setStudentCount] = useState(0);
    const [classCount, setClassCount] = useState(0);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState({});
    const [donutData, setDonutData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (isLoggedIn) {
            setSuccessMessage('Login Successful! Welcome back.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000); // Remove success message after 5 seconds
        }
        fetchStudentData();
    }, [isLoggedIn]);

    const fetchStudentData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:3001/api/students', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const studentData = response.data.students;
            setStudents(studentData);

            // Calculate the number of students
            setStudentCount(studentData.length);

            // Calculate the number of unique classes
            const uniqueClasses = new Set(studentData.map(student => student.class));
            setClassCount(uniqueClasses.size);

            // Prepare data for the charts
            const classCounts = studentData.reduce((acc, student) => {
                acc[student.class] = (acc[student.class] || 0) + 1;
                return acc;
            }, {});

            const classLabels = Object.keys(classCounts);
            const classData = Object.values(classCounts);

            setChartData({
                labels: classLabels,
                datasets: [
                    {
                        label: 'Number of Students per Class',
                        data: classData,
                        backgroundColor: classLabels.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`), // Random colors for each bar
                        borderColor: classLabels.map(() => '#fff'),
                        borderWidth: 1,
                    },
                ],
            });

            // Prepare data for the Donut chart
            setDonutData({
                labels: ['Total Students'],
                datasets: [
                    {
                        data: [studentData.length],
                        backgroundColor: [
                            'rgba(75, 0, 130, 0.8)',  // Indigo
                            'rgba(138, 43, 226, 0.8)', // Blue Violet
                            'rgba(0, 0, 255, 0.8)'     // Blue
                        ],
                        hoverBackgroundColor: [
                            'rgba(75, 0, 130, 1)',    // Indigo Hover
                            'rgba(138, 43, 226, 1)',  // Blue Violet Hover
                            'rgba(0, 0, 255, 1)'      // Blue Hover
                        ],
                    },
                ],
            });
            

        } catch (error) {
            console.error('Error fetching student data:', error);
            setError('Failed to fetch student data');
        }
    };

    return (
        <Layout onLogout={onLogout}>
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

                {/* Displaying success message if login is successful */}
                {successMessage && (
                    <div className="bg-green-500 text-white p-4 mb-6 rounded-lg shadow-md">
                        <p className="text-lg">{successMessage}</p>
                    </div>
                )}

                {/* Displaying error message if there was an issue fetching data */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <section className="stats-overview mb-6">
                    <h2 className="text-xl font-semibold">Mahasiswa Statistics</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Card for Total Students */}
                        <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
                            <FaUser className="text-3xl text-indigo-500" /> {/* User Icon */}
                            <div>
                                <h3 className="text-lg font-semibold">Total Mahasiswa</h3>
                                <p className="text-2xl">{studentCount}</p>
                            </div>
                        </div>

                        {/* Card for Total Classes */}
                        <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
                            <FaUsers className="text-3xl text-green-500" /> {/* Users Icon */}
                            <div>
                                <h3 className="text-lg font-semibold">Total Kelas</h3>
                                <p className="text-2xl">{classCount}</p>
                            </div>
                        </div>
                    </div>
                </section>

               {/* Chart Section */}
<section className="chart-section mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Donut Chart */}
    <div className="bg-white p-6 rounded-lg shadow-md h-[400px] overflow-hidden">
        <h2 className="text-xl font-semibold">Total Mahasiswa (Donut Chart)</h2>
        {donutData.datasets ? (
            <Doughnut
                data={donutData}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Number of Mahasiswa',
                        },
                    },
                    aspectRatio: 1,
                }}
            />
        ) : (
            <p>Loading chart...</p>
        )}
    </div>

    {/* Bar Chart */}
    <div className="bg-white p-6 rounded-lg shadow-md h-[400px] overflow-hidden">
        <h2 className="text-xl font-semibold">Student Distribution by Class</h2>
        {chartData.labels ? (
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Number of Students per Class',
                        },
                    },
                    aspectRatio: 1,
                }}
            />
        ) : (
            <p>Loading chart...</p>
        )}
    </div>
</section>


                <section className="students-overview">
                    <h2 className="text-xl font-semibold mb-4">Student List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead className="text-center">
                                <tr>
                                    <th className="px-4 py-2 border-b">NPM</th>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Class</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id} className="text-center">
                                        <td className="px-4 py-2 border-b">{student.npm}</td>
                                        <td className="px-4 py-2 border-b">{student.name}</td>
                                        <td className="px-4 py-2 border-b">{student.class}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default DashboardPage;
