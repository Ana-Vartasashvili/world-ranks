<template>
  <div>
    <div class="relative">
      <img src="../../assets/images/heroImage.jpg" alt="earth" class="w-full h-72 object-cover" />
      <img
        src="../../assets/icons/wrLogo.svg"
        alt="world ranks logo"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>

    <slot />
  </div>
</template>
