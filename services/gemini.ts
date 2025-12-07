import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateThumbnail = async (
  prompt: string, 
  styleString: string, 
  aspectRatio: string
): Promise<string> => {
  try {
    // Enhance prompt for better thumbnail results
    const fullPrompt = `Podcast thumbnail design. ${prompt}. Style: ${styleString}. High quality, catchy, legible text if any.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini.");
    }

    const content = response.candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("No content parts returned.");
    }

    let imageUrl = '';

    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        const base64Data = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${mimeType};base64,${base64Data}`;
        break; // Found the image, exit loop
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in the response.");
    }

    return imageUrl;

  } catch (error) {
    console.error("Error generating thumbnail:", error);
    throw error;
  }
};