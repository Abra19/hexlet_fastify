import fastify from 'fastify';
import sanitize from 'sanitize-html';
import formbody from '@fastify/formbody';
import middie from '@fastify/middie';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fastifyCookie from '@fastify/cookie';
import session from '@fastify/session';
import view from '@fastify/view';
import pug from 'pug';
// import fs from 'fs';
// import path from 'path';
import flash from '@fastify/flash';

const app = fastify();
const port = 3000;
const logger = morgan('combined');

await app.register(middie);
app.use(logger);
app.use(cookieParser());

await app.register(view, { engine: { pug } });
await app.register(formbody);
await fastify.register(fastifyFlash);
await app.register(fastifyCookie);
// await app.register(session, {
//   sessionName: 'session',
//   cookieName: 'my-session-cookie',
//   key: fs.readFileSync(path.join('secret-key')),
//   cookie: {
//     path: '/',
//   },
// });

app.get('/cookies', (req, res) => {
  console.log(req.cookies);

  res.send();
});
app.get('/', (req, res) => {
  const visited = req.cookies.visited;
  const templateData = {
    visited,
  };
  res.cookie('visited', true);

  res.view('index', templateData);
});

app.get('/hello', (req, res) => {
  const query = req.url.slice(req.url.indexOf('?') + 1)
  const params = new URLSearchParams(query);
  let name = params.get('name') ? sanitize(params.get('name')) : 'World';
  res.send(`Hello ${name}`);
});

app.get('/courses/:id', (req, res) => {
  res.send(`Course ID: ${sanitize(req.params.id)}`);
});

app.get('/users/:id', (req, res) => {
  res.send(`User ID: ${sanitize(req.params.id)}`);
});

app.get('/courses/:courseId/lessons/:id', (req, res) => {
  res.send(`Course ID: ${sanitize(req.params.courseId)}; Lesson ID: ${sanitize(req.params.id)}`);
});

app.get('/users/:id/post/:postId', (req, res) => {
  res.send(`Users ID: ${sanitize(req.params.id)}; Post ID: ${sanitize(req.params.postId)}`);
});

app.get('/users/new', (req, res) => {
  res.view('src/views/users/new');
});

app.post('/users', (req, res) => {
  const user = {
    name: req.body.name.trim(),
    email: req.body.email.toLowerCase().trim(),
    password: req.body.password,
  };

  state.users.push(user);

  res.redirect('/users');
});

app.get('/increment', (req, res) => {
  req.session.counter = req.session.counter || 0;
  req.session.counter += 1;
});


app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});
