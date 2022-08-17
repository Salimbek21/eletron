import React from 'react';
import styles from './loader.module.css'

const LoaderCircle = () => {
   return (
       <div className={styles.preloader}>
          <div className={styles.pulse}>
          </div>
       </div>
   );
};

export default LoaderCircle;