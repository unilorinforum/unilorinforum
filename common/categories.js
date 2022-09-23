import { FaFire } from 'react-icons/fa';

const categories = [
  { value: 'gossip', label: 'Gossip' },
  { value: 'event', label: 'Event' },
  { value: 'gist', label: 'Gist' },
  { value: 'tips', label: 'Tips' },
  { value: 'stories', label: 'Stories' },
];
const adminCategories = [
  { value: 'gossip', label: 'Gossip' },
  { value: 'event', label: 'Event' },
  { value: 'gist', label: 'Gist' },
  { value: 'tips', label: 'Tips' },
  { value: 'stories', label: 'Stories' },
  { value: 'news', label: 'Just In', icon: <FaFire /> },
  { value: 'annoucement', label: 'Annoucement' },
  { value: 'sponsored', label: 'Sponsored' },
];

module.exports = {
  categories,
  adminCategories,
};
