import {
  ContactsAction,
  ContactsActionTypes,
  ContactsState,
} from "../types/contacts";

const initialState: ContactsState = {
  contacts: []
};

const contactsReducer = (
  state = { ...initialState },
  action: ContactsAction
): ContactsState => {
  switch (action.type) {
    case ContactsActionTypes.FETCH_CONTACTS:
      return {
        ...state,
        contacts: action.payload.contacts,
      };
    case ContactsActionTypes.FETCH_SINGLE_CONTACT:
      return { ...state, [action.payload.type]: action.payload.name };
    default:
      return state;
  }
};

export default contactsReducer;
