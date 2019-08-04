import React from 'react';
import Router from './router';
import _ from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';

const persistConfig = {
  timeout: 0,
  key: 'root',
  storage: storage,
  keyPrefix: ''
};

const pReducer = persistReducer(persistConfig, reducer);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(pReducer);
const persistor = persistStore(store);

const App = (props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};


export default App;  