import React, { useState, useEffect, useRef } from 'react';
import { NOTIFICATION_ITEMS } from '../data/mockData';
import {
  NotificationContext,
  type NotificationItem,
} from './NotificationContextDefinition';

const STORAGE_KEY = 'vigilant-notifications-read';

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const readIds = new Set<string>(JSON.parse(saved));
        return NOTIFICATION_ITEMS.map((item) => ({
          ...item,
          unread: readIds.has(item.id) ? false : item.unread,
        }));
      }
    } catch {
      // LocalStorage access failure fallback
    }
    return NOTIFICATION_ITEMS;
  });

  const [isOpen, setIsOpen] = useState(false);
  const autoCloseTimerRef = useRef<number | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimerRef.current) {
        window.clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

  const persistReadState = (items: NotificationItem[]) => {
    try {
      const readIds = items.filter((n) => !n.unread).map((n) => n.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readIds));
    } catch {
      // Ignore storage errors
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const target = prev.find((n) => n.id === id);
      if (!target || !target.unread) {
        return prev;
      }

      const updated = prev.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      );
      persistReadState(updated);

      const remainingUnread = updated.filter((n) => n.unread).length;
      if (remainingUnread === 0) {
        // Automatically close popup after brief feedback when all notifications are marked read
        if (autoCloseTimerRef.current) {
          window.clearTimeout(autoCloseTimerRef.current);
        }
        autoCloseTimerRef.current = window.setTimeout(() => {
          setIsOpen(false);
        }, 350);
      }
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((item) => ({ ...item, unread: false }));
      persistReadState(updated);
      return updated;
    });

    // Automatically close popup after all notifications are marked as read
    if (autoCloseTimerRef.current) {
      window.clearTimeout(autoCloseTimerRef.current);
    }
    autoCloseTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 350);
  };

  const toggleOpen = () => {
    if (autoCloseTimerRef.current) {
      window.clearTimeout(autoCloseTimerRef.current);
    }
    setIsOpen((prev) => !prev);
  };

  const close = () => {
    if (autoCloseTimerRef.current) {
      window.clearTimeout(autoCloseTimerRef.current);
    }
    setIsOpen(false);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        isOpen,
        setIsOpen,
        toggleOpen,
        close,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
