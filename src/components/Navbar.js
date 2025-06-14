import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <nav className="fixed top-0 w-full shadow-lg bg-neutral-900/60 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">AR Livery</Link>

        {/* Mobile Navigation (Hamburger Icon) */}
        <div>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)} className="text-white">
            <FaBars size={24} />
          </IconButton>
          <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            sx={{
              '& .MuiDrawer-paper': {
                backgroundColor: '#0a0a0a',
                color: '#f1f1f1',
                width: 250,
              },
            }}
          >
            <List>
              <ListItem onClick={() => setOpenDrawer(false)} component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem onClick={() => setOpenDrawer(false)} component={Link} to="/ar-viewer">
                <ListItemText primary="AR Viewer" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 