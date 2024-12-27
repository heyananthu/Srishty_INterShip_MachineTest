const mongoose = require('mongoose')
const ResumeSchema = require('./Schema/dataSchema')

const addData = async (req, res) => {
    const { name, email, college, course, duration, company, position, comduration } = req.body;
    try {
        const newData = { name, email, college, course, duration, company, position, comduration };
        // console.log(newData);

        const resumeData = await ResumeSchema.insertMany([newData]);

        if (resumeData && resumeData.length > 0) {
            const insertedId = resumeData[0]._id;
            // console.log('Inserted ID:', insertedId);
            res.status(200).json({ msg: "success", id: insertedId });
        } else {
            res.status(400).json({ msg: "Insertion failed" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

const getResume = async (req, res) => {
    const { resumeId } = req.params;
    console.log("ID is:", resumeId);

    try {
        const findResume = await ResumeSchema.findOne({ _id: resumeId });
        console.log("findResume:", findResume);

        if (findResume) {

            return res.status(200).json(findResume);
        } else {

            return res.status(404).json({ msg: "Resume not found" });
        }
    } catch (err) {
        console.error(err);

        return res.status(500).json({ msg: "Server error" });
    }
};

const viewResume = async (req, res) => {
    try {
        const findResume = await ResumeSchema.find();

        if (findResume.length === 0) {
            return res.status(404).json({ message: "No resumes found." });
        }

        res.json(findResume);
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
};

const deleteResumeHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResume = await ResumeSchema.findByIdAndDelete(id);

        if (deleteResume) {
            return res.status(200).json({ message: "Resume deleted successfully." });
        } else {
            return res.status(404).json({ message: "Resume not found." });
        }
    } catch (error) {
        console.error("Error deleting resume:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const updateResumeHandler = async (req, res) => {
    const { id } = req.params;
    const { name, email, college, course, duration, company, position, comduration } = req.body;

    try {
        const updatedResume = await ResumeSchema.findByIdAndUpdate(
            id,
            { name, email, college, course, duration, company, position, comduration }
        );

        if (!updatedResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json({ message: 'Resume updated successfully', updatedResume });
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ message: 'Failed to update resume' });
    }
};






module.exports = { addData, getResume, viewResume, deleteResumeHandler, updateResumeHandler }