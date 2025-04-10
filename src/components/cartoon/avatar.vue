<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

const quizTitle = ref('Swipe Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
    // Avatar: The Last Airbender Questions
    {
        question: "Who is the last Airbender?",
        options: ["Aang", "Zuko"],
        correctIndex: 0,
        explanation: "Aang is the last Airbender and the Avatar, tasked with maintaining balance in the world by mastering all four elements.",
        bgColor: "#3498DB"
    },
    {
        question: "What is the name of Aang's flying bison?",
        options: ["Appa", "Momo"],
        correctIndex: 0,
        explanation: "Appa is Aang's loyal flying bison and best friend, who travels with Aang on his journey to restore balance.",
        bgColor: "#E74C3C"
    },
    {
        question: "Who is Aang's main antagonist throughout the series?",
        options: ["Fire Lord Ozai", "Azula"],
        correctIndex: 0,
        explanation: "Fire Lord Ozai is the main antagonist, the ruler of the Fire Nation, and Aang's primary enemy in the struggle for balance.",
        bgColor: "#9B59B6"
    },
    {
        question: "What is the name of Zuko's uncle?",
        options: ["Iroh", "Sokka"],
        correctIndex: 0,
        explanation: "Iroh is Zuko's uncle, a retired Fire Nation general and wise mentor who plays a key role in Zuko's redemption.",
        bgColor: "#1ABC9C"
    },
    {
        question: "Which element does Katara master?",
        options: ["Water", "Fire"],
        correctIndex: 0,
        explanation: "Katara is a skilled Waterbender, and she becomes Aang's mentor in mastering Waterbending.",
        bgColor: "#2ECC71"
    },
    {
        question: "What animal is Momo?",
        options: ["Flying lemur", "Monkey"],
        correctIndex: 0,
        explanation: "Momo is a flying lemur, a small creature that is a loyal companion to Aang and his friends.",
        bgColor: "#F39C12"
    },
    {
        question: "What is the name of the Earth Kingdom city where Aang and his friends meet Toph?",
        options: ["Omashu", "Ba Sing Se"],
        correctIndex: 1,
        explanation: "Ba Sing Se is the largest city in the Earth Kingdom and the setting for several key episodes where Aang and his group meet Toph.",
        bgColor: "#F1C40F"
    },
    {
        question: "What is Toph Beifong's special ability as a Earthbender?",
        options: ["Seismic sense", "Metal bending"],
        correctIndex: 0,
        explanation: "Toph has the ability to sense vibrations in the ground, allowing her to 'see' through her sense of touch.",
        bgColor: "#8E44AD"
    },
    {
        question: "Who is the ruler of the Fire Nation at the beginning of the series?",
        options: ["Fire Lord Ozai", "Fire Lord Azulon"],
        correctIndex: 0,
        explanation: "Fire Lord Ozai is the ruthless ruler of the Fire Nation and the primary antagonist throughout most of the series.",
        bgColor: "#E67E22"
    },
    {
        question: "What is the name of Aang's previous Avatar incarnation who mastered all four elements?",
        options: ["Roku", "Kyoshi"],
        correctIndex: 0,
        explanation: "Avatar Roku was Aang's predecessor, a Firebender who worked to maintain balance before Aang's time.",
        bgColor: "#9B59B6"
    },
    {
        question: "What type of bending does Zuko specialize in?",
        options: ["Firebending", "Earthbending"],
        correctIndex: 0,
        explanation: "Zuko is a skilled Firebender, originally taught by his father, Fire Lord Ozai, and later by his uncle, Iroh.",
        bgColor: "#C0392B"
    },
    {
        question: "What is the name of Aang's flying companion?",
        options: ["Appa", "Momo"],
        correctIndex: 0,
        explanation: "Appa is Aang's flying bison and companion, who plays a vital role in helping the group travel across the world.",
        bgColor: "#34495E"
    },
    {
        question: "Which Avatar is known for being a warrior and is famous for her skills in Earthbending?",
        options: ["Avatar Kyoshi", "Avatar Korra"],
        correctIndex: 0,
        explanation: "Avatar Kyoshi was a powerful Earthbender and a warrior who founded the Kyoshi Warriors, a group of skilled female fighters.",
        bgColor: "#16A085"
    },
    {
        question: "What is the name of the Fire Nation princess who is Zuko's sister?",
        options: ["Azula", "Mai"],
        correctIndex: 0,
        explanation: "Azula is Zuko's sister, a firebender prodigy who is ruthlessly ambitious and serves as one of Aang's most dangerous enemies.",
        bgColor: "#F1C40F"
    },
    {
        question: "What is the name of the waterbending technique that Katara teaches Aang?",
        options: ["The Water Whip", "The Bloodbending"],
        correctIndex: 0,
        explanation: "Katara teaches Aang the Water Whip, a technique that allows waterbenders to control water with precision and accuracy.",
        bgColor: "#2ECC71"
    },
    {
        question: "What is the name of the creature that can bend all four elements and is said to be the original Avatar?",
        options: ["Lion Turtle", "Dragon of the West"],
        correctIndex: 0,
        explanation: "The Lion Turtle is a creature that gives Aang the ability to bend all four elements at once and is tied to the original Avatar.",
        bgColor: "#8E44AD"
    },
    {
        question: "Who is the leader of the Earth Kingdom city of Omashu?",
        options: ["King Bumi", "Toph Beifong"],
        correctIndex: 0,
        explanation: "King Bumi is the eccentric and powerful ruler of Omashu, a city in the Earth Kingdom.",
        bgColor: "#E67E22"
    },
    {
        question: "What is the name of Zuko's childhood friend who is also a Fire Nation circus gymnast?",
        options: ["Mai", "Ty Lee"],
        correctIndex: 1,
        explanation: "Ty Lee is a gymnast and a childhood friend of Zuko, who later becomes an ally of Azula.",
        bgColor: "#16A085"
    },
    {
        question: "What is the power of the Avatar State?",
        options: ["Enhanced strength", "The ability to bend all elements"],
        correctIndex: 1,
        explanation: "The Avatar State grants the Avatar immense power, enabling them to bend all elements at once, often used in times of great need.",
        bgColor: "#1ABC9C"
    },
    {
        question: "What is the name of the group that follows Aang to help him defeat the Fire Nation?",
        options: ["The Avatar's Team", "Team Avatar"],
        correctIndex: 1,
        explanation: "Team Avatar is the name given to Aang and his companions, including Katara, Sokka, Zuko, and Toph, who travel together on their mission to stop the Fire Nation.",
        bgColor: "#9B59B6"
    },
    {
        question: "Who is the Fire Nation general who becomes an ally of Team Avatar?",
        options: ["Iroh", "Zhao"],
        correctIndex: 0,
        explanation: "Iroh, a retired general of the Fire Nation, becomes an ally of Team Avatar and a mentor to Zuko, helping him find his true path.",
        bgColor: "#F39C12"
    },
    {
        question: "What is the name of the avatar before Aang?",
        options: ["Roku", "Kyoshi"],
        correctIndex: 0,
        explanation: "Avatar Roku was the previous Avatar before Aang, a Firebender who tried to maintain balance before his death.",
        bgColor: "#F1C40F"
    },
    {
        question: "What is the name of the Fire Nation ship that is used to hunt down the Avatar?",
        options: ["The Fire Nation Warship", "The Fire Nation Cruiser"],
        correctIndex: 0,
        explanation: "The Fire Nation Warship is the main ship used by the Fire Nation to hunt down the Avatar and pursue their conquest of the world.",
        bgColor: "#E74C3C"
    },
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

// Swipe state management
const swipeState = reactive({
    startX: 0,
    endX: 0,
    isSwiping: false,
    swipeThreshold: 50, // minimum distance to consider it a swipe
    currentOffset: 0
});

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

// on swipe ========================================================================

function handleTouchStart(e) {
    if (questionStates[currentIndex.value].answeredCorrectly) return;

    swipeState.startX = e.touches[0].clientX;
    swipeState.isSwiping = true;
    swipeState.currentOffset = 0;
}

function handleTouchMove(e) {
    if (!swipeState.isSwiping || questionStates[currentIndex.value].answeredCorrectly) return;

    swipeState.endX = e.touches[0].clientX;
    swipeState.currentOffset = swipeState.endX - swipeState.startX;


    if (!swipeSound.value) return

    //   audio playing  ================================================
    swipeSound.value.currentTime = 0

    swipeSound.value.play().catch(error => {
        console.log('Audio play failed:', error)
    })
    e.preventDefault();
}

function handleTouchEnd(idx) {
    if (!swipeState.isSwiping || questionStates[currentIndex.value].answeredCorrectly) return;

    const deltaX = swipeState.endX - swipeState.startX;

    // Reset swipe state
    swipeState.isSwiping = false;
    swipeState.startX = 0;
    swipeState.endX = 0;
    swipeState.currentOffset = 0;

    
    if (Math.abs(deltaX) < swipeState.swipeThreshold) return;

    
    if (deltaX < 0) {
        
        selectOption(currentIndex.value, 0);
        questionStates[currentIndex.value].showIncorrectMessage = true;
    } else {
        
        selectOption(currentIndex.value, 1);
        questionStates[currentIndex.value].showIncorrectMessage = true;
    }
}

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
            questionStates[questionIdx].showIncorrectMessage = false;
            totalAnswered.value++;
        }
    }
}


