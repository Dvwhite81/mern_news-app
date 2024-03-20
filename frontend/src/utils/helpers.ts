export const BASE_CATEGORIES = [
  'General',
  'Business',
  'Entertainment',
  'Health',
  'Science',
  'Sports',
  'Technology',
];

export const isArticle = (item: unknown) => {
  if (
    item &&
    typeof item === 'object' &&
    Object.prototype.hasOwnProperty.call(item, 'title') &&
    Object.prototype.hasOwnProperty.call(item, 'snippet') &&
    Object.prototype.hasOwnProperty.call(item, 'url') &&
    Object.prototype.hasOwnProperty.call(item, 'image_url')
  ) {
    return true;
  }

  return false;
}