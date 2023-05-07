import endent from 'endent';


const run = async () => {

    const query = "What is Upland's stock price and outstanding shares?";
    const matches = 3;

    const searchResp = await fetch('http://localhost:3000/api/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query, matches})
    })

    const sources = await searchResp.json();

    console.log({ sources });

    const context = endent`
    Upland annual report data:
    ${sources?.map((d: any) => d.content).join("\n\n")}
    `;

    const completionResp = await fetch('http://localhost:3000/api/completion', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({question: query, context})
    })

    const answer = await completionResp.json() 

    console.log(answer)
    
}

(async () => {
    await run();
})()