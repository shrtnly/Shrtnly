import React from 'react';
import { Shield, Check, X } from 'lucide-react';
import { validatePasswordStrength } from '../../lib/authTokens';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  password, 
  className = '' 
}) => {
  const validation = validatePasswordStrength(password);
  
  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score: number) => {
    if (score <= 1) return 'Very Weak';
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthTextColor = (score: number) => {
    if (score <= 1) return 'text-red-600';
    if (score <= 2) return 'text-orange-600';
    if (score <= 3) return 'text-yellow-600';
    if (score <= 4) return 'text-blue-600';
    return 'text-green-600';
  };

  if (!password) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Strength Bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Password Strength</span>
          <span className={`text-sm font-medium ${getStrengthTextColor(validation.score)}`}>
            {getStrengthText(validation.score)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(validation.score)}`}
            style={{ width: `${(validation.score / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Password Requirements</span>
        </div>
        
        <div className="space-y-1">
          {[
            { test: password.length >= 8, text: 'At least 8 characters' },
            { test: /[A-Z]/.test(password), text: 'One uppercase letter' },
            { test: /[a-z]/.test(password), text: 'One lowercase letter' },
            { test: /\d/.test(password), text: 'One number' },
            { test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), text: 'One special character' },
          ].map((requirement, index) => (
            <div key={index} className="flex items-center gap-2">
              {requirement.test ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <X className="w-3 h-3 text-gray-400" />
              )}
              <span className={`text-xs ${requirement.test ? 'text-green-600' : 'text-gray-500'}`}>
                {requirement.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Messages */}
      {validation.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="space-y-1">
            {validation.errors.map((error, index) => (
              <div key={index} className="flex items-start gap-2">
                <X className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-red-600">{error}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tips */}
      {validation.isValid && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">Great password!</p>
              <p className="text-xs text-green-700">
                Your password meets all security requirements and will help keep your account safe.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;