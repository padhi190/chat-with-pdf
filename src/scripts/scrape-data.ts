import { Supabase } from '@/utils/supabase';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

interface Article {
  metadata: {
    url: string;
    title: string;
  };
  pageContent: string;
}

const scrape = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const data = await page.evaluate((url) => {
    const title = document.querySelector('h1')?.innerText ?? '';
    const articles = document.querySelectorAll('section.helpArticle__section');
    const articlesData: Article = {
      metadata: {
        url,
        title,
      },
      pageContent: '',
    };

    articles.forEach(
      (art) =>
        (articlesData.pageContent = articlesData.pageContent.concat(
          art.textContent ?? ''
        ))
    );

    return articlesData;
  }, url);

  await browser.close();
  return data;
};

(async () => {
  const content = await scrape(
    'https://mailchimp.com/help/types-of-templates/'
  );
  //   console.log('content', content)
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docOutput = await splitter.splitDocuments([
    new Document({
      pageContent: content.pageContent,
      metadata: content.metadata,
    }),
  ]);
  console.log('doc', docOutput[0]);

  const supabaseClient = Supabase.getInstance();

  await SupabaseVectorStore.fromDocuments(docOutput, new OpenAIEmbeddings(), {
    client: supabaseClient,
    tableName: 'documents',
  });
    
})();
