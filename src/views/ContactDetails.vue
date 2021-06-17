<template>
  <div class="contact-details">
    <Button type="navigate" @buttonClick="returnBack" text="Назад"/>
    <form class="details-form" @submit.prevent="submitChanges">
      <label class="details-form__label" >
        <i class="far fa-user-circle"></i>
        <input
          placeholder="Имя"
          v-model="name"
          @change="changesApprovedHandler()"
          type="text"
          class='details-form__input'
        >
      </label>
      <label class="details-form__label">
        <i class="fas fa-phone"></i>
        <input
          placeholder="Телефон"
          type="tel"
          @change="changesApprovedHandler()"
          v-model="number"
          class='details-form__input'
        >
      </label>
      <label class="details-form__label">
        <i class="fas fa-envelope"></i>
        <input
          placeholder="Почта"
          v-model="email"
          @change="changesApprovedHandler()"
          type="email"
          class='details-form__input'
        >
      </label>
      <h2 class="info-title">Дополнительная информация</h2>
      <fieldset
        class="extra-fields"
        v-for="field in extraFields"
        :key="field.id">
        <input
          class="extra-fields__title"
          @change="changesApprovedHandler()"
          type="text"
          v-model="field.value"
          placeholder="Название">
        <input
          class="extra-fields__value"
          type="text"
          @change="changesApprovedHandler()"
          v-model="field.title"
          placeholder="Значение">
        <button
          class="delete-btn"
          @click.prevent="deleteExtraFieldHandler(field.id)">
          <i class="far fa-trash-alt"></i>
        </button>
      </fieldset>
      <button
        class="extra-fields__add"
        @click.prevent="addExtraField">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
      <Button
        @buttonClick="submitChanges"
        text="Сохранить"/>
    </form>
    <ConfirmPopup
      v-if="showConfirmDeletePopup"
      @confirmPopup="deleteExtraField"
      @cancelPopup="toggleConfirmDeletePopup"
      confirm-text="Удалить"
      cancel-text="Нет"
      header-text="Вы действительно хотите удалить это поле?"
    />
    <ConfirmPopup
      v-if="showConfirmChangesPopup"
      @cancelPopup="toggleConfirmChangesPopup"
      @confirmPopup="confirmChanges"
      confirm-text="Всё равно перейти"
      cancel-text="Отмена"
      header-text="У вас возможно есть несохраненные изменения"
    />
  </div>
</template>

<script>
import Button from "../components/Button";
import _ from 'lodash'
import {mapActions} from "vuex";
import ConfirmPopup from "../components/ConfirmPopup";

export default {
  name: 'ContactDetail',
  components: { ConfirmPopup, Button },
  data() {
    return {
      name: '',
      number: '',
      email: '',
      extraFields: [],
      changesApproved: true,
      showConfirmDeletePopup: false,
      showConfirmChangesPopup: false,
      deleteFieldIndex: null,
    }
  },
  methods: {
    ...mapActions({
      changeAction: 'changeContact'
    }),
    addExtraField () {
      //generate custom field
      this.extraFields.push({value: '', title: '', id: new Date().getTime()})
      this.changesApproved = false
    },
    returnBack () {
      //check did we submit changes
      this.changesApproved ? this.$router.push('/') : this.toggleConfirmChangesPopup()
    },
    confirmChanges () {
      this.toggleConfirmChangesPopup()
      this.$router.push('/')
    },
    submitChanges() {
      const data = {
        name: this.name,
        number: this.number,
        email: this.email,
        id: this.id,
        extraFields: this.extraFields
      }
      this.changeAction(data)
      this.changesApproved = true
    },
    deleteExtraFieldHandler (id) {
      //find index to delete custom field
      this.deleteFieldIndex = this.extraFields.findIndex(item => item.id === id)
      this.toggleConfirmDeletePopup()
    },
    deleteExtraField () {
      this.extraFields.splice(this.deleteFieldIndex, 1)
      this.toggleConfirmDeletePopup()
      this.deleteFieldIndex = null
    },
    toggleConfirmDeletePopup () {
      this.showConfirmDeletePopup = !this.showConfirmDeletePopup
    },
    changesApprovedHandler () {
      this.changesApproved = false
    },
    toggleConfirmChangesPopup () {
      this.showConfirmChangesPopup = !this.showConfirmChangesPopup
    }
  },
  mounted() {
    const contactDetails = this.$store.getters.getContactDetails(Number(this.$route.params.id))
    const cacheData = _.cloneDeep(contactDetails)
    //take data to cache local
    this.name = cacheData.name
    this.number = cacheData.number
    this.email = cacheData.email
    this.id = cacheData.id
    this.extraFields = cacheData.extraFields || []
  }
}

</script>

<style scoped lang="sass">
@import "src/assets/sass/variables"
.contact-details
  margin-top: 50px
.details-form
  margin-top: 15px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  &__label
    font-size: 22px
    text-align: center
    width: 90%
    color: $main-green
    padding-bottom: 10px
    margin-bottom: 10px
  &__input
    padding: 7px
    min-width: 220px
    width: 85%
    margin-left: 15px
    border: none
    border-bottom: 1px solid $border-green
    &::placeholder
      color: $main-green

.extra-fields
  width: 85%
  border: none
  padding: 10px
  display: flex
  align-items: flex-end
  &__add
    border: none
    padding: 5px
    font-size: 20px
    background: none
    margin-bottom: 10px
    color: $main-green
    cursor: pointer
  &__title
    width: 30%
    border: none
    border-bottom: 1px solid $border-green
    padding: 7px
    margin-right: 30px
    &::placeholder
      color: #008000FF
  &__value
    border: none
    width: 60%
    padding: 7px
    margin-right: 20px
    border-bottom: 1px solid $border-green
    &::placeholder
      color: $main-green

.delete-btn
  border: none
  cursor: pointer
  font-size: 20px
  line-height: 20px
  transition: color .3s linear
  height: 20px
  &:hover
    color: $danger-red
</style>