import { httpGet } from "./index";

export const API_FetchAllContacts = () =>
  httpGet({
    url: "/api/get_label",
  });

export const API_FetchOneContact = (type: string | undefined) =>
  httpGet({
    url: "/api/get_label",
    params: {
      var: type,
    },
  });
