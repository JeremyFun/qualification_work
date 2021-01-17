import * as actions from './constants'
import axios from "axios"
import {
    CURRENT_TABLE_DATA_SUCCESS,
    EXPORT_TABLE_DATA_SUCCESS
} from "../../redux-components/constants/loadTableConstants"
import { inMassive, withMassive } from "../../utils/utils"

export const setData = (payload) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.SET_DATA_REQUEST})
        const dataObject = withMassive(payload)

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data: {success} } = await axios.post('/api/table', dataObject, config)
        if (success) {
            localStorage.setItem('parsedData', JSON.stringify(dataObject))
            dispatch({type: actions.SET_DATA_SUCCESS, payload: dataObject})
            dispatch({type: CURRENT_TABLE_DATA_SUCCESS, payload: dataObject})
            dispatch({type: EXPORT_TABLE_DATA_SUCCESS, payload: inMassive(dataObject)})

        }
    } catch (error) {
        dispatch({
            type: actions.SET_DATA_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const setDataUpdate = (payload) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.SET_DATA_REQUEST})

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data: {success} } = await axios.post('/api/table', payload, config)

        if (success) {
            localStorage.setItem('parsedData', JSON.stringify(payload))
            dispatch({type: actions.SET_DATA_SUCCESS, payload})
            dispatch({type: CURRENT_TABLE_DATA_SUCCESS, payload})
            dispatch({type: EXPORT_TABLE_DATA_SUCCESS, payload: inMassive(payload)})
        }
    } catch (error) {
        dispatch({
            type: actions.SET_DATA_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getDataTableLoad = () => async (dispatch, getState) => {
    try {
        dispatch({type: actions.GET_DATA_REQUEST})
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const {data: {dataTable}} = await axios.get('/api/table', config)
        dispatch({type: actions.GET_DATA_SUCCESS, payload: dataTable})
    } catch (error) {
        dispatch({
            type: actions.GET_DATA_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const setColumns = payload => ({type: actions.SET_COLUMNS, payload})
export const setFileName = payload => ({type: actions.SET_FILE_NAME, payload})
export const clearData = () => ({type: actions.CLEAR_DATA})