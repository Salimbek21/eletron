import React, { useState } from 'react';
import ForgotPassword from '../../components/Auth/ForgotPass';
import Layout from '../../components/Layout';

const ForgotPassPage = () => {

   const [forgotStep, setForgotStep] = useState<number>(1)

   const handleStepChange = (step: number) => {
      setForgotStep(step)
   }

   return (
      <Layout
         title={"Восстановление пароля"}
      >
         <section className="register-section">
            <ForgotPassword forgotStep={forgotStep} handleStepChange={handleStepChange} />
         </section>
      </Layout>
   );
};

export default ForgotPassPage;