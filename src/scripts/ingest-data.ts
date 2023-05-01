import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Supabase } from "@/utils/supabase";

const ingest = async () => {
    try {
        const path = 'docs';
        const directoryLoader = new DirectoryLoader(
            path,
            {
                '.pdf': (path) => new PDFLoader(path)
            }
        )
        const rawDocs = await directoryLoader.load();

        const rawDocsSplit = await directoryLoader.loadAndSplit();
        console.log(rawDocsSplit[100].metadata);


        const supabaseClient = Supabase.getInstance();

        await SupabaseVectorStore.fromDocuments(rawDocsSplit, new OpenAIEmbeddings(), {
            client: supabaseClient,
            tableName: "documents",
        })

    } catch (error) {
        console.error(error);
        throw new Error('data ingestion failed')
    }
}

(async () => {
    await ingest();
    console.log('data ingestion complete')
})()