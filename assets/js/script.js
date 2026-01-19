document.addEventListener('DOMContentLoaded', () => {
    const quizTitleElement = document.getElementById('quiz-title');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultArea = document.getElementById('result-area');
    const scoreTextElement = document.getElementById('score-text');
    const restartButton = document.getElementById('restart-button');
    const questionArea = document.getElementById('question-area');

    let quizzes = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // クイズデータを読み込み、初期化する
    fetch('../data/quiz.json')
        .then(response => response.json())
        .then(data => {
            quizzes = data.questions;
            quizTitleElement.textContent = data.quizTitle; // クイズタイトルを設定
            loadQuestion();
        })
        .catch(error => console.error('Error fetching quiz data:', error));

    // 問題を読み込み表示する関数
    function loadQuestion() {
        if (currentQuestionIndex < quizzes.length) {
            const currentQuiz = quizzes[currentQuestionIndex];
            questionTextElement.textContent = currentQuiz.question;
            optionsContainer.innerHTML = ''; // 選択肢をクリア

            currentQuiz.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => selectAnswer(option, currentQuiz.answer));
                optionsContainer.appendChild(button);
            });
            resultArea.classList.add('hidden'); // 結果エリアを非表示
            questionArea.classList.remove('hidden'); // 問題エリアを表示
        } else {
            showResult();
        }
    }

    // 回答を選択したときの処理
    function selectAnswer(selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) {
            score++;
            // 正解のフィードバック（オプション）
            // console.log("正解！");
        } else {
            // 不正解のフィードバック（オプション）
            // console.log("不正解！正解は " + correctAnswer);
        }

        currentQuestionIndex++;
        // 少し遅延させて次の問題へ、または結果表示へ
        setTimeout(loadQuestion, 500);
    }

    // 結果を表示する関数
    function showResult() {
        questionArea.classList.add('hidden'); // 問題エリアを非表示
        resultArea.classList.remove('hidden'); // 結果エリアを表示
        scoreTextElement.textContent = `${quizzes.length}問中、${score}問正解しました！`;
    }

    // リスタートボタンのイベントリスナー
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    });
});
