<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

const quizTitle = ref('Carousel Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
    {
        question: "What does Cinderella leave behind at the royal ball?",
        options: ["Necklace", "Glass slipper", "Crown", "Bracelet"],
        correctIndex: 1,
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
        explanation: [
            "Greed is shown as a negative trait in the story.",
            "Cinderella never seeks revenge on her stepfamily.",
            "The story teaches that kindness and patience bring good fortune.",
            "The story values inner goodness over physical beauty."
        ],
        bgColor: "#2ECC71"
    }
]);



// sound effects ==========================================================================

// on swipe===================================================
const swipeSound = ref(null)
const swipeSoundFile = new URL('../../../public/music/swipeAudio.mp3', import.meta.url).href;

onMounted(() => {
    swipeSound.value = new Audio(swipeSoundFile)
    swipeSound.value.volume = 0.3 // Adjust volume (0-1)
})

onBeforeUnmount(() => {
    if (swipeSound.value) {
        swipeSound.value.pause()
        swipeSound.value = null
    }
})

//on click===================================================

const clickSound = ref(null)
const clickSoundFile = new URL('../../../public/music/clickAudio2.mp3', import.meta.url).href;

onMounted(() => {
    clickSound.value = new Audio(clickSoundFile)
    clickSound.value.volume = 0.3 // Adjust volume (0-1)
})

onBeforeUnmount(() => {
    if (clickSound.value) {
        clickSound.value.pause()
        clickSound.value = null
    }
})


// Initialize question states==========================================================
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
    clickSound.value.currentTime = 0

    clickSound.value.play().catch(error => {
        console.log('Audio play failed:', error)
    })
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


const showCongratsModal = ref(false);

function handleButtonClick() {
    if (currentIndex.value === questions.value.length - 1) {
        showCongratsModal.value = true;
    } else {
        goToNextQuestion();
    }
}

function goToNextQuestion() {
    if (currentIndex.value < questions.value.length - 1) {
        clickSound.value.currentTime = 0

        clickSound.value.play().catch(error => {
            console.log('Audio play failed:', error)
        })
        currentIndex.value++;
    }
}

function closeModal() {
    showCongratsModal.value = false;
}

function restartQuiz() {
    currentIndex.value = 0;
    score.value = 0;
    totalAnswered.value = 0;
    showCongratsModal.value = false;

    // Reset all question states
    questions.value.forEach((_, idx) => {
        questionStates[idx].selectedOption = null;
        questionStates[idx].answeredCorrectly = false;
        questionStates[idx].showIncorrectMessage = false;
        questionStates[idx].attempted = false;
    });
}

