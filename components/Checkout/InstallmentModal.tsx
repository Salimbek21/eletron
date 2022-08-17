import React, {FC} from 'react';
import Modal from '@material-ui/core/Modal';
import {CheckoutFormData} from "../../pages/checkout";
import {IoMdClose} from "react-icons/io"

interface InstallmentModalProps {
   formData: CheckoutFormData,
   open: boolean,

   setInstallmentOpen(isOpen: boolean): void,

   setFormData(formData: CheckoutFormData): void
}

const InstallmentModal: FC<InstallmentModalProps> = ({open, setInstallmentOpen, formData, setFormData}) => {

   const handleClose = () => {
      setInstallmentOpen(false)
      setFormData({...formData, payment_id: -1})
   }

   const renderInstallmentPartners = () => (
       [0, 1].map(partner =>
           <div className={"partner"}>
              <p><strong>Купить через Alifshop</strong></p>
              <table className={"eletron-table mb-4 text-center"}>
                 <thead>
                 <th>Первоначальный взнос</th>
                 <th>Общая сумма</th>
                 <th>Срок рассрочки (мес.)</th>
                 <th>Оплата за месяц</th>
                 <th>Действие</th>
                 </thead>
                 <tbody>
                 <tr>
                    <td>0</td>
                    <td>3 532 236 сум</td>
                    <td>15 мес</td>
                    <td>235 500 сум</td>
                    <td>
                       <button className={"btn btn-eletron main"}>
                          Купить
                       </button>
                    </td>
                 </tr>
                 </tbody>
              </table>
           </div>
       )
   )

   return (
       <Modal
           open={open}
           onClose={handleClose}
           aria-labelledby="simple-modal-title"
           aria-describedby="simple-modal-description"
       >
          <div className={"installment-modal"}>
             <div className="installment-content">
                <h5 className={"mb-5"}>Выберите один из вариантов рассрочки:</h5>
                <div className="partners-wrap">
                   {renderInstallmentPartners()}
                   <div className={"mt-4 text-right"}>
                      <p>По вопросам рассрочки просим обращаться по номеру: <strong>+998 71 205-93-93</strong></p>
                   </div>
                </div>
                <button className={"close"} onClick={handleClose}>
                   <IoMdClose/>
                </button>
             </div>
          </div>
       </Modal>
   );
};

export default InstallmentModal;