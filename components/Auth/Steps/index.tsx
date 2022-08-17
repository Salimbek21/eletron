import React from 'react';

interface AuthStepsProps {
    currentStep: number;
}

const AuthSteps = ({ currentStep }: AuthStepsProps) => {

    const renderAuthSteps = () => (
        [1, 2, 3].map(i => (
            <div className={`step ${currentStep === i ? 'active' : ''}`} key={i}>
            </div>
        ))
    )

    return (
        <div className="register-steps">
            {renderAuthSteps()}
        </div>
    );
};

export default AuthSteps;