import { useState, useEffect } from 'react';

const thoughts = [
  "💡 Just discovered an amazing new template!",
  "🚀 Ready to help build something awesome",
  "🎨 Looking for design inspiration?",
  "⚡ Need a quick project starter?",
  "🤔 Wondering what to build next?",
  "✨ Got some cool template ideas!",
  "🛠️ Let's find the perfect tools for you",
  "🌟 Check out our featured templates!",
  "💻 Time to code something amazing",
  "🎯 Need help finding a template?"
];

export function useRandomThoughts() {
  const [currentThought, setCurrentThought] = useState(thoughts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * thoughts.length);
      setCurrentThought(thoughts[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { currentThought };
}