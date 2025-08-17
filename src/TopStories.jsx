import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import StoryList from './components/StoryList';

const HN_TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const HN_ITEM_URL = 'https://hacker-news.firebaseio.com/v0/item';


// Simple in-memory cache for story details
const storyCache = {};
const commentCache = {};
const allCommentsCache = {};

function TopStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // Track which story is expanded
  const theme = useTheme();

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      try {
        const res = await fetch(HN_TOP_STORIES_URL);
        const ids = await res.json();
        const top10 = ids.slice(0, 10);
        const storyPromises = top10.map(async id => {
          let story = storyCache[id];
          if (!story) {
            const resp = await fetch(`${HN_ITEM_URL}/${id}.json`);
            story = await resp.json();
            storyCache[id] = story;
          }
          // Fetch top comment if exists
          let topComment = null;
          if (story.kids && story.kids.length > 0) {
            const commentId = story.kids[0];
            if (commentCache[commentId]) {
              topComment = commentCache[commentId];
            } else {
              const commentResp = await fetch(`${HN_ITEM_URL}/${commentId}.json`);
              topComment = await commentResp.json();
              commentCache[commentId] = topComment;
            }
          }
          return { ...story, topComment };
        });
        const storiesData = await Promise.all(storyPromises);
        setStories(storiesData);
      } catch (err) {
        setStories([]);
      }
      setLoading(false);
    }
    fetchStories();
  }, []);

  if (loading) return (
    <Container maxWidth="xl" disableGutters sx={{ px: 0 }}>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Loading top stories...
      </Typography>
    </Container>
  );

  // Function to fetch all comments except the top one for a story
  const fetchComments = async (story) => {
    const commentIds = story.kids.slice(1);
    const commentPromises = commentIds.map(async cid => {
      if (commentCache[cid]) return commentCache[cid];
      const resp = await fetch(`${HN_ITEM_URL}/${cid}.json`);
      const data = await resp.json();
      commentCache[cid] = data;
      return data;
    });
    const comments = await Promise.all(commentPromises);
    allCommentsCache[story.id] = comments;
  };

  return (
    <Container maxWidth="xl" disableGutters sx={{ px: 0 }}>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Hacker News Top Stories
      </Typography>
      <StoryList
        stories={stories}
        expanded={expanded}
        setExpanded={setExpanded}
        allCommentsCache={allCommentsCache}
        commentCache={commentCache}
        fetchComments={fetchComments}
      />
    </Container>
  );
}

export default TopStories;
