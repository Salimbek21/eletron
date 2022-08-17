import React, {useState,useEffect} from "react";
import { useFetch } from 'usehooks-ts'

const url = "https://api2.eletron.uz/api/get_label"

const HeaderContact = () => {
  const { data } = useFetch(url)
  const socials = [
    {
      img: "telegram.png",
      link: "https://t.me/eletronuz",
    },
    {
      img: "instagram.jpg",
      link: "https://www.instagram.com/eletron_uz/",
    },
    {
      img: "facebook.png",
      link: "https://facebook.com/eletronuz/",
    },
  ];



  return (
    <div className="header_top">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center justify-content-sm-between align-items-center">
          <div className="col-auto order-lg-1 d-sm-flex d-none">
            <p className="mb-0">Мы в социальных сетях: </p>
            {socials.map((item, i) => (
              <a key={i} href={item.link} target="_blank" className="ml-2">
                <img src={`/static/img/socials/${item.img}`} alt={item.img} />
              </a>
            ))}
          </div>
          <div className="col-auto order-lg-3 pt-0 pt-sm-2">
            <div className="mb-0 d-flex" style={{ fontWeight: "600" }}>
              <a
                href={`tel:${data?.[1].val}`}
                className="header-phone"
              >
                <div className="header-phone-text">Колл-центр:</div>
                <small>
                  <strong>{data?.[1].val.substr(0, 4)}</strong>
                </small>
                <span className="">
                  {" "}
                  {data?.[1].val.substring(4)}
                </span>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContact;
