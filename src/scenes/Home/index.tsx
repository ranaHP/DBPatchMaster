import React from 'react';
import { Box} from '@mui/material';
import PatchVersionForm from '../../components/PatchVersionForm';
// import AddChangesForm from '../../components/AddChangesForm';
import BuildScriptChanges from '../../components/BuildScriptChanges';
// import { useSelector } from 'react-redux';
// import { GlobalState } from '../../state';

const Home = () => {
  // const state = useSelector((state: { global: GlobalState}) => state.global);
  return (
    <Box m="1rem 1.5rem" minWidth={'600px'}>
      <PatchVersionForm />
      {/* <AddChangesForm/> */}
      <BuildScriptChanges/>
    </Box>
  );
};

export default Home;
