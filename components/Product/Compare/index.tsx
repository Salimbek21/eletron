import React, {useEffect} from 'react';
import CompareClasses from "./CompareClasses";
import CompareTable from "./CompareTable";
import {useRouter} from "next/router";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import EmptyContainer from "../../EmptyContainer";

const CompareProducts = () => {

   const router = useRouter()
   const {fetchCompare} = useTypedDispatch()
   const {compare} = useTypedSelector(state => state)// typescript validated useSelector
   const {compareProducts, classes} = compare

   useEffect(() => {
      if (!compareProducts.length)    // if comparisons are empty fetch them
         if (router.query.compareClass && router.query.compareClass.length)  // fetch by comparison class if available
            fetchCompare(+router.query.compareClass)
   }, [])


   return (
       <>
          <div
              className={`compare-wrapper ${classes.length > 0 ? '' : 'empty-page'}`}
          >
             <CompareClasses/>
             <CompareTable/>
          </div>
          {
             !(classes.length > 0) &&
             <div className="container-fluid">
                <div className={"row"}>
                   <EmptyContainer type={'compare'} txt={"Список сравнения пуст!"}/>
                </div>
             </div>
          }
       </>

   );
}
;

export default CompareProducts;