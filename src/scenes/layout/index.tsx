import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import TopBar from '../../components/TopBar';
import FlexBetween from '../../components/FlexBetween';
import SummaryView from '../../components/SummaryView';
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  // const userID = useSelector((state:GlobalState) => state.userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Box flexGrow={1}>
        <TopBar appName='DB Patch Generator' createdBy='Hansana Ranaweera' version='1.0' />
        <FlexBetween alignItems={"start"} sx={{
          alignItems: "start",
        }}>
          <Outlet />
          <SummaryView />
        </FlexBetween>
      </Box>
    </Box>
  )
}

export default Layout