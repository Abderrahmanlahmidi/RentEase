import Navbar from "../sections/Navbar";
import { useNavigate } from "react-router-dom";

function About() {

    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <main className="flex-1 bg-white mt-[63px]">
                {/* Hero section */}
                <section className="py-14 px-4 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
                        About Our Studio
                    </h1>
                    <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Crafting meaningful experiences through design and technology.
                    </p>
                </section>

                {/* Content section */}
                <section className="py-12 px-4 max-w-3xl mx-auto">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-light text-gray-900 mb-6">Our Philosophy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We believe in the power of simplicity. By stripping away the unnecessary,
                                we reveal the essence of what matters most - clarity, purpose, and beauty.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-light text-gray-900 mb-6">Approach</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Every project begins with listening. We immerse ourselves in understanding
                                your vision before crafting solutions that feel inevitable in their simplicity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team section */}
                <section className="py-14 px-4 max-w-4xl mx-auto border-t border-gray-200">
                    <h2 className="text-2xl font-light text-gray-900 mb-12 text-center">The Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Alexandre Durand</h3>
                            <p className="text-gray-600 mb-4">Founder & Creative Director</p>
                            <p className="text-gray-600">
                                With a background in architecture and visual arts, Alexandre brings a
                                rigorous approach to spatial relationships and composition.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Sophie Laurent</h3>
                            <p className="text-gray-600 mb-4">Design Director</p>
                            <p className="text-gray-600">
                                Sophie's work is guided by the belief that good design should be
                                invisible - serving its purpose without calling attention to itself.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-14 px-4 max-w-3xl mx-auto text-center border-t border-gray-200">
                    <h2 className="text-2xl font-light text-gray-900 mb-6">Interested in working together?</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        We're currently accepting new projects for 2025. Let's create something meaningful.
                    </p>
                    <button onClick={() => {navigate('/contact')}} className="px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors">
                        Contact Us
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 px-4 text-center text-sm text-gray-600">
                <p>© {new Date().getFullYear()} Studio Black & White. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default About;