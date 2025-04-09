<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

const quizTitle = ref('Carousel Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
    {
        question: "What is the name of Aladdin's monkey?",
        options: ["Abu", "Jafar", "Genie", "Sultan"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "Abu is Aladdin’s loyal pet monkey.",
            "Jafar is the villain in the story, not Aladdin's pet.",
            "The Genie is Aladdin's magical friend, not his monkey.",
            "Sultan is the ruler of Agrabah, not Aladdin’s monkey."
        ],
        bgColor: "#F39C12"
    },
    {
        question: "Who is Aladdin's love interest?",
        options: ["Jasmine", "Ariel", "Belle", "Cinderella"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "Jasmine is Aladdin’s princess and love interest.",
            "Ariel is the mermaid from The Little Mermaid.",
            "Belle is the princess from Beauty and the Beast.",
            "Cinderella is from her own story, not Aladdin’s."
        ],
        bgColor: "#9B59B6"
    },
    {
        question: "What is the magic word to release the Genie from the lamp?",
        options: ["Please", "Open Sesame", "Genie, you're free", "I wish"],
        correctIndex: 3,
        category: "Aladdin",
        explanation: [
            "Please isn't the magic word to release the Genie.",
            "Open Sesame is the phrase for entering the cave of wonders.",
            "Genie, you're free is not the magic phrase.",
            "The magic words are 'I wish' to make wishes come true."
        ],
        bgColor: "#E67E22"
    },
    {
        question: "What is the name of the city where Aladdin lives?",
        options: ["Agrabah", "Atlantis", "Paris", "Cairo"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "Agrabah is the fictional city where Aladdin lives.",
            "Atlantis is a mythical city, unrelated to Aladdin.",
            "Paris is from The Hunchback of Notre-Dame, not Aladdin.",
            "Cairo is a real city, but not the setting for Aladdin."
        ],
        bgColor: "#2980B9"
    },
    {
        question: "What is the name of Aladdin's pet tiger?",
        options: ["Rajah", "Simba", "Shere Khan", "Timon"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "Rajah is Princess Jasmine’s pet tiger, who is loyal to her.",
            "Simba is the lion from The Lion King.",
            "Shere Khan is the tiger from The Jungle Book.",
            "Timon is a meerkat from The Lion King."
        ],
        bgColor: "#C0392B"
    },
    {
        question: "Who is the main antagonist in Aladdin?",
        options: ["Jafar", "Scar", "Maleficent", "Ursula"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "Jafar is the villain in Aladdin.",
            "Scar is the villain from The Lion King.",
            "Maleficent is the villain from Sleeping Beauty.",
            "Ursula is the villain from The Little Mermaid."
        ],
        bgColor: "#1ABC9C"
    },
    {
        question: "What is the name of Aladdin's magic carpet?",
        options: ["Magic Carpet", "Flying Carpet", "Wonder Carpet", "Carpet"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "The magic carpet is simply called 'Magic Carpet'.",
            "Flying Carpet is a general term but not the name.",
            "Wonder Carpet is not the name of the magic carpet.",
            "Carpet is too general of a name."
        ],
        bgColor: "#3498DB"
    },
    {
        question: "What is the magical ability of the Genie?",
        options: ["Shape-shifting", "Flying", "Granting wishes", "Invisibility"],
        correctIndex: 2,
        category: "Aladdin",
        explanation: [
            "Shape-shifting is one of the Genie's abilities, but granting wishes is his main power.",
            "Flying is something Aladdin and the magic carpet do.",
            "The Genie grants wishes to whoever rubs his lamp.",
            "Invisibility is not one of the Genie's powers."
        ],
        bgColor: "#8E44AD"
    },
    {
        question: "How does Aladdin first meet Princess Jasmine?",
        options: ["At the palace", "On the streets", "At the market", "In the cave"],
        correctIndex: 1,
        category: "Aladdin",
        explanation: [
            "Aladdin first meets Jasmine when she is disguised as a commoner in the streets.",
            "The palace is where they have a later encounter.",
            "The market is where Aladdin initially sees Jasmine, but they meet on the street.",
            "The cave is where Aladdin finds the magic lamp, not where he meets Jasmine."
        ],
        bgColor: "#34495E"
    },
    {
        question: "What animal does Jafar transform into?",
        options: ["Snake", "Eagle", "Lion", "Tiger"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "Jafar transforms into a snake during the climax of the movie.",
            "Jafar doesn't turn into an eagle.",
            "He doesn't turn into a lion or a tiger in the film."
        ],
        bgColor: "#2ECC71"
    },
    {
        question: "Who is Aladdin's best friend?",
        options: ["The Genie", "Abu", "Jasmine", "The Sultan"],
        correctIndex: 1,
        category: "Aladdin",
        explanation: [
            "The Genie is a close friend but not Aladdin’s best friend.",
            "Abu, the monkey, is Aladdin’s best and most loyal companion.",
            "Jasmine is Aladdin’s love interest, not his best friend.",
            "The Sultan is the ruler of Agrabah, not Aladdin's best friend."
        ],
        bgColor: "#9B59B6"
    },
    {
        question: "What does the Genie offer to Aladdin at the beginning?",
        options: ["Three wishes", "A flying carpet", "A golden crown", "A magical sword"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "The Genie offers Aladdin three wishes when released from the lamp.",
            "The flying carpet is another magical gift, but not the first offer.",
            "A golden crown does not appear in the movie.",
            "The magical sword is not given to Aladdin by the Genie."
        ],
        bgColor: "#E67E22"
    },
    {
        question: "Who does Jafar use to help him take control of Agrabah?",
        options: ["Abu", "The Sultan", "Aladdin", "Iago"],
        correctIndex: 3,
        category: "Aladdin",
        explanation: [
            "Abu is Aladdin's monkey, not Jafar’s ally.",
            "The Sultan is a ruler, not a tool for Jafar's schemes.",
            "Aladdin is the hero, not the villain working for Jafar.",
            "Iago is Jafar's parrot, who assists him in his evil plots."
        ],
        bgColor: "#8E44AD"
    },
    {
        question: "What does Aladdin wish for to become a prince?",
        options: ["A palace", "A magic carpet", "A crown", "A royal attire"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "Aladdin wishes for a grand palace to impress Jasmine and appear as a prince.",
            "The magic carpet is not what makes him a prince.",
            "A crown is not what Aladdin wishes for to appear royal.",
            "Royal attire is part of his transformation but not the wish."
        ],
        bgColor: "#2980B9"
    },
    {
        question: "Who warns Aladdin about the Cave of Wonders?",
        options: ["Jasmine", "The Genie", "The Sultan", "A merchant"],
        correctIndex: 1,
        category: "Aladdin",
        explanation: [
            "The Genie gives Aladdin advice about the Cave of Wonders.",
            "Jasmine doesn't warn Aladdin about the cave.",
            "The Sultan doesn't know about the cave.",
            "A merchant doesn't play a role in the Cave of Wonders warning."
        ],
        bgColor: "#2ECC71"
    },
    {
        question: "What does Aladdin use to impress Princess Jasmine?",
        options: ["A flying carpet", "His charm", "A magic mirror", "A parade"],
        correctIndex: 0,
        category: "Aladdin",
        explanation: [
            "Aladdin impresses Jasmine by taking her on a magic carpet ride.",
            "His charm alone is not enough to impress her.",
            "A magic mirror is not used in the film.",
            "A parade does not play a part in impressing Jasmine."
        ],
        bgColor: "#1ABC9C"
    },
    {
        question: "What does Jafar disguise himself as to trick Jasmine?",
        options: ["An old woman", "A prince", "A sorcerer", "A royal advisor"],
        correctIndex: 2,
        category: "Aladdin",
        explanation: [
            "Jafar disguises himself as a sorcerer to deceive everyone.",
            "He doesn't disguise himself as an old woman.",
            "He doesn't pretend to be a prince; he uses his powers for deception.",
            "While Jafar is a royal advisor, he doesn't use this disguise for trickery."
        ],
        bgColor: "#F39C12"
    },
    {
        question: "What is the final wish that Aladdin makes?",
        options: ["For wealth", "For the Genie to be free", "To become a prince", "For Jasmine’s love"],
        correctIndex: 1,
        category: "Aladdin",
        explanation: [
            "Aladdin wishes for the Genie to be free, fulfilling his promise to his friend.",
            "Aladdin doesn’t wish for wealth; he already has it.",
            "He doesn't wish to remain a prince but uses his third wish for the Genie’s freedom.",
            "Jasmine’s love is not a wish granted by the Genie."
        ],
        bgColor: "#9B59B6"
    },
    // Add more questions up to 30...
]);




// sound effects ==========================================================================

// on swipe===================================================
const swipeSound = ref(null)
const swipeSoundFile = '../../../public/music/swipeAudio.mp3'

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
const clickSoundFile = '../../../public/music/clickAudio2.mp3'

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



// play music =========================================================================

const playlist = [
    new URL('../../../public/music/aladdinTheme.mp3', import.meta.url).href,
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
        // Handle autoplay restriction (e.g., show play button)
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

            <Transition name="fade">
                <div v-if="showCongratsModal"
                    class="fixed inset-0 bg-inherit bg-opacity-50 flex items-center justify-center z-[99999]"
                    @click.self="closeModal">
                    <div class="bg-[#20232A] p-8 rounded-lg max-w-md w-full mx-4 shadow-xl">
                        <h2 class="text-2xl font-bold mb-4 text-center">🎉 Congratulations! 🎉
                        </h2>
                        <p class="mb-6 text-center">You've successfully completed the quiz!</p>
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
