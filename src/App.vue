<template>
  <div class="Header-searchContainer" id="search-app">
    <SearchBar :type="searchType" :value="searchFieldValue" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar/SearchBar';
import Utils from './app-utils';
// const getChildrenTextContent = function recursion(children) {
//   return children.map(node => (node.children ? recursion(node.children) : node.text)).join('');
// };

export default {
  name: 'App',
  components: {
    SearchBar,
  },
  props: ['searchType', 'searchFieldValue'],
  data() {
    return {
      config: {
        searchType: Utils.searchTypes.BASIC,
      },
    };
  },
};
</script>

<style>
#search-app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
