import React, { useEffect, useState } from "react";
import axios from "axios";
import { FetchGetService, FetchDeleteService } from "../services/FetchService";
import { URLS_DELETE_DATA, URLS_GET_DATA } from "../Utils/Urls";
import { MDBDataTable } from "mdbreact";

import AddData from "./AddData";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

function Home() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await FetchGetService(URLS_GET_DATA);
            setData(result);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleDelete = (recordId) => {
        // Send a delete request to the backend API endpoint
        FetchDeleteService(URLS_DELETE_DATA + recordId)
            .then((response) => {
                if (!(response.status === 200))
                    throw new Error(`HTTP error: ${response.statusText}! Status: ${response.status}`);

                // Update the data after successful deletion
                setData(data.filter((item) => item.id !== recordId));
                fetchData();
            })
            .catch((error) => {
                console.log(error);
                navigate(`/error/${encodeURIComponent(error.message)}`);
            });
    };

    const columns = [
        { label: "#", field: "id" },
        { label: "Feature 1", field: "continuous_feature_1" },
        { label: "Feature 2", field: "continuous_feature_2" },
        { label: "Category", field: "category" },
        { label: "Action", field: "action" },
    ];

    const rows = data.map((record, index) => ({
        id: record.id,
        continuous_feature_1: record.continuous_feature_1.toFixed(6),
        continuous_feature_2: record.continuous_feature_2.toFixed(6),
        category: record.category,
        action: (
            <MDBBtn className="delete-btn" color="danger" onClick={() => handleDelete(record.id)}>
                Delete
            </MDBBtn>
        ),
    }));

    const tableData = {
        columns: columns,
        rows: rows,
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card d-inline-block">
                    <h1>Data Points</h1>
                    <MDBDataTable striped bordered hover data={tableData} />
                </div>
            </div>
        </div>
    );
}

export default Home;
