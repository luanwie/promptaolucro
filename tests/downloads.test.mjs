import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { promptsData } from '../src/data/prompts.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const promptsDirectory = path.join(projectRoot, 'public', 'prompts')
const prompts = Object.values(promptsData).flat()

function expectedMarkdown(prompt) {
  return `# Prompt ${prompt.number} — ${prompt.title}\n\n**Categoria:** ${prompt.category}\n\n**Modelo sugerido:** ${prompt.model}\n\n## Objetivo\n\n${prompt.description}\n\n## Prompt\n\n${prompt.prompt}\n`
}

test('cada prompt define um nome de arquivo Markdown seguro e único', () => {
  assert.equal(prompts.length, 15)

  const fileNames = prompts.map((prompt) => {
    assert.match(prompt.downloadFile, /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/)
    return prompt.downloadFile
  })

  assert.equal(new Set(fileNames).size, prompts.length)
})

test('public/prompts contém um Markdown válido para cada prompt', async () => {
  const files = (await readdir(promptsDirectory))
    .filter((fileName) => fileName.endsWith('.md'))
    .sort()
  const expectedFiles = prompts.map((prompt) => prompt.downloadFile).sort()

  assert.deepEqual(files, expectedFiles)

  await Promise.all(prompts.map(async (prompt) => {
    const content = await readFile(path.join(promptsDirectory, prompt.downloadFile), 'utf8')
    assert.equal(content, expectedMarkdown(prompt))
  }))
})

test('o card mantém a cópia e expõe um link de download real', async () => {
  const source = await readFile(
    path.join(projectRoot, 'src', 'components', 'PromptCard.jsx'),
    'utf8',
  )

  assert.match(source, /navigator\.clipboard\.writeText\(prompt\.prompt\)/)
  assert.match(source, /href=\{`\$\{import\.meta\.env\.BASE_URL\}prompts\/\$\{prompt\.downloadFile\}`\}/)
  assert.match(source, /download=\{prompt\.downloadFile\}/)
})
