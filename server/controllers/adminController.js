import Admin from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// to create the admin
export const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({
            success: true,
            message: "Admin created successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create admin"
        });
    }
};


// to sign in the admin
export const signInAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Admin not found"
            });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const payload = {
            _id: admin._id,
            email: admin.email,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({
            success: true,
            message: "Admin signed in successfully",
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to sign in admin"
        });
    }
};




// to get the admin details
export const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Admin details fetched successfully",
            data: admin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch admin details"
        });
    }
};


// signout admin
export const signOutAdmin = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Admin signed out successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to sign out admin"
        });
    }
};