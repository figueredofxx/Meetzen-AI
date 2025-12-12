import { GoogleGenAI } from "@google/genai";

// Use environment variable for API key
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateSmartReply = async (history: string[], context: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key missing. Returning mock response.");
    return new Promise(resolve => setTimeout(() => resolve("Resposta sugerida pela IA (Modo Mock): Olá, como posso ajudar com isso?"), 800));
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a helpful customer service assistant.
      Context about the client: ${context}
      
      Conversation History:
      ${history.join('\n')}
      
      Suggest a short, professional, and helpful response for the agent to send next. 
      Do not include quotes or labels, just the text.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Não foi possível gerar uma sugestão.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Erro ao conectar com a IA.";
  }
};

export const analyzeIntent = async (message: string): Promise<{ intent: string, confidence: number }> => {
    if (!ai) {
        return { intent: 'Geral', confidence: 0.85 };
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the following message and extract the intent (one or two words) and a confidence score (0.0 to 1.0). Return strictly JSON format like {"intent": "string", "confidence": number}. Message: "${message}"`,
            config: { responseMimeType: 'application/json' }
        });
        const text = response.text;
        if (text) {
             return JSON.parse(text);
        }
        return { intent: 'Indefinido', confidence: 0 };
    } catch (e) {
        console.error("Error analyzing intent", e);
        return { intent: 'Erro', confidence: 0 };
    }
}
