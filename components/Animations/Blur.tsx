import React, {FC, useEffect} from 'react';
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";

interface BlurProps {
   className?: string
}

const Blur:FC<BlurProps> = ({className,children}) => {
   const controls = useAnimation();
   const [ref, inView] = useInView();

   useEffect(() => {
      if (inView) {
         controls.start("visible");
      }
   }, [controls, inView]);

   return (
       <motion.div
           className={className}
           ref={ref}
           animate={controls}
           initial="hidden"
           transition={{duration: 0.3, delay: 0.2}}
           variants={{
              visible: {filter: 'blur(0px)'},
              hidden: {filter: 'blur(8px)'}
           }}
       >
          {children}
       </motion.div>
   );
};

export default Blur;