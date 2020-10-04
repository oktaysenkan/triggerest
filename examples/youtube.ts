// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import Triggerest from '../src/triggerest';

const getVideos = async () => {
  const { data: videos } = await axios.get(
    'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUNUu7ijWWj13-ei0erIwlHg&key=<API_KEY>'
  );

  return videos.items;
};

const triggerest = new Triggerest(getVideos, 'id', 2000);

triggerest.on('changed', (addedItems: any[], removedItems: any[]) => {
  console.log('items changed');
});

triggerest.on('added', (items) => {
  console.log('added', items);
});

triggerest.on('removed', (items) => {
  console.log('removed', items);
});
