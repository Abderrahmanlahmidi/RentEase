import { motion } from "framer-motion";
import { FiHome, FiTrendingUp, FiUsers, FiDollarSign } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HomeDashboard() {
    const { announcements = [] } = useContext(UserContext);
    const totalProperties = announcements.length;
    const [clients, setClients] = useState([]);

    const revenue = announcements.reduce((acc, announcement) => {
        return acc + Number(announcement.prix || 0);
    }, 0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get("http://127.0.0.1:8000/api/users");
                setClients(response.users.filter(item => item.role.name === "Client"));
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
    }, []);

    const avgRevenue = totalProperties > 0 ? (revenue / totalProperties).toFixed(2) : "0.00";

    function formatDateTime(datetime) {
        const date = new Date(datetime);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const fullDate = `${year}-${month}-${day}`;
        return `${time} - ${fullDate}`;
    }

    const metricsData = {
        labels: ['Properties', 'Clients', 'Avg Revenue', 'Total Revenue'],
        datasets: [
            {
                label: 'Metrics',
                data: [totalProperties, clients.length, avgRevenue, revenue],
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
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
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
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
            className="w-full bg-white p-6"
        >
            <motion.div variants={item} className="mb-8">
                <h1 className="text-3xl font-light text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
            </motion.div>

            <motion.div
                variants={container}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                <motion.div variants={item}>
                    <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-all">
                        <div className="flex items-center">
                            <div className="p-3 rounded-none bg-gray-100 text-gray-900">
                                <FiHome className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                                <p className="text-2xl font-light text-gray-900">{totalProperties}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-all">
                        <div className="flex items-center">
                            <div className="p-3 rounded-none bg-gray-100 text-gray-900">
                                <FiUsers className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Clients</p>
                                <p className="text-2xl font-light text-gray-900">{clients.length}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-all">
                        <div className="flex items-center">
                            <div className="p-3 rounded-none bg-gray-100 text-gray-900">
                                <FiTrendingUp className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Avg Revenue</p>
                                <p className="text-2xl font-light text-gray-900">${avgRevenue}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-all">
                        <div className="flex items-center">
                            <div className="p-3 rounded-none bg-gray-100 text-gray-900">
                                <FiDollarSign className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Revenue</p>
                                <p className="text-2xl font-light text-gray-900">${revenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>


            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-white border border-gray-200 p-6">
                    <h2 className="text-xl font-light text-gray-900 mb-4">Metrics Overview</h2>
                    <div className="h-86">
                        <Bar data={metricsData} options={options} />
                    </div>
                </div>


                <div className="bg-white border border-gray-200 p-6">
                    <h2 className="text-xl font-light text-gray-900 mb-4">Recent Properties</h2>
                    <div className="space-y-4">
                        {announcements.slice(-5).map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 * index }}
                                className="flex items-start pb-4 border-b border-gray-200 last:border-0"
                            >
                                <div className="flex-shrink-0 h-10 w-10 rounded-none bg-gray-100 flex items-center justify-center border border-gray-200">
                                    <span className="text-gray-900">{index + 1}</span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{item.titre}</p>
                                    <p className="text-sm text-gray-600">{formatDateTime(item.created_at)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}