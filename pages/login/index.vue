<template>
  <AuthenticationForm />
</template>

<script>
import AuthenticationForm from '@/components/Forms/AuthenticationForm'

export default {
  middleware: [
    'connected'
  ],

  layout: 'custom',

  components: {
    AuthenticationForm
  }
}
</script>
