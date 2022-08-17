import { Dispatch } from "redux";
import { ContactsAction, ContactsActionTypes } from "../types/contacts";
import { API_FetchAllContacts, API_FetchOneContact } from "../../api/contacts";
import { errorNotifier } from "./Error-Notifier";

export function fetchContacts() {
  return async (dispatch: Dispatch<ContactsAction>) => {
    await API_FetchAllContacts()
      .then((res: any) => {
        dispatch({
          type: ContactsActionTypes.FETCH_CONTACTS,
          payload: res.data,
        });
      })
      .catch((e: any) => {
        errorNotifier(e);
      });
  };
}
