const bcrypt = require('bcrypt');
const Admin = require('../models/admin.js');
const Sclass = require('../models/sclass.js');
const Student = require('../models/student.js');
const Teacher = require('../models/teacher.js');
const Subject = require('../models/subject.js');
const Notice = require('../models/notice.js');
const Complain = require('../models/complain.js');

// Admin Registration
const adminRegister = async (req, res) => {
    try {
        // Check if an admin with the provided email already exists
        const existingAdminByEmail = await Admin.findOne({ where: { email: req.body.email } });

        // Check if an admin with the provided school name already exists
        const existingSchool = await Admin.findOne({ where: { schoolName: req.body.schoolName } });

        // If email already exists
        if (existingAdminByEmail) {
            return res.send({ message: 'Email already exists' });
        }
        // If school name already exists
        else if (existingSchool) {
            return res.send({ message: 'School name already exists' });
        }
        // If no conflict, create a new admin
        else {
            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);

            const admin = new Admin({
                ...req.body,
                password: hashedPass,  // Set hashed password
            });

            let result = await admin.save();
            result.password = undefined;  // Don't send password back in the response
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Admin Login
const adminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        // Use 'where' to find the admin by email
        let admin = await Admin.findOne({ where: { email: req.body.email } });

        if (admin) {
            const validated = await bcrypt.compare(req.body.password, admin.password);
            if (validated) {
                admin.password = undefined;  // Don't send password back in the response
                res.send(admin);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};


// Get Admin Details
const getAdminDetail = async (req, res) => {
    try {
        let admin = await Admin.findByPk(req.params.id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { adminRegister, adminLogIn, getAdminDetail };
