var flag = [false, false, false, false];

function setSeat() {
    for (let i = 0; i < flag.length; i++) {
        const element = document.getElementById(`seat${i + 1}`);
        if (flag[i]) {
            element.classList.add("occupied");
        } else {
            element.classList.add("available");
        }
    }
}

function updateSeat(element) {
    console.log(`You touched ${element.id}`);
    const index = Number(element.id.substr(4));
    if (flag[index]) {
        element.classList.add("available");
        element.classList.replace("occupied", "available");
        flag[index] = false;
    } else {
        element.classList.add("occupied");
        element.classList.replace("available", "occupied");
        flag[index] = true;
    }
}

// ページ遷移時に実行される関数
function checkAdminAccess() {
  // const referrer = document.referrer; // 直前のページの URL
  // console.log(referrer);
  // // 仮の条件：直前のページが "http://127.0.0.1:5500/admin.html" の場合、ユーザーを管理者として扱う
  // if (referrer.endsWith("http://127.0.0.1:5500/admin.html")) {
  //   // ここに管理者用のコンテンツを表示する処理を追加するなど
  //   enableButton();
  // } else {
  //   // ここに一般ユーザー用のコンテンツを表示する処理を追加するなど
  //   disableButton();
  // }
    console.log(isDisable);
    if (isDisable) {
        disableButton();
    } else {
        enableButton();
    }
}

const buttons = document.getElementsByClassName("seat");

function enableButton() {
    console.log("Welcome! admin.");
    Array.from(buttons).forEach((button) => {
        button.disabled = false;
    });
}

function disableButton() {
    console.log("Welcome! visitor.");
    Array.from(buttons).forEach((button) => {
        button.disabled = true;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // ページロード時に実行
    checkAdminAccess();
    setSeat();
});
