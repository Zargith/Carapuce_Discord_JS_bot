# Carapuce JS Bot Discord

This repository is for my personnal discord bot. I've mostly did it by myself and most of string are in French.

The bot needs to have a config.json file like the following as the root of the repo:

```json
{
    "prefix": "Command's prefix (ex: !cara)",
    "token": "Bot's token",
    "ownerID": "Your ID : not Kevin#0000 but something like 012345678901234567",
    "whiteList": ["Authorised user's ID 1", "Authorised user's ID 2"],
    "youtubeAPIKey": "Your Youtube API Key",
    "guilds": [
        {
            "guildID": "ID of the server you want configs",
            "defaultRolesName": ["Optionnal name of roles (case sensitive) you want to set when someone join the server"],
            "reportLogChannel": "Optionnal ID of the report log channel",
            "bannedWords": ["Optionnal","list", "of", "words", "that", "the", "bot", "can", "report"],
            "listeners": [
                {
                    "messageID": "ID of the message you want the bot to listen",
                    "cumulativeRoles": true,
                    "defaultRoleName": "Name of the role (case sensitive) you want to set by default when the user remove his reactions to the message",
                    "reactionRole": [
                        {
                            "emoji": "ex: 🦄",
                            "roleName": "name of the role (case sensitive)"
                        }
                    ]
                }
            ]
        }
    ]
}
```
