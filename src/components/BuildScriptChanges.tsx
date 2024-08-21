import React from 'react'
import FlexBetween from './FlexBetween'
import { InputLabel } from '@mui/material'
import AddChangedFiles from './AddChangedFiles'

const BuildScriptChanges = () => {
  return (
    <FlexBetween
      mt={`1rem`}
      sx={{
        width: '100%',
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start'
      }}
    >
      <InputLabel sx={{ minWidth: '150px', mb: 2, }} >
            Build Script
        </InputLabel>
      <FlexBetween flexGrow={1}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start'
        }}
        flexWrap={'wrap'}
      >
        <AddChangedFiles title='tables' />
      </FlexBetween>
    </FlexBetween>
  )
}

export default BuildScriptChanges