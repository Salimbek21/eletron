import React, {FC, useEffect} from 'react';
import {Feature} from "../../../store/types/product";

interface DetailedProps {
   features: Feature[],
   description?: string
}

const Detailed: FC<DetailedProps> = ({features, description}) => {

   const renderFeatures = () => (
       features.map((item, i: number) => (
           <li className="mb-3" key={i}><strong>{item.name}</strong><span>{item.value}</span></li>
       ))
   )

   // const createMarkup = (html: any) => {
   //    return {__html: html};
   // }

   return (
       <div>
          <ul className="detailed-prod-info">
             {
                // features.length ?
                    renderFeatures()
                    // :
                    // <div dangerouslySetInnerHTML={createMarkup(description)}>
                    // </div>
             }
          </ul>
       </div>
   );
};

export default Detailed;