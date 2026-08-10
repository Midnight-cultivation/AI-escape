let gameData = null;

let selectedItem = null;


// ========================
// ゲーム開始
// ========================

async function startGame() {

    const response = await fetch("game.json");

    gameData = await response.json();

    renderInventory();

    setupObjects();

    updateScreen();

    message("部屋にいる。何か調べてみよう。");
}


// ========================
// オブジェクト設定
// ========================

function setupObjects() {

    document.querySelectorAll(".object").forEach(object => {

        object.addEventListener("click", () => {

            const objectId = object.dataset.object;

            interact(objectId);

        });

    });
}


// ========================
// オブジェクトを調べる
// ========================

function interact(objectId) {

    const roomId = gameData.player.room;

    const object =
        gameData.rooms[roomId].objects[objectId];

    if (!object) {

        message("何もない。");

        return;
    }


    // アイテム使用
    if (selectedItem) {

        if (object.requiresItem === selectedItem) {

            message(
                `${object.name}に${gameData.items[selectedItem].name}を使った。`
            );

            if (object.setFlag) {

                gameData.flags[object.setFlag] = true;

            }

            selectedItem = null;

            renderInventory();

            updateScreen();

            return;
        }

        message("ここでは使えない。");

        return;
    }


    // 必要フラグ
    if (object.requiresFlag) {

        if (!gameData.flags[object.requiresFlag]) {

            message("まだ開けられない。");

            return;
        }
    }


    // アイテム取得
    if (object.giveItem) {

        const itemId = object.giveItem;

        if (!gameData.inventory.includes(itemId)) {

            gameData.inventory.push(itemId);

            message(
                `${gameData.items[itemId].name}を手に入れた。`
            );

            renderInventory();

            return;
        }
    }


    // フラグ設定
    if (object.setFlag) {

        gameData.flags[object.setFlag] = true;

        message(object.message);

        updateScreen();

        return;
    }


    message(object.message || "何も起こらない。");
}


// ========================
// アイテム選択
// ========================

function selectItem(itemId) {

    if (selectedItem === itemId) {

        selectedItem = null;

    } else {

        selectedItem = itemId;

    }

    renderInventory();
}


// ========================
// インベントリ表示
// ========================

function renderInventory() {

    const container =
        document.getElementById("items");

    container.innerHTML = "";


    gameData.inventory.forEach(itemId => {

        const item =
            document.createElement("div");

        item.className = "item";

        if (selectedItem === itemId) {

            item.classList.add("selected");

        }

        item.textContent =
            gameData.items[itemId].name;

        item.onclick = () => {

            selectItem(itemId);

        };

        container.appendChild(item);

    });
}


// ========================
// 画面更新
// ========================

function updateScreen() {

    const painting =
        document.getElementById("painting");

    const switchObject =
        document.getElementById("switch");


    if (gameData.flags.painting_removed) {

        painting.style.display = "none";

        switchObject.style.display = "block";

    } else {

        painting.style.display = "block";

        switchObject.style.display = "none";

    }
}


// ========================
// メッセージ
// ========================

function message(text) {

    document.getElementById("message").textContent =
        text;
}


// ========================
// 開始
// ========================

startGame();
