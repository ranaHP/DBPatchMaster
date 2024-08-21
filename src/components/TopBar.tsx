import React from 'react';
import { AppBar, Box, Typography, Toolbar, useTheme } from '@mui/material';
import BrokerageSelect from './BrokerageSelect';

interface TopBarProps {
  appName: string;
  createdBy: string;
  version: string;
}

const TopBar: React.FC<TopBarProps> = ({ appName, createdBy }) => {
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: 'static',
        background: theme.palette.background.default,
        boxShadow: 'none',
        py: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
          >
            {appName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Created by {createdBy}
          </Typography>
        </Box>
        <BrokerageSelect />  
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
