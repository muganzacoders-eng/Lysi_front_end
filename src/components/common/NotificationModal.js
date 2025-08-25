import React, { useState, useEffect, useContext } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, IconButton, Badge } from '@mui/material';
import { Close, Notifications } from '@mui/icons-material';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

function NotificationModal() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize Socket.io connection
    const newSocket = io(process.env.REACT_APP_API_URL);
    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && user) {
      // Join user's personal room
      socket.emit('join-user-room', user.userId);

      // Listen for new notifications
      socket.on('new-notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
      });

      return () => {
        socket.off('new-notification');
      };
    }
  }, [socket, user]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n.notification_id === id ? {...n, is_read: true} : n
      ));
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={() => setOpen(true)}
        sx={{ position: 'relative' }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
      </IconButton>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="notification-modal-title"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="notification-modal-title" variant="h6">
              Notifications
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText primary="No notifications" />
              </ListItem>
            ) : (
              notifications.map((notification) => (
                <ListItem 
                  key={notification.notification_id}
                  sx={{ 
                    bgcolor: notification.is_read ? 'background.default' : 'action.selected',
                    mb: 1,
                    borderRadius: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleMarkAsRead(notification.notification_id)}
                >
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography component="span" display="block">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{ 
                      fontWeight: notification.is_read ? 'normal' : 'bold' 
                    }}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Modal>
    </>
  );
}

export default NotificationModal;