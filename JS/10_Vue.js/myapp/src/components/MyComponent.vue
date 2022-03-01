<template>
  <div>
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
      message: this.msg ?? 'This is a MyComponent'
    }
  }
}
</script>
