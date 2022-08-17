import React from 'react';
import HomeBanner from "../../components/Banners/HomeBanner";
import Layout from "../../components/Layout";
import BannerHalf from "../../components/Banners/BannerHalf";
import BannerFull from "../../components/Banners/BannerFull";
import Brands from "../../components/Brands";
import ProductSection from "../../components/ProductSection";
import Head from "next/head";
import Blur from "../../components/Animations/Blur";

const Home = () => {

   return (
      <>
         <Head>

            <meta property="og:image" content="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>Магазин решений электрических и информационных сетей в Ташкенте | Eletron</title>
            <meta name="description"
               content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"} />
            <meta name="keywords" content={"электрические системы зданий, информационные системы зданий, сетевые светодиоды, сетевые системы, освещение IOT, высоковольтные кабельные крепления, монтажные системы, платформа IOT, умный дом, купить в ташкенте, в узбекистане"} />
            <meta name="author" content="Eletron" />

            <meta property="og:title"
               content={"Магазин решений электрических и информационных сетей в Ташкенте | Eletron"} />
            <meta property="og:description"
               content={"Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!"} />

            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta property="og:url" content={"https://eletron.uz"} />
            <meta property="og:type" content={"website"} />
            <meta property="og:site_name" content="Eletron.uz" />
            <meta property="og:locale" content={"ru_RU"} />
         </Head>
         <Layout>
            <main>
               <div>
                  <div className="container-fluid">

                     <div className="row">
                        <div className="col-12">
                           <HomeBanner />
                        </div>
                     </div>

                     <Blur>
                        <ProductSection title={"Популярные товары"} type={"popular_products"} />
                     </Blur>

                     <div className={"row mb-5"}>
                        <BannerHalf />
                     </div>

                     <Blur>
                        <ProductSection title={"Новые поступления"} type={"new"} />
                     </Blur>

                     {/*<div className="row mb-4">*/}
                     {/*   <BannerHalf/>*/}
                     {/*</div>*/}

                     <div className="row mb-5">
                        <BannerFull />
                     </div>

                     <Blur>
                        <ProductSection title={"Наша рекомендация"} type={"recommended_products"} />
                     </Blur>

                     <Blur className={"row mb-5"}>
                        <div className="col-12 mb-4">
                           <h3>Бренды</h3>
                        </div>
                        <Brands />
                     </Blur>

                  </div>
               </div>
            </main>
         </Layout>
      </>
   );
};

export default Home;