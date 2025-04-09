<script setup>
import { ref, computed, reactive } from 'vue';

const quizTitle = ref('Carousel Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
    {
        question: "What is the capital of France?",
        options: ["Paris", "London"],
        correctIndex: 0,
        category: "Geography",
        explanation: "Paris is the capital and most populous city of France, located on the Seine River. It's known for iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral."
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare"],
        correctIndex: 1,
        category: "Literature",
        explanation: "William Shakespeare wrote 'Romeo and Juliet' around 1594-1596. It's one of his most famous tragedies about two young star-crossed lovers whose deaths ultimately reconcile their feuding families."
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag"],
        correctIndex: 0,
        category: "Science",
        explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum' meaning 'shining dawn'. Gold is a precious metal with the atomic number 79 in the periodic table."
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Jupiter"],
        correctIndex: 1,
        category: "Astronomy",
        explanation: "Jupiter is the largest planet in our solar system, with a mass more than 300 times that of Earth. It's a gas giant composed mainly of hydrogen and helium with a strong magnetic field."
    },
    {
        question: "What is the largest mammal on Earth?",
        options: ["Blue Whale", "African Elephant"],
        correctIndex: 0,
        category: "Biology",
        explanation: "The Blue Whale is the largest animal known to have ever existed"
    }
]);

// Initialize question states
const questionStates = reactive(
    questions.value.map(() => ({
        selectedOption: null,
        answeredCorrectly: false,
        showIncorrectMessage: false,
        attempted: false
    }))
);

const currentQuestion = computed(() => {
    return questions.value[currentIndex.value];
});

function selectOption(questionIdx, optionIdx) {
    if (questionStates[questionIdx].selectedOption !== null && !questionStates[questionIdx].showIncorrectMessage) return;

    questionStates[questionIdx].selectedOption = optionIdx;

    if (optionIdx === questions.value[questionIdx].correctIndex) {
        questionStates[questionIdx].answeredCorrectly = true;
        questionStates[questionIdx].showIncorrectMessage = false;

        if (!questionStates[questionIdx].attempted) {
            questionStates[questionIdx].attempted = true;
            totalAnswered.value++;
            score.value++;
        }
    } else {
        questionStates[questionIdx].showIncorrectMessage = true;
        questionStates[questionIdx].answeredCorrectly = false;

        if (!questionStates[questionIdx].attempted) {
            questionStates[questionIdx].attempted = true;
            totalAnswered.value++;
        }
    }
}

function tryAgain(idx) {
    questionStates[idx].selectedOption = null;
    questionStates[idx].showIncorrectMessage = false;
}

function goToNextQuestion() {
    if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++;
    }
}

function goToQuestion(idx) {
    // Only allow navigation to questions that haven't been answered correctly
    if (!questionStates[idx].answeredCorrectly) {
        currentIndex.value = idx;
    }
}

function resetQuiz() {
    currentIndex.value = 0;
    score.value = 0;
    totalAnswered.value = 0;

    // Reset all question states
    questions.value.forEach((_, idx) => {
        questionStates[idx].selectedOption = null;
        questionStates[idx].answeredCorrectly = false;
        questionStates[idx].showIncorrectMessage = false;
        questionStates[idx].attempted = false;
    });
}

function shuffleQuestions() {
    // Create array of indices
    const indices = [...Array(questions.value.length).keys()];

    // Shuffle indices using Fisher-Yates algorithm
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Create new arrays based on shuffled indices
    const shuffledQuestions = indices.map(i => questions.value[i]);
    const shuffledStates = indices.map(i => ({
        selectedOption: null,
        answeredCorrectly: false,
        showIncorrectMessage: false,
        attempted: false
    }));

    // Update reactive references
    questions.value = shuffledQuestions;

    // Reset states and indices
    indices.forEach((_, idx) => {
        questionStates[idx].selectedOption = null;
        questionStates[idx].answeredCorrectly = false;
        questionStates[idx].showIncorrectMessage = false;
        questionStates[idx].attempted = false;
    });

    currentIndex.value = 0;
    score.value = 0;
    totalAnswered.value = 0;
}
</script>


