# Carapuce JS Bot Discord

This repository is for my discord bot named Carapuce. I've mostly did it by myself and most of string are in French.
For the music part (after dicord.js module v12), I copied code from this repository: [https://github.com/ZerioDev/Music-bot](https://github.com/ZerioDev/Music-bot)

The bot needs to have a config.json file like the following as the root of the repository:

```json
{
    "prefix": "Command's prefix (ex: !cara)",
    "token": "Bot's token",
    "ownerID": "Your ID : not Kevin#0000 but something like 012345678901234567",
    "whiteList": ["Authorised user's ID 1", "Authorised user's ID 2"],
    "youtubeAPIKey": "Your Youtube API Key",
    "filters": {
        "bassboost": "Bassboost",
        "8D": "8D",
        "vaporwave": "Vaporwave",
        "nightcore": "Nightcore",
        "phaser": "Phaser",
        "tremolo": "Tremolo",
        "vibrato": "Vibrato",
        "reverse": "Reverse",
        "treble": "Treble",
        "normalizer": "Normalizer",
        "surrounding": "Surrounding",
        "pulsator": "Pulsator",
        "subboost": "Subboost",
        "karaoke": "Karaoke",
        "flanger": "Flanger",
        "gate": "Gate",
        "haas": "Haas",
        "mcompand": "Mcompand"
    }
}
```

---
The bot can be set up by docker!

For that, please use following commands:

```bash
$ docker-compose build
```

```bash
$ docker-compose start
```

If it get an error and crash, it will restart thanks to the docker-compose.yml file configuration.
