window.onload = function () {
    const imgWidth = 800;
    let bodyWidth = document.body.clientWidth;
    console.log("bodyWidth = " + bodyWidth);

    let containerElement = document.getElementsByClassName('seat-map-container');

    if (containerElement) {
        // 座席情報の取得
        let container = document.querySelector(".seat-map-container");

        if (bodyWidth > imgWidth) {
            container.style.width = imgWidth + "px";
        } else {
            let scale = bodyWidth / imgWidth;
            container.style.transformOrigin = "top left";
            container.style.transform = "scale(" + scale + ")";
        }
    }

    let timeElement = document.getElementById("time");
    if (timeElement) {
        showTime();
    }
};

function showTime() {
    let now = new Date();
    let nowMonth = now.getMonth() + 1;
    let nowDay = now.getDate();
    let nowWeek = now.getDay()
    let nowHour = now.getHours().toString();
    let nowMinutes = now.getMinutes().toString();
    let nowSeconds = now.getSeconds().toString();
    const week_ja= new Array("日","月","火","水","木","金","土");

    let text = nowMonth + "月" + nowDay + "日(" + week_ja[nowWeek] + ")" + nowHour.padStart(2, '0') + ":" + nowMinutes.padStart(2, '0') + ":" + nowSeconds.padStart(2, '0');

    document.getElementById("time").innerHTML = text;
}

function updateSeatStatus(seatId) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/update_seat", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // リクエストデータの作成
    let data = JSON.stringify({ seat_id: seatId, status: "occupied" });

    xhr.onload = function () {
        if (xhr.status === 200) {
            let seatButton = document.getElementById("seat" + seatId);
            if (seatButton.classList.contains("available")) {
                seatButton.classList.replace("available", "occupied");
            } else {
                seatButton.classList.replace("occupied", "available");
                data.status = "available";
            }
            console.log("Seat status updated successfully");
        } else {
            console.error("Request failed. Status: " + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Request failed");
    };

    xhr.send(data);
}

function updateSeats() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/get_seats", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let updatedSeats = JSON.parse(xhr.responseText);

            // 更新された座席情報を反映
            for (let i = 0; i < updatedSeats.length; i++) {
                let seatId = updatedSeats[i].id;
                let seatStatus = updatedSeats[i].status;

                let seatButton = document.getElementById("seat" + seatId);
                seatButton.classList.remove("available", "occupied");
                seatButton.classList.add(seatStatus);
            }
        } else {
            console.error("Request failed. Status: " + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Request failed");
    };

    xhr.send();
}

function resetSeatsStatus() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/get_seats", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let seats = JSON.parse(xhr.responseText);
            for (let seatId = 0; seatId < seats.length; seatId++) {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/update_seat", true);
                xhr.setRequestHeader(
                    "Content-Type",
                    "application/json;charset=UTF-8"
                );

                // リクエストデータの作成
                let data = JSON.stringify({
                    seat_id: seatId,
                    status: "available",
                });

                xhr.onload = function () {
                    let seatButton = document.getElementById("seat" + seatId);
                    seatButton.classList.remove("available", "occupied");
                    seatButton.classList.add("available");
                };

                xhr.onerror = function () {
                    console.error("Request failed");
                };

                xhr.send(data);
            }
        }
    };

    xhr.onerror = function () {
        console.error("Request failed");
    };

    xhr.send();
}

function resetConfirm() {
    if (confirm("本当にリセットしますか？")) {
        resetSeatsStatus();
    } else {
        console.log("reset canceled");
    }
}
