import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FetchGetService, FetchDeleteService } from "../services/FetchService";
import {URLS_DELETE_DATA, URLS_GET_DATA} from "../Utils/Urls";
import { MDBDataTable } from 'mdbreact';
import AddData from "./AddData";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch orders when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await FetchGetService(URLS_GET_DATA);

            console.log('Result:', result)
            setData(result);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };


    const handleDelete = (recordId) => {
        // Send a delete request to the backend API endpoint
        FetchDeleteService(URLS_DELETE_DATA+recordId)
            .then(response => {
                if (response.status === 200) {
                    // Update the data after successful deletion
                    setData(data.filter(item => item.id !== recordId));
                    fetchData();
                } else {
                    console.error('Error deleting record:', response.statusText);
                }
            })
            .catch(error => console.error('Error deleting record:', error));
    };

    const columns = [
        { label: '#', field: 'id' },
        { label: 'Feature 1', field: 'continuous_feature_1' },
        { label: 'Feature 2', field: 'continuous_feature_2' },
        { label: 'Category', field: 'category' },
        { label: 'Action', field: 'action' },
    ];

    const rows = data.map((record, index) => ({
        id: index + 1,
        continuous_feature_1: record.continuous_feature_1,
        continuous_feature_2: record.continuous_feature_2,
        category: record.category,
        action: (
            <button onClick={() => handleDelete(record.id)}>
                Delete
            </button>
        ),
    }));

    const tableData = {
        columns: columns,
        rows: rows,
    };

    return (
        <div>
            <h1>Data Points</h1>
            <MDBDataTable
                striped
                bordered
                hover
                data={tableData}
            />
        </div>
    );
}

export default Home;