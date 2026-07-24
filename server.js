import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

// Inicializamos Gemini (necesitarás poner tu clave en un archivo .env luego)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `Eres Ana, la asistente virtual de una agencia de marketing digital... (aquí pegarías todo el prompt de arriba)`;

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
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
app.listen(PORT, () => console.log(`Servidor de Ana corriendo en el puerto ${PORT}`));
