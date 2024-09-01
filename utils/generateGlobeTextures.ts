import * as THREE from 'three'

const WIDTH = 1024
const HEIGHT = 512

export function generateDayTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const context = canvas.getContext('2d')!

  // Create gradient for the sky
  const skyGradient = context.createLinearGradient(0, 0, 0, HEIGHT)
  skyGradient.addColorStop(0, '#87CEEB')  // Sky blue
  skyGradient.addColorStop(1, '#E0F6FF')  // Light blue

  context.fillStyle = skyGradient
  context.fillRect(0, 0, WIDTH, HEIGHT)

  // Add some cloud-like patterns
  context.fillStyle = 'rgba(255, 255, 255, 0.5)'
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * WIDTH
    const y = Math.random() * HEIGHT
    const radius = Math.random() * 50 + 20
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  // Add some green landmasses
  context.fillStyle = '#228B22'  // Forest green
  for (let i = 0; i < 7; i++) {
    const x = Math.random() * WIDTH
    const y = Math.random() * HEIGHT
    const size = Math.random() * 100 + 50
    context.beginPath()
    context.moveTo(x, y)
    for (let j = 0; j < 6; j++) {
      const angle = j * Math.PI / 3
      const dx = Math.cos(angle) * size
      const dy = Math.sin(angle) * size
      context.lineTo(x + dx, y + dy)
    }
    context.closePath()
    context.fill()
  }

  return new THREE.CanvasTexture(canvas)
}

export function generateNightTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const context = canvas.getContext('2d')!

  // Create gradient for the night sky
  const skyGradient = context.createLinearGradient(0, 0, 0, HEIGHT)
  skyGradient.addColorStop(0, '#000033')  // Dark blue
  skyGradient.addColorStop(1, '#0F1F3D')  // Slightly lighter blue

  context.fillStyle = skyGradient
  context.fillRect(0, 0, WIDTH, HEIGHT)

  // Add stars
  context.fillStyle = '#FFFFFF'
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * WIDTH
    const y = Math.random() * HEIGHT
    const radius = Math.random() * 1.5
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  // Add some city lights
  context.fillStyle = 'rgba(255, 255, 0, 0.5)'
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * WIDTH
    const y = Math.random() * HEIGHT
    const radius = Math.random() * 30 + 10
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  return new THREE.CanvasTexture(canvas)
}