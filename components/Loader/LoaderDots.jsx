import React from 'react';
import * as styles from './loader.module.css'

const LoaderDots = () => {
    return (
        <div className={styles.lds_ellipsis_wrap}>
            <div className={styles.lds_ellipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoaderDots;