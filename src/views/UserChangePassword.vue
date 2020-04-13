<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <b-form @submit.prevent="submit">
        <b-form-group
          id="input-group-current-password"
          label="Current password:"
          label-for="input-old-password"
        >
          <b-form-input
            id="input-old-password"
            v-model="form.currentPassword"
            type="password"
            autocomplete="password"
            :state="$v.form.currentPassword.$dirty ? !$v.form.currentPassword.$error : null"
            placeholder="Password"
          />
          <b-form-invalid-feedback id="input-group-current-password">
            Password must contain at least 8 characters, including uppercase, lowercase letters and numbers.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-password"
          label="Password:"
          label-for="input-password"
        >
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
            placeholder="Password"
          />
          <b-form-invalid-feedback id="input-group-password">
            Password must contain at least 8 characters, including uppercase, lowercase letters and numbers.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-password-repeat"
          label="Password (repeat):"
          label-for="input-password-repeat"
        >
          <b-form-input
            id="input-password-repeat"
            v-model="form.passwordRepeat"
            type="password"
            autocomplete="new-password"
            :state="$v.form.passwordRepeat.$dirty ? !$v.form.passwordRepeat.$error : null"
            placeholder="Password"
          />
          <b-form-invalid-feedback id="input-group-password-repeat">
            Passwords do not match.
          </b-form-invalid-feedback>
        </b-form-group>

        <status-alert />

        <b-button
          :disabled="status === 'OK'"
          type="submit"
          variant="primary"
        >
          Submit
        </b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { helpers, required, sameAs } from 'vuelidate/lib/validators'
import { StatusMixin } from '@/common/mixins/status.mixin'

const passwordValidator = helpers.regex('passwordValidator', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)

export default {
  mixins: [StatusMixin],
  data () {
    return {
      form: {
        currentPassword: '',
        password: '',
        passwordRepeat: ''
      }
    }
  },
  validations: {
    form: {
      currentPassword: {
        required
      },
      password: {
        required,
        password: passwordValidator
      },
      passwordRepeat: {
        sameAs: sameAs('password')
      }
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }

      this.changePassword(this.form)
    },
    ...mapActions([
      'changePassword'
    ])
  }
}
</script>
