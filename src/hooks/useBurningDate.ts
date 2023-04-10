import { useMemo } from "react";
import { INotification } from "../types/types";

export function useBurningDate(notification:INotification) {
  const dateBurning = useMemo(() => {
    const date = new Date(notification.dateBurning)
    const formatDate = `${`${date.getDate()}`.padStart(2, '0')}.${`${date.getMonth() + 1}`.padStart(2, '0')}`
    return formatDate
  }, [notification])

  return {dateBurning}
}