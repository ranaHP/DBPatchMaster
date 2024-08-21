import React from 'react';
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState, setBrokerage } from '../state';

interface Brokerage {
  value: string;
  label: string;
}

const brokerages: Brokerage[] = [
  { value: 'SFC', label: 'SFC' },
  { value: 'ALKB', label: 'ALKB' },
  { value: 'HSBC', label: 'HSBC' },
];

const BrokerageSelect: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: { global: GlobalState}) => state.global);

  return (
    <FormControl sx={{ mt: "1rem" }}>
      <InputLabel>Brokerage</InputLabel>
      <Select
        value={state.brokerage || ''}
        label="Brokerage"
        onChange={(e) => {
          console.warn(e.target.value);
          dispatch(setBrokerage(e.target.value));
        }}
        size="small"
      >
        {brokerages.map((brokerage) => (
          <MenuItem key={brokerage.value} value={brokerage.value}>
            {brokerage.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BrokerageSelect;
