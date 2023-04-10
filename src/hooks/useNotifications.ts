import { useEffect, useState, useRef } from 'react';
import $api, { refresh } from '../http'
import { INotification } from '../types/types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const interval = useRef(0);

  useEffect(() => {
    async function getInitialData() {
      await refresh();
      updateNotifications();
    }
    getInitialData();

    interval.current = setInterval(async () => {
      updateNotifications();
    }, 2000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (notifications.length > 1) {
      setNotifications([]);
    }
  }, [notifications]);

  const fetchBonuses = async () => {
    const notification = await $api.get("");
    return notification.data.data;
  };

  const updateNotifications = async () => {
    const bonuses = await fetchBonuses();
    setNotifications((prev) => [...prev, bonuses]);
  };

  return {notifications}
}
