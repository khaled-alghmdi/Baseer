import Navbar from '../../components/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50/20">
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        
        <div className="flex flex-col items-center justify-center mt-32">
          <div className="mb-6 relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-full filter blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
            <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform group-hover:scale-105 transition-transform duration-700">
              {/* Main eye outline */}
              <path d="M120 30C85 30 55 60 50 95C55 130 85 160 120 160C155 160 185 130 190 95C185 60 155 30 120 30Z" stroke="#0D7490" strokeWidth="3" fill="none" className="group-hover:stroke-[#0A6380] transition-colors duration-700"/>
              
              {/* Inner eye circle */}
              <path d="M120 60C100 60 85 75 85 95C85 115 100 130 120 130C140 130 155 115 155 95C155 75 140 60 120 60Z" stroke="#0D7490" strokeWidth="3" fill="none" className="group-hover:stroke-[#0A6380] transition-colors duration-700"/>
              
              {/* Pupil */}
              <path d="M120 80C112 80 105 87 105 95C105 103 112 110 120 110C128 110 135 103 135 95C135 87 128 80 120 80Z" fill="#0D7490" className="group-hover:fill-[#0A6380] transition-colors duration-700"/>
              
              {/* Snowflake in pupil */}
              <path d="M120 85L120 105M115 90L125 100M125 90L115 100M112 95L128 95" stroke="white" strokeWidth="1"/>
              
              {/* Decorative lines */}
              <path d="M190 95C190 95 200 85 210 95M50 95C50 95 40 105 30 95" stroke="#0D7490" strokeWidth="2" className="group-hover:stroke-[#0A6380] transition-colors duration-700"/>
              <path d="M70 50C70 50 60 40 55 45" stroke="#0D7490" strokeWidth="2" className="group-hover:stroke-[#0A6380] transition-colors duration-700"/>
              <path d="M170 50C170 50 180 40 185 45" stroke="#0D7490" strokeWidth="2" className="group-hover:stroke-[#0A6380] transition-colors duration-700"/>
              <path d="M120 30C120 30 140 20 150 15" stroke="#0D7490" strokeWidth="2" className="group-hover:stroke-[#0A6380] transition-colors duration-700"/>
              
              {/* Additional decorative elements */}
              <circle cx="210" cy="95" r="2" fill="#0D7490" className="group-hover:fill-[#0A6380] transition-colors duration-700"/>
              <circle cx="30" cy="95" r="2" fill="#0D7490" className="group-hover:fill-[#0A6380] transition-colors duration-700"/>
              <circle cx="55" cy="45" r="2" fill="#0D7490" className="group-hover:fill-[#0A6380] transition-colors duration-700"/>
              <circle cx="185" cy="45" r="2" fill="#0D7490" className="group-hover:fill-[#0A6380] transition-colors duration-700"/>
              <circle cx="150" cy="15" r="2" fill="#0D7490" className="group-hover:fill-[#0A6380] transition-colors duration-700"/>
            </svg>
          </div>
          <div className="text-primary text-6xl font-bold mt-4 tracking-wider drop-shadow-sm hover:drop-shadow-md transition-all duration-700">بصير</div>
        </div>
      </div>
    </main>
  );
}
