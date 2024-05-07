import React, { useState } from 'react';
import OpenAI from 'openai';

const AnswerSection = ({ outputText }) => {
  const [correctedAnswer, setCorrectedAnswer] = useState('');
  const [rating, setRating] = useState(null);

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const ask = async (content) => {
    try {
      const prompt = `Correct the following text and rate 1-10:\n${content}\n\n: Score: ${rating}/10 `;
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        model: "gpt-3.5-turbo",
      });

      // Parse the response for the rating
      const response = completion.choices[0].message?.content || '';
      const regex = /Score: (\d+)\/10/;
      const match = response.match(regex);
      const extractedRating = match ? match[1] : null;

      // Update the rating state
      setRating(extractedRating);

      // Return the corrected answer
      return response.replace(regex, '');
    } catch (error) {
      console.error('Error asking OpenAI:', error);
      throw error;
    }
  };

  const handleCorrection = async () => {
      try {
        if (outputText) {
          const answer = await ask(outputText);
          setCorrectedAnswer(answer);
        } else {
          setCorrectedAnswer("");
        }
      } catch (error) {
        console.error('Error correcting answer:', error);
      }
  };

  return (
    <>
      <p className='check-text'>When you have completed the checks, press 'Correct your answer' to correct the text!<br/>↓</p>
      <textarea value={correctedAnswer} placeholder="The AI's correction results are displayed here." readOnly></textarea>
      <p>Rating: {rating !== null ? `${rating}/10` : 'unrated'}</p>
      <button onClick={handleCorrection}>Correct your answer</button>
    </>
  );
};

export default AnswerSection;