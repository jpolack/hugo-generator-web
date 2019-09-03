import { combineReducers } from 'redux';
import genReducer from './gen';

const store = combineReducers({
  generatorState: genReducer,
});

export default store;
