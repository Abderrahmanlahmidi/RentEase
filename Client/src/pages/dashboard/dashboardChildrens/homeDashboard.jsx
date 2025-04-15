import { motion } from "framer-motion";
import { FiHome, FiTrendingUp, FiUsers, FiDollarSign } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HomeDashboard() {
    const { announcements } = useContext(UserContext);
    const totalProperties = announcements?.length || 0;
    const [clientCount, setClientCount] = useState(0);

    const revenue = announcements?.reduce((acc, announcement) => {
        return acc + Number(announcement.prix || 0);
    }, 0) || 0;

    useEffect(() => {
        if (!announcements || announcements.length === 0) return;

        const uniqueClients = new Set();
        announcements.forEach((announcement) => {
            if (announcement.proprietaire?.role_id !== 2) {
                uniqueClients.add(announcement.proprietaire?.id);
            }
        });
        setClientCount(uniqueClients.size);
    }, [announcements]);

    const avgRevenue = totalProperties > 0 ? (revenue / totalProperties).toFixed(2) : 0;

    // Chart data configuration
    const metricsData = {
        labels: ['Total Properties', 'Clients', 'Avg Revenue', 'Total Revenue'],
        datasets: [
            {
                label: 'Dashboard Metrics',
                data: [totalProperties, clientCount, avgRevenue, revenue],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)'
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)'
                ],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (context.parsed.y !== null) {
                            if (context.label.includes('Revenue')) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            } else {
                                label += context.parsed.y;
                            }
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4"
        >
            {/* Header */}
            <motion.div variants={item} className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
            </motion.div>

            {/* Stats Cards - KEPT AS REQUESTED */}
            <motion.div
                variants={container}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                <motion.div variants={item}>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                                <FiHome className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Properties</p>
                                <p className="text-2xl font-semibold text-gray-800">{totalProperties}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                                <FiUsers className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Clients</p>
                                <p className="text-2xl font-semibold text-gray-800">{clientCount}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-50 text-green-600">
                                <FiTrendingUp className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Average Revenue</p>
                                <p className="text-2xl font-semibold text-gray-800">${avgRevenue}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-amber-50 text-amber-600">
                                <FiDollarSign className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Revenue</p>
                                <p className="text-2xl font-semibold text-gray-800">${revenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Main Content with Charts */}
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Metrics Bar Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Visual Metrics Overview</h2>
                    <div className="h-86 flex justify-center">
                        <Bar data={metricsData} options={options} />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-start pb-4 border-b border-gray-100 last:border-0"
                            >
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-600">{i}</span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-800">New property listed #{i}</p>
                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}