import React, {FC} from 'react';
import Link from "next/link";

interface BrandProps {
   brand_id: number,
   img?: string,
   slug: string
}

const SingleBrand: FC<BrandProps> = ({img, slug, brand_id}) => {
   return (
       <Link
           href={{
              pathname: '/brand/[brand]',
              query: {brand: slug, brand_id}
           }}
           as={`/brand/${slug}?brand_id=${brand_id}`}
       >
          <a className="partner-logo">
             <img
                 src={img}
                 alt={`${slug}-${brand_id}`}
             />
          </a>
       </Link>
   );
};

export default SingleBrand;