import endent from 'endent';

const run = async () => {

    const query = "What was Upland's revenue growth?";
    const matches = 2;

    const searchResp = await fetch('http://localhost:3000/api/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query, matches})
    })

    const sources = await searchResp.json();

    console.log({ sources });

    const prompt = endent`
    Use the following passages to provide an answer to the query: "${query}"

    Upland annual report data:
    ${sources?.map((d: any) => d.content).join("\n\n")}
    `;

    const completionResp = await fetch('http://localhost:3000/api/completion', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({prompt})
    })

    const answer = await completionResp.json();

    console.log({answer})
    
}

(async () => {
    await run();
})()