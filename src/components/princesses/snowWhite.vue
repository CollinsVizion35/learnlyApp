<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

const quizTitle = ref('Carousel Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
    {
        question: "What is Snow White's main physical characteristic?",
        options: ["Blue eyes", "Black hair", "Red lips", "White skin"],
        correctIndex: 1,
        explanation: [
            "Snow White is known for her black hair, as depicted in her name.",
            "She has black hair, not blue eyes.",
            "Red lips are one of her features but not her defining characteristic.",
            "White skin is part of her look, but black hair is more iconic."
        ],
        bgColor: "#E74C3C"
    },
    {
        question: "Who is Snow White's evil stepmother?",
        options: ["Maleficent", "Ursula", "Queen Grimhilde", "Lady Tremaine"],
        correctIndex: 2,
        explanation: [
            "Queen Grimhilde, also known as the Evil Queen, is Snow White's stepmother.",
            "Maleficent is the villain from Sleeping Beauty, not Snow White.",
            "Ursula is from The Little Mermaid, not Snow White.",
            "Lady Tremaine is Cinderella's stepmother, not Snow White's."
        ],
        bgColor: "#8E44AD"
    },
    {
        question: "What does the Evil Queen ask the Huntsman to do?",
        options: ["Bring Snow White's heart", "Find Snow White", "Kill Snow White", "Poison Snow White"],
        correctIndex: 0,
        explanation: [
            "The Evil Queen orders the Huntsman to bring back Snow White’s heart as proof she is dead.",
            "The Huntsman does find Snow White, but that's not his first task.",
            "The Evil Queen wants Snow White's heart, not her death without proof.",
            "Poisoning Snow White is part of the Queen's later plan."
        ],
        bgColor: "#F39C12"
    },
    {
        question: "What does Snow White eat that causes her to fall into a deep sleep?",
        options: ["Poisoned apple", "Poisoned cake", "Poisoned pear", "Poisoned candy"],
        correctIndex: 0,
        explanation: [
            "Snow White eats the poisoned apple given to her by the Evil Queen.",
            "There is no poisoned cake in the story.",
            "The poisoned pear is not part of Snow White's tale.",
            "Candy does not play a role in Snow White's fall into sleep."
        ],
        bgColor: "#2ECC71"
    },
    {
        question: "Who helps Snow White after she falls into the deep sleep?",
        options: ["The Seven Dwarfs", "The Fairy Godmother", "The Huntsman", "Prince Charming"],
        correctIndex: 3,
        explanation: [
            "Prince Charming, or the Prince, wakes Snow White with a kiss.",
            "The Seven Dwarfs shelter Snow White but don't wake her.",
            "The Huntsman doesn't help in waking Snow White.",
            "The Fairy Godmother is from Cinderella, not Snow White."
        ],
        bgColor: "#9B59B6"
    },
    {
        question: "How does Snow White first meet the Seven Dwarfs?",
        options: ["They rescue her from the Queen", "She finds their cottage", "They find her in the woods", "She meets them in the palace"],
        correctIndex: 1,
        explanation: [
            "Snow White finds the Seven Dwarfs' cottage when she is fleeing the Evil Queen.",
            "The dwarfs don’t directly rescue her but later protect her.",
            "She doesn't meet them in the woods but at their home.",
            "She never meets them in the palace."
        ],
        bgColor: "#3498DB"
    },
    {
        question: "What is the Evil Queen's most famous line?",
        options: ["Mirror, mirror on the wall", "Hocus pocus", "Abracadabra", "I am the fairest of them all"],
        correctIndex: 0,
        explanation: [
            "'Mirror, mirror on the wall' is the Queen's famous line asking the magic mirror to reveal who is the fairest.",
            "Hocus pocus is associated with other fairy tales and not Snow White.",
            "Abracadabra is a magical phrase used in many stories, but not this one.",
            "The Queen says 'I am the fairest,' but the mirror doesn't agree."
        ],
        bgColor: "#E67E22"
    },
    {
        question: "What color is Snow White's dress?",
        options: ["Red", "Blue", "Yellow", "Green"],
        correctIndex: 1,
        explanation: [
            "Snow White's iconic dress is yellow with blue, red, and yellow details.",
            "Red is part of her color scheme but not the primary color.",
            "Yellow is part of her dress, but blue is the dominant color.",
            "Green is not one of the main colors of her dress."
        ],
        bgColor: "#1ABC9C"
    },
    {
        question: "What happens when Snow White eats the poisoned apple?",
        options: ["She falls into a deep sleep", "She turns into a statue", "She dies", "She grows very old"],
        correctIndex: 0,
        explanation: [
            "Snow White falls into a deep sleep after eating the poisoned apple.",
            "She doesn't turn into a statue; she falls into a sleep-like state.",
            "She doesn't die; she’s in a magical sleep.",
            "She doesn’t grow old because of the apple."
        ],
        bgColor: "#2ECC71"
    },
    {
        question: "What is the Evil Queen’s magical tool?",
        options: ["Magic mirror", "Crystal ball", "Wand", "Cursed stone"],
        correctIndex: 0,
        explanation: [
            "The Evil Queen uses a magic mirror to know who is the fairest of them all.",
            "She doesn’t use a crystal ball.",
            "She doesn’t use a wand to cast spells on Snow White.",
            "A cursed stone is not part of the Queen's magical tools."
        ],
        bgColor: "#9B59B6"
    },
    {
        question: "What are the Seven Dwarfs' names?",
        options: ["Happy, Sleepy, Doc, Dopey, Grumpy, Bashful, Sneezy", "Sleepy, Sneezy, Lucky, Doc, Grumpy, Bashful, Smiley", "Doc, Dopey, Sleepy, Happy, Jolly, Bashful, Grumpy", "Sleepy, Doc, Happy, Jolly, Bashful, Sneezy, Grumpy"],
        correctIndex: 0,
        explanation: [
            "The Seven Dwarfs are named: Happy, Sleepy, Doc, Dopey, Grumpy, Bashful, and Sneezy.",
            "Some of these names are incorrect and don't appear in the movie.",
            "The names 'Lucky' and 'Jolly' don’t exist for the dwarfs.",
            "There is no dwarf named 'Jolly,' and some names are wrong here."
        ],
        bgColor: "#F39C12"
    },
    {
        question: "Who warns Snow White about the poisoned apple?",
        options: ["The Huntsman", "The Seven Dwarfs", "The Prince", "The Magic Mirror"],
        correctIndex: 1,
        explanation: [
            "The Seven Dwarfs warn Snow White about the poisoned apple after she eats it.",
            "The Huntsman doesn’t warn her after the apple incident.",
            "The Prince is not aware of the poisoned apple until much later.",
            "The Magic Mirror does not warn her; it only reflects truth."
        ],
        bgColor: "#E67E22"
    },
    {
        question: "How does the Evil Queen die?",
        options: ["She falls off a cliff", "She is crushed by a falling tree", "She dies from the poison", "She is crushed by a boulder"],
        correctIndex: 0,
        explanation: [
            "The Evil Queen falls off a cliff after being chased by the dwarfs.",
            "She doesn't die from poison.",
            "She isn't crushed by a falling tree or boulder."
        ],
        bgColor: "#34495E"
    },
    {
        question: "What kind of animal is often associated with Snow White?",
        options: ["Birds", "Deer", "Rats", "Bunnies"],
        correctIndex: 0,
        explanation: [
            "Birds are often seen helping Snow White in the forest.",
            "Deer are in the forest but don’t play a major role with Snow White.",
            "Rats are not featured in Snow White's story.",
            "Bunnies do not have a major role in Snow White."
        ],
        bgColor: "#8E44AD"
    },
    {
        question: "Who is Snow White's true love?",
        options: ["Prince Charming", "The Huntsman", "Prince Florian", "The Prince"],
        correctIndex: 3,
        explanation: [
            "Snow White's true love is the Prince, also known as Prince Florian.",
            "Prince Charming is from Cinderella, not Snow White.",
            "The Huntsman does not end up with Snow White.",
            "The Prince kisses Snow White to wake her from the spell."
        ],
        bgColor: "#2ECC71"
    },
    // Add more questions up to 30...
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
    new URL('../../../public/music/snowWhiteTheme.mp3', import.meta.url).href,
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

                                <img v-if="questionStates[idx].answeredCorrectly" src="/public/img/dwarf.png"
                                    class="absolute left-10 md:left-50 top-[-5%] h-[100px] w-[100px] rotate-y-[180deg]" />
                                <img v-if="!questionStates[idx].answeredCorrectly" src="/public/img/dwarf.png"
                                    class="absolute right-10 md:right-50 top-[-5%] h-[100px] w-[100px]" />

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
