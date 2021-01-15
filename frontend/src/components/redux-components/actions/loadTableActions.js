
import axios from "axios";
import {
    // CURRENT_TABLE_DATA_FAIL,
    // CURRENT_TABLE_DATA_REQUEST, CURRENT_TABLE_DATA_SUCCESS,
    LOAD_TABLE_REMOVE_FAIL,
    LOAD_TABLE_REMOVE_REQUEST,
    LOAD_TABLE_REMOVE_SUCCESS
} from "../constants/loadTableConstants";

export const deleteDataTableLoad = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: LOAD_TABLE_REMOVE_REQUEST})
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/table/${id}`, config)
        dispatch({type: LOAD_TABLE_REMOVE_SUCCESS})
    } catch (error) {
        dispatch({
            type: LOAD_TABLE_REMOVE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
//
// export const setCurrentTableData = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({type: CURRENT_TABLE_DATA_REQUEST})
//         const { userLogin: { userInfo } } = getState()
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${userInfo.token}`
//             }
//         }
//         const {data} = await axios.get(`/api/table/${id}`, config)
//         debugger;
//         dispatch({type: CURRENT_TABLE_DATA_SUCCESS, payload: data})
//     } catch (error) {
//         dispatch({
//             type: CURRENT_TABLE_DATA_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message
//         })
//     }
// }