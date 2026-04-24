// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const getAIResponse = async (prompt, context = {}, retries = 2, delay = 45000) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const fullPrompt = context.problemTitle
//     ? `You are a helpful coding assistant for a code learning platform.
// Context: User is working on "${context.problemTitle}" (${context.difficulty || 'General'}).
// Description: ${context.description || 'No specific problem context.'}

// User Question: ${prompt}

// Please provide a helpful, educational response.`
//     : prompt;

//   try {
//     const result = await model.generateContent(fullPrompt);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     if (error.status === 429 && retries > 0) {
//       console.log(`Rate limited. Retrying in ${delay/1000}s...`);
//       await new Promise(resolve => setTimeout(resolve, delay));
//       return getAIResponse(prompt, context, retries - 1, delay);
//     }
//     throw error;
//   }
// };

// const generateHint = async (req, res) => {
//   try {
//     const { problemTitle, description, difficulty, examples } = req.body;

//     if (!problemTitle || !description) {
//       return res.status(400).json({ error: "Problem details are required" });
//     }

//     const prompt = `As a coding tutor, provide a helpful hint for this problem WITHOUT giving away the solution.

// Problem: ${problemTitle}
// Difficulty: ${difficulty || 'Unknown'}
// Description: ${description}
// ${examples ? `Examples: ${JSON.stringify(examples)}` : ''}

// Provide a single, concise hint that guides the user toward the solution without revealing it. Format your response as a helpful tip.`;

//     const hint = await getAIResponse(prompt);
//     res.json({ hint });
//   } catch (error) {
//     console.error("Error generating hint:", error);
//     if (error.status === 429) {
//       return res.status(429).json({ error: "Rate limit exceeded. Please wait 1 minute and try again." });
//     }
//     res.status(500).json({ error: "Failed to generate hint" });
//   }
// };

// const chatWithAI = async (req, res) => {
//   try {
//     const { message, context } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     const response = await getAIResponse(message, context || {});
//     res.json({ response });
//   } catch (error) {
//     console.error("Error in AI chat:", error);
//     if (error.status === 429) {
//       return res.status(429).json({ error: "Rate limit exceeded. Please wait 1 minute and try again." });
//     }
//     res.status(500).json({ error: "Failed to get AI response" });
//   }
// };

// module.exports = { generateHint, chatWithAI };

const Groq = require("groq-sdk");

let groq;

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  if (!groq) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  return groq;
};

const getAIResponse = async (prompt, context = {}) => {
  const fullPrompt = context.problemTitle
    ? `You are a helpful coding assistant for a code learning platform. 
Context: User is working on "${context.problemTitle}" (${context.difficulty || "General"}).
Description: ${context.description || "No specific problem context."}

User Question: ${prompt}

Please provide a helpful, educational response.`
    : prompt;

  const completion = await getGroqClient().chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: fullPrompt }],
    temperature: 0.5,
  });

  return completion.choices[0].message.content;
};

const generateHint = async (req, res) => {
  try {
    const { problemTitle, description, difficulty, examples } = req.body;

    if (!problemTitle || !description) {
      return res.status(400).json({ error: "Problem details are required" });
    }

    const prompt = `As a coding tutor, provide a helpful hint for this problem WITHOUT giving away the solution.

Problem: ${problemTitle}
Difficulty: ${difficulty || "Unknown"}
Description: ${description}
${examples ? `Examples: ${JSON.stringify(examples)}` : ""}

Provide a single, concise hint that guides the user toward the solution without revealing it. Format your response as a helpful tip.`;

    const hint = await getAIResponse(prompt);
    res.json({ hint });
  } catch (error) {
    console.error("Error generating hint:", error);
    res.status(500).json({ error: "Failed to generate hint" });
  }
};

const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await getAIResponse(message, context || {});
    res.json({ response });
  } catch (error) {
    console.error("Error in AI chat:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};

module.exports = { generateHint, chatWithAI };
