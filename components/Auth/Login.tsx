import React, { useEffect, useState } from 'react';
import NumberFormat from "react-number-format";
import Link from "next/link";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { notifySuccess } from "../../helpers/NotifyBtn"
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const Login = () => {

   const [registerData, setRegisterData] = useState({
      phone: "",
      password: ""
   })
   const { push } = useRouter()
   const { authLogin, profileInfo } = useTypedDispatch()
   const { userLogin } = useTypedSelector(state => state.auth)

   const { phone, password } = registerData

   useEffect(() => {
      const cookies = new Cookies()
      if (cookies.get('access_token'))
         push('/profile?nav=orders')
      else handleLogin()
   }, [userLogin])

   const handleLogin = async () => {
      if (userLogin) {
         notifySuccess('Вы успешно авторизовались')
         await profileInfo()
         push('/profile?nav=orders')
      }
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value })
   }

   const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const phone = registerData.phone.replace(/\s|\+|_/g, '')
      authLogin({ ...registerData, phone })
   }

   return (
      <div className="container-fluid">
         <div className="row">
            <div className="col-lg-6 offset-lg-3">
               <div className="auth-box">
                  <form onSubmit={handleAuth}>
                     <div className="a-head">
                        <h4><strong>Авторизация</strong></h4>
                     </div>
                     <div className="a-body">
                        <div>
                           <p className="mb-1">Логин</p>
                           <NumberFormat
                              placeholder={"+998 __ ___ __ __"}
                              className="verify-element"
                              name="phone"
                              value={phone}
                              onChange={handleChange}
                              prefix={'+998'}
                              format="+998 ## ### ## ##" mask="_"
                              allowEmptyFormatting
                           />
                        </div>
                        <div className="mt-4">
                           <p className="mb-1">Пароль</p>
                           <input
                              type="password"
                              name="password"
                              value={password}
                              onChange={handleChange}
                              className="verify-element"
                              placeholder={"Введите пароль"}
                           />
                        </div>
                        <div className="mt-4 d-flex justify-content-between align-items-center">
                           <div className="pass-forgot">
                              <Link href={"/forgot-password"}>
                                 <a>
                                    Забыли пароль?
                                 </a>
                              </Link>
                              <Link href={"/register"}>
                                 <a className="mt-3">
                                    Зарегистрироваться
                                  </a>
                              </Link>
                           </div>
                           <button
                              className="btn main btn-eletron"
                              type={"submit"}
                           >
                              Войти
                            </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;