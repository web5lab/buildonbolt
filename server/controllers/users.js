import { users } from '../data/users.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fsPromises } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { userId } = req;
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete old avatar if it exists
    if (users[userIndex].avatar && users[userIndex].avatar.startsWith('/uploads/')) {
      const oldFilePath = path.join(__dirname, '..', '..', users[userIndex].avatar);
      try {
        await fsPromises.access(oldFilePath);
        await fsPromises.unlink(oldFilePath);
      } catch (error) {
        console.log('Old avatar file not found:', error);
      }
    }

    // Update user avatar path
    const avatarUrl = `/${req.file.filename}`;
    console.log("avatar url =>",avatarUrl)
    users[userIndex].avatar = avatarUrl;

    res.json({ 
      message: 'Avatar uploaded successfully',
      avatarUrl 
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ message: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { bio, website, github, twitter, linkedin, avatar } = req.body;
    
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle avatar upload if provided
    let avatarUrl = users[userIndex].avatar;
    if (avatar && avatar.startsWith('data:image')) {
      const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `avatar-${userId}-${Date.now()}.jpg`;
      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
      
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
      avatarUrl = `/uploads/${fileName}`;
      
      // Delete old avatar if it exists
      if (users[userIndex].avatar && users[userIndex].avatar.startsWith('/uploads/')) {
        const oldFilePath = path.join(__dirname, '..', '..', users[userIndex].avatar);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    users[userIndex] = {
      ...users[userIndex],
      bio,
      website,
      github,
      twitter,
      linkedin,
      avatar: avatarUrl,
      updatedAt: new Date().toISOString()
    };

    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};