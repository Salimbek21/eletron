import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {notifySuccess} from "../../../helpers/NotifyBtn"
import AuthSteps from '../Steps';
import VerifyPhone from "../VerifyPhone";

interface ForgotProps {
   forgotStep: number,

   handleStepChange(step: number): void
}


const ForgotPassword: FC<ForgotProps> = ({forgotStep, handleStepChange}) => {

   // same logic here as in register steps
   const {authVerifyPhone, authUpdateCode} = useTypedDispatch()
   const {codeUpdate, phoneVerified} = useTypedSelector(state => state.auth)

   const [forgotData, setForgotData] = useState({
      phone: "",
      code: ""
   })

   useEffect(() => {
      if (codeUpdate?.message && codeUpdate.phone) {
         notifySuccess(codeUpdate.message)
         handleStepChange(2)
      }
      if (phoneVerified?.id && phoneVerified.key) {
         notifySuccess(phoneVerified.message)
         handleStepChange(3)
      }
   }, [codeUpdate, phoneVerified])


   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForgotData({...forgotData, [e.target.name]: e.target.value})
   }

   const handleForgotClick = async () => {
      const formattedPhone = forgotData.phone.replace(/\s|\+|_/g, '')
      const formattedCode = forgotData.code.replace(/\s/g, '')
      const defaultData = {phone: formattedPhone}

      if (forgotStep === 1) {
         await authUpdateCode(defaultData)
      } else if (forgotStep === 2) {
         await authVerifyPhone({...defaultData, code: formattedCode})
      }
   }

   return (
       <div className="container-fluid">
          <div className="row">
             <div className="col-lg-6 offset-lg-3">
                <div className="auth-box">
                   <div className="a-head">
                      <h4><strong>Восстановление пароля</strong></h4>
                   </div>

                   <AuthSteps currentStep={forgotStep}/>

                   <VerifyPhone
                       verifyType={"forgot"}
                       step={forgotStep}
                       phone={forgotData.phone}
                       code={forgotData.code}
                       handleInputChange={handleChange}
                       handleFormSubmit={handleForgotClick}
                   />
                </div>
             </div>
          </div>
       </div>
   );
};

export default ForgotPassword;