<script setup>
import { ref, computed, reactive } from 'vue';

const quizTitle = ref('Carousel Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
    {
        question: "What does Cinderella leave behind at the royal ball?",
        options: ["Necklace", "Glass slipper", "Crown", "Bracelet"],
        correctIndex: 1,
        category: "Cinderella",
        explanation: [
            "A necklace was not part of Cinderella's magical outfit.",
            "Cinderella accidentally leaves behind her glass slipper while fleeing the palace before midnight.",
            "Cinderella never wore a crown to the ball.",
            "A bracelet was not mentioned in the story."
        ],
        bgColor: "#F39C12"
    },
    {
        question: "Who helps Cinderella get ready for the ball?",
        options: ["Her stepsisters", "Her father", "A fairy godmother", "The prince"],
        correctIndex: 2,
        category: "Cinderella",
        explanation: [
            "Her stepsisters were cruel and never helped her.",
            "Cinderella's father was not present in the story.",
            "The fairy godmother magically prepares Cinderella for the ball.",
            "The prince meets her at the ball, not before it."
        ],
        bgColor: "#9B59B6"
    },
    {
        question: "What turns into a carriage for Cinderella?",
        options: ["A watermelon", "A pear", "A pumpkin", "A coconut"],
        correctIndex: 2,
        category: "Cinderella",
        explanation: [
            "A watermelon was not used in the story.",
            "A pear doesn’t appear in the tale.",
            "The fairy godmother turns a pumpkin into a magical carriage.",
            "A coconut has no role in the transformation."
        ],
        bgColor: "#E67E22"
    },
    {
        question: "What time must Cinderella leave the ball?",
        options: ["11 PM", "1 AM", "Midnight", "10 PM"],
        correctIndex: 2,
        category: "Cinderella",
        explanation: [
            "She was told to leave before midnight, not 11 PM.",
            "The magic ends at midnight, not 1 AM.",
            "Cinderella must leave before midnight when the magic fades.",
            "10 PM is too early; the magic lasts until midnight."
        ],
        bgColor: "#2980B9"
    },
    {
        question: "What is the name of Cinderella's stepmother?",
        options: ["Lady Tremaine", "Ursula", "Maleficent", "Gothel"],
        correctIndex: 0,
        category: "Cinderella",
        explanation: [
            "Lady Tremaine is the correct name of Cinderella’s stepmother.",
            "Ursula is the villain from The Little Mermaid.",
            "Maleficent is the antagonist in Sleeping Beauty.",
            "Mother Gothel is from the story of Rapunzel."
        ],
        bgColor: "#C0392B"
    },
    {
        question: "How many stepsisters does Cinderella have?",
        options: ["One", "Three", "Two", "Four"],
        correctIndex: 2,
        category: "Cinderella",
        explanation: [
            "She has more than one stepsister.",
            "She only has two stepsisters, not three.",
            "Cinderella has two stepsisters: Anastasia and Drizella.",
            "Four is too many—only two stepsisters are in the story."
        ],
        bgColor: "#1ABC9C"
    },
    {
        question: "What animals help Cinderella with her chores?",
        options: ["Cats and dogs", "Mice and birds", "Frogs and turtles", "Rabbits and foxes"],
        correctIndex: 1,
        category: "Cinderella",
        explanation: [
            "Cats and dogs are not featured as helpers in the story.",
            "Mice and birds are Cinderella’s loyal animal friends.",
            "Frogs and turtles don’t appear in this story.",
            "Rabbits and foxes are not part of the tale."
        ],
        bgColor: "#3498DB"
    },
    {
        question: "Who tries to stop Cinderella from trying on the glass slipper?",
        options: ["The prince", "Her fairy godmother", "Lady Tremaine", "A palace guard"],
        correctIndex: 2,
        category: "Cinderella",
        explanation: [
            "The prince is actively trying to find her.",
            "Her fairy godmother supports her, not stops her.",
            "Lady Tremaine locks Cinderella in her room to prevent her from trying the slipper.",
            "The guards follow the prince’s orders and don't interfere."
        ],
        bgColor: "#8E44AD"
    },
    {
        question: "What does the prince use to find Cinderella?",
        options: ["A crown", "A photograph", "A ring", "A glass slipper"],
        correctIndex: 3,
        category: "Cinderella",
        explanation: [
            "A crown is symbolic but not used to find her.",
            "There were no photographs in Cinderella's time.",
            "A ring is not used in this part of the story.",
            "The prince uses the glass slipper to identify Cinderella."
        ],
        bgColor: "#34495E"
    },
    {
        question: "What lesson does Cinderella's story teach?",
        options: ["Greed leads to power", "Revenge is sweet", "Kindness and patience are rewarded", "Beauty is everything"],
        correctIndex: 2,
        category: "Cinderella",
        explanation: [
            "Greed is shown as a negative trait in the story.",
            "Cinderella never seeks revenge on her stepfamily.",
            "The story teaches that kindness and patience bring good fortune.",
            "The story values inner goodness over physical beauty."
        ],
        bgColor: "#2ECC71"
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
    <div class="min-h-screen w-full absolute top-0 right-0  overflow-hidden m-0 flex flex-row bg-[#20232A] text-white">
        <!-- Category Sidebar -->
        <div class="md:flex flex-col w-[20%] my-auto p-8 gap-16 text-left hidden">
            <h2 class="text-4xl font-semibold opacity-70 text-[blue]">Superheroes</h2>
            <h2 class="text-4xl font-semibold opacity-70">Princesses</h2>
            <h2 class="text-4xl font-semibold opacity-70">Cartoon</h2>
        </div>

        <!-- Main Quiz Area -->
        <div class="w-[100vw] lg:w-[80%] h-screen max-w-screen mx-auto my-2">
            <!-- <h1 class="text-center text-white mb-8">{{ quizTitle }}</h1> -->

            <div class="flex justify-between items-center py-4 px-8">
                <div class="text-left text-[#cfd8dc] font-medium">Question {{ currentIndex + 1 }} of {{
                    questions.length }}</div>
                <div class="text-right font-medium text-white">Score: {{ score }}/{{ totalAnswered }}</div>
            </div>

            <div class=" relative overflow-hidden h-[75vh] w-full rounded-[12px]">
                <div class=" relative w-full h-full transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                    <div v-for="(question, idx) in questions" :key="idx" class="absolute w-full h-full box-border"
                        :style="{ left: `${idx * 100}%` }">

                        <div class="font-medium pb-4">{{ question.question }}</div>


                        <div class="w-full h-full perspective-[1000px]"
                            :class="{ 'flipped': questionStates[idx].answeredCorrectly }">
                            <div class="relative w-full h-full transition-transform duration-[0.8s] [transform-style:preserve-3d]"
                                :class="{ 'rotate-y-180': questionStates[idx].answeredCorrectly }">

                                <!-- Front Face -->

                                <img v-if="questionStates[idx].answeredCorrectly" src="/public/img/alfred1.png"
                                    class="absolute left-10 top-0 h-[100px] w-[100px] rotate-y-[180deg]" />
                                <img v-if="!questionStates[idx].answeredCorrectly" src="/public/img/alfred2.png"
                                    class="absolute right-10 top-0 h-[100px] w-[100px]" />

                                <div
                                    class="absolute h-[80vh] w-[80%] justify-center items-center right-[10%] top-10 [backface-visibility:hidden]">
                                    <div class="grid grid-cols-2 gap-x-8 md:gap-32">
                                        <div v-for="(option, optIdx) in question.options" class="mb-4" :key="optIdx"
                                            @click="selectOption(idx, optIdx)">

                                            <div class="h-[150px] w-full rounded-md text-[16px] font-medium flex justify-center items-center shadow-md p-2"
                                                :style="{ backgroundColor: question.bgColor }">
                                                <span>{{ option }}</span>
                                            </div>
                                        </div>
                                    </div>



                                    <div v-if="questionStates[idx].showIncorrectMessage"
                                        class="w-full mt-2 text-[#ef9a9a] flex justify-center items-center w-full">
                                        Incorrect. Try again!
                                    </div>

                                    <div class="flex justify-center  items-center w-full self-center mt-2">
                                        <button v-if="questionStates[idx].showIncorrectMessage" @click="tryAgain(idx)"
                                            class="bg-[#FFD93D] flex justify-center items-center w-full hover:bg-[#f57c00]">
                                            Try Again
                                        </button>
                                    </div>
                                </div>

                                <!-- Back Face -->
                                <div class="absolute h-[55vh] w-[90%] lg:w-[50%] my-4 rounded-md text-xl flex flex-col justify-center items-center left-[5%] top-10 [backface-visibility:hidden] rotate-y-180 p-2"
                                    :style="{ backgroundColor: question.bgColor }">
                                    <!-- <div class="text-5xl mb-4">🎉</div>
                                    <h2 class="text-2xl mb-4">Correct!</h2> -->
                                    <div class=" rounded pt-12">
                                        <!-- <div class="text-[20px] mb-4">Explanation:</div>   -->
                                        <div class="grid grid-cols-2 gap-x-4 md:gap-32">
                                            <div v-for="(option, optIdx) in question.explanation" class="mb-4"
                                                :key="optIdx" @click="selectOption(idx, optIdx)">

                                                <div class="h-[150px] w-[150px] rounded-md text-[16px] flex justify-center items-center shadow-md p-2"
                                                    :style="{ backgroundColor: '#37474f' }">
                                                    <span>{{ option }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="goToNextQuestion" :disabled="currentIndex === questions.length - 1"
                                        class="mt-2 bg-[#2196f3] border border-[#37474f] text-white px-6 py-2 rounded disabled:bg-[#cccccc] disabled:cursor-not-allowed"
                                        :style="{ backgroundColor: question.bgColor, borderWidth: '1px', borderColor: '#37474f' }">
                                        {{ currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'
                                        }}
                                        <font-awesome-icon v-if="currentIndex !== questions.length - 1"
                                            icon="fa-solid fa-arrow-right" class="ml-2" />
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center gap-2 mt-4">
                <div v-for="(_, idx) in questions" :key="idx" class="w-3 h-3 rounded-full bg-[#bdbdbd] cursor-pointer"
                    :class="{ 'bg-[#2196f3] scale-110': currentIndex === idx }" @click="goToQuestion(idx)"></div>
            </div>

            <div class="flex justify-center mt-4 gap-4">
                <button @click="resetQuiz" class="bg-[#4D96FF] text-white px-6 py-2 rounded hover:-translate-y-1">Reset
                    Quiz</button>
                <button @click="shuffleQuestions"
                    class="bg-[#FFD93D] text-white px-6 py-2 rounded hover:-translate-y-1">Shuffle
                    Questions</button>
            </div>
        </div>
    </div>
</template>
