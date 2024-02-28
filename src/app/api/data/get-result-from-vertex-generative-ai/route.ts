import { HarmBlockThreshold, HarmCategory, VertexAI } from "@google-cloud/vertexai";
import { NextRequest, NextResponse } from "next/server";


// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'learning-415705', location: 'us-central1' });
const model = 'gemini-1.0-pro-001';
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];
// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generation_config: {
        "max_output_tokens": 3142,
        "temperature": 0.9,
        "top_p": 1
    },
    safety_settings: safetySettings
});




export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');
        if (!query) {
            return NextResponse.json({
                success: false,
                message: "please send the disease information"
            })
        }
        const streamingResp = await generativeModel.generateContentStream(query);

        for await (const item of streamingResp.stream) {
            process.stdout.write('stream chunk: ' + JSON.stringify(item));
        }

        process.stdout.write('aggregated response: ' + JSON.stringify(await streamingResp.response));
    } catch (error: any) {
        return NextResponse.json({
            success: true,
            message: "unable to process your request"
        })
    }
}