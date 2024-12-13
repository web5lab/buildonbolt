import { templates } from '../data/templates.js';

export const getAllTemplates = async (req, res) => {
  try {
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const template = templates.find(t => t.id === req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createTemplate = async (req, res) => {
  try {
    const { userId } = req;
    const { 
      title, 
      description, 
      category, 
      previewUrl, 
      repoUrl, 
      image, 
      techStack 
    } = req.body;
    
    // Save image if it's base64
    let imageUrl = image;
    if (image && image.startsWith('data:image')) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `template-${Date.now()}.jpg`;
      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
      
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }
    
    const newTemplate = {
      id: Date.now().toString(),
      title,
      description,
      category,
      previewUrl,
      repoUrl,
      author: req.user?.name || req.user?.email || 'Anonymous User',
      userId,
      createdAt: new Date().toISOString(),
      stars: 0,
      techStack: techStack || [],
      image: imageUrl,
      status: 'pending'
    };

    templates.push(newTemplate);
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ message: error.message });
  }
};