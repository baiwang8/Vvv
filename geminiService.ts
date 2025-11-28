import { GoogleGenAI, Type } from "@google/genai";
import { SEOOptimizationResult, Language } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSEOData = async (
  productTitle: string,
  productDescription: string,
  language: Language
): Promise<SEOOptimizationResult> => {
  if (!apiKey) {
    throw new Error("API Key not found. Please set REACT_APP_GEMINI_API_KEY.");
  }

  const langInstruction = language === 'zh' 
    ? "Generate the output in Simplified Chinese (简体中文)." 
    : "Generate the output in English.";

  const prompt = `
    Analyze the following source code product and generate optimized SEO metadata.
    Product Title: ${productTitle}
    Product Description: ${productDescription}

    ${langInstruction}
    Create a catchy SEO title, a compelling meta description (under 160 chars), 
    relevant high-traffic keywords, a social media share snippet, and a URL friendly slug (slug should always be in English/ASCII).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimizedTitle: {
              type: Type.STRING,
              description: "An SEO optimized title tag for the product page."
            },
            metaDescription: {
              type: Type.STRING,
              description: "A compelling meta description under 160 characters."
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 5-10 high-relevance keywords."
            },
            socialShareText: {
              type: Type.STRING,
              description: "Engaging text suitable for Twitter/LinkedIn sharing."
            },
            suggestedUrlSlug: {
              type: Type.STRING,
              description: "A clean, hyphenated URL slug in English."
            }
          },
          required: ["optimizedTitle", "metaDescription", "keywords", "socialShareText", "suggestedUrlSlug"]
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from AI");
    }
    
    return JSON.parse(text) as SEOOptimizationResult;
  } catch (error) {
    console.error("Gemini SEO Generation Error:", error);
    throw error;
  }
};