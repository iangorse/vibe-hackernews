import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

const HN_TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const HN_ITEM_URL = 'https://hacker-news.firebaseio.com/v0/item';


// Simple in-memory cache for story details
const storyCache = {};

function TopStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      try {
        const res = await fetch(HN_TOP_STORIES_URL);
        const ids = await res.json();
        const top10 = ids.slice(0, 10);
        const storyPromises = top10.map(async id => {
          if (storyCache[id]) {
            return storyCache[id];
          } else {
            const resp = await fetch(`${HN_ITEM_URL}/${id}.json`);
            const data = await resp.json();
            storyCache[id] = data;
            return data;
          }
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
    <Container maxWidth="sm">
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Loading top stories...
      </Typography>
    </Container>
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Hacker News Top Stories
      </Typography>
      <List>
        {stories.map(story => (
          <ListItem key={story.id} divider>
            <ListItemText
              primary={
                <Link href={story.url} target="_blank" rel="noopener noreferrer" underline="hover">
                  {story.title}
                </Link>
              }
              secondary={`by ${story.by}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TopStories;
