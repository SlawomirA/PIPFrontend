import axios from "axios";

export function FetchGetService(url) {
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            // Handle error
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

export function FetchPostService(url, body) {
    return axios
        .post(url, body)
        .then((response) => response.data)
        .catch((error) => {
            // Handle error
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

export function FetchPutService(url, body) {
    return axios
        .put(url, body)
        .then((response) => response.data)
        .catch((error) => {
            // Handle error
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

export function FetchPatchService(url, body) {
    return axios
        .patch(url, body)
        .then((response) => response.data)
        .catch((error) => {
            // Handle error
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

export function FetchDeleteService(url) {
    return axios
        .delete(url)
        .then((response) => response)
        .catch((error) => {
            // Handle error
            console.error("Error deleting data:", error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}


