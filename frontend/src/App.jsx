import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {Container} from "react-bootstrap"
import {store} from './components/lib/store'
import {Header} from "./components/Header";
import {DropZone} from "./components/DropZone";
import TableComponent from "./components/TableComponent";
import "./bootstrap.min.css"


function App() {
    return (
        <Router>
            <Provider store={store}>
                <>
                    <Header/>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={DropZone}/>
                            <Route exact path="/table" component={TableComponent}/>
                        </Switch>
                    </Container>
                </>
            </Provider>
        </Router>
    );
}

export default App;
