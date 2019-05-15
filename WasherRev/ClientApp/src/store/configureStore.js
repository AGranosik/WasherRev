import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as User from './User';
import { usersReducer } from '../reducers/usersReducer';
import { buildingReducer } from '../reducers/buildingReducer';
import { producerReducer } from '../reducers/producerReducer';



export default function configureStore(history, initialState) {

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    routing: routerReducer,
    user: User.reducer,
    users: usersReducer,
    buildings: buildingReducer,
    producers: producerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
