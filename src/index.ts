import express from 'express'
import { NutritionFacts, getNutritionFacts } from './gemini'
import { drawChart } from './plot'

const app = express()
const port = 3000

app.listen(port, async () => {       
  console.log( `server started at http://localhost:${port}`)

  const prompt = "summarize nutrition facts from this image to json(set value to string without units)"
  const data = await getNutritionFacts(prompt) as Partial<NutritionFacts>

  const chartData = {
    totalFat: data.totalFat,
    saturatedFat: data.saturatedFat,
    transFat: data.totalFat,
    cholesterol: String(Number(data.cholesterol) / 1000),
    sodium: String(Number(data.sodium) / 1000),
    totalCarbohydrates: data.totalCarbohydrates,
    dietaryFiber: data.dietaryFiber,
    sugars: data.sugars,
    protein: data.protein
  }
  console.log(chartData)
  drawChart("Nutrition Facts", chartData)
})
