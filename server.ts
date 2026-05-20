import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client helper to avoid crashes if API key is missing on initial start
let cachedAiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!cachedAiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please add it in Settings > Secrets.");
    }
    cachedAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return cachedAiClient;
}

// REST Endpoint to generate the logo design from description
app.post("/api/generate-logo", async (req, res) => {
  try {
    const { companyName, industry, description, style, accentColor } = req.body;

    if (!companyName) {
      return res.status(400).json({ error: "Company name is required." });
    }

    const ai = getAiClient();

    // Construct a comprehensive prompt instructing Gemini on SVG design concepts,
    // layout structures, and descriptive rationale.
    const prompt = `You are a world-class professional brand visual identity designer.
Create a highly polished, modern vector logo design for the following company/brand:

Company/Brand Name: "${companyName}"
Industry: "${industry || 'General'}"
Description & Vision: "${description || 'A modern innovative brand'}"
Desired Style Mode: "${style || 'minimalist'}" ${accentColor && accentColor !== "ai" ? `\nPrimary Brand Color Preferred: "${accentColor}"` : ''}

CRITICAL REQUIREMENT FOR THE LOGO DESIGN:
- The design must be extremely professional, clean, and unique. Avoid clip-art symbols.
- You should define the layout, shapes, graphics, and optionally typographic initials or wordmarks.
- Design the layout inside a 0 to 500 coordinates viewBox ("viewBox='0 0 500 500'").
- Generate the logo in two formats inside the JSON:
  1. A complete valid raw SVG string (standard HTML-safe <svg> elements).
  2. A structured array of vector elements (e.g. paths, circles, rectangles, text) supporting custom animation.
- Assign an 'animationGroup' to every element so we can stagger their entry animations. Use groups like: "background", "main-graphic", "accent-accent", "brand-text", "sub-text".
- Use high-quality visual colors. Ensure high-contrast and readability.
- Generate a detailed design explanation detailing the symbolism behind the colors, shapes, typography choice, and overall composition.

Let's design it beautifully based on the "${style}" design language:
- minimalist: Clean geometric lines, lots of negative space, elegant corporate vibe.
- geometric: Precise interlocking shapes, golden-ratio feel, modern tech vectors.
- retro: Warm vintage badge shapes, nostalgic outlines, classic 70s/80s curves.
- futuristic: Dynamic slashes, glowing neon accent hues, sleek velocity angles.
- organic: Smooth natural waves, leaf or drop motifs, humanistic friendly paths.
- corporate: Solid emblem shapes, high-trust curves, professional shield or monogram.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert interactive developer and graphic designer who outputs professional corporate logos represented as clean, responsive SVGs and structured list of nodes.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "The official design title of the logo concept (e.g., 'The Geometric Pinnacle' or 'HP Horizon').",
            },
            tagline: {
              type: Type.STRING,
              description: "A short, engaging design tagline explaining the mood or core vision.",
            },
            explanation: {
              type: Type.STRING,
              description: "Detailed, inspiring paragraphs explaining the designer's rationale behind visual elements, symbolism, font pairing, color selection, and animation potential.",
            },
            primaryColor: {
              type: Type.STRING,
              description: "Primary Hex base brand color selected (e.g., '#024ad8').",
            },
            secondaryColor: {
              type: Type.STRING,
              description: "Secondary Hex color used (e.g., '#1a1a1a').",
            },
            accentColor: {
              type: Type.STRING,
              description: "Accent Hex color used (e.g., '#ff5050' or '#f7f7f7').",
            },
            suggestedAnimationType: {
              type: Type.STRING,
              description: "The ideal animation style. Allowed: 'sketch-draw', 'scale-pop', 'slide-fade', 'rotate-reveal', 'morph-elastic'.",
            },
            rawSvg: {
              type: Type.STRING,
              description: "Complete, direct raw valid <svg> code with full viewBox='0 0 500 500' containing the entire composite logo. Must have high visual appeal.",
            },
            vectorElements: {
              type: Type.ARRAY,
              description: "An array of component shapes. These will be parsed in React and animated using Framer Motion.",
              items: {
                type: Type.OBJECT,
                properties: {
                  type: {
                    type: Type.STRING,
                    description: "The SVG graphic element type. Allowed: 'path', 'circle', 'rect', 'polygon', 'ellipse', 'text', 'line'.",
                  },
                  id: {
                    type: Type.STRING,
                    description: "A unique element ID for descriptive identification (e.g., 'main-shield', 'letter-h', 'accent-dot').",
                  },
                  animationGroup: {
                    type: Type.STRING,
                    description: "Grouping category. Allowed: 'background', 'main-graphic', 'accent-accent', 'brand-text', 'sub-text'.",
                  },
                  props: {
                    type: Type.OBJECT,
                    description: "The properties to map to the SVG node. Values depend on the element type. All numerical coordinates must fit in 0-500 space.",
                    properties: {
                      d: { type: Type.STRING, description: "Required for type='path'. SVG path command." },
                      cx: { type: Type.NUMBER, description: "Required for type='circle' or 'ellipse'. Center X coordinate." },
                      cy: { type: Type.NUMBER, description: "Required for type='circle' or 'ellipse'. Center Y coordinate." },
                      r: { type: Type.NUMBER, description: "Required for type='circle'. Radius." },
                      rx: { type: Type.NUMBER, description: "Required for type='ellipse'. Radius X." },
                      ry: { type: Type.NUMBER, description: "Required for type='ellipse'. Radius Y." },
                      x: { type: Type.NUMBER, description: "Used for 'rect', 'text', or 'line'. X coordinate." },
                      y: { type: Type.NUMBER, description: "Used for 'rect', 'text', or 'line'. Y coordinate." },
                      width: { type: Type.NUMBER, description: "Required for type='rect'. Width." },
                      height: { type: Type.NUMBER, description: "Required for type='rect'. Height." },
                      points: { type: Type.STRING, description: "Required for type='polygon'. Space-separated coordinates e.g., '250,50 350,300 150,300'." },
                      fill: { type: Type.STRING, description: "The color parameter. Always return a direct hex string (e.g. '#024ad8' or '#1a1a1a') or 'none' or 'transparent'." },
                      stroke: { type: Type.STRING, description: "Hex outline stroke color, or 'none'." },
                      strokeWidth: { type: Type.NUMBER, description: "Outline width of stroke (e.g., 1, 2, 4, etc.)." },
                      strokeDasharray: { type: Type.STRING, description: "Dash array e.g., '5,5' or 'none'." },
                      textContent: { type: Type.STRING, description: "The display text required ONLY for type='text'." },
                      fontSize: { type: Type.NUMBER, description: "Text rendering font size (e.g., 24, 32, 48), for text nodes." },
                      fontWeight: { type: Type.STRING, description: "Text density: 'normal', 'bold', etc." },
                      fontFamily: { type: Type.STRING, description: "E.g. 'sans-serif', 'serif', 'monospace' for text elements." },
                      textAnchor: { type: Type.STRING, description: "Alignment e.g., 'middle', 'start', 'end'." },
                      transform: { type: Type.STRING, description: "Transform matrix, rotation or translation command e.g., 'rotate(45, 250, 250)' or 'none'." },
                      opacity: { type: Type.NUMBER, description: "Float value from 0 to 1 for opacity." }
                    }
                  }
                },
                required: ["type", "id", "animationGroup", "props"]
              }
            }
          },
          required: [
            "title", 
            "tagline", 
            "explanation", 
            "primaryColor", 
            "secondaryColor", 
            "accentColor", 
            "suggestedAnimationType", 
            "rawSvg", 
            "vectorElements"
          ]
        }
      }
    });

    const logoData = JSON.parse(response.text || "{}");
    res.json(logoData);
  } catch (error: any) {
    console.error("Error generating logo concept via Gemini API:", error);
    res.status(500).json({ error: error.message || "Failed to generate logo design." });
  }
});

// Configure Vite middleware and static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Started Vite development server middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving built static production client files.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express application server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
