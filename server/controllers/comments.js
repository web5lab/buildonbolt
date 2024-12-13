import { comments } from '../data/comments.js';

export const getCommentsByTemplateId = async (req, res) => {
  try {
    const templateComments = comments.filter(c => c.templateId === req.params.templateId);
    res.json(templateComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { content, parentId } = req.body;
    
    const newComment = {
      id: Date.now().toString(),
      templateId,
      content,
      author: {
        id: 'user-1', // In a real app, this would come from auth
        name: 'Anonymous User',
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      parentId
    };

    comments.push(newComment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};