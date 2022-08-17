import React from 'react';
import ProfileNav from "./Navigation";
import {useRouter} from "next/router";
import UserOrders from "./OrdersTable";
import UserAddresses from "./Addresses";
import UserSettings from "./UserSettings";

const ProfileMain = () => {

   const {query} = useRouter()

   return (
       <div className="profile-data-detail">

          <ProfileNav/>

          {
             query.nav === 'orders' ? <UserOrders/>
                 : query.nav === 'address' ? <UserAddresses />
                 // : query.nav === 'projects' ? <div>projects</div>
                 : query.nav === 'settings' ? <UserSettings/>
                     : null
          }

       </div>
   );
}

export default ProfileMain;