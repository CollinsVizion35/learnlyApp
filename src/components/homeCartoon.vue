<!-- -->

<template>
    <div
        class=" absolute top-0 right-0 items-center  h-screen  w-screen bg-[#20242A] text-white flex flex-row justify-start">
        <div
            class="absolute top-70 left-[-18vw] z-[9999] text-white flex flex-row items-center rotate-90 w-[50%] md:my-auto md:p-8 gap-16 md:justify-around">
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
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical">Cartoon</h2>
            </div>
        </div>
        <div
            class="text-white mx-auto z-[999] pt-2 pb-2 flex flex-col gap-[20px] h-screen w-[80%] justify-around justify-start">
            <div class="flex items-center justify-center flex-row">
                <div class="logo text-4xl animate-pulse text-[#4D96FF]">Learnly </div>
                <div class="logo text-4xl animate-pulse text-[#FFD93D]">App </div>
            </div>
            <div class="font-bold opacity-[0.7]">Cartoons</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 ml-[5vw]">

                <div @click="navigateToAvatar"
                    class="bg-[#9E3629] animate-pulse flex flex-row relative rounded-md w-[80vw] justify-end md:w-[30vw] justify-between cursor-pointer p-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                    <img src="/img/aang.png" class="h-[200px] w-[200px] absolute bottom-0 left-[-15%] z-[99]" />
                    <div class="w-[40vw] ml-32 md:w-[15vw] z-[999]">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center">
                            <font-awesome-icon icon="fa-solid fa-bookmark" style="color: #edeff2;" />
                        </div>
                        <img src="/img/avatarLogo.png" class="h-[50px] w-[100px] mt-2 mb-6" />
                        <h3 class="text-left w-full">Avatar</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star-half-stroke" />
                            <h3 class="ml-2">4.5</h3>
                        </div>
                        <h3 class="text-left w-full">Play Now!</h3>
                    </div>
                </div>

                <div @click="navigateToBen10"
                    class="bg-[#567744] animate-pulse flex flex-row relative rounded-md w-[80vw] justify-end md:w-[30vw] justify-between cursor-pointer p-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                    <img src="/img/Ben10.png" class="h-[200px] w-[200px] absolute bottom-0 left-[-15%] z-[99]" />
                    <div class="w-[40vw] ml-32 md:w-[15vw] z-[999]">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center">
                            <font-awesome-icon icon="fa-solid fa-bookmark" style="color: #edeff2;" />
                        </div>
                        <img src="/img/Ben10Logo.png" class="h-[50px] w-[100px] mt-2 mb-6" />
                        <h3 class="text-left w-full">Ben 10</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star-half-stroke" />
                            <h3 class="ml-2">4.5</h3>
                        </div>
                        <h3 class="text-left w-full">Play Now!</h3>
                    </div>
                </div>

                <div @click="navigateToArcane"
                    class="bg-[#261321] animate-pulse flex flex-row relative rounded-md w-[80vw] justify-end md:w-[30vw] justify-between cursor-pointer p-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                    <img src="/img/jinx.png" class="h-[200px] w-[200px] absolute bottom-0 left-[-15%] z-[99]" />
                    <div class="w-[40vw] ml-32 md:w-[15vw] z-[999]">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center">
                            <font-awesome-icon icon="fa-solid fa-bookmark" style="color: #edeff2;" />
                        </div>
                        <img src="/img/ArcaneLogo.png" class="h-[50px] w-[100px] mt-2 mb-6" />
                        <h3 class="text-left w-full">Arcane</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <h3 class="ml-2">5.0</h3>
                        </div>
                        <h3 class="text-left w-full">Play Now!</h3>
                    </div>
                </div>


            </div>
        </div>
        <!-- <h1 class="text-4xl font-semibold">🏡 Home Page</h1> -->
    </div>
</template>


<script>
export default {
    methods: {
        navigateToAvatar() {
            console.log("Navigating to /avatar");
            this.$router.push('/avatar');
        },
        navigateToBen10() {
            console.log("Navigating to /ben10");
            this.$router.push('/ben10');
        },
        navigateToArcane() {
            console.log("Navigating to /arcane");
            this.$router.push('/arcane');
        },
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
