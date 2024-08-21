import { Box, Boxider, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GlobalState } from '../state';
import { changedListI } from '../type';
import FlexBetween from './FlexBetween';
import DeleteIcon from '@mui/icons-material/Delete';
import { Close } from '@mui/icons-material';

const SummaryView = () => {
  const state = useSelector((state: { global: GlobalState }) => state.global);
  const [schemaList, setSchemaList] = useState<string[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tempArray, settempArray] = useState<any[]>([])
  function getDistinctSchemas(files: changedListI[]) {
    const schemas = files.map(file => file.schema);
    const distinctSchemas = [...new Set(schemas)];
    setSchemaList(distinctSchemas);
  }

  useEffect(() => {

    getDistinctSchemas(state.changedFilesList);
    settempArray(groupFiles(state.changedFilesList));

  }, [state.changedFilesList])


  const groupFiles = (files) => {
    return files.reduce((acc, file) => {
      if (!acc[file.schema]) {
        acc[file.schema] = {};
      }
      if (!acc[file.schema][file.fileType]) {
        acc[file.schema][file.fileType] = [];
      }
      acc[file.schema][file.fileType].push(file.name);
      return acc;
    }, {});
  };
  return (
    <Box minWidth={'300px'} pt={'1rem'} px={'2rem'} sx={{
      width: '100%',
    }}
    >
      <Typography variant='h5' textAlign={'center'} fontWeight={'bold'}>
        Summary View
      </Typography>
      <Typography variant='body1' textAlign={'center'}>
        Organize files under their respective schemas for easy identification.
      </Typography>

      <Divider />
      <Typography variant='h5' textAlign={'start'} pt={'.4rem'} fontWeight={'bold'} >
        Build Script
      </Typography>

      <FlexBetween justifyContent={'center'}>
        {
          schemaList && schemaList.map((schema: string, index: number) => {
            return (
              <Typography key={index} variant='body1' textAlign={'center'}>
                {schema}
              </Typography>
            )
          })
        }
      </FlexBetween>

      <Box px={'1rem'} bgcolor={'#f8f8f8'}>
        {
          <Box>
            {Object.entries(tempArray).map(([schema, fileTypes]) => (
              <Box key={schema}>
                <h3>{schema}</h3>
                {Object.entries(fileTypes).map(([type, files]) => (
                  <Box key={type} ml={'2rem'}>
                    <FlexBetween>
                      <Typography>{type} </Typography>
                      <Typography>{files?.length}
                      <IconButton  style={{marginBottom: '3px'}} aria-label="delete"  >
                                            <Close fontSize='small' className='delete-icon' />
                                        </IconButton>
                      </Typography>
                    </FlexBetween>
                    <Divider />
                    <ul>
                      {files?.map((file: any) => (
                        <li key={file} className='flex justify-center items-center w-full flex-row'>
                            <div className='bg-black'>{file}</div>
                            {/* <div>
                            <DeleteIcon fontSize='small' className='delete-icon' />
                            </div> */}
                           </li>
                      ))}
                    </ul>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        }
      </Box>
    </Box>
  )
}

export default SummaryView