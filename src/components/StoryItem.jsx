import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Comment from './Comment';

function StoryItem({ story, expanded, setExpanded, allCommentsCache, commentCache, fetchComments }) {
  const handleAccordionChange = async () => {
    setExpanded(prev => ({ ...prev, [story.id]: !prev[story.id] }));
    if (!allCommentsCache[story.id] && !expanded[story.id]) {
      await fetchComments(story);
    }
  };

  return (
    <ListItem key={story.id} divider alignItems="flex-start" sx={{ width: '100%' }}>
      <ListItemText
        primary={
          <Link href={story.url} target="_blank" rel="noopener noreferrer" underline="hover">
            {story.title}
          </Link>
        }
        secondary={
          <>
            <span>by {story.by}</span>
            {story.topComment && (
              <Comment comment={story.topComment} />
            )}
            {/* Dropdown for more comments */}
            {story.kids && story.kids.length > 1 && (
              <Accordion
                expanded={!!expanded[story.id]}
                onChange={handleAccordionChange}
                sx={{ mt: 2, width: '100%' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ width: '100%' }}>
                  <Typography variant="body2" color="primary">
                    Show {story.kids.length - 1} more comment{story.kids.length - 1 > 1 ? 's' : ''}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ width: '100%' }}>
                  {allCommentsCache[story.id]
                    ? allCommentsCache[story.id].map(comment => (
                        <Comment key={comment.id} comment={comment} />
                      ))
                    : <Typography variant="body2">Loading comments...</Typography>
                  }
                </AccordionDetails>
              </Accordion>
            )}
          </>
        }
      />
    </ListItem>
  );
}

export default StoryItem;
