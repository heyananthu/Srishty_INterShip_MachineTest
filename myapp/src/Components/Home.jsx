import React from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate('/data')
    }
    const viewHandler = () => {
        navigate('/viewresume')

    }
    return (
        <div className='w-[80rem] ml-12 ' style={{ borderRadius: "40px", boxShadow: "0px 0px 5px 5px blue" }}>
            <div className=''>
                <div className='h-[30rem] mt-20 ml-12  '>
                    <h1 className='mt-16' style={{ fontFamily: "sans-serif", fontSize: "70px", fontWeight: "bolder", }}>The <span style={{ color: "blue" }}> CV </span>that gets <br />the job… done</h1>
                    <h6 className=''>Build a new CV or improve your existing <br />one with step-by-step expert guidance.</h6>
                    <button class=' bg-green-500 hover:bg-green-700 p-2 mt-10 text-white' onClick={clickHandler} style={{ height: "45px", borderRadius: "30px" }}>Create new Resume</button>
                    <button class=' bg-blue-500 hover:bg-blue-700 p-2 mt-10 ml-4 text-white' onClick={viewHandler} style={{ height: "45px", borderRadius: "30px" }}>View Resume</button>
                </div>
            </div>
            <div>
                {/* <Lottie style={{ width: "340px", marginTop: "120px", marginLeft: "0px" }} animationData={ResumeAnim} /> */}
            </div>
        </div>
    )
}

export default Home
