<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

const quizTitle = ref('Swipe Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
    // Marvel Questions
    {
        question: "What is the real name of Spider-Man?",
        options: ["Peter Parker", "Bruce Wayne"],
        correctIndex: 0,
        explanation: "Peter Parker is the alter ego of Spider-Man, a high school student who gained his powers from a radioactive spider bite.",
        bgColor: "#3498DB"
    },
    {
        question: "Who is the God of Thunder in Marvel Comics?",
        options: ["Thor", "Loki"],
        correctIndex: 0,
        explanation: "Thor is the Norse God of Thunder and one of the founding members of the Avengers.",
        bgColor: "#E67E22"
    },
    {
        question: "What is the real name of Iron Man?",
        options: ["Tony Stark", "Bruce Banner"],
        correctIndex: 0,
        explanation: "Tony Stark is the genius billionaire inventor who created the Iron Man suit after being kidnapped and forced to build weapons.",
        bgColor: "#F39C12"
    },
    {
        question: "Who is the leader of the X-Men?",
        options: ["Cyclops", "Wolverine"],
        correctIndex: 0,
        explanation: "Cyclops (Scott Summers) is the leader of the X-Men, known for his optic blasts and strategic thinking.",
        bgColor: "#1ABC9C"
    },
    {
        question: "What is Captain America's shield made of?",
        options: ["Vibranium", "Adamantium"],
        correctIndex: 0,
        explanation: "Captain America's shield is made of Vibranium, an indestructible metal from the African country of Wakanda.",
        bgColor: "#E74C3C"
    },
    {
        question: "Who is the Hulk's alter ego?",
        options: ["Bruce Banner", "Tony Stark"],
        correctIndex: 0,
        explanation: "Bruce Banner is a scientist who transforms into the Hulk when he experiences extreme emotional stress or anger.",
        bgColor: "#2ECC71"
    },
    {
        question: "What is the name of Black Panther’s home country?",
        options: ["Wakanda", "Genovia"],
        correctIndex: 0,
        explanation: "Wakanda is a secretive and technologically advanced African nation and the home of the Black Panther.",
        bgColor: "#8E44AD"
    },
    {
        question: "What is the name of the Winter Soldier before he became a villain?",
        options: ["Bucky Barnes", "Peter Quill"],
        correctIndex: 0,
        explanation: "Bucky Barnes, Steve Rogers' childhood friend, was brainwashed and turned into the Winter Soldier before being rescued by the Avengers.",
        bgColor: "#9B59B6"
    },
    {
        question: "Who is the arch-nemesis of the X-Men?",
        options: ["Magneto", "Doctor Doom"],
        correctIndex: 0,
        explanation: "Magneto is a powerful mutant with control over magnetic fields, and he often opposes the X-Men's goals.",
        bgColor: "#34495E"
    },
    {
        question: "Which superhero team is Wolverine a part of?",
        options: ["X-Men", "Fantastic Four"],
        correctIndex: 0,
        explanation: "Wolverine, also known as Logan, is a key member of the X-Men with enhanced senses, regenerative healing, and retractable claws.",
        bgColor: "#F1C40F"
    },
    {
        question: "What is the real name of the Black Widow?",
        options: ["Natasha Romanoff", "Carol Danvers"],
        correctIndex: 0,
        explanation: "Natasha Romanoff, aka Black Widow, is a highly skilled spy and former assassin, working with the Avengers.",
        bgColor: "#BDC3C7"
    },
    {
        question: "What superhero is known for his hammer, Mjolnir?",
        options: ["Thor", "Iron Man"],
        correctIndex: 0,
        explanation: "Thor wields the enchanted hammer Mjolnir, which can only be lifted by those deemed worthy.",
        bgColor: "#F39C12"
    },
    {
        question: "Who is the leader of the Avengers?",
        options: ["Captain America", "Iron Man"],
        correctIndex: 0,
        explanation: "Captain America is often considered the leader of the Avengers, guiding them with his strong sense of justice.",
        bgColor: "#E67E22"
    },
    {
        question: "What is the name of the powerful gem that Thanos seeks in the Marvel Cinematic Universe?",
        options: ["Infinity Stones", "Cosmic Cubes"],
        correctIndex: 0,
        explanation: "Thanos seeks the six Infinity Stones, which grant him god-like powers when combined in the Infinity Gauntlet.",
        bgColor: "#C0392B"
    },
    {
        question: "Who is the villain in the 'Guardians of the Galaxy' movie?",
        options: ["Ronin", "Loki"],
        correctIndex: 0,
        explanation: "Ronin the Accuser is the main antagonist in the first 'Guardians of the Galaxy' movie.",
        bgColor: "#8E44AD"
    },
    {
        question: "What is the name of Thor’s brother?",
        options: ["Loki", "Hela"],
        correctIndex: 0,
        explanation: "Loki is Thor's adopted brother, often acting as a villain due to his mischievous and chaotic nature.",
        bgColor: "#1F618D"
    },
    {
        question: "What superhero has the alias 'The Merc with a Mouth'?",
        options: ["Deadpool", "Venom"],
        correctIndex: 0,
        explanation: "Deadpool, aka Wade Wilson, is known for his regenerative healing factor and his tendency to break the fourth wall.",
        bgColor: "#9B59B6"
    },
    {
        question: "What is the name of the villain who is always after the X-Men’s Jean Grey?",
        options: ["Magneto", "Apocalypse"],
        correctIndex: 1,
        explanation: "Apocalypse is one of the X-Men’s oldest and most powerful enemies, often targeting Jean Grey due to her immense power.",
        bgColor: "#16A085"
    },
    {
        question: "What is Doctor Strange's primary source of power?",
        options: ["Magic", "Technology"],
        correctIndex: 0,
        explanation: "Doctor Strange draws his powers from magical sources, using the mystic arts to protect Earth from supernatural threats.",
        bgColor: "#2ECC71"
    },
    {
        question: "What is the real name of Black Panther?",
        options: ["T'Challa", "M'Baku"],
        correctIndex: 0,
        explanation: "T'Challa is the king of Wakanda and the alter ego of Black Panther, a skilled fighter with enhanced agility and senses.",
        bgColor: "#C0392B"
    },
    {
        question: "What is the name of the famous talking raccoon in the 'Guardians of the Galaxy'?",
        options: ["Rocket", "Groot"],
        correctIndex: 0,
        explanation: "Rocket is a genetically modified raccoon with advanced intelligence and exceptional combat skills.",
        bgColor: "#8E44AD"
    },
    {
        question: "What is the alter ego of the superhero Moon Knight?",
        options: ["Marc Spector", "Steven Grant"],
        correctIndex: 0,
        explanation: "Marc Spector is the alter ego of Moon Knight, a mercenary turned superhero with multiple identities.",
        bgColor: "#F1C40F"
    },
    {
        question: "Who is the Scarlet Witch's twin brother?",
        options: ["Vision", "Pietro Maximoff"],
        correctIndex: 1,
        explanation: "Pietro Maximoff, also known as Quicksilver, is the twin brother of Wanda Maximoff (Scarlet Witch).",
        bgColor: "#F39C12"
    },
    {
        question: "What team is Cyclops a member of?",
        options: ["X-Men", "Avengers"],
        correctIndex: 0,
        explanation: "Cyclops is a founding member of the X-Men, leading the team in the fight for mutant rights.",
        bgColor: "#16A085"
    },
    {
        question: "Who is the villain in the 'Avengers: Infinity War' movie?",
        options: ["Thanos", "Ultron"],
        correctIndex: 0,
        explanation: "Thanos is the primary antagonist in 'Avengers: Infinity War,' aiming to collect all Infinity Stones to erase half of all life in the universe.",
        bgColor: "#8E44AD"
    },
    {
        question: "Who is the arch-nemesis of Daredevil?",
        options: ["Kingpin", "Joker"],
        correctIndex: 0,
        explanation: "Kingpin (Wilson Fisk) is the crime lord who is Daredevil's primary antagonist.",
        bgColor: "#9B59B6"
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
    new URL('../../../public/music/marvelTheme.mp3', import.meta.url).href,
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
            <div class="cursor-pointer flex flex-col items-center justify-center text-[#FBCD00]">
                <div class=" opacity-[0.7] h-[10px] w-[10px] bg-[#FBCD00] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical"> Superheroes
                </h2>
            </div>
            <div @click="navigateToPrincess" class="cursor-pointer flex flex-col items-center justify-center">
                <div class=" bg-transparent opacity-[0.7] h-[10px] w-[10px] rounded-full cursor-pointer"></div>
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
                                class="flex flex-row items-center justify-center text-[14px] mx-4 bg-[#37474f] text-white px-4 py-2 rounded cursor-pointer transition-all duration-300"
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

                                <img v-if="questionStates[idx].answeredCorrectly" src="/public/img/fury.png"
                                    class="absolute left-10 md:left-50 md:top-[-10%] top-0 h-[100px] w-[100px] rotate-y-[180deg]" />
                                <img v-if="!questionStates[idx].answeredCorrectly" src="/public/img/fury.png"
                                    class="absolute right-10 md:right-50 md:top-[-10%] top-0 h-[100px] w-[100px]" />


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
