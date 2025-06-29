import React, { useState, useRef } from 'react';
import { UserInfo, Prize } from '../types';
import { RotateCcw } from 'lucide-react';

interface SpinWheelProps {
  userInfo: UserInfo;
  onReset: () => void;
}

const prizes: Prize[] = [
  { id: 1, name: 'Autographed\nBaseball', color: '#ddd6fe', probability: 0.15 },
  { id: 2, name: 'Bay Republic\n30% Off', color: '#e5e7eb', probability: 0.20 },
  { id: 3, name: "Culver's\nFree Concrete Mixer", color: '#ddd6fe', probability: 0.25 },
  { id: 4, name: 'Rays\n2026 Tickets', color: '#e5e7eb', probability: 0.15 },
  { id: 5, name: 'Grand Prize Entry\n2026 Suite Night', color: '#ddd6fe', probability: 0.05 },
  { id: 6, name: 'City Connect\nBomber Jacket', color: '#e5e7eb', probability: 0.10 },
  { id: 7, name: 'Rays\nSwag Bag', color: '#ddd6fe', probability: 0.10 }
];

export const SpinWheel: React.FC<SpinWheelProps> = ({ userInfo, onReset }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [winner, setWinner] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const selectWinner = (): Prize => {
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        return prize;
      }
    }
    
    return prizes[prizes.length - 1];
  };

  const spin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    const selectedPrize = selectWinner();
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    
    // Calculate the angle for the selected prize
    const segmentAngle = 360 / prizes.length;
    const prizeAngle = prizeIndex * segmentAngle;
    
    // Add multiple rotations + target angle
    const spinAmount = 360 * 5 + (360 - prizeAngle) + (segmentAngle / 2);
    const newRotation = rotation + spinAmount;
    
    setRotation(newRotation);

    // Set winner after animation completes
    setTimeout(() => {
      setWinner(selectedPrize);
      setIsSpinning(false);
      setHasSpun(true);
    }, 4000);
  };

  const reset = () => {
    setHasSpun(false);
    setWinner(null);
    setRotation(0);
    onReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background crowd image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />
      <div className="absolute inset-0 bg-slate-900/70" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">TB</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Welcome, {userInfo.firstName}! 🎉
              </h1>
              <p className="text-blue-300 font-semibold">PRESENTED BY CULVER'S</p>
            </div>
          </div>
          <p className="text-white/80 text-lg">
            Spin the wheel to discover your prize!
          </p>
        </div>

        <div className="relative">
          {/* Wheel Container */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-lg"></div>
            </div>

            {/* Wheel */}
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full border-8 border-gray-300 shadow-2xl relative overflow-hidden transition-transform duration-4000 ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            >
              {/* Wheel segments with proper SVG approach */}
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* First render all background segments */}
                {prizes.map((prize, index) => {
                  const segmentAngle = 360 / prizes.length;
                  const startAngle = index * segmentAngle;
                  const endAngle = (index + 1) * segmentAngle;
                  
                  const startAngleRad = (startAngle - 90) * Math.PI / 180;
                  const endAngleRad = (endAngle - 90) * Math.PI / 180;
                  
                  const x1 = 100 + 90 * Math.cos(startAngleRad);
                  const y1 = 100 + 90 * Math.sin(startAngleRad);
                  const x2 = 100 + 90 * Math.cos(endAngleRad);
                  const y2 = 100 + 90 * Math.sin(endAngleRad);
                  
                  const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                  
                  return (
                    <path
                      key={`background-${index}`}
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={prize.color}
                      stroke="#374151"
                      strokeWidth="2"
                    />
                  );
                })}
                
                {/* Then render all text on top */}
                {prizes.map((prize, index) => {
                  const segmentAngle = 360 / prizes.length;
                  const startAngle = index * segmentAngle;
                  const textAngle = startAngle + segmentAngle / 2;
                  
                  // Split text into lines
                  const lines = prize.name.split('\n');
                  
                  // Determine text color based on background
                  const textColor = prize.color === '#ddd6fe' ? '#1e1b4b' : '#374151';
                  
                  return (
                    <g key={`text-${index}`} transform={`translate(100, 100) rotate(${textAngle})`}>
                      {/* First line of text (e.g., "AUTOGRAPHED") */}
                      <text
                        // The 'y' attribute controls the distance from the center.
                        y={-45}
                        // This ensures the text is centered on the slice's radial line.
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={textColor}
                        fontSize={14}
                        fontWeight="bold"
                        // This style makes the text ALL CAPS to match the target image.
                        style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        // This transform makes the text straight and point outwards from the center.
                        // This is the key to achieving the desired layout.
                        transform="rotate(90)"
                      >
                        {lines[0]}
                      </text>
                    
                      {/* Second line of text (e.g., "BASEBALL") */}
                      {lines[1] && (
                        <text
                          // Positioned further out than the first line.
                          y={-65}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={textColor}
                          fontSize={12}
                          fontWeight="bold"
                          style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                          transform="rotate(90)"
                        >
                          {lines[1]}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
              
              {/* Center circle with Culver's logo */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-blue-800 rounded-full border-4 border-white flex items-center justify-center z-10">
                <span className="text-white font-bold text-sm md:text-lg italic">Culver's</span>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          {!hasSpun && (
            <div className="text-center mt-8">
              <button
                onClick={spin}
                disabled={isSpinning}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                {isSpinning ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Spinning...</span>
                  </div>
                ) : (
                  'SPIN NOW!'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Winner Modal */}
        {winner && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Congratulations!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                You won: <span className="font-bold text-blue-600">{winner.name.replace(/\n/g, ' ')}</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                We'll contact you at {userInfo.email} with details about claiming your prize.
              </p>
              <button
                onClick={reset}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <button
          onClick={reset}
          className="mt-8 text-white/80 hover:text-white transition-colors duration-200 flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over</span>
        </button>
      </div>
    </div>
  );
};
