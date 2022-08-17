import React from 'react';
import SiteInfo from "./SiteInfo";
import ContactMap from "./Map";

const SiteContacts = () => {
   return (
       <div className="row">
          <div className="col-xl-5">
             <SiteInfo />
          </div>
          <div className="col-xl-7">
             <ContactMap />
          </div>
       </div>
   );
};

export default SiteContacts;