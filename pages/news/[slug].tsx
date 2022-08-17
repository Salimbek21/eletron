import React from 'react';
import Layout from "../../components/Layout";
import {GetServerSideProps} from "next";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../../api/url";
import Head from "next/head";

const NewsPage = ({news}: any) => {

   const createMarkup = (html: any) => {
      return {__html: html};
   }

   return (
       <>
          <Head>
             <title>{news.meta_title}</title>
             <meta charSet="UTF-8"/>
             <meta name="description" content={news.meta_description}/>
             <meta name="keywords" content={news.meta_keywords}/>

             <meta property="og:title" content={news.meta_title}/>
             <meta property="og:description" content={news.meta_description}/>
             <meta property="og:image" content={"/static/img/brand/ogimage.png"}/>
             <meta property="og:url" content={`https://eletron.uz/news/${news.slug}`}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>

          <Layout>
             <div className="container-fluid">
                <div className="row">
                   <div className="col-12">
                      <div className="py-5">
                         <h3 className="mb-3 text-center">{news.title}</h3>

                         {
                            news.image && news.image.url ?
                                <img
                                    src={news.image.url}
                                    alt={news.title}
                                    className="img-fluid m-auto"
                                    style={{objectFit: 'contain', height: 400}}
                                />
                                : null
                         }

                         <div className="mt-4" dangerouslySetInnerHTML={createMarkup(news.description)}>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </Layout>
       </>
   );
};


export const getServerSideProps: GetServerSideProps = async (context) => {

   let data = {};
   const cookies = new Cookies(context.req.headers.cookie)

   await axios.get(`${url}/api/posts?slug=${context.query.slug}`,
       {
          params: {
             device_token: cookies.get('device_token'),
             device_type: cookies.get('device_type')
          }
       })
       .then(res => data = res.data.data)
       .catch(e => {
          context.res.statusCode = 302
          context.res.setHeader('Location', `/404`)
          return {props: {}}
       })

   if (!data.hasOwnProperty('id')) {
      return {
         redirect: {
            permanent: false,
            destination: "/404",
         },
         props: {},
      };
   }

   return {
      props: {
         news: data
      }
   }
}

export default NewsPage;