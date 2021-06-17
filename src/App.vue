<template>
  <div id="app" class="container">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: {Header}
}
</script>

<style lang="sass">
@import "src/assets/sass/variables"

*, *:before, *:after
  box-sizing: border-box
  margin: 0
  padding: 0

body
  font-family: 'Montserrat', sans-serif

a
  text-decoration: none
  color: inherit

.container
  width: 100%
  max-width: 768px
  margin: 0 auto

.popup
  min-width: 100%
  min-height: 100%
  position: fixed
  z-index: 5
  background: rgba(0, 0, 0, 0.5)
  top: 0
  left: 0
  right: 0
  bottom: 0
  transition: visibility 0.5s linear, opacity 0.5s
  display: flex
  align-items: center
  justify-content: center
.popup-container
  width: 90%
  max-width: 500px
  padding: 10px
  height: max-content
  background-color: #ffffff
  border-radius: 20px
  display: flex
  flex-direction: column

.info-title
  margin-top: 50px
  color: $main-green
</style>
