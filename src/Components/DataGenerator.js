import React, { useState, useEffect } from "react";
import { URLS_GENERATE, URLS_PREDICT, URLS_TRAIN_MODEL } from "../Utils/Urls";
import { MDBInput, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const DataGenerator = () => {
    const [xValue, setXValue] = useState(0);
    const [yValue, setYValue] = useState(0);
    const [rValue, setRValue] = useState(1);
    const [amountValue, setAmountValue] = useState(2);
    const [categoryValue, setCategoryValue] = useState(2);
    const [categoryResult, setCategoryResult] = useState(null);
    const [generatedPoints, setGeneratedPoints] = useState([]);

    const handleXChange = (event) => {
        setXValue(event.target.value);
    };

    const handleYChange = (event) => {
        setYValue(event.target.value);
    };

    const handleRChange = (event) => {
        setRValue(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmountValue(parseInt(event.target.value, 10));
    };

    const handleCategoryChange = (event) => {
        setCategoryValue(parseInt(event.target.value, 10));
    };

    const navigate = useNavigate();

    const handleAddDataClick = () => {
        const generateUrl = `${URLS_GENERATE}?x=${xValue}&y=${yValue}&r=${rValue}&amount=${amountValue}&category=${categoryValue}`;

        fetch(generateUrl)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error: ${response.statusText}! Status: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                let pointsArray = [];

                // Check if the data is an array or an object with an array property
                if (Array.isArray(data)) {
                    pointsArray = data;
                } else if (data && Array.isArray(data.points)) {
                    pointsArray = data.points;
                }

                // Update the generated points state with the new data
                setGeneratedPoints((prevPoints) => [...prevPoints, ...pointsArray]);
            })
            .catch((error) => {
                console.error(error);
                navigate(`/error/${encodeURIComponent(error.message)}`);
            });
    };

    return (
        <div className="row">
            <div className="col-md-12 d-inline-block">
                <div className="card d-inline-block">
                    <div>
                        <div className="row">
                            <div className="col-md-1">
                                <label htmlFor="xInput">X:</label>
                            </div>
                            <div className="col-md-11">
                                <MDBInput
                                    type="number"
                                    id="xInput"
                                    value={xValue}
                                    onChange={handleXChange}
                                    step="any"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <label htmlFor="yInput">Y:</label>
                            </div>
                            <div className="col-md-11">
                                <MDBInput
                                    type="number"
                                    id="yInput"
                                    value={yValue}
                                    onChange={handleYChange}
                                    step="any"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <label htmlFor="rInput">R:</label>
                            </div>
                            <div className="col-md-11">
                                <MDBInput
                                    type="number"
                                    id="rInput"
                                    value={rValue}
                                    onChange={handleRChange}
                                    step="any"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-lg-1">
                                <label htmlFor="amountRange">Amount:</label>
                            </div>
                            <div className="col-md-10 col-lg-11">
                                <input
                                    type="range"
                                    id="amountRange"
                                    min="1"
                                    max="10"
                                    value={amountValue}
                                    onChange={handleAmountChange}
                                    data-mdb-multi-range-slider-init
                                />
                                <span>&nbsp;&nbsp;{amountValue}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-lg-1">
                                <label htmlFor="categoryRange">Category:</label>
                            </div>
                            <div className="col-md-10 col-lg-11">
                                <input
                                    type="range"
                                    id="categoryRange"
                                    min="1"
                                    max="30"
                                    value={categoryValue}
                                    onChange={handleCategoryChange}
                                    data-mdb-multi-range-slider-init
                                />
                                <span>&nbsp;&nbsp;{categoryValue}</span>
                            </div>
                        </div>
                        <button
                            className="btn btn-success right-float-btn"
                            data-mdb-ripple-init
                            onClick={handleAddDataClick}
                        >
                            Generate points
                        </button>
                        {/* Display the newly generated points */}
                        <div className="row title-row">
                            <div className="col-md-12">
                                <h2>Newly Generated Points</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>#</th>
                                            <th>X</th>
                                            <th>Y</th>
                                            <th>Category</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {generatedPoints.map((point, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{point.continuous_feature_1}</td>
                                                <td>{point.continuous_feature_2}</td>
                                                <td>{point.category}</td>
                                            </tr>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataGenerator;
