import React, {useState} from 'react';
import Layout from "../../components/Layout";
import Register from "../../components/Auth/Register";

const RegisterPage = () => {
   const [regStep, setRegStep] = useState<number>(1)

   const handleStepChange = (step:number) => {
      setRegStep(step)
   }

   return (
       <Layout
           title={"Регистрация"}
       >
          <section className="register-section">
             <Register regStep={regStep} handleStepChange={handleStepChange}/>
          </section>
       </Layout>
   );
};

export default RegisterPage;