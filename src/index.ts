import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const response = await notion.databases.query({
    database_id: "62fbf8b5a3bf46e8909ec7239df1a6c7",
  });

  console.log("Got response:", response);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
