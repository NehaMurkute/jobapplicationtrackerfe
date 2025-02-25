import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobApplication.css";
import "./addJobApplication.js";
import AddApplication from "./addJobApplication.js";

function JobApplicationTracker() {
    const [applications, setApplications] = useState([]);
    const [editingId, setEditingId] = useState(null); 
    const [addClicked, setAddClicked] = useState("");
    
    // Function to fetch job applications from API
    const fetchAppliedJobs = () => {
        try {
            axios
                .get("http://localhost:5059/api/applications")
                .then((response) => setApplications(response.data))
                .catch((error) => console.error("Error fetching data:", error));
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {       
        fetchAppliedJobs();
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setApplications((prevApplications) =>
            prevApplications.map((app) =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        );
    };

    const handleEditClick = (id) => {
        setEditingId(id);
    };

    const handleUpdateClick = async (id, application) => {
        try {
            await axios.put(`http://localhost:5059/api/applications/${id}`, {
                ...application,
            });
            setEditingId(null); // Exit edit mode
        } catch (error) {
            console.error(
                "Error updating status:",
                error.response?.data || error.message
            );
        }
    };

    const handleAddClick = () => {
        setAddClicked("Clicked");
    };

    // Function to update state in Parent
    const handleChildMessage = (clickEvent) => {
        setAddClicked(clickEvent);
        fetchAppliedJobs();
    };

    return (
        <div>
            <h2>Job application tracker</h2>
            <button onClick={() => handleAddClick()}>Add Application</button>
            {addClicked === "Clicked" ? (
                <AddApplication
                    handleChildMessage={handleChildMessage}
                ></AddApplication>
            ) : (
                <>
                    <h3>List of all applied jobs</h3>
                    <table className="JobApplication">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.companyName}</td>
                                    <td>{application.position}</td>
                                    <td>
                                        {editingId === application.id ? (
                                            <select
                                                value={application.status}
                                                className="input-common"
                                                onChange={(e) =>
                                                    handleStatusChange(application.id, e.target.value)
                                                }
                                            >
                                                <option value="Applied">Applied</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Offer">Offer</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        ) : (
                                            application.status
                                        )}
                                    </td>
                                    <td>
                                        {new Date(application.dateApplied).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {editingId === application.id ? (
                                            <button
                                                onClick={() =>
                                                    handleUpdateClick(application.id, application)
                                                }
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button onClick={() => handleEditClick(application.id)}>
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
export default JobApplicationTracker;
