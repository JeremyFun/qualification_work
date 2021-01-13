import React from 'react'
import { ToastsStore} from 'react-toasts'
import XLSX from 'xlsx'
import {useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavDropdown } from "react-bootstrap"


export const Header = () => {
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

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="/">K21</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to='/'>
                        <Nav.Link>Загрузка файла XLSX</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/table'>
                        <Nav.Link>Показать таблицу</Nav.Link>
                    </LinkContainer>
                    <Nav.Link onClick={exportFile}>Експортировать таблицу</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">SIGN IN</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        SIGN OUT
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
