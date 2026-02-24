import fs from "fs"

const path = "./database/settings.json"

export function getSettings() {
  return JSON.parse(fs.readFileSync(path))
}

export function saveSettings(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
