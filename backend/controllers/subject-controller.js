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

        const newSubjects = await Subject.bulkCreate(subjects);

        return res.status(201).json({
            message: 'Subject(s) added successfully!',
            data: newSubjects,
        });
    } catch (error) {
        console.error('Error adding subjects:', error);
        return res.status(500).json({
            message: 'An error occurred while adding the subject(s).',
            error: error.message,
        });
    }
};

const allSubjects = async (req, res) => {
    try {
        console.log("Fetching all subjects from the database...");
        const subjects = await Subject.findAll();
        console.log('Fetched subjects:', subjects);

        if (subjects.length > 0) {
            console.log("Subjects found, sending response...");
            return res.status(200).json(subjects);
        } else {
            console.log("No subjects found.");
            return res.status(404).json({ message: 'No subjects found' });
        }
    } catch (err) {
        console.error("Error occurred while fetching subjects:", err);
        return res.status(500).json({
            message: 'An error occurred while fetching the subjects.',
            error: err.message,
        });
    }
};

const classSubjects = async (req, res) => {
    try {
        console.log(`Fetching subjects for class ID: ${req.params.id}`);
        const subjects = await Subject.findAll({
            where: { sclassId: req.params.id },
        });

        if (subjects.length > 0) {
            console.log(`Found ${subjects.length} subjects for class ID: ${req.params.id}`);
            return res.status(200).json(subjects);
        } else {
            console.log(`No subjects found for class ID: ${req.params.id}`);
            return res.status(404).json({ message: "No subjects found" });
        }
    } catch (err) {
        console.error("Error fetching subjects:", err);
        return res.status(500).json({ error: "An error occurred while fetching subjects for the class." });
    }
};

const freeSubjectList = async (req, res) => {
    try {
        console.log(`Fetching free subjects for class ID: ${req.params.id}`);
        const subjects = await Subject.findAll({
            where: {
                sclassId: req.params.id,
                teacherId: null,
            },
        });

        if (subjects.length > 0) {
            console.log(`Found ${subjects.length} free subjects for class ID: ${req.params.id}`);
            return res.status(200).json(subjects);
        } else {
            console.log(`No free subjects found for class ID: ${req.params.id}`);
            return res.status(404).json({ message: "No subjects found without assigned teachers." });
        }
    } catch (err) {
        console.error("Error fetching free subjects:", err);
        return res.status(500).json({ error: "An error occurred while fetching free subjects." });
    }
};

const getSubjectDetail = async (req, res) => {
    try {
        console.log(`Fetching details for subject ID: ${req.params.id}`);
        const subject = await Subject.findByPk(req.params.id, {
            include: [
                {
                    model: require('../models/sclass.js'), // Replace with your class model
                    attributes: ['sclassName'],
                },
                {
                    model: Teacher,
                    attributes: ['name'],
                },
            ],
        });

        if (subject) {
            console.log(`Found subject details for ID: ${req.params.id}`);
            return res.status(200).json(subject);
        } else {
            console.log(`No subject found for ID: ${req.params.id}`);
            return res.status(404).json({ message: "No subject found" });
        }
    } catch (err) {
        console.error("Error fetching subject details:", err);
        return res.status(500).json({ error: "An error occurred while fetching the subject details." });
    }
};

const deleteSubject = async (req, res) => {
    try {
        console.log(`Deleting subject with ID: ${req.params.id}`);
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        await subject.destroy();
        console.log("Subject deleted:", subject);
        return res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        console.error("Error deleting subject:", error);
        return res.status(500).json({
            message: 'An error occurred while deleting the subject.',
            error: error.message,
        });
    }
};

const deleteSubjects = async (req, res) => {
    try {
        console.log("Deleting all subjects...");
        const deletedCount = await Subject.destroy({ where: {}, truncate: true });
        console.log(`Deleted ${deletedCount} subjects.`);
        return res.status(200).json({ message: "All subjects deleted successfully" });
    } catch (error) {
        console.error("Error deleting all subjects:", error);
        return res.status(500).json({
            message: 'An error occurred while deleting all subjects.',
            error: error.message,
        });
    }
};

const deleteSubjectsByClass = async (req, res) => {
    try {
        console.log(`Deleting subjects for class ID: ${req.params.id}`);
        const deletedCount = await Subject.destroy({ where: { sclassId: req.params.id } });
        console.log(`Deleted ${deletedCount} subjects for class ID: ${req.params.id}`);
        return res.status(200).json({ message: "Subjects deleted successfully for the class" });
    } catch (error) {
        console.error("Error deleting subjects by class:", error);
        return res.status(500).json({
            message: 'An error occurred while deleting subjects by class.',
            error: error.message,
        });
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
