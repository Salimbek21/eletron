import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../helpers/theme";
import { ServerStyleSheets } from "@material-ui/core/styles";
import React from "react";
import Favicon from '../components/Favicon'
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <Favicon/>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <html lang="ru" />
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
           */}
                   <meta property="og:image" content="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
            integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
            crossOrigin="anonymous"
          />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-BTK45DY2CZ"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                       window.dataLayer = window.dataLayer || [];
                       function gtag(){dataLayer.push(arguments);}
                       gtag('js', new Date());
                       gtag('config', 'G-BTK45DY2CZ', { page_path: window.location.pathname });
                     `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                     (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                     m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                  
                     ym(83449567, "init", {
                          clickmap:true,
                          trackLinks:true,
                          accurateTrackBounce:true,
                          webvisor:true,
                          ecommerce:"dataLayer"
                     });
                     `,
            }}
          />
          {/*<link rel="stylesheet" type="text/css" href="/static/css/bootstrap.css"/>*/}
          {/*<link rel="stylesheet" type="text/css" href="/static/css/responsive.css"/>*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. register.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. register.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. register.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. register.getInitialProps
  // 3. app.render
  // 4. register.render

  // Render app and register and get the context of the register with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and register rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
