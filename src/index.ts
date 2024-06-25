import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function updatePageIconWithEmoji(pageId: string, emoji: any) {
  await notion.pages.update({
    page_id: pageId,
    icon: {
      type: "emoji",
      emoji: emoji,
    },
  });
}

async function main() {
  const databaseId = "62fbf8b5a3bf46e8909ec7239df1a6c7";
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
