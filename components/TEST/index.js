import React from 'react';
import * as styles from './test.module.css'
import test from "./test"

const TEST = () => {
   return (
       <div className={styles.test}>
          Test
          {test()}
       </div>
   );
};

export default TEST;