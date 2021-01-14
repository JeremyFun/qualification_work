import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from "redux-thunk";
import { logger } from '../utils/logger'
import { dataReducer } from '../../common/reducer'
import { composeWithDevTools } from "redux-devtools-extension";
import { loadTableReducer } from "../../../redux-components/reducers/loadTableReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer, userUpdateProfileReducer
} from "../../../redux-components/reducers/userReducer";

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const dataTableFromStorage = localStorage.getItem('parsedData')
    ? JSON.parse(localStorage.getItem('parsedData'))
    : null

const rootReducer = combineReducers({
  data: dataReducer,
  loadTable: loadTableReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
})

const middleware = [thunk]

const initialState = {
  userLogin: {userInfo: userInfoFromStorage},
  data: {parsedData: dataTableFromStorage}
}

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(logger, ...middleware)))
