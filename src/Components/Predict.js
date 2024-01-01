import React, { useState, useEffect } from "react";
import { URLS_PREDICT, URLS_TRAIN_MODEL } from "../Utils/Urls";
import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Predict = () => {
    const [plotImages, setPlotImages] = useState([]);
    const [xValue, setXValue] = useState("");
    const [yValue, setYValue] = useState("");
    const [kValue, setKValue] = useState(2);
    const [categoryResult, setCategoryResult] = useState(null);

    const handleXChange = (event) => {
        setXValue(event.target.value);
    };

    const handleYChange = (event) => {
        setYValue(event.target.value);
    };

    const handleKChange = (event) => {
        setKValue(parseInt(event.target.value, 10));
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${URLS_TRAIN_MODEL}?k=${kValue}&x=${xValue}&y=${yValue}`)
            .then((response) => response.json())
            .then((data) => {
                const plotImagesArray = data.plot_images || [];
                console.log(plotImagesArray);
                setPlotImages(plotImagesArray);
            })
            .catch((error) => console.error("Error fetching plot images:", error));
    }, [kValue, xValue, yValue]);

    const handlePredictClick = () => {
        const predictUrl = `${URLS_PREDICT}?x=${xValue}&y=${yValue}&k=${kValue}`;

        fetch(predictUrl)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error: ${response.statusText}! Status: ${response.status}`);

                return response.json();
            })
            .then((data) => {
                const result = data.predicted_category;
                setCategoryResult(result);
            })
            .catch((error) => {
                console.log(error);
                navigate(`/error/${encodeURIComponent(error.message)}`);
            });
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-1">
                            <label htmlFor="xInput">X:</label>
                        </div>
                        <div className="col-md-11">
                            <MDBInput type="number" id="xInput" value={xValue} onChange={handleXChange} step="any" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <label htmlFor="yInput">Y:</label>
                        </div>
                        <div className="col-md-11">
                            <MDBInput type="number" id="yInput" value={yValue} onChange={handleYChange} step="any" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <label htmlFor="kRange">K:</label>
                        </div>
                        <div className="col-md-11">
                            <input
                                type="range"
                                id="kRange"
                                min="1"
                                max="5"
                                value={kValue}
                                onChange={handleKChange}
                                data-mdb-multi-range-slider-init
                            />
                            <span>&nbsp;&nbsp;{kValue}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button
                                className="btn btn-success right-float-btn"
                                data-mdb-ripple-init
                                onClick={handlePredictClick}
                            >
                                Predict Category
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {categoryResult !== null && (
                                <p className="mb-0 mt-3 text-center">
                                    <strong>Category Result:</strong> {categoryResult}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            {plotImages.map((base64String, index) => (
                                <img
                                    key={index}
                                    src={`data:image/png;base64,${base64String}`}
                                    alt={`Plot ${index}`}
                                    style={{ width: "100%", marginBottom: "20px" }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Predict;
