import React from 'react';
import Layout from "../components/Layout";

const Page404 = () => {
   return (
       <Layout>
          <section className="section-404">
             <div className="container-fluid">
                <div className="row">
                   <div className="col-xl-5">
                      <div className="text-404">
                         <h1>404</h1>
                         <h4>страница не найдена</h4>
                      </div>
                   </div>
                   <div className="col-xl-6 offset-xl-1 offset-md-2 col-md-8 px-5">
                      <img src="/static/img/404-img.png" alt="404 image"/>
                   </div>
                </div>
             </div>
          </section>
       </Layout>
   );
};

export default Page404;