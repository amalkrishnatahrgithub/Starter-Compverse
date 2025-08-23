"use client"
import React from "react"
import { Mail, Phone, MapPin, Globe, ArrowUp, Linkedin, Twitter, Instagram } from "lucide-react"

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-[#0B0E11] border-t border-[#002868]/40 relative z-10 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 border border-[#002868]/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#00BFFF]/20 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#FFD43B] rounded-full animate-bounce delay-700"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#00BFFF] rounded-full animate-bounce delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Company Info - Enhanced */}
                    <div className="md:col-span-2 group">
                        <div className="relative w-24 h-24 overflow-hidden rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                            <img src="/CompVerseLogo.png" alt="CompVerse Logo" className="w-full h-full object-contain" />
                            {/* Enhanced shiny sweep effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00BFFF]/20 to-[#FFD43B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-[#00BFFF] to-[#FFD43B] bg-clip-text text-transparent">
                            CompVerse
                        </h3>

                        <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
                            Innovating the future with technology and creativity.
                            Building digital experiences that inspire, connect, and empower communities worldwide.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Instagram].map((Icon, index) => (
                                <div key={index} className="relative group/social">
                                    <div className="w-10 h-10 border border-[#002868]/50 rounded-lg flex items-center justify-center hover:border-[#00BFFF]/50 transition-colors duration-300 group-hover/social:scale-110 group-hover/social:rotate-12 transform transition-transform">
                                        <Icon className="w-5 h-5 text-gray-400 group-hover/social:text-[#00BFFF] transition-colors" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/20 to-[#FFD43B]/20 rounded-lg opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 blur-sm"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links - Enhanced */}
                    <div className="group">
                        <div className="relative">
                            <h2 className="text-lg font-semibold text-[#00BFFF] mb-6 flex items-center gap-2">
                                Quick Links
                                <div className="w-12 h-px bg-gradient-to-r from-[#00BFFF] to-transparent"></div>
                            </h2>
                        </div>

                        <ul className="space-y-4">
                            {['About Us', 'Services', 'Events', 'Contact'].map((link, index) => (
                                <li key={index} className="group/link">
                                    <a href={`#${link.toLowerCase().replace(' ', '')}`}
                                        className="text-sm text-gray-300 hover:text-[#FFD43B] transition-all duration-300 flex items-center gap-2 group-hover/link:translate-x-2">
                                        <div className="w-1 h-1 bg-[#002868] rounded-full group-hover/link:bg-[#FFD43B] transition-colors duration-300"></div>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info - Enhanced */}
                    <div className="group">
                        <div className="relative">
                            <h2 className="text-lg font-semibold text-[#00BFFF] mb-6 flex items-center gap-2">
                                Contact
                                <div className="w-12 h-px bg-gradient-to-r from-[#00BFFF] to-transparent"></div>
                            </h2>
                        </div>

                        <ul className="space-y-4">
                            {[
                                { icon: Mail, text: 'info@compverse.com' },
                                { icon: Phone, text: '+91 98765 43210' },
                                { icon: MapPin, text: 'Mumbai, India' },
                                { icon: Globe, text: 'www.compverse.com' }
                            ].map(({ icon: Icon, text }, index) => (
                                <li key={index} className="group/contact flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                                    <div className="relative">
                                        <div className="w-8 h-8 border border-[#002868]/50 rounded-lg flex items-center justify-center group-hover/contact:border-[#FFD43B]/50 transition-colors duration-300">
                                            <Icon className="w-4 h-4 text-[#FFD43B] group-hover/contact:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="absolute inset-0 bg-[#FFD43B]/10 rounded-lg opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300 blur-sm"></div>
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover/contact:text-white transition-colors duration-300">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Scroll to top button */}
                <button
                    onClick={scrollToTop}
                    className="absolute top-8 right-8 w-12 h-12 border border-[#002868]/50 rounded-full flex items-center justify-center hover:border-[#00BFFF]/50 hover:scale-110 transition-all duration-300 group/scroll"
                >
                    <ArrowUp className="w-5 h-5 text-gray-400 group-hover/scroll:text-[#00BFFF] group-hover/scroll:-translate-y-1 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/20 to-[#FFD43B]/20 rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </button>
            </div>

            {/* Enhanced Bottom bar */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#002868]/20 to-transparent h-px"></div>
                <div className="border-t border-[#002868]/40 py-6 text-center relative">
                    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-4">
                        <div className="text-xs text-gray-400 flex items-center gap-2">
                            <span>© {new Date().getFullYear()} CompVerse. All rights reserved.</span>
                        </div>
                        <div className="flex items-center gap-6 text-xs text-gray-500">
                            <a href="#privacy" className="hover:text-[#00BFFF] transition-colors">Privacy Policy</a>
                            <div className="w-px h-4 bg-[#002868]/50"></div>
                            <a href="#terms" className="hover:text-[#00BFFF] transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer