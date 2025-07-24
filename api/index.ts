import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url = "/" } = req;

  if (url === "/" || url.startsWith("/?")) {
    const htmlPath = path.join(process.cwd(), "views", "index.html");
    const html = await fs.readFile(htmlPath, "utf8");
    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(html);
  }

  if (url === "/event.ics") {
    const filePath = path.join(process.cwd(), "public", "event.ics");
    const file = await fs.readFile(filePath, "utf8");
    res.setHeader("Content-Type", "text/calendar");
    return res.status(200).send(file);
  }

  res.status(404).send("Página não encontrada");
}
