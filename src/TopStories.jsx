import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

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
          <ListItem key={story.id} divider alignItems="flex-start">
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
                    <div style={{ marginTop: 8, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        <span dangerouslySetInnerHTML={{ __html: story.topComment.text }} />
                        <br />
                        <span style={{ fontStyle: 'italic', color: '#888' }}>— {story.topComment.by}</span>
                      </Typography>
                      {/* Dropdown for more comments */}
                      {story.kids && story.kids.length > 1 && (
                        <Accordion
                          expanded={!!expanded[story.id]}
                          onChange={async () => {
                            setExpanded(prev => ({ ...prev, [story.id]: !prev[story.id] }));
                            if (!allCommentsCache[story.id] && !expanded[story.id]) {
                              // Fetch all comments except the top one
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
                              // Force re-render
                              setExpanded(prev => ({ ...prev }));
                            }
                          }}
                          sx={{ mt: 2 }}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body2" color="primary">
                              Show {story.kids.length - 1} more comment{story.kids.length - 1 > 1 ? 's' : ''}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {allCommentsCache[story.id]
                              ? allCommentsCache[story.id].map(comment => (
                                  <div key={comment.id} style={{ marginBottom: 12, padding: 8, background: '#fafafa', borderRadius: 4 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      <span dangerouslySetInnerHTML={{ __html: comment.text }} />
                                      <br />
                                      <span style={{ fontStyle: 'italic', color: '#888' }}>— {comment.by}</span>
                                    </Typography>
                                  </div>
                                ))
                              : <Typography variant="body2">Loading comments...</Typography>
                            }
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TopStories;
