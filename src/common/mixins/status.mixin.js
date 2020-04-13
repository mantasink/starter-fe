import { mapActions, mapState } from 'vuex'

export const StatusMixin = {
  computed: {
    ...mapState([
      'status'
    ])
  },
  mounted () {
    this.resetStatus()
  },
  methods: {
    ...mapActions(['resetStatus'])
  }
}
