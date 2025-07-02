// src/components/StepProgress/StepProgress.jsx
import React from 'react';
import './StepProgress.css';
import { useLocation } from 'react-router-dom';

const steps = ['Cart', 'Checkout', 'Payment', 'Receipt'];

const StepProgress = () => {
  const location = useLocation();

  const getCurrentStep = () => {
    if (location.pathname.includes('/cart')) return 0;
    if (location.pathname.includes('/checkout')) return 1;
    if (location.pathname.includes('/payment')) return 2;
    if (location.pathname.includes('/success')) return 3;
    return 0;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="step-progress">
      {steps.map((label, index) => (
        <div className={`step ${index <= currentStep ? 'active' : ''}`} key={label}>
          <div className="circle">{index + 1}</div>
          <span className="label">{label}</span>
          {index < steps.length - 1 && <div className="bar" />}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
