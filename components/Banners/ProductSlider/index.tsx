import React, {FC, useEffect, useState} from 'react';
import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Image} from "../../../store/types/product";
import {motion} from "framer-motion";
import {FaSearchPlus} from "react-icons/fa";
import ImageModal from "../../Product/ImageModal";

interface GalleryProps {
   images: Image[],
   productName: string
}

const Index: FC<GalleryProps> = ({images, productName}) => {

   const [galleryItem, setGalleryItem] = useState<number>(0);
   const [imageModal, setImageModal] = useState<boolean>(false);
   const [deviceWidth, setDeviceWidth] = useState<number>(0)

   const settings: Settings = {
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      arrows: images.length > 3,
      vertical: deviceWidth >= 768,
      verticalSwiping: images.length > 3 && deviceWidth >= 768,
      speed: 300,
      slidesToShow: images.length > 3 ? 3 : images.length > 2 ? 3 : images.length > 1 ? 2 : 1,
      slidesToScroll: images.length > 3 ? 1 : 0,
      swipe: images.length > 3
   };

   useEffect(() => {
      if (window && window.innerWidth)
         setDeviceWidth(window.innerWidth)
   }, [])

   const handleGalleryItem = (i: number) => {
      setGalleryItem(i)
   }

   const prepareModalImages = () => {
      let imgs: (string)[] = []
      if (images.length) {
         images.forEach((item) => {
            // @ts-ignore
            imgs = [...imgs, item.types?.large_default]
         })
      }
      return imgs
   }

   const toggleImageModal = () => {
      setImageModal(prev => !prev)
   }

   const renderSlidePreviews = (images: Image[]) => (
       images.length ?
           images.map((item: Image, i: number) => (
               <div key={i} className="slide-preview">
                  <motion.img
                      initial={{x: 200, opacity: 0}}
                      animate={{x: 0, opacity: 1}}
                      transition={{delay: 0.2 + i / 5}}
                      onClick={() => handleGalleryItem(i)}
                      src={item.types?.large_default}
                      alt={`gallery-${i} ${productName}`}
                  />
               </div>
           ))
           : null
   )

   return (
       <div className="row">
          <div className={`col-md-3 order-2 order-md-1 ${images.length > 3 && deviceWidth >= 768 ? 'mb-6' : ''}`}>
             <div className={`product-photo-gallery ${deviceWidth < 768 ? 'fullwidth' : ''}`}>
                <Slider {...settings}>
                   {renderSlidePreviews(images)}
                </Slider>
             </div>
          </div>

          <div className={`col-md-9 order-1`}>
             <div className="gallery-item" onClick={toggleImageModal}>
                <motion.img
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                    src={
                       // since our parent has getServersideProps
                       // this component will not rerender on slug change
                       // if previous product has 7 images next product might have only 2
                       // in these case we have to check galleryItem
                       images[galleryItem] ?
                           images[galleryItem].types?.large_default
                           : images[0]?.types?.large_default
                    }
                    alt={`gallery-main ${productName}`}
                />
                <FaSearchPlus/>
             </div>
          </div>

          <ImageModal
              imgs={prepareModalImages()}
              initialPhoto={galleryItem}
              open={imageModal}
              toggleOpen={toggleImageModal}
          />


       </div>
   );
};

export default Index;