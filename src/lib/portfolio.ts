import { kv } from "@vercel/kv"
import { promises as fs } from "fs"
import path from "path"
import type { PortfolioData } from "@/types/portfolio"

const KV_KEY = "portfolio_data"
const PORTFOLIO_PATH = path.join(process.cwd(), "src/data/portfolio.json")

// Check if running on Vercel (production/preview) or locally
const isVercel = process.env.VERCEL === "1"

export async function getPortfolioData(): Promise<PortfolioData> {
  if (isVercel) {
    // On Vercel: use KV storage
    const data = await kv.get<PortfolioData>(KV_KEY)
    if (data) {
      return data
    }
    // If no data in KV, initialize from the bundled JSON file
    const initialData = await getInitialData()
    await kv.set(KV_KEY, initialData)
    return initialData
  } else {
    // Local development: use filesystem
    const data = await fs.readFile(PORTFOLIO_PATH, "utf-8")
    return JSON.parse(data)
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  if (isVercel) {
    // On Vercel: save to KV storage
    await kv.set(KV_KEY, data)
  } else {
    // Local development: save to filesystem
    await fs.writeFile(PORTFOLIO_PATH, JSON.stringify(data, null, 2), "utf-8")
  }
}

async function getInitialData(): Promise<PortfolioData> {
  // Import the static JSON file (bundled at build time)
  const data = await import("@/data/portfolio.json")
  return data.default as PortfolioData
}

export function generateId(prefix: string): string {
  return `${prefix}${Date.now()}`
}
