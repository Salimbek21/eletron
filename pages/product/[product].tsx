import React, {FC} from 'react';
import Layout from "../../components/Layout";
import ProductSlider from "../../components/Banners/ProductSlider";
import General from "../../components/Product/Characteristics/General";
import MainButton from "../../components/Buttons/MainButton";
import Detailed from "../../components/Product/Characteristics/Detailed";
import SimilarProducts from "../../components/Product/Similar";
import {GetServerSideProps} from 'next'
import axios from 'axios';
import url from '../../api/url';
import {Feature} from "../../store/types/product";
import Cookies from "universal-cookie";
import Head from "next/head";
import Breadcrumbs from "../../components/BreadCrumbs";
import {Category} from "../../store/types/category";

interface CategoryWithParent extends Category {
   parent: CategoryWithParent
}

interface ProductProps {
   singleProduct: {
      id: number;
      slug: string;
      name: string;
      images: [
         {
            url?: string;
            types?: {
               home_default?: string;
               large_default?: string;
               small_default?: string;
            };
         }
      ];
      categories: CategoryWithParent[];
      is_new: number;
      is_in_comparison: number;
      is_in_cart: number;
      favorite: number;
      random_shop: {
         item_shop_id: number;
         quantity: number;
         price: number;
         reference: string;
         shop_reference: string;
         discount?: {
            price: number
         }
      };
      brand: {
         name: string,
         image?: {
            url?: string
         }
      },
      description: string,
      meta_description: string,
      meta_keywords: string,
      meta_title: string,
      features: Feature[]
   }
}

const ProductPage: FC<ProductProps> = ({singleProduct}) => {

   const {
      meta_description,
      meta_keywords, meta_title, name,
      images, random_shop, brand, features, id,
      is_in_comparison, favorite, slug, is_in_cart
   } = singleProduct;

   return (
       <>
          <Head>
             <title>{meta_title}</title>
             <meta charSet="UTF-8"/>
             <meta name="description" content={meta_description}/>
             <meta name="keywords" content={meta_keywords}/>

             <meta property="og:title" content={meta_title}/>
             <meta property="og:description" content={meta_description}/>
             <meta property="og:image" content={images[0]?.types?.home_default}/>
             <meta property="og:url" content={`https://eletron.uz/product/${slug}`}/>
             <meta property="og:type" content={"website"}/>
             <meta property="og:site_name" content="Eletron.uz"/>
             <meta property="og:locale" content={"ru_RU"}/>
          </Head>

          <Layout
              title={meta_title}
              description={meta_description}
              keywords={meta_keywords}
              img={images[0]?.types?.home_default}
          >
             <Breadcrumbs
                 catalogCrumbs={{slug, name, id, parent: singleProduct.categories[0]}}
                 url={"/catalog"}
             />


             <section className="product-section">
                <div className="container-fluid">
                   <div className="row pb-7">
                      <div className="col-lg-8 col-xl-6">
                         <ProductSlider
                             images={images}
                             productName={name}
                         />
                      </div>
                      <div className="col-lg-4 col-xl-6">
                         <General
                             id={random_shop.item_shop_id}
                             product_id={id}
                             isInCompare={is_in_comparison}
                             isInFavourite={favorite}
                             isInCart={is_in_cart}
                             name={name}
                             price={random_shop.price}
                             discountPrice={random_shop.discount?.price}
                             stockQuant={random_shop.quantity}
                             reference={random_shop.shop_reference}
                             brandName={brand.name}
                             brandImg={brand.image?.url}
                             features={features}
                         />
                      </div>
                   </div>
                </div>

                {
                   features && features.length ?
                       <div className="bg-light pt-5">
                          <div className="container-fluid">
                             <div className="row">
                                <div className="col-12 product-specs">
                                   <MainButton txt={"Характеристики"} bold={true}/>
                                   <Detailed
                                       features={features}
                                       description={singleProduct.description}
                                   />
                                </div>
                             </div>
                          </div>
                       </div>
                       : null
                }


                <div className="pb-6 pt-5">
                   <div className="container-fluid">
                      <div className="row">
                         <div className="col-12">
                            <SimilarProducts product_id={id}/>
                         </div>
                      </div>
                   </div>
                </div>

             </section>
          </Layout>
       </>
   );
}


export const getServerSideProps: GetServerSideProps = async (context) => {

   let data = {};
   const cookies = new Cookies(context.req.headers.cookie)

   await axios.get(`${url}/api/products?slug=${context.query.product}`,
       {
          //// I have to use params to pass "device_token, device_type", bcs requests with headers failed
          params: {
             device_token: cookies.get('device_token'),
             device_type:  cookies.get('device_type'),
             resource: context.req.headers.host
          }
          //// Because of axios Headers SEO did not work at all, "og" tags did not work
          // headers: {
          //    'Device-Token': cookies.get('device_token'),
          //    'Device-Type': cookies.get('device_type')
          // }
       })
       .then(res => data = res.data.data)
       .catch(e => {
          // for some reason it is not reaching this line when product is not found
          context.res.statusCode = 302
          context.res.setHeader('Location', `/404`)
          return {props: {}}
       })

   // same as in catch -> it will redirect to 404
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
         singleProduct: data
      }
   }
}

export default ProductPage;