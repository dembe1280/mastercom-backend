import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(request) {

    if (request.method !== "POST") {
        return new Response(
            JSON.stringify({
                error: "Method not allowed"
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    try {

        const body = await request.json();
        const message = body.message;

        if (!message) {
            return new Response(
                JSON.stringify({
                    error: "Message is required"
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const response = await openai.responses.create({
            model: "gpt-5.6",
            instructions: `
You are Mastercommerce AI.

You specialize in Accounting, Economics, Business Studies,
Finance, Auditing, Taxation, Mathematics and Commercial Law.

Give accurate educational answers.
Explain difficult concepts using simple English.
For calculations, show the formula, working and answer.
Do not invent information.
`,
            input: message
        });

        return new Response(
            JSON.stringify({
                reply: response.output_text
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {

        console.error(error);

        return new Response(
            JSON.stringify({
                error: "Mastercommerce backend error"
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}
