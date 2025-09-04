
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function ContentCard({ content, onClick }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {content.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {content.type}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Category: {content.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>View Content</Button>
      </CardActions>
    </Card>
  );
}

// Prop types validation
ContentCard.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContentCard;
