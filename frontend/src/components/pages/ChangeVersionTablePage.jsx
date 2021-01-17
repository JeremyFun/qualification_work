import React, {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getDataTableLoad } from "../redux-base-logic/common/actions"
import Loader from "../Loader"
import Message from "../Message"
import { deleteDataTableLoad } from "../redux-components/actions/loadTableActions"
import ChangeVersionTable from "../ChangeVersionTable"

const ChangeVersionTablePage = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const data = useSelector(state => state.data)
    const {dataTable, loading, error} = data

    const loadTableRemove = useSelector(state => state.loadTableRemove)
    const {loading: loadingRemove, success: successRemove} = loadTableRemove

    useEffect(() => {
        if (!dataTable || successRemove) {
            dispatch(getDataTableLoad())
        }
    }, [dispatch, successRemove, dataTable])

    useCallback(() => {
        if(!userInfo) {
            history.push('/login')
        }
    }, [history, userInfo])

    const showTableLoad = (id) => {
        history.push(`/table/${id}`)
    }

    const deleteTableLoad = (id) => {
        dispatch(deleteDataTableLoad(id))
    }

    return loading || loadingRemove ? <Loader/> : error ? <Message variant="danger">{error}</Message> : dataTable && !loading && !error ? (
        <ChangeVersionTable
            showTableLoad={showTableLoad}
            deleteTableLoad={deleteTableLoad}
            dataTable={dataTable}
        />
    ) : ""
}

export default ChangeVersionTablePage
