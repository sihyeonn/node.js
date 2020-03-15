<template>
  <div>
    <h1>{{ result }}</h1>
    <form v-on:submit="onSubmitForm">
      <input ref="answer" maxlength="4" v-model="value" />
      <button type="submit">Submit</button>
    </form>
    <dive>Try: {{tries.length}}</dive>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tries: [],
        value: '',
        result: ''
      }
    },
    methods: {
      onSubmitForm(e) {
        e.preventDefault();
        this.tries.push(this.value);
        this.value = '';
        this.$refs.answer.focus();
      }
    }
  }
</script>

<style scoped>

</style>
