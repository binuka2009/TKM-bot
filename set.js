const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZGdzZjMmtYZjlYNzRPdXlZcWRjOThhZFZzd25JS3EzcUR4OEdFeFBGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWY5bmR5L3ZmTDRLdVpCT0g4b1h3RmVtQk4rMTBPZXJING51aGVGcVMzUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRjFXTzZLcDJTclNSa0V2dDJFbTViMDBtOUxROElERGtIVFUwMFhlU1g4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFUGFpelV6UExpdVRNbGRLd2ZodXpodXc3RVpRZ0RpMGJvM2xPdXM5ckc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklMUUdtQjdQYVhqWTgrVGkzaFgzWGZEcW55bU9wWi9KdWloUU1raDZ0WFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkM3eFdXQ2tBR3k5R3BSeTJ5czd2WE52ZisvSDJQUVkrZ3AwUW9nOFAwZ0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU14UEkxb21LT3J5OHZybzdXb2FqeUQ0VkRwTW0vYUsyUkxwN1dkblUzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzFHYUx0S3Q3THVkM2ZldDZyWlZxTnZaWDZwZHF0d1FLZy9DN0toQzlsUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdZRTFWUzlMYmF0TDhlRmxzQ2ZudTQwUDAxSndJRUJOTk9xN2pvazRTeFF0RXAyT0tCNGltYXFBQzNVWTNNT0tUUThNcTZJQStZNzM2SzR1QmJLRml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA2LCJhZHZTZWNyZXRLZXkiOiJ4MXp4QWM1SGpmUndORlBwTTFwaVBRbGNzOEU1OTFvUTBpN0FhZS9zby80PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzY5MDg5NDMwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNBNUU3NEQ0NUUwMDAzNEVGNkM0NTU4NDA2QkQ2ODZBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjIyNzE4MzF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImcwN1Ytc1hpUUlDeGM4YWdlY3hmanciLCJwaG9uZUlkIjoiZmQ0ODU2YmItYjQxMi00Njg1LWJmOWItMzU2ZDkyYjM0ZTllIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik8waWI5akpTYmhrcmRNM1FNK0ZhNG5UNVFUVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1VHlZRkdGMzFHaGFESy9UZ1I4NTd2QjUyY2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRjM5MkZOREMiLCJtZSI6eyJpZCI6Ijk0NzY5MDg5NDMwOjU0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOWFV4WElReHBDZnRRWVlCU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzajRINERwWmFUb3QyM0swRDNKZWNkeDloU2lRdlAweVJFbUVwWlZXUXg4PSIsImFjY291bnRTaWduYXR1cmUiOiJZeTJkZUx5OTdYZ3VNTjlmNVZVUHMwdXplcUY2SzNEZGtiblJNeThTTi8wVDRoVHhwTkNuVzcxTHVSTnFCb0hCd0p0YVZqTjFQY1NvTEp1d1MzWVVCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTHZyenROSTJVcU1lZmN1QjY5aXVkOHp4blBOZGxGQXlzcVhDN3hUUy92ZWhGenJUSkVOSG43TGdoMEdscG55NnZZYk1hSlBYM3VmRUlMNXlyYllSaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc2OTA4OTQzMDo1NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiSStCK0E2V1drNkxkdHl0QTl5WG5IY2ZZVW9rTHo5TWtSSmhLV1ZWa01mIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMjcxODI2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVhOSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "< │ ᴹᴿ 𝗕 𝗜 𝗡 𝗨 🐰 💙 "",
    NUMERO_OWNER : process.env.OWNER_NUM || "94769089430",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BINU bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
