import React from 'react'
import {ToastsStore} from 'react-toasts'
import XLSX from 'xlsx'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, Navbar, NavDropdown} from "react-bootstrap"
import {logout} from "./redux-components/actions/userActions";


export const Header = () => {
    const data = useSelector(state => state.data.parsedData)
    const dispatch = useDispatch()

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
                {userInfo ? <>
                    <Nav className="mr-auto">
                        <LinkContainer to='/'>
                            <Nav.Link>
                                Завантажити файл XLSX <i className="fas fa-file-download"></i>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/table'>
                            <Nav.Link>
                                Показати таблицю <i className="fas fa-table"></i>
                            </Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={exportFile}>
                            Експортувати таблицю <i className="fas fa-file-export"></i>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={userInfo.name} style={{marginRight: "4.5rem"}}>
                            <LinkContainer
                                to='/profile'><NavDropdown.Item>Профіль</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer
                                to='/change'><NavDropdown.Item>Зміна версій</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={logoutHandler}>Вихід <i
                                className="fas fa-sign-out-alt"></i></NavDropdown.Item>
                        </NavDropdown>
                        {!userInfo && (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    ВХІД <i className="fas fa-sign-in-alt"></i>
                                </Nav.Link>
                            </LinkContainer>)}
                    </Nav>
                </> : ""}
            </Navbar.Collapse>
        </Navbar>
    )
}
