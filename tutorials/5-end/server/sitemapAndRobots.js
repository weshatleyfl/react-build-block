import sm from 'sitemap';
import path from 'path';

import posts from './posts';

const sitemap = sm.createSitemap({
  hostname: 'https://builderbook.org',
  cacheTime: 600000, // 600 sec - cache purge period
});

export default function setup({ server }) {
  const Posts = posts();
  // console.log(Posts);
  for (let i = 0; i < Posts.length; i += 1) {
    const post = Posts[i];
    sitemap.add({
      url: `/posts/${post.slug}`,
      changefreq: 'daily',
      priority: 0.9,
    });
  }

  sitemap.add({
    url: '/book',
    changefreq: 'daily',
    priority: 1,
  });

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../static', 'robots.txt'));
  });
}
