import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import CompareProducts from "../../components/Product/Compare";
import Head from "next/head";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import LoaderCircle from "../../components/Loader/LoaderCircle";

const Compare = () => {
   const {classes} = useTypedSelector(state => state.compare)
   const [isLoading, setLoading] = useState<boolean>(true)

   useEffect(() => {
      setTimeout(() => {
         setLoading(false)
      }, 1000)
   }, [])

   return (
       <>
          <Head>
             <title>Сравнение товаров</title>
             <meta name="description"
                   content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
             <meta name="keywords" content={"электрические системы зданий, информационные системы зданий, сетевые светодиоды, сетевые системы, освещение IOT, высоковольтные кабельные крепления, монтажные системы, платформа IOT, умный дом, купить в ташкенте, в узбекистане"}/>

             <meta property="og:title" content={"Магазин решений электрических и информационных сетей в Ташкенте | Eletron"}/>
             <meta property="og:description"
                   content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"}/>
             <meta property="og:image" content={"/static/img/brand/ogimage.png"}/>
             <meta property="og:url" content={"https://eletron.uz"}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>

          <Layout>
             <section className="compare-section">
                <div className="container-fluid">
                   <div className="row">
                      {
                         isLoading ?
                             <div className={"col-12"}>
                                <LoaderCircle/>
                             </div>
                             : !isLoading && classes.length > 0
                             ?
                             <div className="col-12">
                                <h5 className="mb-5"><strong>Сравнение</strong></h5>
                             </div>
                             : null
                      }
                   </div>
                </div>


                <div style={{opacity: !isLoading ? 1 : 0}}>
                   <CompareProducts/>
                </div>


             </section>
          </Layout>
       </>
   );
};

export default Compare;