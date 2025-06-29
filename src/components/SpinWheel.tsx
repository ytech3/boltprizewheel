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
    const segmentAngle = 360 / prizes.length;
    const prizeAngle = prizeIndex * segmentAngle;
    const spinAmount = 360 * 5 + (360 - prizeAngle) + (segmentAngle / 2);
    const newRotation = rotation + spinAmount;
    setRotation(newRotation);
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
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')` }}
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
          <p className="text-white/80 text-lg">Spin the wheel to discover your prize!</p>
        </div>
        <div className="relative">
          <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-lg"></div>
            </div>
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full border-8 border-gray-300 shadow-2xl relative overflow-hidden transition-transform duration-4000 ease-out"
              style={{ transform: `rotate(${rotation}deg)`, transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            >
              <svg className="w-full h-full" viewBox="0 0 200 200">
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
                
                {/********** DIAGNOSTIC TEST CODE **********/}
                {prizes.map((prize, index) => {
                  const segmentAngle = 360 / prizes.length;
                  const startAngle = index * segmentAngle;
                  const textAngle = startAngle + segmentAngle / 2;
                  
                  // This will render a red circle in each slice instead of text.
                  return (
                    <g key={`debug-${index}`} transform={`translate(100, 100) rotate(${textAngle})`}>
                      <circle cx="0" cy="-60" r="10" fill="red" />
                    </g>
                  );
                })}
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-blue-800 rounded-full border-4 border-white flex items-center justify-center z-10">
                <span className="text-white font-bold text-sm md:text-lg italic">Culver's</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};