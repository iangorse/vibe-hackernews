
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Simple cache for child comments
const childCommentCache = {};

function Comment({ comment, variant = 'body2', style = {} }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [childComments, setChildComments] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!comment) return null;

  const handleExpand = async () => {
    setExpanded(prev => !prev);
    if (!childCommentCache[comment.id] && comment.kids && comment.kids.length > 0 && !expanded) {
      setLoading(true);
      const promises = comment.kids.map(async cid => {
        if (childCommentCache[cid]) return childCommentCache[cid];
        const resp = await fetch(`https://hacker-news.firebaseio.com/v0/item/${cid}.json`);
        const data = await resp.json();
        childCommentCache[cid] = data;
        return data;
      });
      const children = await Promise.all(promises);
      childCommentCache[comment.id] = children;
      setChildComments(children);
      setLoading(false);
    } else if (childCommentCache[comment.id]) {
      setChildComments(childCommentCache[comment.id]);
    }
  };

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
      {comment.kids && comment.kids.length > 0 && (
        <Accordion
          expanded={expanded}
          onChange={handleExpand}
          sx={{ mt: 1, mb: 1, width: '100%' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ width: '100%' }}>
            <Typography variant="body2" color="primary">
              Show {comment.kids.length} repl{comment.kids.length > 1 ? 'ies' : 'y'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ width: '100%' }}>
            {loading
              ? <Typography variant="body2">Loading replies...</Typography>
              : childComments.length > 0
                ? childComments.map(child => (
                    <Comment key={child.id} comment={child} style={{ marginLeft: 16 }} />
                  ))
                : null
            }
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export default Comment;
