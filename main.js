// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 다운
// 랜덤번호 > 유저번호 업
// reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다.
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회 깍지 않는다.
//



// let computerNum= 0;
// let playButton=document.getElementById("play-button");
// let userInput=document.getElementById("user-input");
// let resultArea=document.getElementById("result-area");
// let chances = 5;

// playButton.addEventListener("click",play);

// function pickRandomNum() {
//     computerNum = Math.floor(Math.random()*100) +1; //+1 하는 이유 0~99 ->1~100
//     console.log(computerNum); 
// }
// function play() {
//     let userValue=userInput.value;

//     if (userValue < computerNum) {
//         resultArea.textContent="UP";
        
//     } else if (userValue > computerNum) {
//         resultArea.textContent="DOWN";
    
//     } else {
//         resultArea.textContent="정답";
//     };


// }
// pickRandomNum();

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button"); // 리셋 버튼
let chances = 3;
let gameOver = false;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", resetGame);

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1; // 1~100
    resultArea.textContent = `정답: ${computerNum}`;
    console.log("랜덤 번호:", computerNum);
}

function play() {
    let userValue = Number(userInput.value);

    // 유효성 검사
    if (isNaN(userValue) || userValue < 1 || userValue > 100) {
        resultArea.textContent = "1~100 사이의 숫자를 입력하세요.";
        return;
    }

    // 중복 입력 검사
    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력하세요.";
        return;
    }

    history.push(userValue); // 중복 방지를 위해 기록

    chances--;

    if (userValue < computerNum) {
        resultArea.textContent = "UP";
    } else if (userValue > computerNum) {
        resultArea.textContent = "DOWN";
    } else {
        resultArea.textContent = `정답입니다! 정답은 ${computerNum} 입니다.`;
        
        gameOver = true;
    }

    // 남은 기회 체크
    if (chances === 0 && !gameOver) {
        resultArea.textContent = `기회를 모두 소진했습니다. 정답은 ${computerNum} 입니다.`;
        gameOver = true;
    }

    userInput.value = ""; // 입력 칸 초기화
}

function resetGame() {
    userInput.value = "";
    resultArea.textContent = "게임이 리셋되었습니다. 새로운 숫자를 입력하세요.";
    chances = 3;
    gameOver = false;
    history = [];
    pickRandomNum();
}

pickRandomNum();
