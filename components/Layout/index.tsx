import React, { useEffect } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import Head from "next/head";
import Cookies from "universal-cookie";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { Contacts } from "../../store/types/contacts";
import { API_FetchAllContacts } from "../../api/contacts";

const uuidv1 = require("uuid/v1");

interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  img?: string;
  ogType?: string;
  url?: string;
  locale?: string;
}

interface ContactInfo {}

const Layout: React.FC<LayoutProps> = ({
  title = "",
  description = "Интернет-магазин электрических и информационных систем в Ташкенте. Если вы ищите решения по электрике, освещению и автоматизации – добро пожаловать в Eletron.uz. Также, у нас широкий ассортимент лампочек, розеток, выключателей, автоматов, щитов, систем умного дома и автоматизации в Узбекистане. Узнать цены!",
  keywords = "электрические системы зданий, информационные системы зданий, сетевые светодиоды, сетевые системы, освещение IOT, высоковольтные кабельные крепления, монтажные системы, платформа IOT, умный дом, купить в ташкенте, в узбекистане",
  img = "/static/img/brand/ogimage.png",
  url = "https://eletron.uz",
  ogType = "website",
  locale = "ru_RU",
  children,
}) => {
  const cookies = new Cookies();
  const contacts = useTypedSelector((state) => state.contacts);
  const { refreshToken, fetchContacts } = useTypedDispatch();

  const setDefaultApplicationCookies = () => {
    const nextYear = new Date();
    nextYear.setFullYear(new Date().getFullYear() + 1);
    if (!cookies.get("device_token")) {
      cookies.set("device_token", uuidv1(), {
        path: "/",
        expires: nextYear,
      });
      cookies.set("device_type", "web", {
        path: "/",
        expires: nextYear,
      });
    }
  };

  useEffect(() => {
    // when component mounted, set default cookies
    fetchContacts();
    setDefaultApplicationCookies();
    if (cookies.get("refresh_token") && !cookies.get("access_token"))
      refreshToken(cookies.get("refresh_token"));
  }, []);

  return (
    <>
      {/*Head Below WILL NOT BE VISIBLE for SEO*/}
      {/*it is only for non SEO pages like profile, cart, comparison and e.t.c*/}
      {/*For SEO -> each register MUST have its own HEAD*/}
      <Head>
        {title?.length > 0 && <title>{title}</title>}

        {/*<meta*/}
        {/*    name="description"*/}
        {/*    content={description}*/}
        {/*/>*/}
        {/*<meta*/}
        {/*    name="keywords"*/}
        {/*    content={keywords}*/}
        {/*/>*/}

        {/*<meta property="og:title" content={title}/>*/}
        {/*<meta property="og:description" content={description}/>*/}
        {/*<meta property="og:image" content={img}/>*/}
        {/*<meta property="og:url" content={url}/>*/}

        {/*<meta property="og:type" content={ogType}/>*/}
        {/*<meta property="og:site_name" content="Eletron.uz"/>*/}
        {/*<meta property="og:locale" content={locale}/>*/}
      </Head>
      <Header />
      <div className="layout-children">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
