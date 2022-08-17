import React, {useEffect, useState} from 'react';

const useDeviceSize = () => {

   const [width, setWidth] = useState(0)

   useEffect(() => {
      setWidth(window.innerWidth)
   }, [])

   return [width]
};

export default useDeviceSize;