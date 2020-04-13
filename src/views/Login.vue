<template>
  <div class="row">
    <div class="col">
      <b-form @submit.prevent="submit">
        <b-form-group
          id="input-group-1"
          label="Username:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            required
            autocomplete="username"
            placeholder="Username"
          />
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Password:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="Password"
          />
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
        >
          Submit
        </b-button>
      </b-form>

      <status-alert class="mt-3" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { StatusMixin } from '@/common/mixins/status.mixin'

export default {
  mixins: [StatusMixin],
  data () {
    return {
      token: '',
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.authenticate(this.form)
      this.updateAuthorizationHeader()
    },
    ...mapActions([
      'authenticate',
      'updateAuthorizationHeader'
    ])
  }
}
</script>
