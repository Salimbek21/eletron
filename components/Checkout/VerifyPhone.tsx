import React, {FC, useEffect, useState} from 'react';
import NumberFormat from "react-number-format";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {CheckoutFormData} from "../../pages/checkout";
import {notifySuccess} from "../../helpers/NotifyBtn";


interface VerifyPhoneProps {
   formData: CheckoutFormData,

   setFormData(formData: CheckoutFormData): void
}

const VerifyPhone: FC<VerifyPhoneProps> = ({formData, setFormData}) => {

       const [phone, setPhone] = useState<string>("")
       const [code, setCode] = useState<string>("")
       const {phoneVerified} = useTypedSelector(state => state.auth)
       const {authUpdateCode, authVerifyPhone} = useTypedDispatch()

       const phoneVerification = () => {
          const formattedPhone = phone.replace(/\s|\+|_/g, '')
          authUpdateCode({phone: formattedPhone})
       }

       const codeVerification = () => {
          const formattedPhone = phone.replace(/\s|\+|_/g, '')
          const formattedCode = code.replace(/\s/g, '')
          authVerifyPhone({phone: formattedPhone, code: formattedCode})
       }

       const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.name === 'phone')
             setPhone(e.target.value)
          else if (e.target.name === 'code')
             setCode(e.target.value)
       }

       useEffect(() => {
          if (phoneVerified?.id) {
             notifySuccess(phoneVerified.message)
             setFormData({...formData, user_id: phoneVerified.id.toString(), user_key: phoneVerified.key})
          }
       }, [phoneVerified])

       return (
           <form autoComplete={"off"} className="verify-phone-form row mb-5">
              <div className="col-xl-3 col-md-9">
                 <NumberFormat
                     placeholder={"+998"}
                     className="verify-element"
                     value={phone}
                     name={'phone'}
                     onChange={handleChange}
                     prefix={'+998'}
                     format="+998 ## ### ## ##" mask="_"
                     allowEmptyFormatting
                     required
                     autoComplete={"new-password"}
                 />
              </div>

              <div className="col-xl-3 col-md-3">
                 <button
                     type={"button"}
                     className="verify-element action"
                     onClick={phoneVerification}
                 >
                    Получить код
                 </button>
              </div>

              <div className="col-xl-6"></div>

              <div className="col-xl-3 col-md-9 mt-4">
                 <NumberFormat
                     placeholder={"XXXXXX"}
                     className="verify-element"
                     name="code"
                     value={code}
                     onChange={handleChange}
                     format="### ###" mask="_"
                 />
              </div>

              <div className="col-xl-3 col-md-3 mt-4">
                 <button
                     type={"button"}
                     className="verify-element action"
                     onClick={codeVerification}
                 >
                    Подтверждение
                 </button>
              </div>
           </form>
       );
    }
;

export default VerifyPhone;