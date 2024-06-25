import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function getPages(databaseId) {
  const pages = [];
  let cursor = undefined;

  while (true) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });
    pages.push(...results);
    if (!next_cursor) break;
    cursor = next_cursor;
  }

  return pages;
}

async function updatePageIconWithEmoji(pageId, emoji) {
  await notion.pages.update({
    page_id: pageId,
    icon: {
      type: "emoji",
      emoji: emoji
    }
  });
}

async function main() {
  const databaseId = "62fbf8b5a3bf46e8909ec7239df1a6c7";
  const emoji = "🚀";

  const pages = await getPages(databaseId);
  for (const page of pages) {
    console.log(`Updating icon for page: ${page.id} with emoji ${emoji}`);
    await updatePageIconWithEmoji(page.id, emoji);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
