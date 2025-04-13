import { motion } from "framer-motion";
import Navbar from "../sections/Navbar";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "axios";

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const location = {
        longitude: 32.994198,
        latitude: -7.618001
    };

    const onSubmit = async (data) => {
        console.log(data);
        const response = await axios.post("http://127.0.0.1:8000/api/sendmail", data);
        console.log(response);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-blue-500 to-indigo-700 text-white py-28 px-4 text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto relative z-10"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Talk</h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
                            We'd love to hear from you. Whether you have a question about our services or just want to say hello, drop us a message below.
                        </p>
                    </motion.div>
                </section>

                {/* Contact Content */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-16">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-xl shadow-lg p-8 h-full"
                        >
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Information</h2>
                                    <p className="text-gray-600">
                                        Fill out the form or reach out to us directly through the channels below.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                                            <FiMapPin className="text-blue-600 w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Our Location</h3>
                                            <p className="text-gray-600 mt-1">123 Business Ave, Suite 400<br />San Francisco, CA 94107</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                                            <FiPhone className="text-blue-600 w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Phone Number</h3>
                                            <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                                            <FiMail className="text-blue-600 w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Email Address</h3>
                                            <p className="text-gray-600 mt-1">info@yourcompany.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="mt-8 rounded-xl overflow-hidden shadow-md h-64">
                                    <iframe
                                        title="Location Map"
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                        allowFullScreen
                                        src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
                                    ></iframe>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.form
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white rounded-xl shadow-lg p-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            {...register("firstName", {
                                                required: "First Name is required",
                                                pattern: {
                                                    value: /^[a-zA-Z]+$/,
                                                    message: "First Name can only contain letters",
                                                },
                                            })}
                                            type="text"
                                            placeholder="John"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            {...register("lastName", {
                                                required: "Last Name is required",
                                                pattern: {
                                                    value: /^[a-zA-Z]+$/,
                                                    message: "Last Name can only contain letters",
                                                },
                                            })}
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid email format. Example: example@domain.com",
                                            },
                                        })}
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                                    <textarea
                                        {...register("message", {
                                            required: "Message is required",
                                            minLength: {
                                                value: 10,
                                                message: "Message must be at least 10 characters long",
                                            },
                                        })}
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                    )}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-md flex items-center justify-center gap-3"
                                >
                                    <span>Send Message</span>
                                    <FiSend className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Contact;