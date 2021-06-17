<template>
  <header class="header">
    <h1>
      Мои контакты <i class="fas fa-address-book"></i>
    </h1>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="sass" scoped>
@import "src/assets/sass/variables"
.header
  color: $main-green
  width: 100%
  padding: 15px
  display: flex
  align-items: center
  justify-content: center
  box-shadow: 0px 13px 28px 2px rgba($main-green, 0.2)

</style>