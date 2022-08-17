import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { httpPost } from "../../api";
import { notifySuccess } from "../../helpers/NotifyBtn";
import { errorNotifier } from "../../store/actions/Error-Notifier";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { useFetch } from 'usehooks-ts'
const url = "https://api2.eletron.uz/api/get_label"

interface Post {
  val: any
}

const SiteInfo = () => {
  const contacts = useTypedSelector((state) => state.contacts);
  const { data } = useFetch<Post[]>(url)
  const [contactDetails, setContactDetails] = useState({
    name: "",
    phone: "",
    email: "",
    info: "",
  });

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = contactDetails.phone.replace(/\s|\+|_/g, "");
    httpPost({
      url: `${url}/api/call_request/send`,
      data: {
        ...contactDetails,
        phone,
      },
    })
      .then((res: any) => {
        notifySuccess(
          "Спасибо, Ваше сообщение отправлено модераторам. В ближайшее время с Вами свяжутся",
          4000
        );
        setContactDetails({
          name: "",
          phone: "",
          email: "",
          info: "",
        });
      })
      .catch((e: any) => errorNotifier(e));
  };

  const handleContactInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <p>
        <strong>Режим работы: </strong> Понедельник- Суббота с 10:00 до 19:00
      </p>
      <p>
        <strong>Адрес: </strong> Узбекистан, г.Ташкент, ул. У.Насыра, 23
      </p>
      <p>
        <strong>Телефон: </strong> {data?.[1]?.val}
      </p>
      <p>
        <strong>Почта: </strong> sales@eletron.uz
      </p>

      <div className="mt-4 mb-4">
        <h4>Обратная связь</h4>
      </div>

      <form onSubmit={handleContactSubmit}>
        <input
          autoComplete={"new-password"}
          type="text"
          name={"name"}
          className={"contact-field verify-element"}
          placeholder={"Имя и фамилия"}
          value={contactDetails.name}
          onChange={handleContactInfoChange}
          required
        />

        <NumberFormat
          placeholder={"+998 __ ___ __ __"}
          className="contact-field verify-element"
          name="phone"
          value={contactDetails.phone}
          onChange={handleContactInfoChange}
          prefix={"+998"}
          format="+998 ## ### ## ##"
          mask="_"
          allowEmptyFormatting
          required
        />

        <input
          type="text"
          name={"email"}
          className={"contact-field verify-element"}
          placeholder={"E-mail"}
          autoComplete={"new-password"}
          value={contactDetails.email}
          onChange={handleContactInfoChange}
        />
        <textarea
          name={"info"}
          className={"contact-field verify-element"}
          placeholder={"Сообщение"}
          value={contactDetails.info}
          onChange={handleContactInfoChange}
          required
        />

        <button className="btn-contact-us" type={"submit"}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default SiteInfo;
