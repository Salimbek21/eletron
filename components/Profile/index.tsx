import React from 'react';
import ProfileSidebar from "./ProfileSidebar";
import ProfileMain from "./ProfileMain";

const UserProfile = () => {
   return (
       <div className="container-fluid">
          <div className="row">
             <div className="col-lg-3">
                <ProfileSidebar/>
             </div>
             <div className="col-lg-9">
                <ProfileMain/>
             </div>
          </div>
       </div>
   );
};

export default UserProfile;