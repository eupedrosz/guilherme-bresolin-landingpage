import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import worker from '../dist/server/index.js';

const projectRoot = process.cwd();
const buildDirectory = join(projectRoot, 'dist');
const clientDirectory = join(buildDirectory, 'client');
const outputDirectory = join(projectRoot, 'dist-vercel');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function fetchAsset(request) {
  const pathname = decodeURIComponent(new URL(request.url).pathname);
  const relativePath = normalize(pathname.replace(/^\/+/, ''));

  if (!relativePath || relativePath.startsWith('..')) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = join(clientDirectory, relativePath);

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) return new Response('Not found', { status: 404 });

    const body = await readFile(filePath);
    const contentType = contentTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
    return new Response(body, { headers: { 'content-type': contentType } });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}

const response = await worker.fetch(
  new Request('https://guilherme-bresolin-landingpage.vercel.app/'),
  { ASSETS: { fetch: fetchAsset } },
  {},
);

if (!response.ok) {
  throw new Error(`Static rendering failed with HTTP ${response.status}.`);
}

const contentType = response.headers.get('content-type') ?? '';
if (!contentType.includes('text/html')) {
  throw new Error(`Static rendering returned an unexpected content type: ${contentType || 'unknown'}.`);
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await writeFile(join(outputDirectory, 'index.html'), await response.text(), 'utf8');

console.log('Static Vercel output created in dist-vercel.');
