// Module Dependencies
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';

import router from './routes';
import logger from './logger';

// initialize Express app
const app = express();
const port = process.env.PORT || 3000;
const appFolder = 'public';


// use compression
app.use(compression());

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use morgan logger during dev
if (process.env.NODE_ENV !== 'production') {
  const morganFormat = ':method :url HTTP/:http-version :status :response-time ms ":user-agent"';
  app.use(morgan(morganFormat, { stream: { write: message => logger.info(message.trim()) } }));
}

// serve static files
app.use(express.static(appFolder));

// get always routes to site
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: appFolder });
});

// Main routing
app.use('/', router);

// 404 Handling
app.use((req, res, next) => {
  const err = new Error('Could Not Resolve Request Path');
  err.status = 404;
  next(err);
});

// Main Error Handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
  logger.error(err);
  next();
});

// Start Express app
logger.info(`GTM insight running on port: ${port}`);
app.listen(port);
