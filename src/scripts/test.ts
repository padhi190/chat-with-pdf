import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { Supabase } from "@/utils/supabase";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { makeChain } from '@/utils/makechain';
import { ConversationalRetrievalQAChain, VectorDBQAChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';

const run = async () => {
    const supabaseClient = Supabase.getInstance();

    const vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings(), {
        client: supabaseClient,
        tableName: "documents",
        queryName: "match_documents",
    })

    const chain = ConversationalRetrievalQAChain.fromLLM(
        new OpenAI(),
        vectorStore.asRetriever(2),
        { returnSourceDocuments: true }
    )

    const response = await chain.call({
        question: "What is High-Touch Customer Success Program?",
        chat_history: []
    })
    console.log(response);
    // const result = await vectorStore.similaritySearch("How many acquisitions did Upland made?", 4);


    
}

(async () => {
    await run();
})()