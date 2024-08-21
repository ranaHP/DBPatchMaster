import React, { useState } from 'react';
import { InputLabel, TextField } from '@mui/material';
import FlexBetween from './FlexBetween';
import { useSelector } from 'react-redux';
import { GlobalState } from '../state';

const PatchVersionForm: React.FC = () => {
  const [patchVersion, setPatchVersion] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const state = useSelector((state: { global: GlobalState}) => state.global);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Regular expression to validate the format: 10.031.1.0
    const regex = /^\d{2}\.\d{3}\.\d{1}\.\d{1}$/;

    if (!regex.test(patchVersion)) {
      setError('Patch version must be in the format 10.031.1.0');
      return;
    }

    setError(null);
    console.log('Submitted Patch Version:', patchVersion);

    // Proceed with your submission logic, e.g., API call
  };

  return (
    <FlexBetween justifyContent={"center"} justifyItems={'center'} alignItems={"center"}>
        <InputLabel sx={{minWidth: '150px'}}> Patch Version</InputLabel>
        <TextField
        label={'DFNNTP-DB_SA_'+state.brokerage+'_'+patchVersion}
        value={patchVersion}
        onChange={(e) => setPatchVersion(e.target.value)}
        fullWidth
        variant="outlined"
        required
        size='small'
        error={!!error}
        helperText={error || 'Format: 10.031.1.0'}
        onKeyUp={(e) => handleSubmit(e)}
      />
     
    </FlexBetween>
  );
};

export default PatchVersionForm;
