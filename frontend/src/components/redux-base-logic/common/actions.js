import * as actions from './constants'
import axios from "axios";

export const setData = (payload) => async (dispatch, getState) => {
    try {
        dispatch({type: actions.SET_DATA_REQUEST})
        const dataObject = []
        if (payload.length > 0) {
            payload.slice(1).map(el => {
                if (el.length > 0 && el.length < 85) {
                    dataObject.push({...el})
                }
            })
        }

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
    }
}

export const setColumns = payload => ({type: actions.SET_COLUMNS, payload})
export const setFileName = payload => ({type: actions.SET_FILE_NAME, payload})
export const clearData = () => ({type: actions.CLEAR_DATA})