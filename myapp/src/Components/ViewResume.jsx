import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewResumes() {
    const [resumes, setResumes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentResume, setCurrentResume] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/viewresume")
            .then((res) => {
                setResumes(res.data);
                console.log("Resume Details are:", res.data);
            })
            .catch((error) => {
                console.error("Error fetching resumes:", error);
            });
    }, []);

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:5000/deleteresume/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Deleted");
                    setResumes(resumes.filter((resume) => resume._id !== id));
                }
            });
    };

    const editHandler = (resume) => {
        setIsEditing(true);
        setCurrentResume(resume);
    };

    const updateHandler = () => {
        axios.put(`http://localhost:5000/updateresume/${currentResume._id}`, currentResume)
            .then((res) => {
                if (res.status === 200) {
                    alert("Updated successfully!");
                    setIsEditing(false);
                    setResumes((prevResumes) =>
                        prevResumes.map((resume) =>
                            resume._id === currentResume._id ? currentResume : resume
                        )
                    );
                }
            });
    };

    const handleChange = (field, value, index = null) => {
        if (index !== null) {
            const updatedField = [...currentResume[field]];
            updatedField[index] = value;
            setCurrentResume({ ...currentResume, [field]: updatedField });
        } else {
            setCurrentResume({ ...currentResume, [field]: value });
        }
    };

    return (
        <div>
            {isEditing ? (
                <div className="w-4/5 mx-auto mt-12 p-5 shadow-lg bg-white font-sans">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Resume</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-medium">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={currentResume?.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={currentResume?.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>

                        <h2 className="text-xl font-semibold">Education</h2>
                        {currentResume?.college?.map((college, index) => (
                            <div key={index} className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Institution Name"
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                    value={college}
                                    onChange={(e) => handleChange('college', e.target.value, index)}
                                />
                                <input
                                    type="text"
                                    placeholder="Course"
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                    value={currentResume?.course[index] || ''}
                                    onChange={(e) => handleChange('course', e.target.value, index)}
                                />
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={currentResume?.duration[index] || ''}
                                    onChange={(e) => handleChange('duration', e.target.value, index)}
                                />
                            </div>
                        ))}

                        <h2 className="text-xl font-semibold">Work Experience</h2>
                        {currentResume?.company?.map((company, index) => (
                            <div key={index} className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                    value={company}
                                    onChange={(e) => handleChange('company', e.target.value, index)}
                                />
                                <input
                                    type="text"
                                    placeholder="Position"
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                    value={currentResume?.position[index] || ''}
                                    onChange={(e) => handleChange('position', e.target.value, index)}
                                />
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={currentResume?.comduration[index] || ''}
                                    onChange={(e) => handleChange('comduration', e.target.value, index)}
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            className="bg-blue-500 text-white p-2 rounded mt-4"
                            onClick={updateHandler}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            ) : (
                resumes.map((resume) => (
                    <div key={resume._id} className="w-4/5 mx-auto mt-12 p-5 shadow-lg bg-white font-sans">
                        {/* Name and Email */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">{resume?.name || 'Name not available'}</h1>
                            <p className="text-gray-600">{resume?.email || 'Email not available'}</p>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mt-6">Education</h2>
                        {resume.college?.length > 0 ? (
                            resume.college.map((college, index) => (
                                <div className="mb-5" key={index}>
                                    <p className="font-bold text-gray-800">Institution Name: <span className="text-gray-600 font-normal">{college}</span></p>
                                    <p className="font-bold text-gray-800">Course: <span className="text-gray-600 font-normal">{resume.course[index]}</span></p>
                                    <p className="font-bold text-gray-800">Duration: <span className="text-gray-600 font-normal">{resume.duration[index]}</span></p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No education details available.</p>
                        )}

                        <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mt-6">Work Experience</h2>
                        {resume.company?.length > 0 ? (
                            resume.company.map((company, index) => (
                                <div className="mb-5" key={index}>
                                    <p className="font-bold text-gray-800">Company Name: <span className="text-gray-600 font-normal">{company}</span></p>
                                    <p className="font-bold text-gray-800">Position: <span className="text-gray-600 font-normal">{resume.position[index]}</span></p>
                                    <p className="font-bold text-gray-800">Duration: <span className="text-gray-600 font-normal">{resume.comduration[index]}</span></p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No work experience available.</p>
                        )}

                        <button
                            className="bg-red-500 text-white p-2 rounded mr-2"
                            onClick={() => deleteHandler(resume._id)}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => editHandler(resume)}
                        >
                            Edit
                        </button>
                    </div>
                ))
            )}
        </div>
    );


}

export default ViewResumes;
