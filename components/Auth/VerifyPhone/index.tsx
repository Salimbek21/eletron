import React, {useState} from 'react';
import NumberFormat from "react-number-format";
import Timer from "../../../helpers/MyTimer"
import FormPassUpdate from "../ForgotPass/FormPassUpdate";
import RegForm from "../Register/RegForm";

interface VerifyPhoneProps {
   verifyType: string,
   step: number,
   phone: string,
   code: string,

   handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void
   handleFormSubmit(): void
}

const VerifyPhone = ({verifyType, code, handleInputChange, phone, step, handleFormSubmit}: VerifyPhoneProps) => {

   const [isTimeLeft, setTimeLeft] = useState(true)

   return (
       <div className="a-body">
          {
             step === 1 || step === 2 ?
                 <div className="initial-verify">
                    <div>
                       <p className="mb-1">
                          {step === 1 ? 'Номер телефона' : 'Введите код из SMS'}
                       </p>
                       {
                          step === 1 ?
                              <NumberFormat
                                  placeholder={"+998 __ ___ __ __"}
                                  className="verify-element"
                                  name="phone"
                                  value={phone}
                                  onChange={event => handleInputChange(event)}
                                  prefix={'+998'}
                                  format="+998 ## ### ## ##" mask="_"
                                  allowEmptyFormatting
                              />
                              :
                              <div>
                                 <NumberFormat
                                     disabled={!isTimeLeft}
                                     placeholder={"XXXXXX"}
                                     className="verify-element"
                                     name="code"
                                     value={code}
                                     onChange={event => handleInputChange(event)}
                                     format="### ###" mask="_"
                                 />
                                 <div className="code-verify-timer">
                                    <Timer setTimeLeft={setTimeLeft} time={150}/>
                                 </div>
                              </div>
                       }

                    </div>
                    <div className="mt-4 text-right">
                       <button
                           onClick={handleFormSubmit}
                           className="btn main btn-eletron"
                       >
                          {step === 2 ? 'Подтвердить' : 'Отправить SMS'}
                       </button>
                    </div>
                 </div>
                 : step === 3 ?
                 verifyType === "register" ? <RegForm/> : <FormPassUpdate/>
                 : null
          }
       </div>
   );
};

export default VerifyPhone;