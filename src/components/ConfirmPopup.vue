<template>
  <div class="popup">
    <div class="popup-container">
      <div class="popup__header">
        <button
          class="popup__close"
          @click="cancelHandler">
          <i class="far fa-times-circle"></i>
        </button>
        <h2 class="popup__title">{{headerText}}</h2>
      </div>
      <div class="popup__buttons">
        <Button
          @buttonClick="confirmHandler"
          type="danger"
          :text="confirmText"/>
        <Button
          @buttonClick="cancelHandler"
          :text="cancelText"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "ConfirmPopup",
  components: {
    Button
  },
  props: {
    headerText:{
      type: String,
      required: true
    },
    confirmText:{
      type: String,
      required: true
    },
    cancelText:{
      type: String,
      required: true
    }
  },
  methods: {
    confirmHandler () {
      this.$emit('confirmPopup')
    },
    cancelHandler () {
      this.$emit('cancelPopup')
    },
  }
}
</script>

<style lang="sass">
@import "src/assets/sass/variables"
.popup
  &__header
    display: flex
    flex-direction: column
    justify-content: center
    margin-top: 5px
    font-size: 16px
  &__close
    font-size: 35px
    color: $main-green
    background: none
    border: none
    margin-right: 10px
    width: max-content
    margin-left: auto
    cursor: pointer
  &__title
    text-align: center
    font-size: 18px
  &__buttons
    display: flex
    justify-content: space-between
    align-items: center
    flex-wrap: wrap
    width: 100%
    button
      margin-top: 20px
      width: 100%
</style>