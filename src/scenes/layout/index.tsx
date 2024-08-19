import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  // const userID = useSelector((state:GlobalState) => state.userId);
  
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout