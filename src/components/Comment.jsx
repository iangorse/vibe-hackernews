import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function Comment({ comment, variant = 'body2', style = {} }) {
  const theme = useTheme();
  if (!comment) return null;
  return (
    <div
      style={{
        marginBottom: 12,
        padding: 8,
        background: theme.palette.mode === 'dark' ? theme.palette.action.hover : '#fafafa',
        borderRadius: 4,
        width: '100%',
        color: theme.palette.text.primary,
        ...style,
      }}
    >
      <Typography variant={variant} color="text.secondary">
        <span dangerouslySetInnerHTML={{ __html: comment.text }} />
        <br />
        <span style={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>— {comment.by}</span>
      </Typography>
    </div>
  );
}

export default Comment;
