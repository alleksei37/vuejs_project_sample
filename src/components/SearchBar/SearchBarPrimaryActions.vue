<template>
  <div class="input-group-btn">
    <button
      type="button"
      class="btn btn-danger"
      @click="$emit('search')">
      <span class="Icon-searchGroupGlyph"></span>
      {{activeSearchScope.title}}
    </button>
    <button
      type="button"
      class="btn btn-danger dropdown-toggle"
      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="caret"></span>
      <span class="sr-only">Change search scope</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-right">
      <li v-for="searchScope in searchScopesList"
          :key="searchScope.key">
        <a href="" @click.prevent="setActiveSearchScope(searchScope)">
          {{searchScope.title}}
        </a>
      </li>
      <!--<li><a href="#">Another action</a></li>-->
      <!--<li><a href="#">Something else here</a></li>-->
      <!--<li role="separator" class="divider"></li>-->
      <!--<li><a href="#">Separated link</a></li>-->
    </ul>
  </div>
</template>

<script>
import Utils from '../../app-utils';

export default {
  name: 'search-bar-primary-actions',
  data() {
    return {
      activeSearchScope: {},
      searchScopesList: [
        { key: Utils.searchScopes.EVERYWHERE, title: 'Everywhere' },
        { key: Utils.searchScopes.SELECTED_TITLES, title: 'Selected Titles' },
      ],
    };
  },
  created() {
    this.setActiveSearchScope(this.searchScopesList[0]);
  },
  methods: {
    setActiveSearchScope(searchScopeObject) {
      this.activeSearchScope = searchScopeObject;
    },
  },
};
</script>

<style scoped>
.Icon-searchGroupGlyph {
  font-size: 12px;
}
</style>
