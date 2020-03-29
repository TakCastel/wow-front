<template>
  <WrapperModale v-model="showFormModale">
    <span slot="header" class="title">
      {{ isRegistering ? 'Inscription' : 'Connexion' }}
    </span>
    <v-row align="center" justify="center" class="my-3">
      <v-img
        src="/icon.png"
        lazy-src="/icon.png"
        alt="Logo de l'application"
        max-width="100px"
      />
    </v-row>
    <v-form
      ref="form"
      slot="default"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="identifier"
        :rules="identifierRules"
        :label="isRegistering ? 'Utilisateur' : 'Identifiant'"
        placeholder="John Doe"
        outlined
        required
      />
      <v-text-field
        v-if="isRegistering"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        placeholder="johndoe@email.com"
        outlined
        required
      />
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-visibility' : 'mdi-visibility-off'"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        name="input-10-1"
        label="Mot de passe"
        placeholder="Votre mot de passe sécurisé"
        outlined
      />
    </v-form>
    <v-row slot="footer" class="ma-0">
      <v-col cols="12" class="pa-0">
        <v-btn
          :disabled="!valid"
          @click="handleSubmit"
          color="primary"
          large
          block
        >
          {{ isRegistering ? 'Créer' : 'Connexion' }}
        </v-btn>
      </v-col>
      <v-col cols="12" class="pa-0 pt-3">
        <v-btn
          @click="handleSwitch"
          color="secondary"
          class="transparent"
          text
          large
          block
        >
          {{ isRegistering ? 'Déjà un compte ?' : 'Créer un compte' }}
        </v-btn>
      </v-col>
    </v-row>
  </WrapperModale>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import WrapperModale from '@/components/Wrappers/WrapperModale'

export default {
  components: {
    WrapperModale
  },

  data: () => ({
    showFormModale: true,
    isRegistering: false,
    valid: true,
    identifier: '',
    identifierRules: [
      v => !!v || 'Un identifiant est demandé'
    ],
    email: '',
    emailRules: [
      v => !!v || 'Un email est demandé',
      v => /.+@.+/.test(v) || 'Le format mail est requis'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Renseignez votre mot de passe'
    ],
    show: false
  }),

  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },

  methods: {
    ...mapActions({
      register: 'auth/registerUser',
      login: 'auth/authenticateUser'
    }),

    /**
     * Send data to the store actions and
     * login or register according to form layout
     */
    handleSubmit () {
      if (this.$refs.form.validate()) {
        if (this.isRegistering) {
          this.register({
            username: this.identifier,
            email: this.email,
            password: this.password
          })
        } else {
          this.login({
            identifier: this.identifier,
            password: this.password
          })
        }
      }
    },

    /**
     * Allow user to switch from create account
     * or login form by clicking the switch button
     */
    handleSwitch () {
      this.isRegistering = !this.isRegistering
      this.$refs.form.resetValidation()
      this.show = false
    }
  }
}
</script>
