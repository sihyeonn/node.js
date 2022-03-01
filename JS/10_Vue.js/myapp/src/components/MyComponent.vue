<template>
  <div>
    {{ now }}
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    msg: {
      type: String,
      optional: true,
      default: 'MyComponent'
    }
  },
  data() {
    return {
      message: this.msg ?? 'This is a MyComponent',
      now: 0
    }
  },
  mounted() {
    this.updateNow()
    setInterval(this.updateNow, 1000)
  },
  methods: {
    updateNow() {
      this.now = Math.round(Date.now()/1000)
    }
  }
}
</script>