function goToQuestion(idx) {
    
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
   
    const indices = [...Array(questions.value.length).keys()];

    
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    
    const shuffledQuestions = indices.map(i => questions.value[i]);
    const shuffledStates = indices.map(i => ({
        selectedOption: null,
        answeredCorrectly: false,
        showIncorrectMessage: false,
        attempted: false
    }));

    
    questions.value = shuffledQuestions;

    // Reset
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



// play music =========================================================================

const playlist = [
    new URL('../../../public/music/cinderellaTheme.mp3', import.meta.url).href,
]

const currentTrackIndex = ref(0)
const audioElement = ref(null)

const playCurrentTrack = async () => {
    if (!audioElement.value) return

    audioElement.value.src = playlist[currentTrackIndex.value]
    try {
        await audioElement.value.play()
    } catch (err) {
        console.log('Autoplay blocked:', err)
        
    }
}

const playNextTrack = () => {
    currentTrackIndex.value = (currentTrackIndex.value + 1) % playlist.length
    playCurrentTrack()
}

onMounted(() => {
    audioElement.value = new Audio()
    audioElement.value.volume = 0.5
    audioElement.value.addEventListener('ended', playNextTrack)
    playCurrentTrack()
})

onBeforeUnmount(() => {
    if (audioElement.value) {
        audioElement.value.pause()
        audioElement.value.removeEventListener('ended', playNextTrack)
        audioElement.value = null
    }
})
</script>


<template>
    <div class="min-h-screen w-full absolute top-0 right-0  overflow-hidden m-0 flex flex-row bg-[#20232A] text-white">
        <!-- Sidebar -->
        <div
            class="absolute top-70 md:top-[25vh] md:text-left md:justify-start md:items-start left-[-18vw] z-[9999] text-white hidden md:flex flex-row md:flex-col items-center rotate-90 md:rotate-0 w-[50%] md:w-auto md:left-0 md:my-auto md:p-8 gap-16">
            <div @click="navigateToSuperheroes" class="cursor-pointer flex flex-col items-center justify-center">
                <div class=" bg-transparent opacity-[0.7] h-[10px] w-[10px] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical"> Superheroes
                </h2>
            </div>
            <div class="cursor-pointer flex flex-col items-center justify-center text-[#FBCD00]">
                <div class=" opacity-[0.7] h-[10px] bg-[#FBCD00] w-[10px] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical">Princesses
                </h2>
            </div>
            <div @click="navigateToCartoon" class="cursor-pointer flex flex-col items-center justify-center">
                <div class=" bg-transparent opacity-[0.7] h-[10px] w-[10px] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical">Cartoons</h2>
            </div>
        </div>

        <!-- Main Quiz Area -->
        <div class="w-[100vw] lg:w-[80%] md:ml-[20%] h-screen max-w-screen mx-auto my-5">
            <div class="flex justify-between items-center py-4 px-8">
                <div class="text-left text-[#cfd8dc] font-medium">{{ currentIndex + 1 }} of {{
                    questions.length }}</div>
                <div class="text-right font-medium text-white">Score: {{ score }}/{{ totalAnswered }}</div>
            </div>

            <div class=" relative overflow-hidden h-[75vh] md:h-[80vh] w-full rounded-[12px]">
                <div class=" relative w-full h-full transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                    <div v-for="(question, idx) in questions" :key="idx" class="absolute w-full h-full box-border"
                        :style="{ left: `${idx * 100}%` }">

                        <div class="font-medium pb-4">{{ question.question }}</div>


                        <div class="w-full h-full perspective-[1000px]"
                            :class="{ 'flipped': questionStates[idx].answeredCorrectly }">
                            <div class="relative w-full h-full transition-transform duration-[0.8s] [transform-style:preserve-3d]"
                                :class="{ 'rotate-y-180': questionStates[idx].answeredCorrectly }">

                                <!-- Front, the questions -->

                                <img v-if="questionStates[idx].answeredCorrectly" src="/public/img/fairy.png"
                                    class="absolute left-10 md:left-50 top-[-7%] h-[100px] w-[100px] rotate-y-[180deg]" />
                                <img v-if="!questionStates[idx].answeredCorrectly" src="/public/img/fairy.png"
                                    class="absolute right-10 md:right-50 top-[-10%] h-[100px] w-[100px]" />

                                <div
                                    class="absolute h-[80vh] w-[80%] justify-center items-center right-[10%] top-10 [backface-visibility:hidden]">
                                    <div class="grid grid-cols-2 gap-x-8 md:gap-8">
                                        <div v-for="(option, optIdx) in question.options" class="mb-4" :key="optIdx"
                                            @click="selectOption(idx, optIdx)">

                                            <div class="h-[150px] w-full rounded-md text-[16px] font-medium flex justify-center items-center shadow-md p-2 cursor-pointer"
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

                                 <!-- Back, the answers-->
                                <div class="absolute h-[55vh] w-[90%] lg:w-[80%] my-4 rounded-md text-xl flex flex-col justify-center items-center md:left-[10%] left-[5%] top-10 [backface-visibility:hidden] rotate-y-180 p-2"
                                    :style="{ backgroundColor: question.bgColor }">
                                    <!-- <!-- <div class="text-5xl mb-4">🎉</div> -->
                                    <h2 class="text-4xl mb-4 absolute top-[-10%] font-bold animate-pulse">Correct!</h2>
                                    <div class=" rounded pt-12">
                                        <!-- <div class="text-[20px] mb-4">Explanation:</div>   -->
                                        <div class="grid grid-cols-2 gap-x-4 md:gap-8">
                                            <div v-for="(option, optIdx) in question.explanation" class="mb-4"
                                                :key="optIdx" @click="selectOption(idx, optIdx)">

                                                <div class="h-[150px] w-[150px] md:w-[100%] rounded-md text-[16px] flex justify-center items-center shadow-md p-2"
                                                    :style="{ backgroundColor: '#37474f' }">
                                                    <span>{{ option }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="handleButtonClick"
                                        class="mt-4 bg-[#2196f3] text-white px-6 py-2 rounded disabled:bg-[#cccccc] disabled:cursor-not-allowed"
                                        :style="{ backgroundColor: question.bgColor }">
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
<!-- The finish modal part -->
            <Transition name="fade">
                <div v-if="showCongratsModal"
                    class="fixed inset-0 bg-inherit bg-opacity-50 flex items-center justify-center z-[99999]"
                    @click.self="closeModal">
                    <div class="bg-[#20232A] border-amber-50 border p-8 rounded-lg max-w-md w-full mx-4 shadow-xl">
                        <h2 class="text-2xl font-bold mb-4 text-center"> Congratulations!
                        </h2>
                        <p class="text-center">You've successfully completed the quiz!</p>
                        <div class="text-[60px] font-bolder my-6">
                            {{ Math.round((score / totalAnswered) * 100) || 0 }}%
                        </div>
                        <div class="flex justify-center gap-4">
                            <button @click="closeModal"
                                class="bg-[#2196f3] hover:bg-[#0c7cd5] text-white px-6 py-2 rounded transition-colors">
                                Close
                            </button>
                            <button @click="restartQuiz"
                                class="bg-[#37474f] border-2 hover:bg-gray-300 hover:text-[#37474f] px-6 py-2 rounded transition-colors">
                                Restart Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>


            <div class="flex justify-center gap-2 mt-4">
                <div v-for="(_, idx) in questions" :key="idx" class="w-2 h-2 rounded-full bg-[#bdbdbd] cursor-pointer"
                    :class="{ 'bg-[#2196f3] scale-130': currentIndex === idx }" @click="goToQuestion(idx)"></div>
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


<script>
export default {
    methods: {
        navigateToSuperheroes() {
            console.log("Navigating to /home");
            this.$router.push('/home');
        },
        navigateToPrincess() {
            console.log("Navigating to /princess");
            this.$router.push('/princess');
        },
        navigateToCartoon() {
            console.log("Navigating to /cartoon");
            this.$router.push('/cartoon');
        },
    },
};
</script>
