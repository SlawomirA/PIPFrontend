import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import AddData from './Components/AddData';
import TopNavBar from "./Components/TopNavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Predict from "./Components/Predict";
import Error from "./Components/Error";
import DataGenerator from "./Components/DataGenerator";

function App() {
    return (
        <div className="App">
            <TopNavBar />
            <header className="App-header">
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/add" element={<AddData />} />
                                <Route path="/predict" element={<Predict />} />
                                <Route path="/error/:errorCode" element={<Error />} />
                                <Route path="/generate" element={<DataGenerator />} />
                            </Routes>
                        </Router>
                    </div>
                </div>
            </header>
        </div>
    );
}


export default App;