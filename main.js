

init();
var Mcount = 0;

function init() {
    // Monitor element for clicks. When clicked, increment the local counter and play a random WAH.
    console.log(document.getElementById("counterImage"));
    document.getElementById("counterImage").addEventListener("click", updateCounter);
	updateClicks("False");
}

function updateCounter() {
    updateClicks("True");
    Mcount++;
    document.getElementById("sessionCount").innerHTML = Mcount.toLocaleString('en-US');
    new Audio(getRandomNoise()).play();
    playImage();
}

// function playImage() {
//     $(function () {
//         var image = new Image();
//         image.src = './src/images/licking.gif';
//         $('#counterImage').click(function () {
//             $(this).attr('src', image.src);
//         });
//     });
// }
function playImage() {
    $(function () {
        var image = new Image();
        image.src = './src/images/licking.gif';
        $('#counterImage').click(function () {
            $(this).attr('src', "");
            $(this).attr('src', image.src);
        });
    });
}

function getRandomNoise() {
    const f = "./src/audio/";
    var randomInt = parseInt(document.getElementById("sessionCount").innerHTML) % 2 + 1;
    var w = f + "lick" + randomInt + ".mp3";
    return w;
}

function updateClicks(addNum = "False") {
    $.ajax({
        url: "https://4epk4wx25ffur6udpbnhrlglue0rhrdv.lambda-url.ap-northeast-2.on.aws/",
        type: "POST",
		contentType: "application/json",
        data: JSON.stringify({ 'licking': addNum }),
        success: function (returnData) {
            console.log(returnData);
            document.getElementById("counted").innerHTML = parseInt(returnData, 10).toLocaleString('en-US');
        },
        error: function () {
            console.log("updateClicks error!");
        }
    })
}

var run = setInterval(updateClicks, 10000);