import { Box, Typography } from '@mui/material';
import React from 'react';
// import { Theme } from '@emotion/react';
// import { useTheme } from '@mui/material/styles'; // Correct import for MUI theme

interface HeaderProps {
    title: string;
    subTitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
    return (
        <Box
            sx={{ backgroundColor: 'red' }}
         >
            <Typography
                variant="h2"
                // color={theme.palette.secondary[100]}
                sx={{ mb: '5px' }}
            >
                {title}
            </Typography>
            <Typography
                variant="h5"
                // color={theme.palette.secondary[300]}
            >
                {subTitle}
            </Typography>
        </Box>
    );
};

export default Header;
