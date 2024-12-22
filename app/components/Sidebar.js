'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

export default function PersistentSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Menu */}
      <Button
        onClick={toggleSidebar}
        sx={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1,
        }}
      >
        <MenuIcon />
      </Button>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          width: isOpen ? 250 : 0,
          transition: 'width 0.3s ease', // Smooth transition for collapse
          '& .MuiDrawer-paper': {
            width: isOpen ? 250 : 0,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            width: isOpen ? 250 : 0,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            height: '100vh',
            backgroundColor: '#f4f4f4',
          }}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
