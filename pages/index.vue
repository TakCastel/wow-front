<template>
  <div id="dashbord">
    <v-alert
      border="left"
      color="info"
      dark
    >
      Bienvenue sur la version alpha du site web. Des erreurs peuvent survenir. Si vous souhaitez faire remonter des informations suites aux problèmes rencontrés, veuillez contacter l'administrateur de ce site.
    </v-alert>
    <div id="dashbord-main" class="mb-5">
      <!-- <v-row>
        <v-col cols="12" sm="12" md="6" lg="4">
          <info-card color="#e8a935" icon="mdi-gold">
            <template v-slot:title>
              Trésorerie
            </template>
            <template v-slot:info>
              10,000
            </template>
          </info-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <info-card color="#25caa4" icon="mdi-account-group">
            <template v-slot:title>
              Membres
            </template>
            <template v-slot:info>
              42
            </template>
          </info-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <info-card color="#673a45" icon="mdi-calendar">
            <template v-slot:title>
              Prochain Event
            </template>
            <template v-slot:info>
              25 Décembre
            </template>
          </info-card>
        </v-col>
      </v-row> -->
    </div>
    <div id="dashbord-secondary">
      <v-card>
        <v-card-title>
          Dernières informations
        </v-card-title>
        <v-card-text>
          Lancement du site officiel de la guilde !
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
// import InfoCard from '@/components/Cards/InfoCard'

export default {
  meta: {
    title: 'Accueil',
    breadcrumb: [
      { title: 'Accueil', active: true }
    ]
  },

  components: {
    // InfoCard
  }
}
</script>
