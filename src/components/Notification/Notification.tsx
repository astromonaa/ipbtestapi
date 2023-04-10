import { FC } from 'react';
import { INotificationProps } from '../../types/types';
import { useBurningDate } from '../../hooks/useBurningDate';
import arrowRight from '../../assets/arrowRight.svg'
import fire from '../../assets/fire.svg'
import './notification.scss'


const Notification:FC<INotificationProps> = ({notification}) => {
  const {dateBurning} = useBurningDate(notification)

  return (
    <div className="notification">
      <b className='bonus-count'>{notification.currentQuantity} бонусов</b>
      <img className='arrow-right' src={arrowRight} alt="Стрелка вправо" />
      <div className='notification__desc'>
        <span>{dateBurning} сгорит</span>
        <img src={fire} alt="Иконка" />
        <span>{notification.forBurningQuantity} бонусов</span>
      </div>
    </div>
  );
};

export default Notification;
