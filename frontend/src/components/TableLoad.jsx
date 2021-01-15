import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useTable, usePagination} from 'react-table'
import {dataColumn} from "../data/data";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import {setDataUpdate} from "./redux-base-logic/common/actions";
import {Button, Modal} from "react-bootstrap";
import {setCurrentTableData} from "./redux-components/actions/loadTableActions";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border: 2px solid slategray;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
    color: slategray;
  }
`

const EditableCell = ({
                          value: initialValue,
                          row: {index},
                          column: {id},
                          updateMyData,
                      }) => {
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        updateMyData(index, id, value)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    return <input value={value} onChange={onChange} onBlur={onBlur}/>
}

const defaultColumn = {
    Cell: EditableCell,
}

function Table({columns, data, updateMyData, skipPageReset}) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            autoResetPage: !skipPageReset,
            updateMyData,
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div style={{display: "flex", WebkitAlignItems: "center"}}>
                <div>
                    <ul className="pagination">
                        <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <a className="page-link" href="#">
                                <i className="fas fa-angle-double-left"></i>
                            </a>
                        </li>
                        <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <a className="page-link" href="#">
                                <i className="fas fa-arrow-left"></i>
                            </a>
                        </li>
                        <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                            <a className="page-link" href="#">
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => gotoPage(pageCount - 1)}
                               disabled={!canNextPage}>
                                <i className="fas fa-angle-double-right"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <span className="blockquote">
          Сторінка{' '}
                    <strong>
            {pageIndex + 1} з {pageOptions.length}
          </strong>{' '}
                    Перейти на сторінку:{'      '}
                </span>
                <div style={{display: "flex", marginTop: "-1.1rem"}}>
                <span>
                    <input
                        className="form-control"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{width: '100px'}}
                    />
        </span>{' '}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        style={{width: "14rem"}}
                        className="form-control"
                    >
                        {[10, 20, 40, 60, 80, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Переглянути {pageSize} рядків
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

const TableLoad = ({match}) => {
    const dispatch = useDispatch()
    const columns = React.useMemo(
        () => dataColumn,
        []
    )
    const tableId = match.params.id
    useEffect(() => {
        if (tableId) {
            dispatch(setCurrentTableData(tableId))
        }
    }, [tableId])

    // const currentTableDataStore = useSelector(state => state.currentTableData)
    // const { currentTableData, loading: loadingCurrentTableData } = currentTableDataStore

    const {parsedData, loading, error} = useSelector(state => state.data)

    const [data, setData] = React.useState(() => parsedData)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    const saveDataTable = () => {
        dispatch(setDataUpdate(data))
        handleClose()
    }

    useEffect(() => {
        setSkipPageReset(false)
    }, [data])
    return (
        <Styles>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : parsedData ? (
                <>
                    <Table
                        columns={columns}
                        data={data}
                        updateMyData={updateMyData}
                        skipPageReset={skipPageReset}
                    />
                    <Button
                        variant="secondary"
                        size="lg"
                        block
                        onClick={handleShow}
                        style={{width: "30rem", marginLeft: "auto", marginRight: "auto"}}
                    >
                        Сохранить
                    </Button>
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Бажаю міцного здоров'я!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Ви добавили зміни у проект ви згодні зберегти їх?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Ні
                            </Button>
                            <Button variant="primary" onClick={saveDataTable}>
                                Так
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : <Loader/>}
        </Styles>
    )
}

export default TableLoad
