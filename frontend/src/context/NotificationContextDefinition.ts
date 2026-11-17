import { createContext } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  severity: 'critical' | 'warning' | 'info';
  unread: boolean;
}

export interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  close: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
