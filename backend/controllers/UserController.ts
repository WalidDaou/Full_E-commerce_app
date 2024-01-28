import express from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { auth, tokenBlacklist } from "../middleware/auth";

const TOKEN_SECRET = process.env.TOKEN_SECRET

import User from '../models/User'
import { superAdmins } from "../shared/constants";


const saltRounds = 10;
const UsersController = express.Router()

// Should remove
UsersController.get('/list', async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create User!" })
    }
})

UsersController.post('/register', async (req, res) => {
    try {

        const {
            name,
            email,
            password,
        } = req.body

        if (!name || !email || !password) {
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        })

        const error = user.validateSync();
        if (error) {
            console.log(error)
            return res.status(400).json({ error: "Failed to register!" })
        }

        await user.save()

        console.log(user)
        if (!TOKEN_SECRET) {
            return;
        }
        else {

            let token = jwt.sign({ user: { ...user?.toJSON(), password: '' } }, TOKEN_SECRET)

            res.json({ token })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create User!" })
    }
})


UsersController.post('/login', async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body

        const user = await User.findOne({
            email
        })

        if (!user) {
            res.status(401).json({ error: "User not found! Please register" })
        }
        else {

            // verify password
            // @ts-ignore
            const verification = bcrypt.compareSync(password, user.password);

            if (!verification) {
                return res.status(400).json({ error: "Credentials wrong!" })
            }
            console.log(user)


            if (!TOKEN_SECRET) {
                return;
            }
            else {
                const isAdmin: boolean = (email === superAdmins);

                let token = jwt.sign({ user: { ...user?.toJSON(), password: '' }, isAdmin, }, TOKEN_SECRET)

                res.json({ token })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create User!" })
    }
})

UsersController.post('/logout', auth, (req, res) => {

    try {

        const token = req.get('Authorization')?.split(' ')[1];

        if (!token) {
            res.status(400).json({ error: "no user" })
        }
        else {

            tokenBlacklist.add(token);

            res.json({ success: true, message: 'User logged out successfully' });
            console.log('User logged out successfully')

        }
    } catch (error) {

    }
});



export default UsersController;