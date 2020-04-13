<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <b-form @submit.prevent="submit">
        <b-form-group
          id="input-group-username"
          label="Username:"
          label-for="input-username"
        >
          <b-form-input
            id="input-username"
            v-model="form.username"
            type="text"
            autocomplete="username"
            :state="$v.form.username.$dirty ? !$v.form.username.$error : null"
            placeholder="Username"
          />
          <b-form-invalid-feedback id="input-group-username">
            This is a required field and must be at least 3 characters.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="input-group-email"
          label="Email:"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="text"
            autocomplete="email"
            :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
            placeholder="Email"
          />
          <b-form-invalid-feedback id="input-group-email">
            Needs to be a valid email address.
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
            Password must contain at least 8 characters, including uppercase, lowercase letters and
            numbers.
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
import { alphaNum, email, helpers, minLength, required, sameAs } from 'vuelidate/lib/validators'
import { StatusMixin } from '@/common/mixins/status.mixin'

const passwordValidator = helpers.regex('passwordValidator',
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)

export default {
  mixins: [StatusMixin],
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
      }
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
        alphaNum
      },
      email: {
        required,
        email
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

      this.register(this.form)
    },
    ...mapActions([
      'register'
    ])
  }
}
</script>
