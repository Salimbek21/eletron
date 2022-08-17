import React, { Component } from "react";

export default class Script extends Component {
  componentDidMount() {
    const s = document.createElement("script");
    // s.type = 'text/javascript'
    s.async = true;
    s.innerHTML = `https://bitrix.eletron.uz/upload/crm/site_button/loader_1_kaqca0.js`;
    s.src =
      "https://bitrix.eletron.uz/upload/crm/site_button/loader_1_kaqca0.js" +
      "?" +
      ((Date.now() / 60000) | 0);
    this.instance.appendChild(s);
    const h = document.getElementsByTagName("script")[0];
    h.parentNode.insertBefore(s, h);
  }

  render() {
    return <div ref={(el) => (this.instance = el)}></div>;
  }
}


