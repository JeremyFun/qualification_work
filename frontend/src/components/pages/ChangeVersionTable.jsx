import React, {useEffect} from 'react'
import {Button, Col, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getDataTableLoad} from "../redux-base-logic/common/actions";
import Loader from "../Loader";
import Message from "../Message";
import {deleteDataTableLoad} from "../redux-components/actions/loadTableActions";
import {LOAD_TABLE_REMOVE_RESET} from "../redux-components/constants/loadTableConstants";

const ChangeVersionTable = ({ history }) => {
    const dispatch = useDispatch()

    const data = useSelector(state => state.data)
    const {dataTable, loading, error} = data

    const loadTableRemove = useSelector(state => state.loadTableRemove)
    const {loading: loadingRemove, success: successRemove} = loadTableRemove

    useEffect(() => {
        if (!dataTable || successRemove) {
            dispatch(getDataTableLoad())
        }
    }, [dispatch, successRemove])

    const showTableLoad = (id) => {
        // history.push(`/table/${id}`)
    }

    const deleteTableLoad = (id) => {
        dispatch(deleteDataTableLoad(id))
    }

    return loading || loadingRemove ? <Loader/> : error ? <Message variant="danger">{error}</Message> : dataTable ? (
        <Row className="justify-content-md-center">
            <Col md={8}>
                <h2 className="text-center mb-3 mt-3">Перегляд змін в таблиці!</h2>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Користувач</th>
                        <th>Дата створення</th>
                        <th>Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataTable.map(el => (
                        <tr key={el._id}>
                            <td>{el._id}</td>
                            <td>{el.user.name}</td>
                            <td>{el.createdAt.substring(0, 10)}</td>
                            <td>
                                <Button variant="light" onClick={() => showTableLoad(el._id)}>Переглянути</Button>
                                <Button variant="success" onClick={() => deleteTableLoad(el._id)}>Видалити</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    ) : ""
}

export default ChangeVersionTable
