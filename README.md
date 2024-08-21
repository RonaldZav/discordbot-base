# Documentation
## Setup:
Clone the repository in your device:
```
git clone https://github.com/RonaldZav/discordbot-base.git
```
### Configuration:

Install dependencies with `npm install`

Set the credentials of your discord bot in `.env.example`

Rename `.env.example` to `.env`

Start using `node src/index.js`


## MongoDB Manager:
Main function to manage the MongoDB database:
```js
await client.database(query, collection) // => Create/found mongodb documents.
```

### Usage example:
```js
// Get/create the database
let db = await client.database({ guild: interaction.guild.id }, "guilds") || {};

// Set the data
db.config = { prefix: "!" }; // => { config: { "prefix": "!" } };

// Save changes
await db.save();

// Reload information into the variable if necessary
await db.reload();
```