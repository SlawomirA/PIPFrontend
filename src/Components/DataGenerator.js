import React, { useState, useEffect } from 'react';
import {URLS_GENERATE, URLS_PREDICT, URLS_TRAIN_MODEL} from '../Utils/Urls';
import {MDBInput, MDBTable, MDBTableBody, MDBTableHead} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

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
    <div>
        <div>
            <div className='row'>
                <div className='col-md-12 d-inline-block'>
                    <div className='card d-inline-block'>

                        <div>
                            <div>
                                <label htmlFor="xInput">X:</label>
                                <MDBInput type="number" id="xInput" value={xValue} onChange={handleXChange} step="any" />
                            </div>
                            <div>
                                <label htmlFor="yInput">Y:</label>
                                <MDBInput type="number" id="yInput" value={yValue} onChange={handleYChange} step="any" />
                            </div>
                            <div>
                                <label htmlFor="rInput">R:</label>
                                <MDBInput type="number" id="rInput" value={rValue} onChange={handleRChange} step="any" />
                            </div>
                            <div>
                                <label htmlFor="amountRange">Amount:</label>
                                <input
                                    type="range"
                                    id="amountRange"
                                    min="1"
                                    max="10"
                                    value={amountValue}
                                    onChange={handleAmountChange}
                                    data-mdb-multi-range-slider-init
                                />
                                <span>{amountValue}</span>
                            </div>
                            <div>
                                <label htmlFor="categoryRange">Category:</label>
                                <input
                                    type="range"
                                    id="categoryRange"
                                    min="1"
                                    max="30"
                                    value={categoryValue}
                                    onChange={handleCategoryChange}
                                    data-mdb-multi-range-slider-init
                                />
                                <span>{categoryValue}</span>
                            </div>
                            <button  className="btn btn-success" data-mdb-ripple-init  onClick={handleAddDataClick}>Generate points</button>
                            {/* Display the newly generated points */}
                            <div className='d-inline-block'>
                                <h2>Newly Generated Points</h2>
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
    </div>
    );
};

export default DataGenerator;
