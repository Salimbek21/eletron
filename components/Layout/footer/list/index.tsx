import React from "react";
import Link from "next/link";
import FooterNavProps from "../footerNavProps";
import FooterNavItem from "./item";

interface NavListProps {
  links: FooterNavProps[] | undefined;
  title: string;
}

const FooterList = ({ links, title }: NavListProps) => {
  return (
    <div className="footer-nav-list-wrap">
      <h3>{title}</h3>
      <ul>
        {links?.map((item, i) => (
          <FooterNavItem
            key={i}
            link={item.link}
            className={item.className}
            text={item.text}
          />
        ))}
        <li className={"footer-nav-link"}>
          <a href="https://eletron.uz" target={"_blank"}>
            Компания Eletron
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterList;
