<template>
  <div class="app-aside">
    <img class="img app-aside__img" src="@/assets/img/app-aside__img.jpg" alt="">
    <Skeletor class="app-aside__title" width="100%" height="40"/> 
    <Skeletor class="app-aside__text" width="90%" height="10"/> 
    <Skeletor class="app-aside__text" width="100%" height="10"/> 
    <Skeletor class="app-aside__text" width="95%" height="10"/> 
    <Skeletor class="app-aside__text" width="90%" height="10"/> 
    <Skeletor class="app-aside__text" width="85%" height="10"/> 
    <Skeletor class="app-aside__text" width="50%" height="10"/> 
  </div>
</template>

<script>
import { Skeletor } from 'vue-skeletor';
export default {
  components: {
    Skeletor,
  }
}
</script>

<style lang="scss">
  .app-aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: var(--default-border);
    border-radius: var(--border-radius);
    padding: 1.8rem 1.4rem 2.4rem;

    background-color: var(--color-black);

    text-align: center;

    &__img {
      margin-bottom: 2rem;
    }

    &__title {
      margin-bottom: 2.4rem;
    }

    &__text:not(:last-child) {
      margin-bottom: 1.6rem;
    }
  }
</style>