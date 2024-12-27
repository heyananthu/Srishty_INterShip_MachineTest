import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Resume() {
    const resumeId = localStorage.getItem("resumeId");

    const [data, setData] = useState({
        name: "",
        email: "",
        college: [],
        course: [],
        duration: [],
        company: [],
        position: [],
        comduration: []
    });

    useEffect(() => {
        axios.post(`http://localhost:5000/getresume/${resumeId}`)
            .then((res) => {
                setData(res.data);
                console.log("The data are:", res.data);
            })
            .catch((err) => {
                console.error("Error fetching resume:", err);
            });
    }, [resumeId]);

    return (
        <div className="w-4/5 mx-auto mt-12 p-5 shadow-lg bg-white font-sans">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">{data?.name || "Name not available"}</h1>
                <p className="text-gray-600">{data?.email || "Email not available"}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mt-6">Education</h2>
                {data.college.length > 0 ? (
                    data.college.map((college, index) => (
                        <div className="mb-5" key={index}>
                            <p className="font-bold text-gray-800">Institution Name: <span className="text-gray-600 font-normal">{college}</span></p>
                            <p className="font-bold text-gray-800">Course: <span className="text-gray-600 font-normal">{data.course[index]}</span></p>
                            <p className="font-bold text-gray-800">Duration: <span className="text-gray-600 font-normal">{data.duration[index]}</span></p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No education details available.</p>
                )}

                <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mt-6">Work Experience</h2>
                {data.company.length > 0 ? (
                    data.company.map((company, index) => (
                        <div className="mb-5" key={index}>
                            <p className="font-bold text-gray-800">Company Name: <span className="text-gray-600 font-normal">{company}</span></p>
                            <p className="font-bold text-gray-800">Position: <span className="text-gray-600 font-normal">{data.position[index]}</span></p>
                            <p className="font-bold text-gray-800">Duration: <span className="text-gray-600 font-normal">{data.comduration[index]}</span></p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No work experience available.</p>
                )}
            </div>
        </div>
    );
}

export default Resume;
