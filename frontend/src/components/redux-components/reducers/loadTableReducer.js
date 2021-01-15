import {
    CURRENT_TABLE_DATA_FAIL, CURRENT_TABLE_DATA_REQUEST, CURRENT_TABLE_DATA_RESET,
    CURRENT_TABLE_DATA_SUCCESS,
    LOAD_TABLE_FAIL, LOAD_TABLE_REMOVE_FAIL,
    LOAD_TABLE_REMOVE_REQUEST, LOAD_TABLE_REMOVE_SUCCESS,
    LOAD_TABLE_REQUEST,
    LOAD_TABLE_SUCCESS
} from "../constants/loadTableConstants"

export const loadTableReducer = (state = { dataTable: [] }, action) => {
    switch (action.type) {
        case LOAD_TABLE_REQUEST:
            return { loading: true }
        case LOAD_TABLE_SUCCESS:
            return { loading: false, dataTable: action.payload  }
        case LOAD_TABLE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const loadTableRemoveReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_TABLE_REMOVE_REQUEST:
            return { loading: true }
        case LOAD_TABLE_REMOVE_SUCCESS:
            return { loading: false, success: true }
        case LOAD_TABLE_REMOVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const currentTableDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_TABLE_DATA_REQUEST:
            return { loading: true }
        case CURRENT_TABLE_DATA_SUCCESS:
            return { loading: false, currentTableData: action.payload }
        case CURRENT_TABLE_DATA_FAIL:
            return { loading: false, error: action.payload }
        case CURRENT_TABLE_DATA_RESET:
            return {}
        default:
            return state
    }
}

