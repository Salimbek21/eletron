import React from 'react';
import PriceRefactor from "../Refactors/PriceRefactor";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";

const ProfileSidebar = () => {

   const {userInfo} = useTypedSelector(state => state.profile)

   return (
      <aside className="user-left-sidebar">
         <figure>
            <div className={"avatar"}>
               <img
                   src={userInfo?.image ? userInfo?.image.url : "/static/img/icons/avatar.png"}
                   alt={`${userInfo?.first_name} ${userInfo?.last_name}`}
               />
            </div>
            <figcaption>
               <h5>{userInfo?.first_name} <br />{" "}{userInfo?.last_name}</h5>
            </figcaption>
         </figure>
         <div className="profile-info">
            <div className="cashback">
               Cashback:
                <h5><PriceRefactor price={userInfo?.cashback} noText={true} /></h5>
            </div>
            <div className="phone">
               Номер телефона:
                <h5>+{userInfo?.phone}</h5>
            </div>
         </div>
      </aside>
   );
};

export default ProfileSidebar;