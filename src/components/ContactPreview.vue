<template>
  <router-link
    :to="`contact/${contact.id}`"
    class="contact-item">
    <div
      class="contact-item__profile">
      <i class="fas fa-user"></i>
    </div>
    <div class="contact-item__info">
      <h2
        class="contact-item__name"
        v-if="contact.name">{{ contact.name}}</h2>
      <div
        class="contact-item__number"
        v-if="contact.number">{{ contact.number }}</div>
      <div
        class="contact-item__email"
        v-if="contact.email">{{ contact.email }}</div>
    </div>
    <button @click.prevent="$emit('deleteContact')" class="contact-item__delete">
      <i class="far fa-trash-alt"></i>
    </button>
  </router-link>
</template>

<script>
import ConfirmPopup from "./ConfirmPopup";
export default {
  name: "ContactPreview",
  components: {
    ConfirmPopup
  },
  props: {
    contact: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
@import "src/assets/sass/variables"
.contact-item
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between
  box-shadow: 0px 0px 10px 5px rgba($main-green, 0.2)
  padding: 15px
  margin-bottom: 20px
  &__info
    display: flex
    flex-wrap: wrap
    align-items: flex-end
    width: 100%
    padding: 0 10px
  &__name
    width: 33%
  &__email
    width: 33%
  &__number
    width: 33%
  &__delete
    width: 5%
    border: none
    background: none
    cursor: pointer
    font-size: 20px
    transition: color .3s linear
    &:hover
      color: $danger-red

@media all and (max-width: 600px)
  .contact-item
    &__name
      width: 100%
      text-align: center
      margin-bottom: 5px
    &__email
      width: 100%
      text-align: center
    &__number
      text-align: center
      width: 100%

</style>