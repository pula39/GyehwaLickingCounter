

init();
var Mcount = 0;

function init() {
    // Monitor element for clicks. When clicked, increment the local counter and play a random WAH.
    console.log(document.getElementById("counterImage"));
    document.getElementById("counterImage").addEventListener("click", updateCounter);

}

function updateCounter() {
    updateClicks("True");
    Mcount++;
    document.getElementById("sessionCount").innerHTML = Mcount.toLocaleString('en-US');
    new Audio(getRandomNoise()).play();
    playImage();
}

function playImage() {
    $(function () {
        var image = new Image();
        image.src = './src/images/licking.gif';
        $('#counterImage').click(function () {
            $(this).attr('src', image.src);
        });
    });
}

function getRandomNoise() {
    const f = "./src/audio/";
    var randomInt = parseInt(document.getElementById("sessionCount").innerHTML) % 2 + 1;
    var w = f + "lick" + randomInt + ".wav";
    return w;
}

function updateClicks(addNum = "False") {
    fetch("https://4epk4wx25ffur6udpbnhrlglue0rhrdv.lambda-url.ap-northeast-2.on.aws/", {
        method: "POST", // 요청 방식
        headers: {
            "Content-Type": "application/json" // 요청 헤더에 JSON 타입 설정
        },
        body: JSON.stringify({ 'licking': addNum }) // JSON 형식으로 변환된 데이터
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // 응답을 JSON으로 변환
    })
    .then(data => {
        console.log(data);
        document.getElementById("counted").innerHTML = parseInt(data, 10).toLocaleString('en-US');
    })
    .catch(error => {
        console.error("updateClicks error!", error);
    });
}

var run = setInterval(updateClicks, 10000);