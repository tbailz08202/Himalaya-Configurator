export const ROOF_OPTIONS = {
  "Defender 90": ["Hard Top", "Soft Top", "None"],
  "Defender 110": ["Hard Top", "Soft Top", "Crew Cab"],
  "Defender 130": ["Hard Top", "Soft Top", "None"], 
  "Series 88": ["Hard Top", "Soft Top", "None"],
  "Series 109": ["Hard Top", "Soft Top", "None"]
}

export const MODEL_OPTIONS = [
  "Defender 130",
  "Defender 110",
  "Defender 90",
  "Series 88",
  "Series 109"
]

export const getValidRoofOptions = (model) => {
  return ROOF_OPTIONS[model] || []
}

export const getDefaultRoof = (model, currentRoof) => {
  const validOptions = getValidRoofOptions(model)
  
  // If current roof is valid for new model, keep it
  if (validOptions.includes(currentRoof)) {
    return currentRoof
  }
  
  // Model-specific fallback logic
  if (model === "Defender 90") {
    return "None" // Topless for 90
  }
  
  if (model === "Defender 130") {
    return "Hard Top" // Only one 130 model, always this
  }

  if (model === "Defender 110") {
    return "Crew Cab"
  }

}