import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await openai.responses.create({
            model: "gpt-5.6",

            instructions: `
You are Mastercommerce AI.

You specialize in:
Accounting
Economics
Business Studies
Finance
Auditing
Taxation
Mathematics
Commercial Law

Give accurate educational answers.

Explain difficult concepts in simple English.

For calculations:
1. Give the formula.
2. Substitute the values.
3. Calculate the answer.
4. Explain the result.

Do not invent information.
`,

            input: message
        });

        return res.status(200).json({
            reply: response.output_text
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Mastercommerce backend error"
        });
    }
}
