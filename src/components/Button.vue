<template>
  <button
    @click="$emit('buttonClick')"
    :class="{'danger' : type === 'danger', 'navigate': type === 'navigate'}"
    class="button">
    <i class="fa fa-arrow-left" aria-hidden="true" v-if="type === 'navigate'"></i>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props:{
    text:{
      required: true,
      type: String
    },
    type: {
      type: String,
      default: 'default'
    }
  },
}
</script>

<style scoped lang="sass">
@import "src/assets/sass/variables"
.button
  color: $main-green
  width: max-content
  padding: 15px
  background: none
  border: 1px solid $border-green
  border-radius: 5px
  font-size: 18px
  cursor: pointer
  transition: background-color .3s ease-in
  &:hover
    background: $light-green
.danger
  color: $danger-red
  border: 1px solid $danger-red
  &:hover
    background: darken($danger-red, 2)
    color: white
.navigate
  border: none
  transition: color .3s linear
  &:hover
    background: none
    color: $light-green
</style>