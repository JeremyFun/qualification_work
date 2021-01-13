import React from 'react'
import {ToastsStore} from 'react-toasts'
import XLSX from 'xlsx'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, Navbar, NavDropdown} from "react-bootstrap"
import {logout} from "./redux-components/actions/userActions";


export const Header = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data.parsedData)

    const exportFile = () => {
        if (data.length) {
            const ws = XLSX.utils.aoa_to_sheet(data)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
            XLSX.writeFile(wb, "sheetjs.xlsx")
            ToastsStore.success("File successfully has been exported")
        } else {
            ToastsStore.error("No data to export!")
        }
    }

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="/">K№21<i className="fas fa-graduation-cap"></i>

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {userInfo ? <>
                        <LinkContainer to='/'>
                            <Nav.Link>
                                Загрузка файла XLSX <i className="fas fa-file-download"></i>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/table'>
                            <Nav.Link>
                                Показать таблицу <i className="fas fa-table"></i>
                            </Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={exportFile}>
                            Експортировать таблицу <i className="fas fa-file-export"></i>
                        </Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </> : ""}
                </Nav>
                <Nav>
                    {userInfo ? <Nav.Link onClick={logoutHandler}>
                            Вихід <i className="fas fa-sign-out-alt"></i>
                        </Nav.Link>
                        : (<LinkContainer to='/login'>
                                <Nav.Link>
                                    ВХІД  <i className="fas fa-sign-in-alt"></i>
                                </Nav.Link>
                            </LinkContainer>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
