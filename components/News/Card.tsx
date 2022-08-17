import React, {FC} from 'react';
import Link from "next/link";
import {HiArrowRight} from "react-icons/hi"
import {News} from "../../store/types/news";

/*

<div className="col-xl-4 col-md-6 col-12 mb-5">
          <div className="news-card">
             <figure>
                <img
                    className="mb-2"
                    src="/static/img/news-test.png"
                    alt="Some news"
                />
                <figcaption className="py-3 px-4">
                   <h5 className="news-title">
                      LEGRAND ПРЕДСТАВИТ НОВЫЕ РЕШЕНИЯ НА
                      «ФОРУМЕ ЭЛЕКТРОТЕХНИКИ И ИНЖЕНЕРНЫХ
                      СИСТЕМ»
                   </h5>
                   <div className="news-description">
                      Группа Legrand представит новые решения в сфере
                      электро установочных изделий, умного дома и
                      автоматических выключателей в рамках форума
                      электротехники и инженерных систем в
                      Екатеринбурге. Мероприятие пройдет 10 июня 2021
                      г. в МВЦ
                   </div>
                </figcaption>
             </figure>
             <Link href="/">
                <a
                    className="news-link"
                >
                   Читать подробнее&nbsp;&nbsp;<HiArrowRight/>
                </a>
             </Link>
          </div>
       </div>




*/


const NewsCard: FC<News> = ({...news}) => {

   return (
       <div className="col-xl-4 col-md-6 col-12 mb-5">
          <div className="news-card">
             <figure>
                <img
                    className="mb-2"
                    src={news.image.url}
                    alt={news.title}
                />
                <figcaption className="py-3 px-4">
                   <h5 className="news-title">
                      {news.title}
                   </h5>
                   <div className="news-description">
                      {news.description_short}
                   </div>
                </figcaption>
             </figure>
             <Link
                 href={{
                    pathname: '/news/[slug]'
                 }}
                 as={`/news/${news.slug}`}
             >
                <a
                    className="news-link"
                >
                   Читать подробнее&nbsp;&nbsp;<HiArrowRight/>
                </a>
             </Link>
          </div>
       </div>
   );
};

export default NewsCard;