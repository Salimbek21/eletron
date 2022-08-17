import React from 'react';
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/BreadCrumbs";
import SiteContacts from "../../components/Contacts";

const Contact = () => {
   return (
       <>
          <Head>
             <title>Наши контакты | Eletron.uz</title>
             <meta name="description"
                   content={"Контактная информация интернет-магазина Eletron.uz. Телефоны, адреса и схема проезда."}/>
             <meta name="keywords" content={"контакты магазина eletron.uz"}/>

             <meta property="og:title" content={"Наши контакты | Eletron.uz"}/>
             <meta property="og:description"
                   content={"Контактная информация интернет-магазина Eletron.uz. Телефоны, адреса и схема проезда."}/>
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
                      <div className="col-12">
                         <h4>Контакты</h4>
                      </div>
                   </div>

                   <SiteContacts />
                </div>


             </section>
          </Layout>


       </>
   );
};

export default Contact;