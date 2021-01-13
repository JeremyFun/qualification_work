import {LOAD_TABLE_FAIL, LOAD_TABLE_REQUEST, LOAD_TABLE_SUCCESS} from "../constants/loadTableConstants"

export const loadTableReducer = (state = { dataTable: [] }, action) => {
    switch (action.type) {
        case LOAD_TABLE_REQUEST: {
            return { loading: true }
        }
        case LOAD_TABLE_SUCCESS: {
            return { loading: false, dataTable: action.payload  }
        }
        case LOAD_TABLE_FAIL: {
            return { loading: false, error: action.payload }
        }
        default:
            return state
    }
}