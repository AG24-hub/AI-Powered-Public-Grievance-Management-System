import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FEATURES } from "../components/features";
import { STEPS } from "../components/steps";

const NAV_LINKS = ["Features", "About", "How To Start"];

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans bg-white text-gray-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-5xl font-extrabold text-gray-900 tracking-tight">Civic-AI</div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/ /g, "-"))}
                className="text-gray-700 font-medium hover:text-purple-700 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="px-5 py-2 rounded-full bg-purple-700 text-white font-semibold text-sm hover:bg-purple-800 transition"
                onClick={() => navigate('/authentication')}> Admin </button>
            <button className="px-5 py-2 rounded-full bg-purple-700 text-white font-semibold text-sm hover:bg-purple-800 transition"
                onClick={() => navigate('/authentication')}>User</button>
        </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase().replace(/ /g, "-"))} className="text-left text-gray-700 font-medium">
                {link}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <button className="px-5 py-2 rounded-full bg-purple-700 text-white font-semibold text-sm" onClick={() => navigate('/authentication')}>Admin</button>
              <button className="px-5 py-2 rounded-full bg-purple-700 text-white font-semibold text-sm" onClick={() => navigate('/authentication')}>User</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-100 min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Welcome to <br /> Civic-AI
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Tell us your problem here. Submit a complaint, check its status, and get help to solve it.
            </p>
            <button className="px-8 py-3 rounded-full bg-purple-700 text-white font-bold text-lg hover:bg-purple-800 transition shadow-md">
              Get Started
            </button>
          </div>

          {/* Hero illustration */}
          <div className="flex justify-center">
            <img src="/hero.jpg" alt="Complaint Illustration"/>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Our Features</h2>
            <p className="text-center text-gray-500 mb-14 text-lg">Everything you need to manage grievances effectively</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
                <div key={f.title} className="bg-gray-100 rounded-2xl border border-gray-100 shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow">
                <div className={`${f.bg} ${f.color} p-3 rounded-xl mb-4`}>{f.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
            ))}
            </div>
        </div>
        </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h2>
            <p className="text-purple-700 font-semibold text-lg mb-4">
              Connecting people with the right departments for a better community.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Our Grievance Management System bridges the gap between citizens and government departments. We provide a platform where you can easily submit complaints, track their progress, and get timely resolutions. Our system ensures every voice is heard and every issue gets the attention it deserves.
            </p>
          </div>

          {/* Circular diagram */}
          <div className="flex justify-center">
            <img src="/grievance.jpg" alt="Complaint Illustration"/>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section id="how-to-start" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">How to Get Started? </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">Follow these simple steps to begin using our system</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="bg-gray-100 rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center relative shadow-xl hover:shadow-2xl transition">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="text-purple-600 mb-4">{s.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
        © 2025 Grievance Management System. All rights reserved.
      </footer>
    </div>
  );
}