import React, { useEffect, useState } from 'react';

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

  if (loading) return <div>Loading top stories...</div>;

  return (
    <div>
      <h2>Hacker News Top Stories</h2>
      <ul>
        {stories.map(story => (
          <li key={story.id}>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
            <span> by {story.by}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopStories;