function tryAgain(idx) {
    questionStates[idx].selectedOption = null;
    questionStates[idx].showIncorrectMessage = false;
    questionStates[idx].answeredCorrectly = false;
    console.log('value:', questionStates[currentIndex.value].showIncorrectMessage)
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

function initializeQuestionStates() {
    
    questions.value = [...questions.value]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)

    
    questionStates.splice(0) 
    questions.value.forEach(() => {
        questionStates.push({
            selectedOption: null,
            answeredCorrectly: false,
            showIncorrectMessage: false,
            attempted: false
        })
    })
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

onMounted(() => {
    initializeQuestionStates();
    shuffleQuestions();
});



// play music =========================================================================

const playlist = [
    new URL('../../../public/music/avatarTheme1.mp3', import.meta.url).href,
    new URL('../../../public/music/avatarTheme2.mp3', import.meta.url).href,
    new URL('../../../public/music/avatarTheme3.mp3', import.meta.url).href,
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
    <div class="min-h-screen w-full absolute top-0 right-0 overflow-hidden m-0 flex flex-row bg-[#20232A] text-white">
        <!-- Sidebar -->
        <div
            class="absolute top-70 md:top-[25vh] md:text-left md:justify-start md:items-start left-[-18vw] z-[9999] text-white hidden md:flex flex-row md:flex-col items-center rotate-90 md:rotate-0 w-[50%] md:w-auto md:left-0 md:my-auto md:p-8 gap-16">
            <div @click="navigateToSuperheroes" class="cursor-pointer flex flex-col items-center justify-center">
                <div class="bg-transparent opacity-[0.7] h-[10px] w-[10px] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical"> Superheroes
                </h2>
            </div>
            <div @click="navigateToPrincess" class="cursor-pointer flex flex-col items-center justify-center">
                <div class=" bg-transparent opacity-[0.7] h-[10px] w-[10px] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical">Princesses
                </h2>
            </div>
            <div class="cursor-pointer flex flex-col items-center justify-center text-[#FBCD00]">
                <div class="  opacity-[0.7] h-[10px] w-[10px] rounded-full bg-[#FBCD00] cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical">Cartoons</h2>
            </div>
        </div>

        <!-- Main Quiz Area -->
        <div class="w-[100vw] lg:w-[80%] md:ml-[20%] h-screen max-w-screen mx-auto my-5">
            <div class="flex justify-between items-center py-4 px-8">
                <div class="text-left text-[#cfd8dc] font-medium">{{ currentIndex + 1 }} of {{ questions.length
                }}
                </div>
                <div class="text-right font-medium text-white">Score: {{ score }}/{{ totalAnswered }}</div>
            </div>

            <div class="opacity-[0.7] my-2">Swipe Left or right for the correct options</div>

            <div class="relative overflow-hidden h-[70vh] w-full rounded-[12px]">
                <div class="relative w-full h-full transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                    <div v-for="(question, idx) in questions" :key="idx" class="absolute w-full h-full box-border"
                        :style="{ left: `${idx * 100}%` }">
                        <div class="flex flex-row justify-center items-center w-full max-w-screen px-4 py-2">
                            <div v-for="(option, optIdx) in question.options" :key="optIdx"
                                class="flex flex-row items-center justify-center text-[14px] mx-4 bg-[#37474f] text-white z-[99] px-4 py-2 rounded cursor-pointer transition-all duration-300"
                                :class="{
                                    'border-[#2196f3]': questionStates[idx].selectedOption === optIdx,
                                    'bg-[#2e7d32] border-[#4caf50]': questionStates[idx].answeredCorrectly && optIdx === question.correctIndex,
                                    'bg-[#c62828] border-[#f44336]': questionStates[idx].showIncorrectMessage && questionStates[idx].selectedOption === optIdx
                                }">
                                <!-- Arrows -->
                                <font-awesome-icon v-if="optIdx === 0" icon="fa-solid fa-arrow-left" class="mr-2" />

                                <span>{{ option }}</span>

                                
                                <font-awesome-icon v-if="optIdx === 1" icon="fa-solid fa-arrow-right" class="ml-2" />
                            </div>
                        </div>

                        <div class="w-full h-full perspective-[1000px]"
                            :class="{ 'flipped': questionStates[idx].answeredCorrectly }">
                            <div class="relative w-full h-full transition-transform duration-[0.8s] [transform-style:preserve-3d]"
                                :class="{ 'rotate-y-180': questionStates[idx].answeredCorrectly }">

                                <!-- Front, the questions -->

                                <img v-if="questionStates[idx].answeredCorrectly" src="/public/img/sokka.png"
                                    class="absolute left-10 md:left-50 top-[-5%] h-[100px] w-[100px] rotate-y-[180deg]" />
                                <img v-if="!questionStates[idx].answeredCorrectly" src="/public/img/sokka.png"
                                    class="absolute right-10 md:right-50 top-[-7%] h-[100px] w-[100px]" />


                                <div class="absolute h-[400px] w-[80%] justify-center items-center right-[10%] top-10 [backface-visibility:hidden]"
                                    @touchstart="handleTouchStart" @touchmove="handleTouchMove"
                                    @touchend="handleTouchEnd">
                                    <div class="h-[300px] w-full rounded-md text-2xl flex justify-center items-center shadow-md"
                                        :style="{
                                            backgroundColor: question.bgColor,
                                            transform: swipeState.isSwiping ? `translateX(${swipeState.currentOffset}px)` : 'none',
                                            transition: swipeState.isSwiping ? 'none' : 'transform 0.3s ease'
                                        }">
                                        {{ question.question }}
                                    </div>


                                    <div v-if="questionStates[idx].showIncorrectMessage"
                                        class="animate-fade-in w-full mt-4 text-[#ef9a9a] flex justify-center items-center">
                                        Incorrect. Try again!
                                    </div>

                                    <div class="flex justify-center items-center w-full self-center mt-4">
                                        <button v-if="questionStates[idx].showIncorrectMessage" @click="tryAgain(idx)"
                                            class="animate-fade-in bg-[#FFD93D] flex justify-center items-center w-[200px] hover:bg-[#f57c00]">
                                            Try Again
                                        </button>
                                    </div>
                                </div>

                                 <!-- Back, the answers-->
                                <div class="absolute h-[350px] w-[80%] my-4 rounded-md bg-[#4D96FF] text-2xl flex flex-col justify-center items-center left-[10%] top-10 [backface-visibility:hidden] rotate-y-180"
                                    :style="{ backgroundColor: question.bgColor }">
                                    <div class=" p-4 bg-[#37474f] rounded">
                                        <div class="text-[32px] mb-4">Correct</div> {{ question.explanation }}
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

<!-- indicator below questions -->
            <div class="flex justify-center gap-2 mt-4 px-4">
                <div v-for="(_, idx) in questions" :key="idx" class="w-2 h-2 rounded-full bg-[#bdbdbd] cursor-pointer"
                    :class="{ 'bg-[#2196f3] scale-130': currentIndex === idx }" @click="goToQuestion(idx)"></div>
            </div>

            <div class="flex justify-center mt-4 gap-4">
                <button @click="resetQuiz" class="bg-[#4D96FF] text-white px-6 py-2 rounded hover:-translate-y-1">Reset
                    Quiz</button>
                <button @click="shuffleQuestions"
                    class="bg-[#3f51b5] text-white px-6 py-2 rounded hover:-translate-y-1">Shuffle
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