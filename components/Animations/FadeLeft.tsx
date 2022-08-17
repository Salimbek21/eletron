import React, {FC, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {motion, useAnimation} from "framer-motion";

interface FadeLeftWhenVisibleProps {
   className?: string
}

const FadeLeftWhenVisible: FC<FadeLeftWhenVisibleProps> = ({className,children}) => {
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
              visible: {opacity: 1, x: 0},
              hidden: {opacity: 0, x: -100}
           }}
       >
          {children}
       </motion.div>
   );
}

export default FadeLeftWhenVisible