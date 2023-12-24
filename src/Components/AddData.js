import React, { useState } from 'react';
import axios from 'axios';
import {URLS_POST_DATA} from "../Utils/Urls";
import {useNavigate} from "react-router-dom";
import {MDBInput} from "mdb-react-ui-kit";

function AddData( ) {
    const [formData, setFormData] = useState({
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
        axios.post(URLS_POST_DATA, formData)
            .then((response) => {
                if (!(response.status === 200))
                    throw new Error(`HTTP error: ${response.statusText}! Status: ${response.status}`);

                navigate('/');
            })
            .catch(error => {
                console.log(error)
                navigate(`/error/${encodeURIComponent(error.message)}`);
            });
    };

    return (
        <div>
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div>
                                <h1>Add Data</h1>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Feature 1:
                                        <MDBInput type="text" name="continuous_feature_1" value={formData.continuous_feature_1} onChange={handleChange} />
                                    </label>
                                    <label>
                                        Feature 2:
                                        <MDBInput type="text" name="continuous_feature_2" value={formData.continuous_feature_2} onChange={handleChange} />
                                    </label>
                                    <label>
                                        Categorical Feature:
                                        <MDBInput type="text" name="category" value={formData.category} onChange={handleChange} />
                                    </label>
                                    <button type="submit" className="btn btn-success" data-mdb-ripple-init>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddData;
