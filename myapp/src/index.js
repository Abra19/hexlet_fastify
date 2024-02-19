import fastify from 'fastify';

const app = fastify();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/hello', (req, res) => {
  const query = req.url.slice(req.url.indexOf('?') + 1)
  const params = new URLSearchParams(query);
  let name = params.get('name') ? params.get('name') : 'World';
  res.send(`Hello ${name}`);
});




app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});
