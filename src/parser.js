const parseRSS = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');

  const channel = doc.querySelector('channel');
  if (!channel) {
    throw new Error('Invalid RSS format');
  }

  const title = channel.querySelector('title').textContent;
  const description = channel.querySelector('description').textContent;

  const items = channel.querySelectorAll('item');
  const posts = Array.from(items).map((item) => {
    const descElement = item.querySelector('description');
    return {
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: descElement ? descElement.textContent : '',
    };
  });

  return { feed: { title, description }, posts };
};

export default parseRSS;
