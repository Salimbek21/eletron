import React, {useEffect} from 'react';
import Layout from "../../components/Layout";
import UserProfile from "../../components/Profile";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useRouter} from "next/router";
import Cookies from "universal-cookie";

const Profile = () => {

   const {push} = useRouter()
   const {profileInfo} = useTypedDispatch()
   const {userInfo} = useTypedSelector(state => state.profile)

   useEffect(() => {
      const cookies = new Cookies()
      if (!cookies.get('access_token'))
         push('/login')
      else profileInfo()
   }, [])


   return (
       <Layout title="Профиль пользователя">
          <section className="profile-section">
             <UserProfile/>
          </section>
       </Layout>
   );
};

export default Profile;