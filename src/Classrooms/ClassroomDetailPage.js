import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function ClassroomDetailPage() {
  const { id } = useParams();
  
  return (
    <Box>
      <Typography variant="h4">Classroom Details</Typography>
      <Typography>Details for classroom {id}</Typography>
    </Box>
  );
}

export default ClassroomDetailPage;