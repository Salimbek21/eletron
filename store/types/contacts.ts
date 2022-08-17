export interface Contacts {
  EMAIL: string;
  ADMIN_PHONE: string;
  CHAT_URL_FRONT: string;
  CHAT_URL: string;
  SUPPORT_PHONE_NUMBER: string;
}

export interface ContactsState {
  contacts: Contacts[]
}

export enum ContactsActionTypes {
  FETCH_CONTACTS = "FETCH_CONTACTS",
  FETCH_SINGLE_CONTACT = "FETCH_SINGLE_CONTACT",
}

interface FetchContactsAction {
  type: ContactsActionTypes.FETCH_CONTACTS;
  payload: {contacts: Contacts[] | []};
}

interface FetchSingleContactAction {
  type: ContactsActionTypes.FETCH_SINGLE_CONTACT;
  payload: {
    type: string;
    name: string;
  };
}

export type ContactsAction = FetchContactsAction | FetchSingleContactAction;
