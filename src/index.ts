import { Client } from '@notionhq/client';
import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';
import dotenv from "dotenv";

// https://github.com/makenotion/notion-sdk-js/issues/280#issuecomment-1178523498
export type EmojiRequest = Extract<CreatePageParameters['icon'], { type?: 'emoji'; }>['emoji'];

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function updatePageIconWithEmoji(pageId: string, emoji: EmojiRequest) {
  await notion.pages.update({
    page_id: pageId,
    icon: {
      type: "emoji",
      emoji: emoji,
    },
  });
}

async function main() {
  const databaseId = "YOUR_DATABASE_ID";
  const emoji = "🚀";

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  for (const page of response.results) {
    await updatePageIconWithEmoji(page.id, emoji);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
