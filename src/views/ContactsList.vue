<template>
  <div class="contacts">
    <Button @buttonClick="togglePopupCreateShow" text="Добавить контакт"/>
    <div
      v-if="contactsList.length > 0"
      class="contacts-list">
      <ContactPreview
        v-for="contact in contactsList"
        v-bind:key="contact.id"
        @deleteContact="deleteContactHandler(contact.id)"
        :contact="contact"/>
    </div>
    <h2
      class="info-title"
      v-else>
      У вас еще нет контактов :(
    </h2>
    <AddContactPopup
      v-if="showPopupCreate"
      @closePopup="togglePopupCreateShow"/>
    <ConfirmPopup
      @confirmPopup="deleteContact"
      @cancelPopup="togglePopupConfirmShow"
      v-if="showPopupConfirm"
      header-text="Вы действтиельно хотите удалить аккаунт?"
      confirm-text="удалить"
      cancel-text="отмена"
    />
  </div>

</template>

<script>
import ContactPreview from "../components/ContactPreview";
import Button from "../components/Button";
import ConfirmPopup from "../components/ConfirmPopup";
import AddContactPopup from "../components/AddContactPopup";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ContactsList',
  data () {
    return {
      showPopupCreate: false,
      showPopupConfirm: false,
      deleteContactId: null
    }
  },
  components: {
    AddContactPopup, ContactPreview, Button,ConfirmPopup
  },
  computed: {
    ...mapGetters({
      contactsList: 'getContactsList'
    })
  },
  methods: {
    ...mapActions({
      deleteAction: 'deleteContact'
    }),
    //toggles show popups
    togglePopupCreateShow () {
      this.showPopupCreate = !this.showPopupCreate
    },
    togglePopupConfirmShow () {
      this.showPopupConfirm = !this.showPopupConfirm
    },
    //actions
    deleteContactHandler (id) {
      this.deleteContactId = id
      this.showPopupConfirm = true
    },
    deleteContact () {
      this.deleteAction(this.deleteContactId)
      this.togglePopupConfirmShow()
      this.deleteContactId = null
    }
  }
}
</script>

<style lang="sass">
.contacts
  margin-top: 50px
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
.contacts-list
  width: 100%
  margin-top: 30px
</style>