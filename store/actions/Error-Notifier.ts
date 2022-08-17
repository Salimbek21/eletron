import {notifyError} from "../../helpers/NotifyBtn";

export function errorNotifier(e: any) {
   if (e.data && e.data.message) notifyError(e.data.message);
   else console.log(e);
}