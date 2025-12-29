
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiMetadataResponse } from "../types";

// نستخدم تعريفاً بسيطاً لـ process لتجنب أخطاء TypeScript أثناء البناء
declare var process: {
  env: {
    API_KEY: string;
  };
};

export const generateVideoMetadata = async (filename: string): Promise<GeminiMetadataResponse> => {
  // إنشاء نسخة جديدة في كل مرة لضمان استخدام أحدث مفتاح API
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `
      لدي ملف فيديو باسم "${filename}". 
      يرجى إنشاء الآتي **باللغة العربية**:
      1. عنوان تقني دقيق.
      2. وصف موضوعي (جملة واحدة).
      3. خمسة وسوم تقنية.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "description", "tags"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as GeminiMetadataResponse;

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return {
      title: filename,
      description: "تم الرفع بنجاح. بانتظار المراجعة الفنية.",
      tags: ["معالجة", "سحابة"]
    };
  }
};
