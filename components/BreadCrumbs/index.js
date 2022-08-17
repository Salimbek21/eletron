import React from 'react';
import { Breadcrumbs } from './next-breadcrumbs'
import {useRouter} from "next/router";

const NBreadCrumbs = (props) => {

   let arr = []
   const {pathname} = useRouter()

   const loopThrough = (crumbs, url) => {
      let counter = 0
      while (crumbs) {
         let exception = counter === 0 && pathname.includes('product')
         arr = [{breadcrumb: crumbs.name, href: `${exception ? '/product' : url}/${crumbs.slug}`}, ...arr]
         crumbs = crumbs.parent
         counter++;
      }
      return arr
   }

   const parseCrumbs = (crumbs, url) => {
      if (crumbs && crumbs.id) {
         let parsedCrumbs = loopThrough(crumbs, url)
         return <Breadcrumbs parsedCrumbs={parsedCrumbs} />
      }
      else {
         return <Breadcrumbs />
      }
   }

   return (
      <div className="container-fluid">
         <div className="row">
            <div className="col-12">
               {parseCrumbs(props.catalogCrumbs, props.url)}
            </div>
         </div>
      </div>
   );
};

export default NBreadCrumbs;