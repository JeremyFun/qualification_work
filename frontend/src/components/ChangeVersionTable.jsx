import React from 'react'
import {Button, Col, Row, Table} from "react-bootstrap";


const ChangeVersionTable = ({dataTable, showTableLoad, deleteTableLoad}) => {
    return (
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
    )
}

export default ChangeVersionTable
