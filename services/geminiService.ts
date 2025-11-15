import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { TutorialStep } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getTutorialList = async (): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Gere uma lista de 12 tópicos comuns de reparos domésticos em Português do Brasil, adequados para um iniciante em bricolagem. Exemplos: 'Consertar um vaso sanitário com vazamento', 'Remendar um pequeno buraco em drywall'.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        topics: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        }
                    }
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        if (jsonResponse && Array.isArray(jsonResponse.topics)) {
            return jsonResponse.topics;
        }
        return [];
    } catch (error) {
        console.error("Erro ao buscar lista de tutoriais:", error);
        throw new Error("Falha ao buscar a lista de tutoriais da API Gemini.");
    }
};

export const getTutorialSteps = async (topic: string): Promise<TutorialStep[]> => {
    const prompt = `
        Gere um tutorial passo a passo sobre como "${topic}". As instruções devem estar em Português do Brasil.
        Mantenha as instruções simples, claras e concisas para um iniciante completo.
        Para cada passo, forneça:
        1. Um 'stepNumber' (número do passo).
        2. Um texto curto de 'instruction' (instrução).
        3. Um 'imagePrompt' (prompt de imagem) simples e descritivo para um gerador de imagens de IA criar uma imagem clara, minimalista e em estilo de diagrama instrucional ilustrando o passo. Foque na ação e nas ferramentas. Exemplo: 'Uma mão usando uma chave de fenda para apertar o puxador solto de um armário'.
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
                        steps: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    stepNumber: { type: Type.INTEGER },
                                    instruction: { type: Type.STRING },
                                    imagePrompt: { type: Type.STRING }
                                },
                                required: ["stepNumber", "instruction", "imagePrompt"]
                            }
                        }
                    }
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        if (jsonResponse && Array.isArray(jsonResponse.steps)) {
            return jsonResponse.steps;
        }
        return [];
    } catch (error) {
        console.error(`Erro ao buscar os passos do tutorial para "${topic}":`, error);
        throw new Error(`Falha ao buscar os passos do tutorial para "${topic}".`);
    }
};

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const fullPrompt = `Uma ilustração instrucional minimalista e limpa mostrando: ${prompt}. Fundo branco, linhas simples, paleta de cores limitada. Estilo de diagrama.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: fullPrompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const parts = response?.candidates?.[0]?.content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    return `data:image/png;base64,${base64ImageBytes}`;
                }
            }
        }
        
        throw new Error("Nenhuma imagem foi gerada.");
    } catch (error) {
        console.error(`Erro ao gerar imagem para o prompt "${prompt}":`, error);
        throw new Error("Falha ao gerar a imagem.");
    }
};