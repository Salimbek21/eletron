import {Notyf, INotyfIcon} from 'notyf'
import 'notyf/notyf.min.css'

const icon: INotyfIcon = {
   className: 'notify-icon-img',
   tagName: 'div',
   text: '',
   color: '#fff'
   // text: 'Eletron'
}

export function notifyError(msg:any, duration = 2000) {

   const notyf = new Notyf({
      types: [
         {
            type: "error",
            backgroundColor: "#e94627",
            icon
         }
      ],
      duration,
      position: {x: 'right', y: window.innerWidth <= 768 ? 'bottom' : 'bottom'},
      dismissible: true
   });

   notyf.open({
      type: "error",
      message: msg
   });
}


export function notifyWarn(msg:any, duration = 2000) {
   const notyf = new Notyf({
      types: [
         {
            type: "warning",
            backgroundColor: "#F79800",
            className: 'notyf-warning',
            icon
         }
      ],
      duration,
      position: {x: 'right', y: window.innerWidth <= 768 ? 'bottom' : 'bottom'},
      dismissible: true
   });

   notyf.open({
      type: "warning",
      message: msg
   });
}


export function notifySuccess(msg:any, duration = 2000) {
   const notyf = new Notyf({
      types: [
         {
            type: "success",
            backgroundColor: "#5DAE4C",
            icon
         }
      ],
      duration,
      position: {x: 'right', y: window.innerWidth <= 768 ? 'bottom' : 'bottom'},
      dismissible: true
   });

   notyf.open({
      type: "success",
      message: msg
   });
}
