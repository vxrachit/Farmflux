export const askAgriBot = async (question: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8000/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    // Expecting data = { answer: string }
    return data.answer;
  } catch (error) {
    console.error('Error fetching chatbot response from backend:', error);
    throw new Error('Failed to get response from chatbot backend');
  }
};
