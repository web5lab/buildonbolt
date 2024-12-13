import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { users } from '../data/users.js';
import { templates } from '../data/templates.js';
import { comments } from '../data/comments.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // For testing purposes, only check if credentials match default admin/admin
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: 'admin', role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: 'admin-123',
        email: 'admin@example.com',
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTemplates = async (req, res) => {
  try {
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTemplateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const template = templates.find(t => t.id === id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    template.status = status;
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const index = templates.findIndex(t => t.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Template not found' });
    }

    templates.splice(index, 1);
    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const index = comments.findIndex(c => c.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comments.splice(index, 1);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    // In a real app, you would fetch reports from the database
    const reports = [];
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resolveReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    // In a real app, you would update the report status in the database
    res.json({ message: 'Report resolved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = {
      users: users.length,
      templates: templates.length,
      comments: comments.length,
      reports: 0, // In a real app, you would count reports from the database
      activity: [
        { name: 'Jan', users: 400, templates: 240, comments: 140 },
        { name: 'Feb', users: 300, templates: 139, comments: 221 },
        { name: 'Mar', users: 200, templates: 980, comments: 229 },
        { name: 'Apr', users: 278, templates: 390, comments: 200 },
        { name: 'May', users: 189, templates: 480, comments: 218 },
        { name: 'Jun', users: 239, templates: 380, comments: 250 },
      ]
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};