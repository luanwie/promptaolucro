import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { promptsData } from '../src/data/prompts.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(projectRoot, 'public', 'prompts')
const prompts = Object.values(promptsData).flat()
const safeFileName = /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/

function renderMarkdown(prompt) {
  return `# Prompt ${prompt.number} — ${prompt.title}\n\n**Categoria:** ${prompt.category}\n\n**Modelo sugerido:** ${prompt.model}\n\n## Objetivo\n\n${prompt.description}\n\n## Prompt\n\n${prompt.prompt}\n`
}

const fileNames = prompts.map((prompt) => prompt.downloadFile)

if (fileNames.some((fileName) => !safeFileName.test(fileName))) {
  throw new Error('Todos os prompts devem ter um nome de arquivo Markdown seguro.')
}

if (new Set(fileNames).size !== fileNames.length) {
  throw new Error('Os nomes dos arquivos Markdown devem ser únicos.')
}

await mkdir(outputDirectory, { recursive: true })

const expectedFiles = new Set(fileNames)
const existingFiles = await readdir(outputDirectory)

await Promise.all(existingFiles
  .filter((fileName) => fileName.endsWith('.md') && !expectedFiles.has(fileName))
  .map((fileName) => rm(path.join(outputDirectory, fileName))))

await Promise.all(prompts.map((prompt) => writeFile(
  path.join(outputDirectory, prompt.downloadFile),
  renderMarkdown(prompt),
  'utf8',
)))

console.log(`${prompts.length} arquivos Markdown gerados em public/prompts.`)