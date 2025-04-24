import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to get user profile' });
  }
};

export const updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, bio } = req.body;

  try {
    // Only allow the user to update their own profile
    if (req.user !== req.params.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.bio = bio || user.bio;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      role: updatedUser.role
    });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update profile' });
  }
};
