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
// 리셋 기능
// 남은 기회 소진시 게임오버 메세지 보여주기 + 버튼 클릭 못하게 막기
// input 창에 포커스를 두면 바로 그전에 입력한 값이 지워지기
// 범위 밖에 숫자를 입력 시 에러 메세지가 나오는가? (남은 기회는 소진되면 안됨)
// 이미 입력한 숫자를 한 번 더 입력하면 이미 입력한 숫자라고 메세지 보여주기 ( 기회 소진되면 안됨)
// UI디자인 ( 반응형 까지되면 플러스 포인트 )
// 그동안 입력한 숫자들을 보여준다면 플러스 포인트
//  꼭 여러분들이 제출 전에 스스로 한번 테스트를 해주시고 제출해주세요!



let randomNumber = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chancesNum = document.getElementById("chance-num");
let answer = document.getElementById("answer");

let chances = 3;
let gameOver = false;
let userduplication = []; // 중복 숫자 저장 배열


function pickRandomNum() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    answer.textContent = `정답 : ${randomNumber}`;
    console.log("랜덤 번호:", randomNumber);
}
pickRandomNum();
chancesNum.textContent = `남은기회 : ${chances}`; // 남은 기회 초기 표시

playButton.addEventListener("click", goButton);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", () => (userInput.value = "")); // 입력창 클릭 시 초기화

// 엔터 버튼 입력 시 goButton 실행
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !gameOver) {
        goButton();
    }
});

function goButton() {
    if (gameOver) return;
    let userValue = Number(userInput.value);

    // 1. 입력값이 유효한 범위 내에 있는지 확인
    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이의 숫자를 입력하세요.";
        return;
    }

    // 2. 중복 입력 방지
    if (userduplication.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다.";
        return;
    }

    // 3. 중복이 아닌 경우 배열에 추가
    userduplication.push(userValue);

    // 4. 기회 차감
    chances--;
    chancesNum.textContent = `남은기회 : ${chances}`;

    // 5. 숫자 비교
    if (userValue > randomNumber) {
        resultArea.textContent = "DOWN!";
    } else if (userValue < randomNumber) {
        resultArea.textContent = "UP!";
    } else {
        resultArea.textContent = "🎉 정답입니다! 🎉";
        gameOver = true;
    }

    // 6. 기회가 소진되었는지 확인
    if (chances === 0 && userValue !== randomNumber) {
        gameOver = true;
        resultArea.textContent = "😭 기회를 모두 소진하였습니다!";
    }
}

// 게임 리셋
function reset() {
    userInput.value = "";
    resultArea.textContent = "게임이 리셋되었습니다!";
    chances = 3;
    gameOver = false;
    userduplication = [];
    pickRandomNum(); // 새로운 숫자로 초기화
    chancesNum.textContent = `남은기회 : ${chances}`;
    playButton.disabled = false; // 버튼 다시 활성화
}
