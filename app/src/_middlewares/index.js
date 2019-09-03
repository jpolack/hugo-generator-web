import { applyMiddleware } from 'redux';
import logger from './logger';
import persister from './persister';

export default applyMiddleware(
  logger,
  persister,
);
