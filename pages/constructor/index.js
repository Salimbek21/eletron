import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/BreadCrumbs";
import ConstructorComponent from "../../components/Constructor";
const Constructor = () => {
  return (
    <>
      <Head>
        {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> */}
        {/* <script src="https://cdn.jsdelivr.net/npm/selectric@1.13.0/public/jquery.selectric.min.js"></script> */}
        <title>Конструктор | Eletron</title>
        <meta
          name="description"
          content={
            "Компания Eletron – официальный партнёр известных мировых брендов. В нашем каталоге вы найдете все: от высокотехнологичных электротехнических приборов, до розеток и систем автоматизации. Мы предлагаем комплексное решение от разработки до установки и сервиса."
          }
        />
        <meta
          name="keywords"
          content={"компания eletron, в ташкенте, в узбекистане"}
        />

        <meta property="og:title" content={"Конструктор | Eletron"} />
        <meta
          property="og:description"
          content={
            "Компания Eletron – официальный партнёр известных мировых брендов. В нашем каталоге вы найдете все: от высокотехнологичных электротехнических приборов, до розеток и систем автоматизации. Мы предлагаем комплексное решение от разработки до установки и сервиса."
          }
        />
        <meta property="og:image" content={"/static/img/brand/ogimage.png"} />
        <meta property="og:url" content={"https://eletron.uz"} />
        <meta property="og:type" content={"website"} />
        <meta property="og:site_name" content="Eletron.uz" />
        <meta property="og:locale" content={"ru_RU"} />
      </Head>

      <Layout>
        <section className="constructorSection">
          <Breadcrumbs />
          <div className="container-fluid">
            {/* <ConstructorComponent /> */}
            {/* <div className="mb-4">
              <h3>Конфигуратор рамок и механизмов </h3>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className={cls.constructorSetting}>
                  <div className={cls.constructorSettingItem}>
                    ОРИЕНТАЦИЯ РАМКИ
                    <div className={cls.constructorFrame}>
                      <div className={cls.constructorFrameHoriz}/>
                    </div>
                  </div>
                </div>
                <div className={cls.constructorImgWrapper}>
                  <img src={"../../static/img/corner.jpg"} alt=""/>
                </div>
              </div>
              <div className="col-lg-4">
                4
              </div>
            </div> */}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Constructor;
