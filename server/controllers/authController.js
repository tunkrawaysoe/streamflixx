import User from "../models/User.js";;
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const createToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  };

export const register = async (req,res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });
        const user = new User({
            username, email, password
        })
        const newUser = await User.create({ username, email, password });
        const token = createToken(newUser);
        res.status(201).json({ user: { id: newUser._id, username }, token });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        
    }
    
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = createToken(user);
        res.json({ user: { id: user._id, username: user.username }, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
    
}