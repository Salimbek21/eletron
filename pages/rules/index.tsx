import React, {useEffect} from 'react';
import {useRouter} from "next/router";

const RulesIndex = () => {
   const router = useRouter()

   useEffect(() => {
      router.push('/rules/site-usage')
   }, [])

   return <></>
};

export default RulesIndex;