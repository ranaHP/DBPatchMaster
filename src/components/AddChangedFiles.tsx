import React, { useState } from 'react';
import { Box, Button, InputLabel, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlexBetween from './FlexBetween';
import fs from 'fs';
import path from 'path';
import { Cancel, ClearAll, Close, Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { GlobalState } from '../state';

type AddChangedFilesProp = {
    title: string
}
const AddChangedFiles: React.FC<AddChangedFilesProp> = ({ title, }) => {
    const state = useSelector((state: { global: GlobalState}) => state.global);

    const [changedFiles, setChangedFiles] = useState<File[]>([]);
    const [isShowFiles, setIsShowFiles] = useState(false);


    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);

        const newFiles = files.map(file => {
            const filePath = file.path; // Get the file's original path
            const fileName_dfn = filePath.split('\\').at(-1);
            const schema = fileName_dfn?.split('.').at(0);
            const fileType = fileName_dfn?.split('.').at(-2);
            console.log("🚀 ~ newFiles ~ fileType:", fileType)
            console.log("🚀 ~ newFiles ~ schema:", schema)

            const fileName = path.basename(filePath);

            const destinationDir = path.join('src', 'SamplePatch', 'Patch', '02 New DB Release', 'Build-Scripts', schema as string, title);

            // Ensure the destination directory exists
            if (!fs.existsSync(destinationDir)) {
                fs.mkdirSync(destinationDir, { recursive: true });
            }

            // Copy the file to the destination directory
            const destinationPath = path.join(destinationDir, fileName);
            fs.copyFileSync(filePath, destinationPath);
            console.log('File copied to:', destinationPath);

            return file;
        }).filter(file => file !== null) as File[]; // Filter out null entries

        setChangedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (index: number) => {
        setChangedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    // const handleCreateSQLRunFile = () => {
    //     const sqlFileContent = changedFiles.map(file => `-- SQL operations for file: ${file.name}`).join('\n');

    //     console.log('SQL Run File Content:', sqlFileContent);

    //     // Create the SQL run file
    //     const sqlRunFilePath = path.join('src', 'SamplePatch', state.version, 'sql_run_file.sql');
    //     fs.writeFileSync(sqlRunFilePath, sqlFileContent);
    //     console.log('SQL Run File Created:', sqlRunFilePath);
    // };

    const handleClearFiles = () => {
        setChangedFiles([]);
    };

    return (
        <Box minWidth={'500px'} m={"1rem 0.6rem"}>
            <FlexBetween
                sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
                <InputLabel sx={{ minWidth: '150px', mb: 2, }}>{title?.toLocaleUpperCase()} </InputLabel>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }} flexGrow={1}>

                    <Box
                        sx={{
                            border: '2px dashed #ccc',
                            padding: '20px',
                            width: '100%',
                            maxWidth: '400px',
                            textAlign: 'center',
                            mb: 2
                        }}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <Typography variant="body1" color="textSecondary">
                            Drag and drop files here
                        </Typography>
                    </Box>
                    <Box
                        width={'100%'}
                    >
                        <FlexBetween justifyContent={'space-between'} flexGrow={1} >
                            <Typography variant="body1" color="textSecondary">
                                Total no of changed fils : {changedFiles.length}
                            </Typography>
                            {

                            }
                            <Box>
                                {
                                    !isShowFiles ? <IconButton onClick={() => setIsShowFiles(true)}>
                                        <Menu sx={{ color: 'green' }} titleAccess='Show Details' />
                                    </IconButton> :
                                        <IconButton onClick={() => setIsShowFiles(false)}>
                                            <Close sx={{ color: 'red' }} titleAccess='Collapse' />
                                        </IconButton>
                                }
                            </Box>
                        </FlexBetween>
                    </Box>
                    {isShowFiles &&  <Button variant='contained' color='error'  size='small'
                                    onClick={() => handleClearFiles()} sx={{ mb: 2 }} 
                                    startIcon={<DeleteIcon />} titleAccess='Clear'>
                        Clear All Files
                    </Button>
                    }
                    {isShowFiles && changedFiles.length > 0 && (
                        <List sx={{ width: '100%', maxWidth: '400px', mb: 2 }} disablePadding>
                            {changedFiles.map((file, index) => (
                                <ListItem
                                    disablePadding
                                    sx={{
                                        marginBottom: '7px',
                                    }}
                                    key={index}
                                    secondaryAction={
                                        <IconButton size='small' edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                                            <DeleteIcon  className='delete-icon' />
                                        </IconButton>
                                    }
                                >
                                    {file.name}
                                </ListItem>
                            ))}
                        </List>
                    )}

                    {/* <Button variant="contained" color="primary" onClick={handleCreateSQLRunFile} disabled={changedFiles.length === 0}>
                        Create SQL Run File
                    </Button> */}
                </Box>
            </FlexBetween>
        </Box>
    )
}

export default AddChangedFiles