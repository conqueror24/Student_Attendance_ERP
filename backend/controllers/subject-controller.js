const Subject = require('../models/subject.js'); // Sequelize Subject model
const Teacher = require('../models/teacher.js'); // Sequelize Teacher model
const Student = require('../models/student.js'); // Sequelize Student model

const subjectCreate = async (req, res) => {
    try {
        const subjects = req.body.subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        }));

        // Check if any subject with the same subCode already exists
        for (const subject of subjects) {
            const existingSubject = await Subject.findOne({
                where: { subCode: subject.subCode },
            });

            if (existingSubject) {
                return res.status(400).json({
                    message: `A subject with the code ${subject.subCode} already exists.`,
                });
            }
        }

        // Create new subjects
        const newSubjects = await Subject.bulkCreate(subjects);

        return res.status(201).json({
            message: 'Subject(s) added successfully!',
            data: newSubjects,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while adding the subject(s).',
            error: error.message,
        });
    }
};

const allSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find()
            .populate("sclassName", "sclassName");
        if (subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const classSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id });
        if (subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const freeSubjectList = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id, teacher: { $exists: false } });
        if (subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSubjectDetail = async (req, res) => {
    try {
        let subject = await Subject.findById(req.params.id);
        if (subject) {
            subject = await subject.populate("sclassName", "sclassName");
            subject = await subject.populate("teacher", "name");
            res.send(subject);
        } else {
            res.send({ message: "No subject found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

        // Set the teachSubject field to null in teachers
        await Teacher.updateOne(
            { teachSubject: deletedSubject._id },
            { $unset: { teachSubject: "" } }
        );

        // Remove the objects containing the deleted subject from students' examResult array
        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedSubject._id } } }
        );

        // Remove the objects containing the deleted subject from students' attendance array
        await Student.updateMany(
            {},
            { $pull: { attendance: { subName: deletedSubject._id } } }
        );

        res.send(deletedSubject);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteSubjects = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany();

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteSubjectsByClass = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    subjectCreate,
    freeSubjectList,
    classSubjects,
    getSubjectDetail,
    deleteSubjectsByClass,
    deleteSubjects,
    deleteSubject,
    allSubjects,
};
