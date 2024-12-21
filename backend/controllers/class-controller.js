const Sclass = require('../models/sclass.js');
const Student = require('../models/student.js');
const Subject = require('../models/subject.js');
const Teacher = require('../models/teacher.js');

// Create a new class
const sclassCreate = async (req, res) => {
    try {
      const { sclassName } = req.body;
    //   console.log("Body", req.body);
  
      // Check if the class already exists
      const existingSclass = await Sclass.findOne({
        where: { sclassName: sclassName }
      });
    //   console.log("Check existing classes", existingSclass);
  
      if (existingSclass) {
        return res
          .status(400)
          .send({ message: "Sorry, this class name already exists" });
      }
  
      // Create and save the new class
      const sclass = new Sclass({
        sclassName
      });
      const result = await sclass.save();
      console.log("Result", result);
  
      res.status(201).send(result);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while creating the class",
        error: err
      });
      
    }
  };

// List all classes for a school
const sclassList = async (req, res) => {
    try {
        const sclasses = await Sclass.findAll();
        console.log("Classes fetched from the database:", sclasses);

        if (sclasses.length > 0) {
            console.log("Classes found, sending response...");
            res.status(200).send(sclasses);
        } else {
            console.log("No classes found.");
            res.status(404).send({ message: 'No classes found' });
        }
    } catch (err) {
        console.error("Error occurred while fetching classes:", err);
        res.status(500).json({
            message: 'An error occurred while fetching the classes',
            error: err.message
        });
    }
};


// Get details of a specific class
const getSclassDetail = async (req, res) => {
    try {
        let sclass = await Sclass.findById(req.params.id).populate('school', 'schoolName');
        if (sclass) {
            res.status(200).send(sclass);
        } else {
            res.status(404).send({ message: 'No class found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while fetching the class details', error: err });
    }
};

// Get all students of a specific class
const getSclassStudents = async (req, res) => {
    try {
        const students = await Student.find({ sclassName: req.params.id });
        if (students.length > 0) {
            const modifiedStudents = students.map(student => ({ ...student._doc, password: undefined }));
            res.status(200).send(modifiedStudents);
        } else {
            res.status(404).send({ message: 'No students found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while fetching the students', error: err });
    }
};

// Delete a specific class and its related data
const deleteSclass = async (req, res) => {
    try {
        const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).send({ message: 'Class not found' });
        }

        await Student.deleteMany({ sclassName: req.params.id });
        await Subject.deleteMany({ sclassName: req.params.id });
        await Teacher.deleteMany({ teachSclass: req.params.id });

        res.status(200).send({ message: 'Class and related data deleted successfully', deletedClass });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the class', error });
    }
};

// Delete all classes and related data for a school
const deleteSclasses = async (req, res) => {
    try {
        const deletedClasses = await Sclass.deleteMany({ school: req.params.id });

        if (deletedClasses.deletedCount === 0) {
            return res.status(404).send({ message: 'No classes found to delete' });
        }

        await Student.deleteMany({ school: req.params.id });
        await Subject.deleteMany({ school: req.params.id });
        await Teacher.deleteMany({ school: req.params.id });

        res.status(200).send({ message: 'Classes and related data deleted successfully', deletedCount: deletedClasses.deletedCount });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the classes', error });
    }
};


module.exports = {
    sclassCreate,
    sclassList,
    getSclassDetail,
    getSclassStudents,
    deleteSclass,
    deleteSclasses
};
