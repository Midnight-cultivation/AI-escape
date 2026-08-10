{
    "player": {
        "room": "room01"
    },

    "flags": {
        "painting_removed": false,
        "switch_pressed": false
    },

    "inventory": [],

    "rooms": {
        "room01": {
            "name": "謎の部屋",

            "objects": {
                "desk": {
                    "name": "机",

                    "message": "机の上にドライバーが置いてある。",

                    "giveItem": "screwdriver"
                },

                "painting": {
                    "name": "絵",

                    "message": "古い絵が壁に掛かっている。",

                    "requiresItem": "screwdriver",

                    "requiresFlag": null,

                    "setFlag": "painting_removed"
                },

                "switch": {
                    "name": "スイッチ",

                    "message": "スイッチを押した。",

                    "setFlag": "switch_pressed"
                },

                "door": {
                    "name": "ドア",

                    "requiresFlag": "switch_pressed",

                    "message": "ドアが開いた。脱出成功！"
                }
            }
        }
    },

    "items": {
        "screwdriver": {
            "name": "ドライバー"
        }
    }
}
