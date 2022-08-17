import React, {useEffect, useState} from 'react';
import Slider, {Settings, CustomArrowProps} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {GrNext, GrPrevious} from "react-icons/gr";
import {useRouter} from "next/router";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {Banner} from "../../../store/types/banner";
import {Skeleton} from "@material-ui/lab";

const HomeBanner = () => {

   const {fetchBanners} = useTypedDispatch();
   const {banners, loading} = useTypedSelector(state => state.banners);
   const [deviceWidth, setDeviceWidth] = useState<number>(0);
   const router = useRouter()

   useEffect(() => {
      if (!banners.length) {
         fetchBanners()
      }
      setDeviceWidth(window.innerWidth)
   }, [])

   // To avoid warning caused by Slick, we have to override slick's arrow components
   const SlickArrowLeft = ({currentSlide, slideCount, ...props}: CustomArrowProps) => (
       <GrPrevious
           {...props}
           className={
              "slick-prev slick-arrow" +
              (currentSlide === 0 ? " slick-disabled" : "")
           }
           aria-hidden="true"
           aria-disabled={currentSlide === 0}
           type="button"
       >
       </GrPrevious>
   )

   const SlickArrowRight = ({currentSlide, slideCount, ...props}: CustomArrowProps) => (
       <GrNext
           {...props}
           className={
              "slick-next slick-arrow" +
              (currentSlide === (slideCount && slideCount - 1) ? " slick-disabled" : "")
           }
           aria-hidden="true"
           // @ts-ignore
           aria-disabled={currentSlide === slideCount - 1}
           type="button"
       >
       </GrNext>
   )


   const settings: Settings = {
      autoplay: true,
      infinite: true,
      accessibility: true,
      autoplaySpeed: 5000,
      speed: 450,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <SlickArrowRight/>,
      prevArrow: <SlickArrowLeft/>,
   };

   const handleUrl = (url: string) => {
      router.push(url)
   }

   const renderBanners = () => (
       banners.map((banner: Banner, i: number) => (
           <figure
               key={i}
               className={`home-banner-figure ${banner.url && banner.url.length ? 'c-pointer' : ''}`}
               onClick={() => banner.url && banner.url.length ? handleUrl(banner.url) : null}
           >
              <img
                  src={deviceWidth <= 768 ? banner.image?.url : banner.background?.url}
                  alt={`Eletron b-card ${banner.id}`}
              />
              {/*<div className="overlay"></div>*/}
              <figcaption>
              </figcaption>
           </figure>
       ))
   )


   return (
       <Slider {...settings} className="banner-home-wrap">
          {/*<figure className="home-b-card-figure">*/}
          {/*   <img src="/static/img/b-card/1.jpg" alt="Banner 1"/>*/}
          {/*   <div className="overlay"></div>*/}

          {/*   <figcaption>*/}
          {/*      <h5>Умные решения <br/>*/}
          {/*         для умного дома*/}
          {/*      </h5>*/}

          {/*      <Link href={"/"}>*/}
          {/*         <a className="btn-eletron main font-weight-bold">*/}
          {/*            Подробнее*/}
          {/*         </a>*/}
          {/*      </Link>*/}

          {/*   </figcaption>*/}
          {/*</figure>*/}

          {
             loading ? <Skeleton variant="rect" width={'100%'} height={350}/> : renderBanners()
          }
       </Slider>
   );
};

export default HomeBanner;