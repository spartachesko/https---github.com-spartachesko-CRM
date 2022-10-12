<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'CRM_title' | localize}}</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim = "email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">{{'Email_empty' | localize}}</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{'Email_incorrect' | localize}}</small>
      </div>
      <div class="input-field">
        <input id="password" type="password"  v-model.trim = "password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}">
        <label for="password">{{'Password' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">{{'Password_empty' | localize}}</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">{{'Password_incorrect1' | localize}} {{$v.password.$password.minLength.min}}{{'Password_incorrect2' | localize}} {{password.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">  {{'Enter' | localize}} <i
            class="material-icons right">send</i>
        </button>
      </div>
      <p class="center"> {{'Account' | localize}} <router-link to="/register">{{'Registration' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  name: 'login',
  metaInfo(){
    return {title: this.$title('Enter')}
  },
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },

  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}

    }
  }
}
</script>