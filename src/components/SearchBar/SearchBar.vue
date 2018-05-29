<template>
  <div class="SearchBar"
       :class="status"
       @click="activate()"
       @focus="activate()"
       v-click-outside="deactivate">
    <div v-if="isActive"
      class="SearchBar-background">
    </div>
    <div class="input-group">
      <input
        name="searchForOriginal"
        class="SearchBar-textField form-control"
        :placeholder="type +' Search'"
        v-model.lazy="textFieldModel"
        ref="searchField"
        @keyup.enter="doSearch"/>
      <SearchBarPrimaryActions @search="doSearch()" />
    </div>
    <div v-show="isActive" class="SearchBar-pluginWrapper">
      <keep-alive>
        <!-- Here is the plugin which we load dynamically depending on page where we use SearchBar Component -->
        <component :is="pluginLoader" ref="searchBarPlugin"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import * as _$ from 'jquery';
import ClickOutside from 'vue-click-outside';
import SearchBarPrimaryActions from './SearchBarPrimaryActions';
import Utils from '../../app-utils';

const COMPONENT_STATUS = {
  IS_ACTIVE: 'isActive',
  IS_NOT_ACTIVE: '',
};

export default {
  name: 'search-bar',
  props: ['type', 'value'],
  components: {
    SearchBarPrimaryActions,
  },
  provide() {
    return {
      getSearchField: this.getSearchField,
    };
  },
  data() {
    return {
      status: COMPONENT_STATUS.IS_NOT_ACTIVE,
      textFieldModel: this.value,
    };
  },
  methods: {
    activate() {
      this.status = COMPONENT_STATUS.IS_ACTIVE;
    },
    deactivate() {
      this.status = COMPONENT_STATUS.IS_NOT_ACTIVE;
    },
    getSearchField() {
      return this.$refs.searchField;
    },
    doSearch() {
      // We are getting searchBarPlugin first because this plugin might be not loaded yet
      // at that time when user hit the Search button.
      // debugger;
      const searchBarPlugin = this.$refs.searchBarPlugin;
      const searchBarTextField = this.$refs.searchField;
      const searchBarPluginParameters = (
        searchBarPlugin &&
        // serializeParameters() must return Array of Objects in the following format:
        // [{name: "Field Name", value: "Field Value"}, ...]
        Utils.serializeFormFields(searchBarPlugin.$el)
      ) || [];
      const searchBarParameters = [
        ...searchBarPluginParameters, // Serialized form inside current SearchBarPlugin
        ...Utils.serializeFormFields(searchBarTextField), // Serialized form inside SearchBar itself
        ...Utils.serializeFormFields('.u-searchBarSerialize')]; // Serialized form with the utility (in Bliss terminology) class name: 'u-searchBarSerialize'
      window.location = `/search/simple/articles?${_$.param(searchBarParameters)}`;
    },
  },
  computed: {
    isActive() {
      return this.status === COMPONENT_STATUS.IS_ACTIVE;
    },
    pluginLoader() {
      return () => import(`./SearchBarPlugins/SearchBarPlugin${this.type}`);
    },
    currentType() {
      return Utils.getSearchType(this.type);
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>


<style lang="less" scoped>
  @import '../../../../less/evita/includes/_variables.less';

  .SearchBar {
    outline: none;
    font-family: inherit;
    float: right;
    &-textField {
      width: 300px;
      -webkit-transition: all .2s;
      -moz-transition: all .2s;
      transition: all .2s;

      /* TODO: we need to refactor these styles with hardcoded values! Looks like they came from Zeplin... */
      @media (max-width: 767px) {
        width: 213.5px;
      }

      @media (min-width: 768px) and (max-width: 991px) {
        width: 197px;
      }

      @media (min-width: 992px) and (max-width: 1199px) {
        width: 412px;
      }
    }

    &.isActive {
      @media (min-width: 1200px) {
        .SearchBar-textField {
          width: 841px !important;
        }
      }
    }

    /* --- Utility classes for Vue.js built-in animation --- */
    .slide-enter-active {
      transition: all .5s ease;
    }
    .slide-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-enter, .slide-leave-to
      /* .slide-leave-active below version 2.1.8 */ {
      transform: translateX(10px);
    }
    /* --- --- --- */

    &-background {
      background: @ev-colorWhite;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.85;
      margin: -@ev-VerticalGapBase -@ev-HorizontalGapBase;
    }
  }
</style>
