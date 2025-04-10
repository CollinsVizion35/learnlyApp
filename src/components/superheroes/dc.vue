<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

const quizTitle = ref('Swipe Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
    {
        question: "What is the real name of Batman?",
        options: ["Clark Kent", "Bruce Wayne"],
        correctIndex: 1,
        explanation: "Batman's secret identity is Bruce Wayne, a billionaire who witnessed his parents' murder as a child, inspiring his crusade against crime. Clark Kent is Superman's alter ego.",
        bgColor: "#4D96FF" // Blue
    },
    {
        question: "Which superhero is called the 'Man of Steel'?",
        options: ["Superman", "The Flash"],
        correctIndex: 0,
        explanation: "Superman is nicknamed the 'Man of Steel' due to his invulnerability and Kryptonian biology, which grants him superhuman strength under Earth's yellow sun.",
        bgColor: "#8E44AD" // Purple
    },
    {
        question: "What is Wonder Woman's signature weapon?",
        options: ["Lasso of Truth", "Magic Hammer"],
        correctIndex: 0,
        explanation: "The Lasso of Truth compels anyone bound by it to speak honestly. (Magic Hammer is associated with Thor from Marvel, not DC.)",
        bgColor: "#2ECC71" // Green
    },
    {
        question: "Who is the fastest DC superhero?",
        options: ["Green Arrow", "The Flash"],
        correctIndex: 1,
        explanation: "The Flash (Barry Allen or Wally West) taps into the Speed Force, making him capable of moving at light speed and even breaking time barriers.",
        bgColor: "#E67E22" // Orange
    },
    {
        question: "What is my name?",
        options: ["Alfred Pennyworth", "James Gordon"],
        correctIndex: 0,
        explanation: "I am Alfred Pennyworth and I serve as Bruce Wayne's loyal butler, surrogate father, and occasional field medic. James Gordon is Gotham City's police commissioner.",
        bgColor: "#E74C3C" // Red
    },
    {
        question: "Which villain is known as the 'Clown Prince of Crime'?",
        options: ["The Joker", "Bane"],
        correctIndex: 0,
        explanation: "The Joker is Batman's arch-nemesis, a psychopathic criminal with a clown motif and a twisted sense of humor. Bane is a physical powerhouse who broke Batman's back.",
        bgColor: "#3498DB" // Light Blue
    },
    {
        question: "What planet is Superman originally from?",
        options: ["Mars", "Krypton"],
        correctIndex: 1,
        explanation: "Superman (Kal-El) was born on Krypton, which was destroyed. His parents sent him to Earth, where he gained powers under our yellow sun.",
        bgColor: "#1ABC9C" // Turquoise
    },
    {
        question: "Which hero is nicknamed the 'Dark Knight'?",
        options: ["Batman", "Nightwing"],
        correctIndex: 0,
        explanation: "Batman is called the 'Dark Knight' for his brooding vigilante persona. Nightwing is Dick Grayson (the first Robin) after he outgrew being Batman's sidekick.",
        bgColor: "#9B59B6" // Dark Purple
    },
    {
        question: "What powers Green Lantern's abilities?",
        options: ["Power Ring", "Infinity Gauntlet"],
        correctIndex: 0,
        explanation: "Green Lanterns wield Power Rings that channel willpower to create hard-light constructs. (The Infinity Gauntlet is a Marvel artifact.)",
        bgColor: "#F1C40F" // Yellow
    },
    {
        question: "Who is Batman's iconic teenage sidekick?",
        options: ["Robin", "Kid Flash"],
        correctIndex: 0,
        explanation: "Robin (Dick Grayson, Jason Todd, Tim Drake, or Damian Wayne) is Batman's crime-fighting partner. Kid Flash is The Flash's sidekick.",
        bgColor: "#34495E" // Gray Blue
    }, {
        question: "What is Aquaman's Atlantean name?",
        options: ["Arthur Curry", "Orin"],
        correctIndex: 1,
        explanation: "Aquaman's birth name in Atlantis is Orin, but he is raised on land as Arthur Curry.",
        bgColor: "#16A085"
    },
    {
        question: "Which DC hero is known for wielding a bow and arrow?",
        options: ["Green Arrow", "Cyborg"],
        correctIndex: 0,
        explanation: "Green Arrow, aka Oliver Queen, is a vigilante archer inspired by Robin Hood.",
        bgColor: "#27AE60"
    },
    {
        question: "What is the source of Shazam's powers?",
        options: ["Greek gods", "Alien technology"],
        correctIndex: 0,
        explanation: "Shazam's powers come from ancient gods: Solomon, Hercules, Atlas, Zeus, Achilles, and Mercury.",
        bgColor: "#D35400"
    },
    {
        question: "Which villain broke Batman's back?",
        options: ["Bane", "Joker"],
        correctIndex: 0,
        explanation: "Bane broke Batman's back in the iconic 'Knightfall' storyline.",
        bgColor: "#C0392B"
    },
    {
        question: "What is the name of the speed force user from the future?",
        options: ["Reverse-Flash", "Black Adam"],
        correctIndex: 0,
        explanation: "Reverse-Flash (Eobard Thawne) is a time-traveling villain obsessed with ruining The Flash’s life.",
        bgColor: "#F39C12"
    },
    {
        question: "Who leads the Suicide Squad?",
        options: ["Amanda Waller", "Harley Quinn"],
        correctIndex: 0,
        explanation: "Amanda Waller oversees the Suicide Squad, using villains for covert missions.",
        bgColor: "#7F8C8D"
    },
    {
        question: "Which hero is Victor Stone better known as?",
        options: ["Cyborg", "Red Tornado"],
        correctIndex: 0,
        explanation: "Victor Stone becomes Cyborg after a lab accident, merging with advanced technology.",
        bgColor: "#2980B9"
    },
    {
        question: "What is the name of Batman's city?",
        options: ["Gotham", "Metropolis"],
        correctIndex: 0,
        explanation: "Gotham City is the dark, crime-ridden city that Batman protects.",
        bgColor: "#2C3E50"
    },
    {
        question: "Who is the Amazon Queen and Wonder Woman's mother?",
        options: ["Hippolyta", "Artemis"],
        correctIndex: 0,
        explanation: "Queen Hippolyta rules Themyscira and is Wonder Woman's mother.",
        bgColor: "#AF7AC5"
    },
    {
        question: "Which Lantern Corps uses fear as a power source?",
        options: ["Yellow Lanterns", "Red Lanterns"],
        correctIndex: 0,
        explanation: "The Yellow Lantern Corps (Sinestro Corps) uses fear to fuel their power.",
        bgColor: "#F4D03F"
    },
    {
        question: "What metal is used in Wonder Woman’s bracelets?",
        options: ["Amazonium", "Vibranium"],
        correctIndex: 0,
        explanation: "Wonder Woman's indestructible bracelets are made of Amazonium (fictional DC metal).",
        bgColor: "#D0BFFF"
    },
    {
        question: "Who founded the Justice League?",
        options: ["Martian Manhunter", "Superman"],
        correctIndex: 0,
        explanation: "Martian Manhunter was one of the founding members of the original Justice League lineup.",
        bgColor: "#6C5CE7"
    },
    {
        question: "Which Flash is known as the 'Fastest Man Alive'?",
        options: ["Barry Allen", "Jay Garrick"],
        correctIndex: 0,
        explanation: "Barry Allen is the most widely recognized Flash and often called the 'Fastest Man Alive.'",
        bgColor: "#F9A825"
    },
    {
        question: "What’s the name of Superman’s dog?",
        options: ["Krypto", "Ace"],
        correctIndex: 0,
        explanation: "Krypto the Superdog is Superman’s loyal Kryptonian pet with similar powers.",
        bgColor: "#AED6F1"
    },
    {
        question: "Which DC character was a psychiatrist before turning villain?",
        options: ["Harley Quinn", "Poison Ivy"],
        correctIndex: 0,
        explanation: "Dr. Harleen Quinzel was a psychiatrist who fell in love with the Joker and became Harley Quinn.",
        bgColor: "#F06292"
    },
    {
        question: "Who is the ruler of Apokolips?",
        options: ["Darkseid", "Brainiac"],
        correctIndex: 0,
        explanation: "Darkseid is a powerful tyrant from Apokolips, seeking to conquer all life with the Anti-Life Equation.",
        bgColor: "#5D6D7E"
    },
    {
        question: "What is Zatanna known for?",
        options: ["Magic spells", "Sword fighting"],
        correctIndex: 0,
        explanation: "Zatanna is a magician who casts spells by speaking backwards.",
        bgColor: "#BB8FCE"
    },
    {
        question: "Which villain is obsessed with riddles?",
        options: ["Riddler", "Penguin"],
        correctIndex: 0,
        explanation: "The Riddler is known for leaving cryptic clues and riddles at crime scenes.",
        bgColor: "#27AE60"
    },
    {
        question: "What does Lex Luthor often use to weaken Superman?",
        options: ["Kryptonite", "Lead"],
        correctIndex: 0,
        explanation: "Kryptonite, a radioactive fragment of Superman’s home planet, weakens and can kill him.",
        bgColor: "#52BE80"
    },
    {
        question: "What does the Bat-Signal represent?",
        options: ["Call for Batman", "City blackout"],
        correctIndex: 0,
        explanation: "The Bat-Signal is projected into the sky to summon Batman during emergencies.",
        bgColor: "#616A6B"
    },
    {
        question: "What is the real name of The Flash (most known version)?",
        options: ["Barry Allen", "Wally West"],
        correctIndex: 0,
        explanation: "Barry Allen is the most well-known incarnation of The Flash, a forensic scientist turned speedster.",
        bgColor: "#FF5733"
    },
    {
        question: "Which Justice League member is from Mars?",
        options: ["Martian Manhunter", "Hawkman"],
        correctIndex: 0,
        explanation: "Martian Manhunter (J'onn J'onzz) is a shapeshifting telepath from Mars and a founding Justice League member.",
        bgColor: "#229954"
    },
    {
        question: "What is the name of Batman's computer system?",
        options: ["Batcomputer", "Oracle"],
        correctIndex: 0,
        explanation: "The Batcomputer is Batman’s highly advanced computer system located in the Batcave.",
        bgColor: "#1F618D"
    },
    {
        question: "Which DC villain uses cold-based weapons?",
        options: ["Captain Cold", "Heat Wave"],
        correctIndex: 0,
        explanation: "Captain Cold, a Flash villain, wields a cold gun that can freeze anything instantly.",
        bgColor: "#85C1E9"
    },
    {
        question: "Who becomes Red Hood after dying and being resurrected?",
        options: ["Jason Todd", "Tim Drake"],
        correctIndex: 0,
        explanation: "Jason Todd, the second Robin, returns as the anti-hero Red Hood after being killed by the Joker.",
        bgColor: "#C0392B"
    },
    {
        question: "What is Superman’s Earth father's name?",
        options: ["Jonathan Kent", "Thomas Wayne"],
        correctIndex: 0,
        explanation: "Jonathan Kent, along with his wife Martha, raised Superman as Clark Kent in Smallville.",
        bgColor: "#F7DC6F"
    },
    {
        question: "Which member of the Bat-family uses a bo staff?",
        options: ["Tim Drake", "Damian Wayne"],
        correctIndex: 0,
        explanation: "Tim Drake, the third Robin, is known for his intelligence and skilled use of the bo staff.",
        bgColor: "#2E86C1"
    },
    {
        question: "Who is the magical antihero with a trench coat and British accent?",
        options: ["John Constantine", "Doctor Fate"],
        correctIndex: 0,
        explanation: "John Constantine is a cunning sorcerer and occult detective, often battling dark forces.",
        bgColor: "#7DCEA0"
    },
    {
        question: "What is the name of Batman’s crime-fighting vehicle?",
        options: ["Batmobile", "Wayne Cruiser"],
        correctIndex: 0,
        explanation: "The Batmobile is Batman’s custom-built vehicle packed with technology and weaponry.",
        bgColor: "#1C2833"
    },
    {
        question: "Who is known as the God of War in Wonder Woman's stories?",
        options: ["Ares", "Hades"],
        correctIndex: 0,
        explanation: "Ares, the Greek God of War, is often depicted as Wonder Woman’s archenemy.",
        bgColor: "#9B59B6"
    },
    {
        question: "Which superhero team does Starfire belong to?",
        options: ["Teen Titans", "Justice League"],
        correctIndex: 0,
        explanation: "Starfire is a powerful alien princess and a member of the Teen Titans.",
        bgColor: "#E59866"
    },
    {
        question: "What species is Beast Boy able to transform into?",
        options: ["Any animal", "Robots"],
        correctIndex: 0,
        explanation: "Beast Boy can shapeshift into any animal, past or present, gaining its abilities.",
        bgColor: "#27AE60"
    },
    {
        question: "Who is the primary antagonist in the 'Flashpoint' storyline?",
        options: ["Reverse-Flash", "Darkseid"],
        correctIndex: 0,
        explanation: "Reverse-Flash manipulates time and causes the alternate reality events of 'Flashpoint.'",
        bgColor: "#E74C3C"
    },
    {
        question: "What is Raven's source of power?",
        options: ["Dark magic and emotions", "Technology"],
        correctIndex: 0,
        explanation: "Raven draws power from dark magic and emotional control, being the daughter of the demon Trigon.",
        bgColor: "#5B2C6F"
    },
    {
        question: "What does Booster Gold use to time travel?",
        options: ["Time Sphere", "Boom Tube"],
        correctIndex: 0,
        explanation: "Booster Gold uses a Time Sphere, a device that lets him move across timelines.",
        bgColor: "#F8C471"
    },
    {
        question: "Which superhero is known for his green hoodie?",
        options: ["Green Arrow", "Green Lantern"],
        correctIndex: 0,
        explanation: "Green Arrow wears a hood and shoots arrows, often in a green outfit inspired by Robin Hood.",
        bgColor: "#239B56"
    },
    {
        question: "Which DC character is a powerful telepath and telekinetic?",
        options: ["Martian Manhunter", "Blue Beetle"],
        correctIndex: 0,
        explanation: "Martian Manhunter has strong telepathic and telekinetic abilities, along with shapeshifting.",
        bgColor: "#48C9B0"
    },
    {
        question: "What alien race are the Green Lantern Corps associated with?",
        options: ["Guardians of the Universe", "Kryptonians"],
        correctIndex: 0,
        explanation: "The Guardians of the Universe, ancient aliens from Oa, founded and oversee the Green Lantern Corps.",
        bgColor: "#1ABC9C"
    },
    {
        question: "Which DC hero has an alter ego named Billy Batson?",
        options: ["Shazam", "Atom"],
        correctIndex: 0,
        explanation: "Billy Batson transforms into the adult superhero Shazam by saying the magic word 'Shazam!'",
        bgColor: "#F4D03F"
    },
    {
        question: "What is the name of the prison that holds DC’s worst villains?",
        options: ["Arkham Asylum", "Belle Reve"],
        correctIndex: 0,
        explanation: "Arkham Asylum is the psychiatric hospital where Gotham's most dangerous villains are confined.",
        bgColor: "#566573"
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

// Swiping management ====================================================================================
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

    // Reset swiping
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

    // Reset 
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

    // Reset
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
    new URL('../../../public/music/DCTheme.mp3', import.meta.url).href,
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

                                <img v-if="questionStates[idx].answeredCorrectly" src="/public/img/alfred1.png"
                                    class="absolute left-10 md:left-50 top-0 h-[100px] w-[100px] rotate-y-[180deg]" />
                                <img v-if="!questionStates[idx].answeredCorrectly" src="/public/img/alfred2.png"
                                    class="absolute right-10 md:right-50 top-0 h-[100px] w-[100px]" />


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