<template>
    <div id="app">
        <div class="flex flex-row h-screen w-screen bg-[#20232A] text-white">
            <!-- Category Sidebar -->
            <div class="flex flex-col w-[20%] my-auto p-8 gap-16 text-left">
                <h2 class="text-4xl font-semibold opacity-70 text-[blue]">Superheroes</h2>
                <h2 class="text-4xl font-semibold opacity-70">Princesses</h2>
                <h2 class="text-4xl font-semibold opacity-70">Cartoon</h2>
            </div>

            <!-- Main Quiz Area -->
            <div class="w-[80%] max-w-[700px] mx-auto my-5 p-5">
                <!-- <h1 class="text-center text-white mb-8">{{ quizTitle }}</h1> -->

                <div class="flex justify-between items-center mb-4">
                    <div class="text-left text-[#cfd8dc] font-medium">Question {{ currentIndex + 1 }} of {{
                        questions.length }}</div>
                    <div class="text-right font-medium text-white">Score: {{ score }}/{{ totalAnswered }}</div>
                </div>

                <div class="relative overflow-hidden h-screen rounded-[12px] p-5">
                    <div class="relative w-full h-full transition-transform duration-500 ease-in-out"
                        :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                        <div v-for="(question, idx) in questions" :key="idx" class="absolute w-full h-full box-border"
                            :style="{ left: `${idx * 100}%` }">

                            <div class="flex flex-row justify-between items-center">
                                <div v-for="(option, optIdx) in question.options" :key="optIdx"
                                    class="flex flex-row justify-between mx-16 items-center bg-[#37474f] text-white p-3 rounded cursor-pointer border-2 border-transparent text-center hover:bg-[#455a64]"
                                    :class="{
                                        'border-[#2196f3]': questionStates[idx].selectedOption === optIdx,
                                        'bg-[#2e7d32] border-[#4caf50]': questionStates[idx].answeredCorrectly && optIdx === question.correctIndex,
                                        'bg-[#c62828] border-[#f44336]': questionStates[idx].showIncorrectMessage && questionStates[idx].selectedOption === optIdx
                                    }" @click="selectOption(idx, optIdx)">
                                    {{ option }}
                                </div>
                            </div>

                            <div class="w-full h-full perspective-[1000px]"
                                :class="{ 'flipped': questionStates[idx].answeredCorrectly }">
                                <div class="relative w-full h-full transition-transform duration-[0.8s] [transform-style:preserve-3d]"
                                    :class="{ 'rotate-y-180': questionStates[idx].answeredCorrectly }">

                                    <!-- Front Face -->
                                    <div
                                        class="absolute  h-[400px] w-[400px] justify-center items-center right-50 left-50 top-10 [backface-visibility:hidden]">
                                        <div
                                            class="h-[200px] w-[200px] rounded-md bg-[#4D96FF] text-2xl flex justify-center items-center">
                                            {{
                                                question.question }}
                                        </div>


                                        <div v-if="questionStates[idx].showIncorrectMessage"
                                            class="w-[200px] mt-4 text-[#ef9a9a] flex justify-center items-center">
                                            Incorrect. Try again!
                                        </div>

                                        <div class="flex justify-center flex justify-center items-center w-[200px] self-center mt-4">
                                            <button v-if="questionStates[idx].showIncorrectMessage"
                                                @click="tryAgain(idx)"
                                                class="bg-[#FFD93D] flex justify-center items-center w-[100px] hover:bg-[#f57c00]">
                                                Try Again
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Back Face -->
                                    <div
                                        class="absolute h-[400px] w-[400px] rounded-md bg-[#4D96FF] text-2xl flex flex-col justify-center items-center left-25 top-10 [backface-visibility:hidden] rotate-y-180 ">
                                        <!-- <div class="text-5xl mb-4">🎉</div>
                                        <h2 class="text-2xl mb-4">Correct!</h2> -->
                                        <div class="p-4 bg-[#37474f] rounded">
                                            <div class="text-[20px] mb-4">Explanation:</div> {{ question.explanation }}
                                        </div>
                                        <button @click="goToNextQuestion()"
                                            :disabled="currentIndex === questions.length - 1"
                                            class="mt-4 bg-[#2196f3] text-white px-6 py-2 rounded disabled:bg-[#cccccc] disabled:cursor-not-allowed">
                                            {{ currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'
                                            }}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center gap-2 mt-4">
                    <div v-for="(_, idx) in questions" :key="idx"
                        class="w-3 h-3 rounded-full bg-[#bdbdbd] cursor-pointer"
                        :class="{ 'bg-[#2196f3] scale-110': currentIndex === idx }" @click="goToQuestion(idx)"></div>
                </div>

                <div class="flex justify-center mt-4 gap-4">
                    <button @click="resetQuiz"
                        class="bg-[#f44336] text-white px-6 py-2 rounded hover:-translate-y-1">Reset Quiz</button>
                    <button @click="shuffleQuestions"
                        class="bg-[#3f51b5] text-white px-6 py-2 rounded hover:-translate-y-1">Shuffle
                        Questions</button>
                </div>
            </div>
        </div>
    </div>
</template>
