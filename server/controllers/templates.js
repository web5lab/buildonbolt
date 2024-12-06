import { templateRequest } from '../data/templateRequests.js';
import { templates } from '../data/templates.js';
import nodemailer from 'nodemailer';
import { TwitterApi } from 'twitter-api-v2';

// NodeMailer configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
  port: parseInt(process.env.SMTP_PORT) || 587, // 587 is common for TLS
  secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email address
    pass: process.env.SMTP_PASS, // Your email password or app-specific password
  },
});

// Twitter API Client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Get all requested templates
export const getRequestedTemplates = async (req, res) => {
  try {
    res.json(templateRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve a template
export const approveTemplate = async (req, res) => {
  try {
    const { id, userEmail } = req.body;
    const templateIndex = templateRequest.findIndex(t => t.id === id);
    if (templateIndex === -1) {
      return res.status(404).json({ message: 'Requested template not found' });
    }
    const approvedTemplate = templateRequest.splice(templateIndex, 1)[0];
    templates.push(approvedTemplate);

    // Notify the user via email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Your template has been approved!',
      text: `Congratulations! Your template "${approvedTemplate.title}" has been approved and added to the platform.`,
    });

    // Tweet about the new template
    await twitterClient.v2.tweet(`🎉 New Template Added: "${approvedTemplate.title}"! Check it out now on our platform.`);

    res.json({ message: 'Template approved and added successfully', approvedTemplate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modify an existing template
export const modifyTemplate = async (req, res) => {
  try {
    const { id, updates } = req.body;
    const templateIndex = templates.findIndex(t => t.id === id);
    if (templateIndex === -1) {
      return res.status(404).json({ message: 'Template not found' });
    }
    const updatedTemplate = { ...templates[templateIndex], ...updates };
    templates[templateIndex] = updatedTemplate;
    res.json({ message: 'Template updated successfully', updatedTemplate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Existing endpoints remain unchanged

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

export const createTemplate = async (req, res) => {
  try {
    const { title, description, category, previewUrl, repoUrl, image, techStack, author } = req.body;

    const newTemplate = {
      id: Date.now().toString(),
      title,
      description,
      category,
      previewUrl,
      repoUrl,
      author: author || 'Community',
      createdAt: new Date().toISOString(),
      stars: 0,
      techStack: techStack || [],
      image: image || 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80',
    };

    templateRequest.push(newTemplate);
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeTemplateById = async (req, res) => {
  try {
    const { Id, SecretKey } = req.body;
    if (SecretKey !== process.env.SecretKey) {
      return res.status(401).json({ message: 'Invalid secret key' });
    }
    const templateIndex = templates.findIndex(t => t.id === Id);
    if (templateIndex === -1) {
      return res.status(404).json({ message: 'Template not found' });
    }
    const removedTemplate = templates.splice(templateIndex, 1);
    res.json({ message: 'Template removed successfully', removedTemplate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
