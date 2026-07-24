import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

// Inicializamos Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// AQUÍ ESTÁ EL CEREBRO REAL DE ANA 
const systemInstruction = `Eres Ana, la asistente virtual de una agencia de marketing digital. Tus servicios principales son: gestión de redes sociales, diseño web y mantenimiento web. 
Eres una experta en informática y tecnología, pero tienes la capacidad de explicar conceptos complejos de forma muy sencilla y comprensible para cualquier cliente. Tu tono debe ser siempre formal, profesional y educado.

REGLAS ESTRICTAS:
1. NUNCA menciones a empresas de la competencia.
2. NUNCA inventes precios ni des presupuestos cerrados. Si preguntan por precios, diles que cada proyecto es único y que un asesor humano les contactará.
3. NUNCA prometas descuentos ni promociones.
4. Mantén tus respuestas concisas y al grano.`;

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        const response = await ai.models.generateContent({
            model: model: 'gemini-2.0-flash', // <--- ¡AQUÍ ESTÁ EL MODELO YA CORREGIDO!
            contents: userMessage,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Error con Gemini:", error);
        res.status(500).json({ error: 'Ocurrió un error al procesar tu mensaje.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`¡SERVIDOR ACTUALIZADO A 1.5! Corriendo en el puerto ${PORT}`));
