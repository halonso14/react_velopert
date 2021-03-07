import qs from 'qs';
import client from './client';

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/posts?${queryString}`);
};

export const readPost = id => client.get(`/api/posts/${id}`);

export const removePost = id => client.delete(`/api/posts/${id}`);

export const updatePost = ({ id, title, body, tags }) =>
client.patch(`/api/routes/${id}`, {
  title,
  body,
  tags
});

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });
