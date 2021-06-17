<template>
  <div class="popup">
    <div class="popup-container">
      <div class="popup__header">
        <button class="popup__close" @click="$emit('closePopup')">
          <i class="far fa-times-circle"></i>
        </button>
        <h2>Создание нового контакта</h2>
      </div>
      <form @submit.prevent="addContact" class="popup-form">
        <label class="popup-form__label" >
          <i class="far fa-user-circle"></i>
          <input
              required
              placeholder="Имя"
              v-model="name"
              type="text"
              class='popup-form__input'
          >
        </label>
        <label class="popup-form__label">
          <i class="fas fa-phone"></i>
          <input
              required
              placeholder="Телефон"
              type="tel"
              v-model="number"
              class='popup-form__input'
          >
        </label>
        <label class="popup-form__label">
          <i class="fas fa-envelope"></i>
          <input
              placeholder="Почта"
              type="email"
              v-model="email"
              class='popup-form__input'
          >
        </label>
        <Button @click="addContact" text="Добавить"/>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import {mapActions} from "vuex";
export default {
  name: "AddContactPopup",
  components: {
    Button
  },
  data () {
    return {
      name: '',
      number: '',
      email: ''
    }
  },
  methods: {
    ...mapActions({
      createContact: 'createContact'
    }),
    addContact() {
      //generate object for store
      const contact = {
        id: new Date().getTime(),
        name: this.name,
        email: this.email,
        number: this.number
      }
      this.createContact(contact)
      //clear fields
      this.name = ''
      this.email = ''
      this.number = ''
      this.$emit('closePopup')
    }
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/sass/variables"
.popup__header
  text-align: center
  margin-bottom: 30px
.popup-form
  display: flex
  flex-direction: column
  align-items: center
  &__input
    padding: 7px
    min-width: 300px
    width: 85%
    margin-left: 15px
    border: none
    font-weight: 500
    border-bottom: 1px solid $border-green
    color: $main-green
  &__label
    padding-bottom: 5px
    margin-bottom: 10px
    color: $main-green
</style>