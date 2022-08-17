import React from 'react';
import Layout from "../../components/Layout";
import Head from "next/head";
import SiteContacts from "../../components/Contacts";
import Breadcrumbs from "../../components/BreadCrumbs";

const AboutUs = () => {
   return (
       <>
          <Head>
             <title>О компании | Eletron</title>
             <meta name="description"
                   content={"Компания Eletron – официальный партнёр известных мировых брендов. В нашем каталоге вы найдете все: от высокотехнологичных электротехнических приборов, до розеток и систем автоматизации. Мы предлагаем комплексное решение от разработки до установки и сервиса."}/>
             <meta name="keywords" content={"компания eletron, в ташкенте, в узбекистане"}/>

             <meta property="og:title" content={"О компании | Eletron"}/>
             <meta property="og:description"
                   content={"Компания Eletron – официальный партнёр известных мировых брендов. В нашем каталоге вы найдете все: от высокотехнологичных электротехнических приборов, до розеток и систем автоматизации. Мы предлагаем комплексное решение от разработки до установки и сервиса."}/>
             <meta property="og:image" content={"/static/img/brand/ogimage.png"}/>
             <meta property="og:url" content={"https://eletron.uz"}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>

          <Layout>


             <section className="contact-section">
                <Breadcrumbs/>

                <div className="container-fluid">
                   <div className="row mb-4">
                      <div className="col-12 text-center">
                         <h3 className={"mb-4"}>О нас</h3>
                         <h4 className={"bordered-heading"}>ПРЕТВОРЯЕМ ПРОЕКТЫ В РЕАЛЬНОСТЬ</h4>
                         <p className={"about-paragraph"}>
                            Eletron является партнером известных мировых компаний в данном направлении мы создаём сеть
                            качественных
                            мульти-брендовых шоурмов по всей стране. Обладая большим ассортиментом продукции мы
                            предлагаем своим клиентам
                            электротехнические приборы от промышленных трансформаторов до дизайнерских розеток, включая
                            освещение,
                            дизельные генераторы, источники бесперебойного питания, автоматизацию, а также услуги по
                            интеграции и
                            по внедрению решений.
                         </p>
                      </div>
                   </div>

                   <SiteContacts/>
                </div>
             </section>

          </Layout>
       </>
   );
};

export default AboutUs;