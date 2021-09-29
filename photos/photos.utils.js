export const processHashtag = (caption) => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  hashtags.map((hashtag) => ({
    where: { hashtags },
    create: { hashtag },
  }));
};
