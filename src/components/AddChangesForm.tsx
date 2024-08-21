import React, { useState } from 'react';
import { Box, Button, InputLabel, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlexBetween from './FlexBetween';
import fs from 'fs';
import path from 'path';

const AddChangesForm: React.FC = () => {
  const [changedFiles, setChangedFiles] = useState<File[]>([]);
  const [versionFolder, setVersionFolder] = useState('10.031.1.0'); // Example version, this can be dynamic

  const getFileType = (fileName: string): string => {
    switch (fileName) {
      case 'proc':
        return 'procedures'
      case 'tab':
        return 'table'
      case 'view':
        return 'view'
      case 'pkg':
        return 'packages'
      default:
        return 'view'
    }
    return 'procedure'
  }
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setVersionFolder(event.dataTransfer.getData('text/plain'));
    const files = Array.from(event.dataTransfer.files);

    const newFiles = files.map(file => {
      const filePath = file.path; // Get the file's original path
      const fileName_dfn = filePath.split('\\').at(-1);
      const schema = fileName_dfn?.split('.').at(0);
      const fileType = fileName_dfn?.split('.').at(-2);
      console.log("🚀 ~ newFiles ~ fileType:", fileType)
      console.log("🚀 ~ newFiles ~ schema:", schema)

      const fileName = path.basename(filePath);

      const destinationDir = path.join('src', 'SamplePatch', 'Patch', '02 New DB Release', 'Build-Scripts', schema as string, getFileType(fileType as string));

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

  const handleCreateSQLRunFile = () => {
    const sqlFileContent = changedFiles.map(file => `-- SQL operations for file: ${file.name}`).join('\n');

    console.log('SQL Run File Content:', sqlFileContent);

    // Create the SQL run file
    const sqlRunFilePath = path.join('src', 'SamplePatch', versionFolder, 'sql_run_file.sql');
    fs.writeFileSync(sqlRunFilePath, sqlFileContent);
    console.log('SQL Run File Created:', sqlRunFilePath);
  };

  return (
    <FlexBetween
      sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
      <InputLabel sx={{ minWidth: '150px', mb: 2, }}>Add Changes</InputLabel>

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

        {changedFiles.length > 0 && (
          <List sx={{ width: '100%', maxWidth: '400px', mb: 2 }}>
            {changedFiles.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                {file.name}
              </ListItem>
            ))}
          </List>
        )}

        <Button variant="contained" color="primary" onClick={handleCreateSQLRunFile} disabled={changedFiles.length === 0}>
          Create SQL Run File
        </Button>
      </Box>
    </FlexBetween>
  );
};

export default AddChangesForm;
