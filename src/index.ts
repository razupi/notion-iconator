import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function getPages(databaseId: string): Promise<any[]> {
  const pages = [];
  let cursor: string | undefined = undefined;

  while (true) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });
    pages.push(...response.results);
    if (!response.next_cursor) break;
    cursor = response.next_cursor;
  }

  return pages;
}

async function updatePageIcon(pageId: string, iconUrl: string): Promise<void> {
  await notion.pages.update({
    page_id: pageId,
    icon: {
      type: "external",
      external: {
        url: iconUrl
      }
    }
  });
}

async function main() {
  const databaseId = "62fbf8b5a3bf46e8909ec7239df1a6c7";
  const iconUrl = "https://example.com/icon.png";

  const pages = await getPages(databaseId);
  for (const page of pages) {
    console.log(`Updating icon for page: ${page.id}`);
    await updatePageIcon(page.id, iconUrl);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
