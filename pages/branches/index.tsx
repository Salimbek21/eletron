import React from 'react';
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/BreadCrumbs";
import ContactMap from "../../components/Contacts/Map";

const Branches = () => {
   return (
       <>
          <Head>
             <title>Адреса магазинов Eletron</title>
             <meta name="description"
                   content={"Адреса розничных магазинов и пунктов самовывоза Eletron. Посмотреть схему проезда и узнать режим работы."}/>
             <meta name="keywords" content={"магазины сети eletron, eletron ташкент, магазин eletron, магазин электрики, магазин розеток в узбекистане"}/>

             <meta property="og:title" content={"Адреса магазинов Eletron"}/>
             <meta property="og:description"
                   content={"Адреса розничных магазинов и пунктов самовывоза Eletron. Посмотреть схему проезда и узнать режим работы."}/>
             <meta property="og:image" content={"/static/img/brand/ogimage.png"}/>
             <meta property="og:url" content={"https://eletron.uz"}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>

          <Layout>
             <div className="branch-section">
                <Breadcrumbs/>
                <div className="container-fluid">
                   <div className="row mb-4">
                      <div className="col-12">
                         <h4>Наши Магазины</h4>
                      </div>
                   </div>

                   <div className="row">
                      <div className="col-xl-3">
                         <div className={"pr-3"}>
                            <h5 className="mb-4">Eletron.uz</h5>
                            <p className="address">Узбекистан, г.Ташкент, улица Усмана Насыра, 23</p>
                            <p className={"d-flex justify-content-between"}>
                               <strong>Понедельник - Суббота</strong>
                               <strong>10:00-19:00</strong>
                            </p>
                         </div>
                         <br/>
                         <div className={"pr-3"}>
                            <h5 className="mb-4">Eletron.uz</h5>
                            <p className="address">Узбекистан, г.Ташкент, ул. А.Каххара, 49А.</p>
                            <p className={"d-flex justify-content-between"}>
                               <strong>Понедельник – Пятница</strong>
                               <strong>10:00-18:00</strong>
                            </p>
                         </div>
                      </div>
                      <div className="col-xl-9">
                         <ContactMap/>
                      </div>
                   </div>
                </div>
             </div>
          </Layout>
       </>
   );
};

export default Branches;