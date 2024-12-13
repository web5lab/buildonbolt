import { favorites } from '../data/favorites.js';

export const getFavorites = async (req, res) => {
  try {
    const userFavorites = favorites.filter(f => f.userId === req.query.userId);
    res.json(userFavorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { userId } = req.body;
    
    const existingFavorite = favorites.find(
      f => f.templateId === templateId && f.userId === userId
    );

    if (existingFavorite) {
      // Remove favorite
      const index = favorites.indexOf(existingFavorite);
      favorites.splice(index, 1);
      res.json({ favorited: false });
    } else {
      // Add favorite
      favorites.push({
        id: Date.now().toString(),
        userId,
        templateId,
        createdAt: new Date().toISOString()
      });
      res.json({ favorited: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};