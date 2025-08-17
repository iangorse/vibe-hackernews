
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Simple cache for child comments
const childCommentCache = {};

function Comment({ comment, variant = 'body2', style = {}, level = 0 }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [childComments, setChildComments] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!comment) return null;

  const handleExpand = async (event, isExpanded) => {
    setExpanded(isExpanded);
    if (isExpanded && comment.kids && comment.kids.length > 0) {
      if (!childCommentCache[comment.id]) {
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
      } else {
        setChildComments(childCommentCache[comment.id]);
      }
    }
  };

  // Calculate indentation and border for nesting
  const indent = level * 24;
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#ff6600';
  const replyBg = level > 0
    ? (theme.palette.mode === 'dark' ? '#232323' : '#f9f3e6')
    : (theme.palette.mode === 'dark' ? theme.palette.action.hover : '#fafafa');

  return (
    <div
      style={{
        marginBottom: 12,
        padding: 8,
        background: replyBg,
        borderRadius: 4,
        width: '100%',
        color: theme.palette.text.primary,
        marginLeft: indent,
        borderLeft: level > 0 ? `4px solid ${borderColor}` : undefined,
        boxShadow: level === 0 ? '0 1px 4px rgba(0,0,0,0.04)' : undefined,
        ...style,
      }}
    >
      {level > 0 && (
        <span style={{ fontSize: 12, color: borderColor, fontWeight: 500, marginBottom: 4, display: 'block' }}>Reply</span>
      )}
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
                    <Comment key={child.id} comment={child} level={level + 1} />
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
