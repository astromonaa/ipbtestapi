export interface INotification {
  currentQuantity: number
  dateBurning: string
  forBurningQuantity: number
  typeBonusName: string
}

export interface INotificationProps {
  notification: INotification
}