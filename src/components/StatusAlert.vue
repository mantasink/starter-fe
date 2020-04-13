<template>
  <b-alert
    :show="status !== API_STATUS.NONE"
    :variant="variant(status)"
  >
    {{ message(status) }}
  </b-alert>
</template>

<script>
import { mapState } from 'vuex'
import { API_STATUS } from '@/common/constants'

export default {
  computed: {
    ...mapState(['status']),
    API_STATUS: () => {
      return API_STATUS
    }
  },
  methods: {
    variant (status) {
      switch (status) {
        case API_STATUS.OK:
          return 'success'
        case API_STATUS.LOADING:
          return 'info'
        case API_STATUS.ERROR:
          return 'danger'
        default:
          return 'primary'
      }
    },
    message (status) {
      switch (status) {
        case API_STATUS.OK:
          return 'Success!'
        case API_STATUS.LOADING:
          return 'Loading...'
        case API_STATUS.ERROR:
          return 'Error has occurred.'
        default:
          return 'Unknown status.'
      }
    }
  }
}
</script>
