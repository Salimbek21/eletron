import React, {useEffect} from 'react';
import NewsCard from "./Card";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useTypedDispatch} from "../../store/hooks/useTypedDispatch";
import SkeletonNews from "../Skeletons/News";

const NewsWrapper = () => {

   const {news, newsLoading} = useTypedSelector(state => state.news)
   const {fetchNews} = useTypedDispatch()

   useEffect(() => {
      if (!news.length)
         fetchNews()
   }, [])

   const renderNews = () => (
       // [0,1,2,3,4].map((news) => (
       //         <NewsCard key={news} />
       //     ))
       news.length ? news.map((news, i) => (
               <NewsCard key={i} {...news} />
           ))
           : <div className={"col-12"}>ничего не найдено...</div>
   )

   return (
       <div className="row">
          {
             newsLoading ? <SkeletonNews count={4}/>
                 : renderNews()
          }
       </div>
   );
};

export default NewsWrapper;