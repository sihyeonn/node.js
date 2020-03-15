<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" maxlength="4" v-model="value" />
      <button type="submit">Submit</button>
    </form>
    <div>You have {{10 - tries.length}} chance(s)</div>
    <ul v-for="(t, index) in tries" :key="index">
      <li>{{ t.value }}</li>
      <li>{{ t.result }}</li>
    </ul>
  </div>
</template>

<script>
  const makeNumbers = () => {
    const ans = [];
    while (ans.length != 4) {
      let n = Math.floor(Math.random() * 10).toString();
      if (!ans.includes(n)) ans.push(n);
    }
    return ans;
  };
  export default {
    data() {
      return {
        answer: makeNumbers(),
        tries: [],
        value: '',
        result: ''
      }
    },
    methods: {
      judge(val) {
        let homerun = 0, strike = 0;
        for (let i = 0; i < val.length; ++i) {
          if (this.answer[i] === val[i]) ++homerun;
          else if (this.answer.includes(val[i])) ++strike;
        }
        return {homerun, strike};
      },
      makeResult({homerun, strike}) {
        return `You hit ${homerun} Homerun(s) and ${strike} Strike(s)!`
      },
      onSubmitForm(e) {
        const res = this.judge(this.value);
        const resText = this.makeResult(res)
        this.tries.push({ value: this.value, result: resText });
        if (res.homerun === 4) this.reset('You won!', true);
        else if (this.tries.length == 10) this.reset(`You lost! Answer was ${this.answer.join('')}!`, true);
        else this.reset('', false);
      },
      reset(alertMessage, isOver) {
        if (!!alertMessage) alert(alertMessage);
        if (isOver) this.tries = [];
        this.value = '';
        this.$refs.answer.focus();
      }
    },
  }
</script>

<style scoped>

</style>
