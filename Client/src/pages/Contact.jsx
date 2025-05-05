import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../sections/Navbar";
import { FiMail, FiPhone, FiMapPin, FiSend, FiX, FiCheck } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [alert, setAlert] = useState(null);

    const location = {
        longitude: -7.622573,
        latitude: 33.000101
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/sendmail", data);

            if (response.status === 200) {
                setAlert({
                    type: 'success',
                    message: 'Message sent successfully!',
                    visible: true
                });
                reset();
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setAlert({
                type: 'error',
                message: 'Failed to send message. Please try again later.',
                visible: true
            });
        } finally {
            setTimeout(() => {
                setAlert(prev => ({ ...prev, visible: false }));
            }, 5000);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <AnimatePresence>
                {alert?.visible && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
                    >
                        <div className={`p-4 border ${alert.type === 'success' ? 'bg-white border-gray-200' : 'bg-white border-gray-200'}`}>
                            <div className="flex items-start">
                                <div className={`flex-shrink-0 ${alert.type === 'success' ? 'text-gray-800' : 'text-gray-800'}`}>
                                    {alert.type === 'success' ? (
                                        <FiCheck className="h-5 w-5" />
                                    ) : (
                                        <FiX className="h-5 w-5" />
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className={`text-sm font-medium ${alert.type === 'success' ? 'text-gray-800' : 'text-gray-800'}`}>
                                        {alert.message}
                                    </p>
                                </div>
                                <div className="ml-auto pl-3">
                                    <div className="-mx-1.5 -my-1.5">
                                        <button
                                            type="button"
                                            onClick={() => setAlert(prev => ({ ...prev, visible: false }))}
                                            className="inline-flex p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            <FiX className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 bg-white mt-[63px]">

                <section className="py-14 px-4 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
                            Contact Us
                        </h1>
                        <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have a project in mind? Let's discuss how we can help bring your vision to life.
                        </p>
                    </motion.div>
                </section>


                <section className="py-12 px-4 max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-2xl font-light text-gray-900 mb-4">Get in Touch</h2>
                                <p className="text-gray-600">
                                    We're available for new projects and collaborations. Reach out through any of these channels.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-none bg-gray-100 flex-shrink-0">
                                        <FiMapPin className="w-5 h-5 text-gray-800" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Our Location</h3>
                                        <p className="text-gray-600 mt-1">123 Design Ave, Suite 400<br />San Francisco, CA 94107</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-none bg-gray-100 flex-shrink-0">
                                        <FiPhone className="w-5 h-5 text-gray-800" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Phone Number</h3>
                                        <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-none bg-gray-100 flex-shrink-0">
                                        <FiMail className="w-5 h-5 text-gray-800" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Email Address</h3>
                                        <p className="text-gray-600 mt-1">hello@studioblackwhite.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 overflow-hidden h-64 border border-gray-200">
                                <iframe
                                    title="Location Map"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
                                ></iframe>
                            </div>
                        </motion.div>


                        <motion.form
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-light text-gray-900 mb-6">Send a Message</h2>

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
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0"
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
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0"
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
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0"
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
                                        placeholder="Tell us about your project..."
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0"
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                    )}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    className="w-full px-6 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <FiSend className="w-4 h-4" />
                                        Send Message
                                    </span>
                                </motion.button>
                            </div>
                        </motion.form>
                    </div>
                </section>
            </main>

            <footer className="bg-white border-t border-gray-200 py-8 px-4 text-center text-sm text-gray-600">
                <p>© {new Date().getFullYear()} Studio Black & White. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Contact;