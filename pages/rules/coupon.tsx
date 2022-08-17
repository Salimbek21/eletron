import React from 'react';
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/BreadCrumbs";


const Coupon = () => {
   return (
       <>
          <Head>
             <title>Правила использования купонов на сайте Eletron.uz</title>
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
             <section className="rules-section">
                <Breadcrumbs/>

                <div className="container-fluid">
                   <div className="row mb-4">
                      <div className="col-12">
                         <h4 className={"text-center"}>Правила использования купонов</h4>
                      </div>

                      <div className="mt-5">
                         <p>
                            <strong>1. Один купон может быть использован только один раз.</strong>
                         </p>
                         <p>
                            <strong>2. В одном заказе может быть использован только один купон.</strong>
                         </p>
                         <p>
                            <strong>3. Юридические лица не могут использовать купоны.</strong>
                         </p>
                         <p>
                            <strong>
                               4. Купоны допускаются к использованию исключительно для покупки товаров на сайте
                               shop.eletron.uz.
                            </strong>
                         </p>
                         <p>
                            <strong>5. Купоны не могут быть выданы пользователю наличными или перечислены на банковскую
                               карту.</strong>
                         </p>
                         <p>
                            <strong>6. При использовании cashback использование купона невозможно.</strong>
                         </p>
                         <p>
                            <strong>7. При возврате товара купон использованный в возвращенном заказе сгорает.</strong>
                         </p>

                      </div>
                   </div>


                </div>
             </section>
          </Layout>
       </>
   );
};

export default Coupon;