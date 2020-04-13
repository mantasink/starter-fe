<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a
      class="navbar-brand"
      href="#"
    >
      Frontend Starter
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
          >
            About
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <template v-if="token">
          <li class="nav-item">
            <router-link
              to="/change-password"
              class="nav-link"
            >
              Change password
            </router-link>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              @click="doLogout"
            >
              Logout
            </a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link
              to="/registration"
              class="nav-link"
            >
              Registration
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link"
            >
              Login
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['token'])
  },
  methods: {
    doLogout () {
      this.logout()
    },
    ...mapActions([
      'logout'
    ])
  }
}
</script>
