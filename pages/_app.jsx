import React, { useEffect } from "react";
import Head from "next/head";
import App from "next/app";
import { wrapper } from "../store/store";
import Router, { withRouter } from "next/router";
import NProgress from "nprogress";
import theme from "../helpers/theme"; // needed for Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { motion, AnimatePresence } from "framer-motion";
import "nprogress/nprogress.css";


/*-- My WebStorm automatically compiles scss to css --*/
/*-- This project is done by me Ismoil and I have configured it to my needs --*/
import "../styles/bootstrap.css";
import "../styles/eletron-scss.scss";
import "../styles/responsive.scss";
/*
   If you are new to this project, open your own styles file and use it
   Or you can do any changes to scss files, but in this case you need to import scss files not css
   just comment lines above and uncomment following imports of styles
*/
//import "../styles/bootstrap.css"
//import "../styles/eletron-scss.scss"
//import "../styles/responsive.scss"

/* progress bar on top */
NProgress.configure({ showSpinner: true });
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function FacebookPixel() {
  React.useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(process.env.fbp);
        ReactPixel.pageView();

        Router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  });
  return null;
}

const MyApp = (props) => {
  // static async getInitialProps({Component, ctx}) {
  //    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  //    //Anything returned here can be accessed by the client
  //    return {pageProps: pageProps};
  // }

  const { Component, pageProps, router } = props;

  const handleRouteChange = (url) => {
    window.gtag("config", "G-BTK45DY2CZ", {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    window.ym(83449567, "hit", window.location.href);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 100,
    when: "afterChildren",
  };

  return (
    <div>
    <Head>
    <link rel="apple-touch-icon" sizes="57x57" href="/iconfav/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/iconfav/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/iconfav/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/iconfav/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/iconfav/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/iconfav/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/iconfav/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/iconfav/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/iconfav/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/iconfav/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/iconfav/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/iconfav/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/iconfav/favicon-16x16.png" />
            <link rel="manifest" href="/iconfav/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/iconfav/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FacebookPixel />
      {/* transition on every page load */}
      {/*<AnimatePresence>*/}
      {/*<div className="page-transition-wrapper">*/}
      {/*<motion.div*/}
      {/*    transition={spring}*/}
      {/*    key={router.pathname}*/}
      {/*    initial={{opacity: 0}}*/}
      {/*    animate={{opacity: 1}}*/}
      {/*    exit={{opacity: 0}}*/}
      {/*    id="page-transition-container"*/}
      {/*>*/}
      {/* default by next js */}
      <Component {...pageProps} />
      {/*</motion.div>*/}
      {/*</div>*/}
      {/*</AnimatePresence>*/}
    </ThemeProvider>
    </div>
  );
};

export default wrapper.withRedux(MyApp); /* connection of redux */
