import React, { FC, useState, useEffect } from "react";
import FooterList from "./list";
import { FaTelegram, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTypedSelector } from "../../../store/hooks/useTypedSelector";
import ChatNew from '../../ChatNew'
import { useFetch } from 'usehooks-ts'

const url = "https://api2.eletron.uz/api/get_label"

const Footer = () => {
  const { data } = useFetch(url)
  const linksClient = [
    { link: "/news", text: "Новости", className: "footer-nav-link" },
    { link: "/contact", text: "Контакты", className: "footer-nav-link" },
    {
      link: "/rules/delivery",
      text: "Доставка и оплата",
      className: "footer-nav-link",
    },
    {
      link: "/rules/returning",
      text: "Возврат и обмен",
      className: "footer-nav-link",
    },
  ];

  const linksRules = [
    {
      link: "/rules/confidentiality",
      text: "Политика конфиденциальности",
      className: "footer-nav-link",
    },
    {
      link: "/rules/site-usage",
      text: "Правила пользования сайтом",
      className: "footer-nav-link",
    },
    {
      link: "/rules/coupon",
      text: "Правила использования купонов",
      className: "footer-nav-link",
    },
    {
      link: "/rules/coupon",
      text: "TEST",
      className: "footer-nav-link",
    },
    {
      link: "/rules/loyalty",
      text: "Правила программы лояльности",
      className: "footer-nav-link",
    },
  ];

  const { categories } = useTypedSelector((state) => state.category);
  const contacts = useTypedSelector((state) => state.contacts);

  const [chatUrlFront, setChatUrlFront] = useState(null);

  const popularCategorySelector = () => {
    let popCats = [];
    if (categories.length > 5) {
      for (let i = 0; i < 5; i++)
        popCats = [
          ...popCats,
          {
            link: `/catalog/${categories[i].slug}`,
            text: categories[i].name,
            className: "footer-nav-link",
          },
        ];
      return popCats;
    } else
      return categories.map((item) => {
        return {
          link: `/catalog/${item.slug}`,
          text: item.name,
          className: "footer-nav-link",
        };
      });
  };





  

  return (
    <footer className="footer">
      <div className="overlay"></div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 mb-4 mb-md-0">
            <FooterList
              key={1}
              links={popularCategorySelector()}
              title={"Популярное"}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 special-footer-list pl-lg-5">
            <FooterList key={2} links={linksClient} title={"Покупателям"} />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 mb-4 mb-md-0">
            <FooterList key={3} links={linksRules} title={"Правила"} />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="right-side-list">
              <img
                src="/static/img/brand/white-eletron.png"
                alt="Eletron logo"
                loading="lazy"
              />
              <a href={`tel:${data?.[1].val}`} className="phone">
                {data?.[1].val}
              </a>
              {/* <div className="email">{data?.[1].val}</div> */}
              <div className="eletron-social">Мы в социальных сетях:</div>
              <div className="social-icons">
                <a href="https://t.me/eletronuz" target="_blank">
                  <FaTelegram />
                </a>
                <a href="https://www.facebook.com/eletronuz" target="_blank">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/eletron_uz/" target="_blank">
                  <FaInstagram />
                </a>
                {/*<a href="https://www.youtube.com" target="_blank"><FaYoutube/></a>*/}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="border-line"></div>
            <div className="copyright">
              Все права защищены. <span>ООО "Eletron"</span>
            </div>
          </div>
        </div>

      <ChatNew/>
      </div>
    </footer>
  );
};

export default Footer;
