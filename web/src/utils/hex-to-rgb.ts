export function hexToRgb(hex: string, alpha = 1): string {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`

  return rgba
}
