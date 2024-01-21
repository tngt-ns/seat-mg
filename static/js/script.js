window.onload = function () {
    // 画像要素を取得
    let container = document.querySelector(".seat-map-container");
    console.log(container);

    let style = window.getComputedStyle(container);
    containerWidth = parseInt(style.width, 10);
    console.log(containerWidth);

    // 画面の幅を取得
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let windowSize = Math.min(windowWidth, windowHeight);
    console.log(windowSize);

    let scale = Math.min(containerWidth / windowSize, 0.6);
    console.log(scale);
    container.style.transform = "scale(" + scale + ")";
    container.style.transformOrigin = "top left";

    console.log(style.transform);
};

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
