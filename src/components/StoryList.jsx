import React from 'react';
import List from '@mui/material/List';
import StoryItem from './StoryItem';

function StoryList({ stories, expanded, setExpanded, allCommentsCache, commentCache, fetchComments }) {
  return (
    <List sx={{ width: '100%' }}>
      {stories.map(story => (
        <StoryItem
          key={story.id}
          story={story}
          expanded={expanded}
          setExpanded={setExpanded}
          allCommentsCache={allCommentsCache}
          commentCache={commentCache}
          fetchComments={fetchComments}
        />
      ))}
    </List>
  );
}

export default StoryList;
