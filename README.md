# Notion Iconator
This project updates the icons of all pages in a Notion database to a specified emoji using the Notion SDK.
## Setup

1. Create a `.env` file at the root of the repository and add:
`NOTION_TOKEN=[YOUR_NOTION_TOKEN]`
2. Edit the databaseId variable in the main function of `index.ts` to match your Notion database ID,
   please see [How to Retrieve a Database ID.](https://developers.notion.com/reference/retrieve-a-database)
4. Run the script: `npm start`

## Base Template
This project is based on the [notion-sdk-typescript-starter](https://github.com/makenotion/notion-sdk-typescript-starter) template.





