import React, {FC} from 'react';
import {Skeleton} from "@material-ui/lab";

interface SkeletonProps {
   count: number,
   type?: string
}

const SkeletonNews: FC<SkeletonProps> = ({count, type = "section"}) => {

   const responsiveClass = 'col-xl-4 col-md-6 col-12 mb-5';

   const newsSkeletonRenderer = () => {
      let skeletons: any[] = [];
      for (let i = 0; i < count; i++) {
         skeletons = [
            ...skeletons,
            (
                <div key={`skeleton-news ${i}`} className={responsiveClass}>
                   <div className="news-card">
                      <Skeleton
                          className="mb-3"
                          variant="rect"
                          width="100%"
                          height={300}
                          style={{borderRadius: '10px 10px 0 0'}}
                      />
                      <div className="px-4">
                         <Skeleton/>
                         <Skeleton className="mb-2"/>
                         <Skeleton width="60%"/>
                      </div>
                      <div className="px-4 d-flex justify-content-end align-items-start">
                         <Skeleton
                             className="mt-2"
                             height={50}
                             width="35%"
                             style={{borderRadius: 10}}
                         />
                      </div>
                   </div>
                </div>
            )
         ]
      }
      return skeletons
   }

   return (
       <>
          {newsSkeletonRenderer()}
       </>
   )
};

export default SkeletonNews;