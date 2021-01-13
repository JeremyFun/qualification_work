import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from "redux-thunk";
import { logger } from '../utils/logger'
import { dataReducer } from '../../common/reducer'
import {composeWithDevTools} from "redux-devtools-extension";
import {loadTableReducer} from "../../reducers/loadTableReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  loadTable: loadTableReducer
})

const middleware = [thunk]

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, ...middleware)))
