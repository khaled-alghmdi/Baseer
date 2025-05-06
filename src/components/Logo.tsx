import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  // Size mapping
  const sizeMap = {
    small: { width: 40, height: 30, fontSize: 'text-xl' },
    medium: { width: 60, height: 45, fontSize: 'text-3xl' },
    large: { width: 80, height: 60, fontSize: 'text-4xl' },
  };

  const { width, height, fontSize } = sizeMap[size];

  return (
    <div className="flex flex-col items-center">
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 300 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        {/* Eye outline */}
        <path 
          d="M150 40C90 40 40 90 30 110C40 130 90 180 150 180C210 180 260 130 270 110C260 90 210 40 150 40Z" 
          stroke="#0D7490" 
          strokeWidth="10" 
          fill="none"
        />
        
        {/* Eye inner circle */}
        <path 
          d="M150 70C120 70 100 90 100 110C100 130 120 150 150 150C180 150 200 130 200 110C200 90 180 70 150 70Z" 
          stroke="#0D7490" 
          strokeWidth="8" 
          fill="none"
        />
        
        {/* Pupil */}
        <circle 
          cx="150" 
          cy="110" 
          r="25" 
          fill="#0D7490"
        />
        
        {/* Snowflake in pupil */}
        <path 
          d="M150 95L150 125M140 100L160 120M160 100L140 120M135 110L165 110" 
          stroke="white" 
          strokeWidth="3"
        />
        
        {/* Left circuit line */}
        <path 
          d="M30 110C30 110 10 110 10 90C10 70 30 70 30 70" 
          stroke="#0D7490" 
          strokeWidth="5" 
          fill="none"
        />
        
        {/* Right circuit line */}
        <path 
          d="M270 110C270 110 290 110 290 130C290 150 270 150 270 150" 
          stroke="#0D7490" 
          strokeWidth="5" 
          fill="none"
        />
        
        {/* Top eyelash lines */}
        <path 
          d="M90 70L80 50M120 50L110 30M150 40L150 20M180 50L190 30M210 70L220 50" 
          stroke="#0D7490" 
          strokeWidth="5" 
          fill="none"
        />
        
        {/* Circuit dots */}
        <circle cx="30" cy="70" r="5" fill="#0D7490" />
        <circle cx="30" cy="110" r="5" fill="#0D7490" />
        <circle cx="270" cy="110" r="5" fill="#0D7490" />
        <circle cx="270" cy="150" r="5" fill="#0D7490" />
      </svg>
      
      {showText && (
        <div className={`${fontSize} font-bold text-primary mt-1`}>بصير</div>
      )}
    </div>
  );
};

export default Logo;
