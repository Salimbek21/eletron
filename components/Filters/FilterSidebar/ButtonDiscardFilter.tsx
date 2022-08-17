import React, {FC} from 'react';
import {useRouter} from "next/router";

interface ButtonDiscardFilterProps {
   className?: string
}

const ButtonDiscardFilter:FC<ButtonDiscardFilterProps> = ({className}) => {

   const {push, query, reload} = useRouter()

   const handleDiscard = () => {
      const slug = query.slug
      const page = 1, newBrands = "", newFeatureValues = ""

      // push(`/catalog/${slug}`)
      // reload(`/catalog/${slug}`)
      reload()
   }

   return (
       <div className={"discard-filters"}>
          <a
              href={`/catalog/${query.slug}`}
              onClick={handleDiscard}
              className={"btn silver w-100 text-left " + className}
          >
             Сбросить фильтр
          </a>
       </div>
   );
};

export default ButtonDiscardFilter;