import React, { useState } from 'react';
import axios from 'axios';
import {URLS_POST_DATA} from "../Utils/Urls";
import {useNavigate} from "react-router-dom";

function AddData( ) {
    const [formData, setFormData] = useState({
        // Define your form fields
        continuous_feature_1: 0.0,
        continuous_feature_2: 0.0,
        category: 0,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // ... your existing logic
        axios.post(URLS_POST_DATA, formData)
            .then(() => {
                // Redirect to home page upon successful submission
                navigate('/');
            })
            .catch(error => console.error('Error adding data:', error));
    };

    return (
        <div>
            <h1>Add Data</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Feature 1:
                    <input type="text" name="continuous_feature_1" value={formData.continuous_feature_1} onChange={handleChange} />
                </label>
                <label>
                    Feature 2:
                    <input type="text" name="continuous_feature_2" value={formData.continuous_feature_2} onChange={handleChange} />
                </label>
                <label>
                    Categorical Feature:
                    <input type="text" name="category" value={formData.category} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddData;
