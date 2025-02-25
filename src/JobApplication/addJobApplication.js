import { useState } from "react";
import axios from "axios";
import "./JobApplication.css";

const AddApplication = ({ handleChildMessage }) => {
    const [newApplication, setNewApplication] = useState({
        companyName: "",
        position: "",
        status: "",
        dateApplied: "",
    });
    const [errors, setErrors] = useState({
        companyName: "",
        position: "",
        status: "",
        dateApplied: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const errorStyle = {
        color: "red",
        display: "contents"
    };

    const handleSaveClick = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            companyName: "",
            position: "",
            status: "",
            dateApplied: "",
        });

        let valid = true;
        const newErrors = {};
        // Validation: Check if each field is filled
        if (!newApplication.companyName.trim()) {
            valid = false;
            newErrors.companyName = "Company Name is required";
        }

        if (!newApplication.position.trim()) {
            valid = false;
            newErrors.position = "Position is required";
        }

        if (!newApplication.status) {
            valid = false;
            newErrors.status = "Status is required";
        }

        if (!newApplication.dateApplied) {
            valid = false;
            newErrors.dateApplied = "Date is required";
        }

        // If validation fails, show errors
        if (!valid) {
            setErrors(newErrors);
        } else {
            axios
                .post("http://localhost:5059/api/applications", newApplication)
                .then((response) => {
                    setNewApplication({
                        companyName: "",
                        position: "",
                        status: "",
                        dateApplied: "",
                    });
                    handleChildMessage("");
                    setErrorMessage("");
                })
                .catch((error) => {
                    console.error("Error adding application:", error);
                    setErrorMessage(
                        error.response
                            ? error.response.data.message || "An error occurred while adding the application."
                            : "Unable to reach the server. Please try again later."
                    );
                });
        }
    };

    return (
        <div>
            <h4>Add Job Application</h4>
            <table border="0">
                <tbody>
                    <tr>
                        <td>                            
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="input-common"
                                value={newApplication.companyName}
                                onChange={(e) =>
                                    setNewApplication({
                                        ...newApplication,
                                        companyName: e.target.value,
                                    })
                                }
                            ></input>
                        
                            {errors.companyName && (
                                <p style={errorStyle}>{errors.companyName}</p>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                placeholder="Position"
                                className="input-common"
                                value={newApplication.position}
                                onChange={(e) =>
                                    setNewApplication({
                                        ...newApplication,
                                        position: e.target.value,
                                    })
                                }
                            ></input>
                        
                            {errors.position && (
                                <p style={errorStyle}>{errors.position}</p>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select
                                value={newApplication.status}
                                className="input-common"
                                onChange={(e) =>
                                    setNewApplication({
                                        ...newApplication,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option value="">Status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        
                            {errors.status && <p style={errorStyle}>{errors.status}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="date"
                                placeholder="Date"
                                className="input-common"
                                value={newApplication.dateApplied}
                                onChange={(e) =>
                                    setNewApplication({
                                        ...newApplication,
                                        dateApplied: e.target.value,
                                    })
                                }
                            ></input>
                        
                            {errors.dateApplied && (
                                <p style={errorStyle}>{errors.dateApplied}</p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <button onClick={handleSaveClick}>Save</button>
            {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        </div>
    );
};
export default AddApplication;
