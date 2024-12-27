import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Data() {
    const navigate = useNavigate();

    const [educationCount, setEducationCount] = useState(1);
    const [experienceCount, setExperienceCount] = useState(1);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [college, setCollege] = useState(['']);
    const [course, setCourse] = useState(['']);
    const [duration, setDuration] = useState(['']);
    const [company, setCompany] = useState(['']);
    const [position, setPosition] = useState(['']);
    const [comduration, setComduration] = useState(['']);

    const handleAddEducationField = () => {
        setEducationCount(educationCount + 1);
        setCollege([...college, '']);
        setCourse([...course, '']);
        setDuration([...duration, '']);
    };

    const handleAddExperienceField = () => {
        setExperienceCount(experienceCount + 1);
        setCompany([...company, '']);
        setPosition([...position, '']);
        setComduration([...comduration, '']);
    };

    const handleChange = (setter, index, value) => {
        const newArr = [...setter];
        newArr[index] = value;
        return newArr;
    };

    const clickHandler = (e) => {
        e.preventDefault();
        // console.log("datas are:"+ name, email, college, course, duration, company, position, comduration)
        axios.post("http://localhost:5000/insertdata", {
            name, email, college, course, duration, company, position, comduration
        }).then((res) => {
            if (res.data.msg == "success") {
                alert("INserted")
                localStorage.setItem("resumeId" , res.data.id)
                navigate('/resume')

            }
        })

    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-center text-2xl font-bold text-blue-600 mb-6">Fill Your Details</h1>
            <form className="bg-white p-6 rounded-lg shadow-lg w-3/4 mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {[...Array(educationCount)].map((_, index) => (
                    <div className="mb-6" key={index}>
                        <h5 className="text-lg font-semibold text-green-600">Education Qualification {index + 1}</h5>
                        <input
                            type="text"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Institution Name"
                            value={college[index]}
                            onChange={(e) => setCollege(handleChange(college, index, e.target.value))}
                        />
                        <input
                            type="text"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Course"
                            value={course[index]}
                            onChange={(e) => setCourse(handleChange(course, index, e.target.value))}
                        />
                        <input
                            type="text"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Duration"
                            value={duration[index]}
                            onChange={(e) => setDuration(handleChange(duration, index, e.target.value))}
                        />
                    </div>
                ))}
                <div className="text-center">
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleAddEducationField}
                    >
                        Add More Education
                    </button>
                </div>

                {[...Array(experienceCount)].map((_, index) => (
                    <div className="mb-6" key={index}>
                        <h5 className="text-lg font-semibold text-green-600">Work Experience {index + 1}</h5>
                        <input
                            type="text"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Company Name"
                            value={company[index]}
                            onChange={(e) => setCompany(handleChange(company, index, e.target.value))}
                        />
                        <input
                            type="text"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Position"
                            value={position[index]}
                            onChange={(e) => setPosition(handleChange(position, index, e.target.value))}
                        />
                        <input
                            type="text"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Duration"
                            value={comduration[index]}
                            onChange={(e) => setComduration(handleChange(comduration, index, e.target.value))}
                        />
                    </div>
                ))}
                <div className="text-center">
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleAddExperienceField}
                    >
                        Add More Experience
                    </button>
                </div>

                <div className="text-center mt-6">
                    <button
                        type="submit"
                        onClick={clickHandler}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Data;
