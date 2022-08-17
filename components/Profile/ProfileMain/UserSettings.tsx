import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import NumberFormat from "react-number-format";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {notifySuccess} from "../../../helpers/NotifyBtn";

const UserSettings = () => {

   const {userInfo} = useTypedSelector(state => state.profile)
   const {phoneVerified} = useTypedSelector(state => state.auth)
   const {updateProfileInfo, authPasswordChange, authUpdateCode, authUpdatePhone} = useTypedDispatch()

   const getBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
         const fileReader = new FileReader();
         fileReader.readAsDataURL(file)

         fileReader.onload = () => {
            resolve(fileReader.result)
         }

         fileReader.onerror = error => {
            reject(error)
         }
      });
   };

   const [userUpdate, setUserUpdate] = useState<any>({
      //  https://api.rrpo.uz/api/user/info/update
      first_name: '',
      last_name: '',
      image: null, // (binary)
      base64Image: null,
      //  https://api.rrpo.uz/api/auth/code/update
      phone: '',
      code: '',
      //  https://api.rrpo.uz/api/auth/password/change
      old_password: '',
      password: '',
      password_confirmation: '',
   })

   const handleProfileChangeForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
   }

   const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
         let file: any = e.target.files[0]
         const base64 = await getBase64(file)
         // @ts-ignore
         setUserUpdate((prev: any) => ({...prev, image: file, base64Image: base64}))
      } else {
         setUserUpdate((prev: any) => ({...prev, [e.target.name]: e.target.value}))
      }
   }

   const userDetailsUpdate = () => {
      const {first_name, last_name, image} = userUpdate
      const formData = new FormData();
      if (first_name) formData.append("first_name", first_name)
      if (last_name) formData.append("last_name", last_name)
      if (image) formData.append("image", image);
      updateProfileInfo(formData)
   }

   const userChangePass = () => {
      const {old_password, password, password_confirmation} = userUpdate
      authPasswordChange({
         old_password,
         password,
         password_confirmation
      })
      setUserUpdate((prev: any) => ({
         ...prev,
         old_password: '',
         password: '',
         password_confirmation: ''
      }))
   }

   const phoneVerification = () => {
      const formattedPhone = userUpdate.phone.replace(/\s|\+|_/g, '')
      authUpdateCode({phone: formattedPhone})
   }

   const codeVerification = () => {
      const formattedPhone = userUpdate.phone.replace(/\s|\+|_/g, '')
      const formattedCode = userUpdate.code.replace(/\s/g, '')
      authUpdatePhone({phone: formattedPhone, code: formattedCode})
   }

   return (
       <div className={"pb-5"}>
          <h5>Eletron ID: {userInfo?.id}</h5>

          <form className={"row"} onSubmit={handleProfileChangeForm}>

             <div className="col-12 mt-3">
                <p><strong>Персональные данные:</strong></p>
             </div>

             <div className="col-xl-4 mt-xl-0 mt-4">
                <input
                    type="text"
                    name={"first_name"}
                    className={"verify-element"}
                    value={userUpdate.first_name}
                    placeholder={userInfo?.first_name}
                    onChange={handleInputChange}
                />
             </div>

             <div className="col-xl-4 mt-xl-0 mt-4">
                <input
                    type="text"
                    name={"last_name"}
                    className={"verify-element"}
                    value={userUpdate.last_name}
                    placeholder={userInfo?.last_name}
                    onChange={handleInputChange}
                />
             </div>

             <div className="col-12">
             </div>

             <div className="col-xl-4 mt-4">
                <label htmlFor="img-file" className={"verify-element text-center"}>
                   {userUpdate.image?.name ? userUpdate.image?.name : 'Загрузить фото'}
                </label>
                <input
                    id={"img-file"}
                    type={"file"}
                    name={"image"}
                    accept=".jpg, .jpeg, .png, image/*"
                    onChange={handleInputChange}
                    style={{display: 'none'}}
                />
             </div>

             <div className="col-xl-3 mt-4">
                <button
                    type={"button"}
                    className="verify-element action"
                    onClick={userDetailsUpdate}
                >
                   Обновить данные
                </button>
             </div>

             <div className="col-12 mt-4">
                <p>Изменить номер телефона</p>
             </div>

             <div className="col-12">
                <span>Введите новый номер</span>
             </div>

             <div className="col-xl-4 mt-1">
                <NumberFormat
                    placeholder={"+998"}
                    className="verify-element"
                    value={userUpdate.phone}
                    name={'phone'}
                    onChange={handleInputChange}
                    prefix={'+998'}
                    format="+998 ## ### ## ##" mask="_"
                    allowEmptyFormatting
                    required
                    autoComplete={"new-password"}
                />
             </div>

             <div className="col-xl-3">
                <button
                    type={"button"}
                    className="verify-element action"
                    onClick={phoneVerification}
                >
                   Получить код
                </button>
             </div>

             <div className="col-12"></div>

             <div className="col-xl-4 mt-4">
                <NumberFormat
                    placeholder={"XXXXXX"}
                    className="verify-element"
                    name="code"
                    value={userUpdate.code}
                    onChange={handleInputChange}
                    format="### ###" mask="_"
                />
             </div>

             <div className="col-xl-3 mt-4">
                <button
                    type={"button"}
                    className="verify-element action"
                    onClick={codeVerification}
                >
                   Подтверждение
                </button>
             </div>

             <div className="col-12 mt-4">
                <p><strong>Изменить пароль:</strong></p>
             </div>


             <div className="col-xl-4 mt-xl-0 mt-4">
                <input
                    type="password"
                    name={"old_password"}
                    className={"verify-element"}
                    value={userUpdate.old_password}
                    placeholder={"Старый пароль"}
                    onChange={handleInputChange}
                />
             </div>

             <div className="col-12">
             </div>

             <div className="col-xl-4 mt-4">
                <input
                    type="password"
                    name={"password"}
                    className={"verify-element"}
                    value={userUpdate.password}
                    placeholder={"Новый пароль"}
                    onChange={handleInputChange}
                />
             </div>

             <div className="col-12">
             </div>

             <div className="col-xl-4 mt-4">
                <input
                    type="password"
                    name={"password_confirmation"}
                    className={"verify-element"}
                    value={userUpdate.password_confirmation}
                    placeholder={"Подтвердите новый пароль"}
                    onChange={handleInputChange}
                />
             </div>

             <div className="col-xl-3 mt-4">
                <button
                    type={"button"}
                    className="verify-element action"
                    onClick={userChangePass}
                >
                   Обновить пароль
                </button>
             </div>

          </form>
       </div>
   );
};

export default UserSettings;