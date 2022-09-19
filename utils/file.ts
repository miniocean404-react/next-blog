import { readFileSync } from 'fs'
import { join } from 'path'

export const readNextFileSync = (filePath: string) => readFileSync(join(process.cwd(), filePath), 'utf-8')
