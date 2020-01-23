<template>
  <v-sheet class="autofill">
    <v-calendar
      :events="events"
      type="month"
      now="2019-01-08"
      value="2019-01-08"
    />
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    events: [
      {
        name: 'Event Guilde des Mages',
        start: '2018-12-30',
        end: '2019-01-02'
      },
      {
        name: 'Réunion de guilde',
        start: '2019-01-07'
      },
      {
        name: 'Anniversaire de la guilde',
        start: '2019-01-03'
      },
      {
        name: 'New Year',
        start: '2019-01-01'
      },
      {
        name: 'RP ruines Dwemer',
        start: '2019-01-21'
      },
      {
        name: 'Event RP surprise',
        start: '2019-01-30',
        end: '2019-02-01'
      }
    ]
  })
}
</script>

<style lang="scss">
.autofill {
  height: 100%
}
</style>
