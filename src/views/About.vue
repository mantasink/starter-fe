<template>
  <div class="row">
    <div class="col">
      <h1>About page</h1>
      <p>Private: {{ privateAboutData }}</p>
      <p>Public: {{ publicAboutData }}</p>
      <status-alert />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState([
    'privateAboutData',
    'publicAboutData'
  ]),
  mounted () {
    this.fetchAboutData()
  },
  methods: {
    ...mapActions([
      'fetchAboutData'
    ])
  }
}
</script>
