import "dotenv/config";
import OpenAI from "openai";

export const ApiGPT = new OpenAI({ apiKey: process.env.GPT });
