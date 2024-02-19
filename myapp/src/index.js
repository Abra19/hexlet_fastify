import fastify from 'fastify';
import middie from '@fastify/middie';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = fastify();
const port = 3000;
const logger = morgan('combined');

await app.register(middie);
app.use(logger);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/hello', (req, res) => {
  const query = req.url.slice(req.url.indexOf('?') + 1)
  const params = new URLSearchParams(query);
  let name = params.get('name') ? params.get('name') : 'World';
  res.send(`Hello ${name}`);
});

app.get('/courses/:id', (req, res) => {
  res.send(`Course ID: ${req.params.id}`);
});

app.get('/users/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

app.get('/courses/:courseId/lessons/:id', (req, res) => {
  res.send(`Course ID: ${req.params.courseId}; Lesson ID: ${req.params.id}`);
});

app.get('/users/:id/post/:postId', (req, res) => {
  res.send(`Users ID: ${req.params.id}; Post ID: ${req.params.postId}`);
});



app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});
