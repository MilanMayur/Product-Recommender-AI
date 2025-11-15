export async function getRecommendations(query, products) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "AI Product Recommender"
        },
        body: JSON.stringify({
            model: "openai/gpt-4o-mini", 
            messages: [{
                role: "system",
                content: `You are a strict product recommendation engine.
                        You MUST respond ONLY with a JSON array of product IDs.
                        If user gives a generic query like "laptop", return ALL IDs for the same product.
                        If no product matches, return an empty array [].
                        DO NOT include explanations or extra text.`
            },
            {
                role: "user",
                content: `
                    User Request: "${query}"
                    Product List: ${JSON.stringify(products)}
                    Provide ONLY a valid JSON array of matching product ids.
  
                    Example:
                    ["lenovo-loq-12th-gen-intel-core-i5-12450hx"]
                `
            }]
        })
    });
  
    const data = await response.json();

    let content = data.choices?.[0]?.message?.content || "[]";
    content = content.replace(/```json|```/g, "").trim();

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
        content = jsonMatch[0];
    }
  
    try {
        const parsed = JSON.parse(content);

        if (Array.isArray(parsed)) {
            return parsed;
        }
    } catch (e) {
        console.warn("Primary JSON parse failed. Trying backup extraction.", e);
    }

    const fallbackIds = [...content.matchAll(/"([^"]+)"/g)].map(m => m[1]);

    return fallbackIds;
}
