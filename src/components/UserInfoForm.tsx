import React, { useState } from 'react';
import { UserInfo } from '../types';
import { ChevronRight } from 'lucide-react';

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Partial<UserInfo>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToEmails, setAgreedToEmails] = useState(false);
  const [agreedToExclusive, setAgreedToExclusive] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserInfo> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Date of Birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && agreedToTerms;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Form */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">TB</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    FAN APPRECIATION PRIZE WHEEL
                  </h1>
                  <p className="text-blue-300 font-semibold">PRESENTED BY CULVER'S</p>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                SPIN TO WIN A PRIZE!
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                Rays Fans! Play the Rays Fan Appreciation Prize Wheel for your chance to 
                instantly win exclusive Prizes from Culver's and your favorite ball club!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 bg-transparent border-b-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors ${
                      errors.firstName ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder=""
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 bg-transparent border-b-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors ${
                      errors.lastName ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder=""
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 bg-transparent border-b-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder=""
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 bg-transparent border-b-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder="mm/dd/yyyy"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <label className="flex items-start space-x-3 text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-gray-400 rounded focus:ring-blue-500"
                  />
                  <span>
                    I have read and agree to the <span className="text-blue-400 underline">Sweepstakes Rules</span> and the <span className="text-blue-400 underline">Terms of Use</span>.
                  </span>
                </label>

                <label className="flex items-start space-x-3 text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={agreedToEmails}
                    onChange={(e) => setAgreedToEmails(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-gray-400 rounded focus:ring-blue-500"
                  />
                  <span>
                    I would like to receive commercial e-mails from <span className="text-blue-400 underline">TampaBayRays.com</span>, <span className="text-blue-400 underline">MLB.com</span> and their partners.
                  </span>
                </label>

                <label className="flex items-start space-x-3 text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={agreedToExclusive}
                    onChange={(e) => setAgreedToExclusive(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-gray-400 rounded focus:ring-blue-500"
                  />
                  <span>
                    Subscribe to receive exclusive access to <span className="text-blue-400 underline">TheBayRepublic.com</span> product launches, sales, and more!
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !agreedToTerms}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  'SPIN NOW'
                )}
              </button>
            </form>

            <div className="mt-6 text-xs text-gray-400 leading-relaxed">
              <p className="font-semibold mb-2">NO PURCHASE NECESSARY. TRAVEL NOT INCLUDED.</p>
              <p>
                Open to legal residents of Florida who are 18 years of age or older. Entry Period begins September 20, 2024. Odds of winning depend on number of Game Plays received per Entry Period. Void where prohibited. Restrictions apply. See Official Rules for details including Entry Period details. Major League Baseball trademarks and copyrights are used with permission of Major League Baseball. Visit <span className="text-blue-400 underline">MLB.com</span>.
              </p>
            </div>
          </div>

          {/* Right side - Wheel Preview */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              {/* Wheel with proper segments */}
              <div className="w-full h-full rounded-full relative overflow-hidden border-8 border-gray-300 shadow-2xl">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <defs>
                    {/* Define clipping paths for each segment to prevent text overflow */}
                    {[
                      { name: 'GRAND PRIZE ENTRY\n2025 SUITE', color: '#ddd6fe' },
                      { name: "CULVER'S FREE\nCONCRETE MIXER", color: '#e5e7eb' },
                      { name: 'GRAND PRIZE ENTRY\n2025 SUITE', color: '#ddd6fe' },
                      { name: 'RAYS 2026\nTICKETS', color: '#e5e7eb' },
                      { name: "CULVER'S\nCONCRETE MIXER", color: '#ddd6fe' },
                      { name: 'AUTOGRAPHED\nBASEBALL', color: '#e5e7eb' },
                      { name: "CULVER'S\n2025 SUITE", color: '#ddd6fe' }
                    ].map((_, index) => {
                      const segmentAngle = 360 / 7;
                      const startAngle = index * segmentAngle;
                      const endAngle = (index + 1) * segmentAngle;
                      
                      const startAngleRad = (startAngle - 90) * Math.PI / 180;
                      const endAngleRad = (endAngle - 90) * Math.PI / 180;
                      
                      const x1 = 100 + 90 * Math.cos(startAngleRad);
                      const y1 = 100 + 90 * Math.sin(startAngleRad);
                      const x2 = 100 + 90 * Math.cos(endAngleRad);
                      const y2 = 100 + 90 * Math.sin(endAngleRad);
                      
                      return (
                        <clipPath key={`preview-clip-${index}`} id={`preview-segment-clip-${index}`}>
                          <path d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`} />
                        </clipPath>
                      );
                    })}
                  </defs>
                  
                  {[
                    { name: 'GRAND PRIZE ENTRY\n2025 SUITE', color: '#ddd6fe' },
                    { name: "CULVER'S FREE\nCONCRETE MIXER", color: '#e5e7eb' },
                    { name: 'GRAND PRIZE ENTRY\n2025 SUITE', color: '#ddd6fe' },
                    { name: 'RAYS 2026\nTICKETS', color: '#e5e7eb' },
                    { name: "CULVER'S\nCONCRETE MIXER", color: '#ddd6fe' },
                    { name: 'AUTOGRAPHED\nBASEBALL', color: '#e5e7eb' },
                    { name: "CULVER'S\n2025 SUITE", color: '#ddd6fe' }
                  ].map((prize, index) => {
                    const segmentAngle = 360 / 7;
                    const startAngle = index * segmentAngle;
                    const endAngle = (index + 1) * segmentAngle;
                    
                    const startAngleRad = (startAngle - 90) * Math.PI / 180;
                    const endAngleRad = (endAngle - 90) * Math.PI / 180;
                    
                    const x1 = 100 + 90 * Math.cos(startAngleRad);
                    const y1 = 100 + 90 * Math.sin(startAngleRad);
                    const x2 = 100 + 90 * Math.cos(endAngleRad);
                    const y2 = 100 + 90 * Math.sin(endAngleRad);
                    
                    const textAngle = startAngle + segmentAngle / 2;
                    const lines = prize.name.split('\n');
                    
                    // Determine text color based on background
                    const textColor = prize.color === '#ddd6fe' ? '#1e1b4b' : '#374151';
                    
                    return (
                      <g key={index}>
                        <path
                          d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                          fill={prize.color}
                          stroke="#374151"
                          strokeWidth="2"
                        />
                        
                        {/* Text group with clipping to prevent overlap */}
                        <g clipPath={`url(#preview-segment-clip-${index})`}>
                          <g transform={`translate(100, 100) rotate(${textAngle})`}>
                            {lines.length === 1 ? (
                              // Single line text - positioned from center outward
                              <text
                                x="0"
                                y="-50"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={textColor}
                                fontSize="9"
                                fontWeight="bold"
                                letterSpacing="0.8"
                                transform="rotate(90)"
                              >
                                {lines[0]}
                              </text>
                            ) : (
                              // Multi-line text - start closer to center, extend outward
                              lines.map((line, lineIndex) => (
                                <text
                                  key={`preview-text-${index}-${lineIndex}`}
                                  x="0"
                                  y={-35 + (lineIndex * 15)}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fill={textColor}
                                  fontSize="8"
                                  fontWeight="bold"
                                  letterSpacing="0.6"
                                  transform="rotate(90)"
                                >
                                  {line}
                                </text>
                              ))
                            )}
                          </g>
                        </g>
                      </g>
                    );
                  })}
                </svg>

                {/* Center circle with Culver's logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-800 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold text-lg italic">Culver's</span>
                </div>
              </div>

              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};