<template>
  <div class="SearchBarPluginBasic">

    <div class="btn-group">
      <button @click="typeCommand(' AND ')" class="btn btn-sm btn-primary" title="AND">AND</button>
      <button @click="typeCommand(' OR ')" class="btn btn-sm btn-primary" title="OR">OR</button>
      <button @click="typeCommand(' NOT ')" class="btn btn-sm btn-primary" title="NOT">NOT</button>
      <button @click="typeCommand(' ~4')" class="btn btn-sm btn-primary" title="NEAR">NEAR</button>
      <button @click="typeCommand('* ')" class="btn btn-sm btn-primary"
              title="WILDCARD ASTERISK">WILDCARD *</button>
      <button @click="typeCommand('?')" class="btn btn-sm btn-primary"
              title="WILDCARD QUESTION">WILDCARD ?</button>
      <button @click="setExactSearch(false)" class="btn btn-sm btn-primary"
              title="EXACT PHRASE">EXACT PHRASE</button>
    </div>
  </div>
</template>

<script>
// This is a connection layer between new Vue.js application and legacy javascript code.
// We cannot rewrite everything right away but we must take care of it at some point.
export default {
  inject: ['getSearchField'],
  methods: {
    typeCommand(command) {
      // console.log(this.getInputElement());
      window.setFocusOn(this.getSearchField());
      window.type(command);
    },
    setExactSearch(command) {
      window.setFocusOn(this.getSearchField());
      window.setExactSearch(command);
    },
  },
};
</script>

<style lang="less" scoped>
  .SearchBarPluginBasic {
    font-size: 20px;
  }
</style>
