import React from 'react';
import { useParams } from 'react-router-dom';

const ErrorPage = () => {
    const { errorCode, errorMessage } = useParams();

    return (
        <div>
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card d-inline-block'>
                            <h1>{`${errorCode}`}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;