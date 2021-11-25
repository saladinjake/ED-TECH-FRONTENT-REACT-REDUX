/*setup react redux questence store*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";  ///thunk alone cant persist redux state after reload 
import logger from 'redux-logger';
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// whitelist and blacklist are properties of react redux which allows user to select which reducer needs to be persisted and which not to
// const persistConfig = {
//   key: 'cart',
//   storage,
//   whitelist: ['cart'],
// };
 //persist the state

const initialState = {};
const middlewareArr = [thunk,logger];

/*without persistence*/

// const QuestenceReduxStore = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware),
//     (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' || process.env.NODE_ENV !== 'production') ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
//     autoRehydrate(),
//   )
// );

/*with persistence*/
//const pReducer = persistReducer(persistConfig, rootReducer);



const QuestenceReduxStore= createStore(rootReducer,
   initialState, 
   //middleware
     composeWithDevTools(applyMiddleware(...middlewareArr)
  )

   );
//const persistor = persistStore(QuestenceReduxStore);




/*no more need for this*/
// if(module.hot) {
//   module.hot.accept('./reducers/', () => {
//     const nextRootReducer = require('./reducers/index').default;
//     QuestenceReduxStore.replaceReducer(nextRootReducer);
//   });
// }


/*i dont want to use localstorage to store user credentials that are secretive
 * to prevent data breach

*/

 //export { persistor };

export default QuestenceReduxStore;