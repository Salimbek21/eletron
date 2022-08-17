import React, {useEffect, useState} from 'react';
import {Form, Formik, Field} from "formik";
import {object, string} from "yup";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {notifySuccess} from "../../../helpers/NotifyBtn"
import {useRouter} from "next/router";



const FormPassUpdate = () => {

   const {push} = useRouter()

   const [formFailed, setFormFailed] = useState(false)
   const {authPasswordUpdate} = useTypedDispatch()
   const {userPassUpdated, phoneVerified} = useTypedSelector(state => state.auth)

   useEffect(() => {
      if(userPassUpdated) {
         notifySuccess("Пароль успешно изменён")
         push('/login')
      }
   }, [userPassUpdated])

   const yupStringValidation = (field: string) => {
      return string().required(`Поле ${field} не может быть пустым`).min(1).max(100)
   }

   return (
       <div className="registration-form">
          <Formik
              initialValues={{
                 password: '',
                 password_confirmation: ''
              }}
              validationSchema={object({
                 password: yupStringValidation('Пароль'),
                 password_confirmation: yupStringValidation('Пароль'),
              })}
              onSubmit={async (values) => {
                 await authPasswordUpdate({...values, id: phoneVerified?.id, key: phoneVerified?.key})
              }}
          >
             {({values, errors, isSubmitting}) => (
                 <Form autoComplete={"off"}>


                    <div className="mb-3">
                       <p className="mb-1">
                          {errors.password && formFailed?
                              <span className={"alert-danger px-2 py-1 br-6"}>{errors.password}</span>
                              : 'Пароль'}
                       </p>
                       <Field
                           name={"password"}
                           type={"password"}
                           className={"verify-element"}
                           placeholder={"Введите пароль"}
                       />
                    </div>


                    <div className="mb-3">
                       <p className="mb-1">
                          {errors.password_confirmation && formFailed?
                              <span className={"alert-danger px-2 py-1 br-6"}>{errors.password_confirmation}</span>
                              : 'Подтверждение Пароля'}
                       </p>
                       <Field
                           name={"password_confirmation"}
                           type={"password"}
                           className={"verify-element"}
                           placeholder={"Подтвердите пароль"}
                       />
                    </div>


                    <div className={"text-right"}>
                       <button
                           type="submit"
                           disabled={isSubmitting}
                           className="btn main btn-eletron"
                           onClick={() => setFormFailed(true)}
                       >
                          {isSubmitting ? 'Подтверждается' : 'Подтвердить'}
                       </button>
                    </div>
                 </Form>
             )}
          </Formik>
       </div>
   );
};

export default FormPassUpdate;