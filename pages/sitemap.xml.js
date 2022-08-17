import axios from 'axios'
import url from "../api/url";

const DOMAIN = "https://eletron.uz";


const createSitemap = (data) => {

   const currentDate = new Date().toISOString();

   let xml = "";

   xml += `
      <url>
        <loc>${DOMAIN}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.0</priority>
      </url>
   `;

   xml += `
      <url>
        <loc>${DOMAIN + "/constructor"}</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
    `;

   xml += `
      <url>
        <loc>${DOMAIN + "/about"}</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
    `;

   xml += `
      <url>
        <loc>${DOMAIN + "/contact"}</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
    `;

   xml += `
      <url>
        <loc>${DOMAIN + "/news"}</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
    `;

   xml += `
      <url>
        <loc>${DOMAIN + "/policy"}</loc>
        <lastmod>${currentDate}</lastmod>
      </url>
    `;

   data.categories.map(category => {
      xml += `<url>
            <loc>${DOMAIN + "/catalog/" + category.slug}</loc>
            <lastmod>${category.updated_at}</lastmod>
            <priority>0.8</priority>
          </url>`;
   });

   data.products.map(product => {
      xml += `<url>
        <loc>${DOMAIN + "/product/" + product.slug}</loc>
        <lastmod>${product.updated_at}</lastmod>
        <priority>0.8</priority>
      </url>`;
   });

   data.posts.map(post => {
      xml += `<url>
        <loc>${DOMAIN + "/news/" + post.slug}</loc>
        <lastmod>${post.updated_at}</lastmod>
        <priority>0.8</priority>
      </url>`;
   });


   return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${xml}
      </urlset>`;
};

export async function getServerSideProps({ res }) {
   const data = await axios(`${url}/api/sitemaps`);

   res.setHeader("Content-Type", "text/xml");
   res.write(createSitemap(data.data));
   res.end();

   return {
      props: {}
   };
}

const SitemapIndex = () => null;
export default SitemapIndex;