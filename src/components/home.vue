<!-- border-[red] border-solid border -->

<template>
    <div class=" absolute top-0 right-0 items-center justify-center  w-screen bg-[#20242A] text-white flex flex-row justify-start">
        <div class="text-white  hidden lg:flex flex-col b-rotate-90 w-[20%] my-auto p-8 gap-16 justify-around justify-around">
            <h2 class="text-4xl font-semibold opacity-[0.7] text-left">Superheroes</h2>
            <h2 class="text-4xl font-semibold opacity-[0.7] text-left">Princesses</h2>
            <h2 class="text-4xl font-semibold opacity-[0.7] text-left">Cartoon</h2>
        </div>
        <div class="text-white mx-auto py-16 flex flex-row gap-[20px] w-[70%] justify-around justify-start">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">

                <div @click="navigateToDc"
                    class="bg-[#E36A39] flex flex-row relative rounded-md w-[80vw] md:w-[30vw] justify-between cursor-pointer p-4">
                    <img src="./../../public/img/superman.png"
                        class="h-[250px] w-[250px] absolute bottom-0 left-[-20%]" />
                    <div class="h-[100px] w-[100px]"></div>
                    <div class="w-[30vw] md:w-[15vw] justify-end">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center"><font-awesome-icon
                                icon="fa-solid fa-bookmark" style="color: #edeff2;" /></div>
                        <img src="./../../public/img/superman.png" class="h-[100px] w-[100px]" />
                        <h3 class="text-left">Detective Comics</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star-half-stroke" />
                            <h3>4.5</h3>
                        </div>
                        <h3 class="text-left">Play Now!</h3>
                    </div>
                </div>

                <div @click="navigateToInvin"
                    class="bg-[#9e9e9e] flex flex-row relative rounded-md w-[80vw] md:w-[30vw] justify-between cursor-pointer p-8">
                    <img src="./../../public/img/omniman.png"
                        class="h-[250px] w-[250px] absolute bottom-0 left-[-20%]" />
                    <div class="h-[100px] w-[100px]"></div>
                    <div class="w-[30vw] md:w-[15vw] justify-end">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center"><font-awesome-icon
                                icon="fa-solid fa-bookmark" style="color: #edeff2;" /></div>
                        <img src="./../../public/img/omniman.png" class="h-[100px] w-[100px]" />
                        <h3 class="text-left">Invincible</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star-half-stroke" />
                            <h3>4.5</h3>
                        </div>
                        <h3 class="text-left">Play Now!</h3>
                    </div>
                </div>

                <div @click="navigateToMarvel"
                    class="bg-[#4D7895] flex flex-row relative rounded-md w-[80vw] md:w-[30vw] justify-between cursor-pointer p-8">
                    <img src="./../../public/img/spiderman.png"
                        class="h-[250px] w-[250px] absolute bottom-0 left-[-20%]" />
                    <div class="h-[100px] w-[100px]"></div>
                    <div class="w-[30vw] md:w-[15vw] justify-end">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center"><font-awesome-icon
                                icon="fa-solid fa-bookmark" style="color: #edeff2;" /></div>
                        <img src="./../../public/img/spiderman.png" class="h-[100px] w-[100px]" />
                        <h3 class="text-left">Marvel Studios</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <h3>4.5</h3>
                        </div>
                        <h3 class="text-left">Play Now!</h3>
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
    navigateToDc() {
      console.log("Navigating to /dc");
      this.$router.push('/dc');
    },
    navigateToInvin() {
      console.log("Navigating to /invincible");
      this.$router.push('/invincible');
    },
    navigateToMarvel() {
      console.log("Navigating to /marvel");
      this.$router.push('/marvel');
    },
  },
};
</script>
