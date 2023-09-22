import axios from 'axios';

export const postChallengeData = async (title, description, difficulty, status, challengeTime) => {
  try {
    const response = await axios.post('/api/records', {
      title,
      description,
      difficulty,
      challengeStatus: status,
      challengeTime: Math.round(challengeTime),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};