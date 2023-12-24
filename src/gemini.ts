import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'

export interface NutritionFacts {
  servingSize: string
  servingsPerContainer: string
  calories: string
  totalFat: string
  saturatedFat: string
  transFat: string
  cholesterol: string
  sodium: string
  totalCarbohydrates: string
  dietaryFiber: string
  sugars: string
  protein: string
  vitaminA: string
  vitaminB1: string
  vitaminB2: string
  vitaminB12: string
  calcium: string
  iron: string
}

export async function getNutritionFacts(prompt: string): Promise<Partial<NutritionFacts> | Error> {
  try {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI( '<Your API key>')
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

    const imageParts = [
      fileToGenerativePart("test.jpeg", "image/jpeg")
    ]

    const result = await model.generateContent([prompt, ...imageParts])
    let response = await result.response.text()
    response = response.replace('json', '')
    response = response.replaceAll('`', '')

    return JSON.parse(response).nutritionFacts
  } catch (error) {
    console.log(error)

    return error
  } 
}

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    }
}