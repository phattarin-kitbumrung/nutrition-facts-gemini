import { Chart, ChartItem, registerables } from 'chart.js'
import { createCanvas, Canvas } from 'canvas'
import fs from 'fs'

export function drawChart<T>(name: string, payload: T) {
  // Register Chart.js plugins
  Chart.register(...registerables)

  // Create a canvas element
  const canvas: Canvas = createCanvas(800, 400)
  const ctx = canvas.getContext('2d')

  // Sample data for the chart
  const data = {
    labels: Object.keys(payload as object),
    datasets: [
      {
        label: name,
        data: Object.values(payload as object),
        backgroundColor: [
          'orange'
        ]
      }
    ]
  }

  // Create a Chart.js chart
  new Chart(ctx as unknown as ChartItem, {
    type: 'bar',
    data
  })

  // Save the chart as an image
  const imageBuffer = canvas.toBuffer('image/png')
  fs.writeFileSync('chart.png', imageBuffer)

  console.log('Chart saved as chart.png')
}
