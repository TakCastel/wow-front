<template>
  <div>coucou</div>
</template>

<script>
export default {
  methods: {
    handleFilePicked () {
      if (this.file) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.article.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(this.file)
      } else {
        this.article.imageUrl = ''
      }
    }
  }
}
</script>
