import * as actions from './constants'

export const setData = (payload) => (dispatch) => {
        dispatch({type: actions.SET_DATA_REQUEST})
        const dataObject = []
        if (payload.length > 0) {
            payload.slice(1).map(el => {
                if (el.length > 0 && el.length < 85) {
                    dataObject.push({...el})
                }
            })
        }
        localStorage.setItem('parsedData', JSON.stringify(dataObject))
        dispatch({type: actions.SET_DATA_SUCCESS, payload: dataObject})
}

export const setDataUpdate = (payload) => (dispatch) => {
    dispatch({type: actions.SET_DATA_REQUEST})
    localStorage.setItem('parsedData', JSON.stringify(payload))
    dispatch({type: actions.SET_DATA_SUCCESS, payload})
}

export const setColumns = payload => ({type: actions.SET_COLUMNS, payload})
export const setFileName = payload => ({type: actions.SET_FILE_NAME, payload})
export const clearData = () => ({type: actions.CLEAR_DATA})