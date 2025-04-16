// pages/api/pdf-proxy.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fileUrl } = req.query;

  if (!fileUrl || typeof fileUrl !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or invalid fileUrl parameter" });
  }

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch the PDF file" });
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("PDF proxy error:", error);
    res.status(500).json({ error: "Error fetching or serving the PDF" });
  }
}
