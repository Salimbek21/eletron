import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import {useRouter} from "next/router";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {notifySuccess} from "../../../helpers/NotifyBtn"

const ProfileNav = () => {

   const router = useRouter()
   const [nav, setNav] = useState<string | string[]>("")
   const {authLogout, clearUserAddresses} = useTypedDispatch()

   useEffect(() => {
      if (router.query.nav) {
         setNav(router.query.nav)
      }
   }, [])

   useEffect(() => {
      if (router.query.nav) {
         setNav(router.query.nav)
      }
   }, [router])

   const profileNavLinks = [
      {
         link: 'orders',
         name: 'Заказы'
      },
      {
         link: 'address',
         name: 'Адреса'
      },
      // {
      //    link: 'projects',
      //    name: 'Проекты'
      // },
      {
         link: 'settings',
         name: 'Настройки'
      },
   ]

   return (
       <nav className="user-nav">
          <ul className="user-nav-list">
             {
                profileNavLinks.map((link, i) => (
                    <li key={i}>
                       <Link href={`/profile?nav=${link.link}`}>
                          <a className={`${nav === link.link ? 'active' : ''}`}>{link.name}</a>
                       </Link>
                    </li>
                ))
             }

             <li onClick={() => {
                authLogout();
                clearUserAddresses()
                notifySuccess('Вы вышли из аккаунта');
                router.push('/')
             }}>
                Выйти
             </li>
          </ul>
       </nav>
   );
};

export default ProfileNav;