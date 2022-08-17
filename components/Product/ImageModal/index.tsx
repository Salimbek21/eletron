import React, {useEffect, useState} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

// const s = images[0].types?.home_default

// const images = [
//    '//placekitten.com/1500/500',
//    '//placekitten.com/4000/3000',
//    '//placekitten.com/800/1200',
//    '//placekitten.com/1500/1500',
// ];

interface ImageModalProps {
   imgs: string[]
   initialPhoto: number,
   open: boolean,
   toggleOpen: () => void
}

const ImageModal = ({imgs, initialPhoto, open, toggleOpen}: ImageModalProps) => {

   const [photoIndex, setPhotoIndex] = useState<number>(initialPhoto)

   useEffect(() => {
      setPhotoIndex(initialPhoto)
   }, [initialPhoto])

   return (
       <div style={{overflow: "hidden"}}>
          {open && (
              <Lightbox
                  wrapperClassName={"my-image-modal"}
                  enableZoom={true}
                  mainSrc={imgs[photoIndex]}
                  nextSrc={imgs[(photoIndex + 1) % imgs.length]}
                  prevSrc={imgs[(photoIndex + imgs.length - 1) % imgs.length]}
                  onCloseRequest={() => toggleOpen()}
                  onMovePrevRequest={() =>
                      setPhotoIndex(
                          (photoIndex + imgs.length - 1) % imgs.length
                      )
                  }
                  onMoveNextRequest={() =>
                      setPhotoIndex(
                          (photoIndex + 1) % imgs.length,
                      )
                  }
              />
          )}
       </div>
   );
};

export default ImageModal;