import * as _$ from 'jquery';

export default {
  getChildrenTextContent: function recursion(children) {
    return children.map(node => (node.children ? recursion(node.children) : node.text)).join('');
  },
  searchTypes: Object.freeze({
    BASIC: Symbol('basic'),
    ADVANCED: Symbol('advanced'),
    UDB: Symbol('udb'),
    DEFAULT_TYPE: this.BASIC, // here is the search type we use by default
  }),
  searchScopes: Object.freeze({
    EVERYWHERE: Symbol('everywhere'),
    SELECTED_TITLES: Symbol('selected titles'),
  }),
  getSearchType(key) {
    debugger;
    const typeAsSymbol = Symbol.for(key.toUpperCase());
    if (Symbol.keyFor(typeAsSymbol) in this.searchTypes) {
      return this.searchTypes[Symbol.keyFor(typeAsSymbol)];
    }
    return this.searchTypes.DEFAULT_TYPE;
  },
  serializeFormFields(elementOrSelectorToSerialize) {
    // This method returns JSON with array of fields inside the form element
    // we use jQuery here
    // debugger;
    let elementsToSerialize = _$(elementOrSelectorToSerialize);
    if (!elementsToSerialize.is(':input')) {
      elementsToSerialize = elementsToSerialize.find(':input');
    }
    return elementsToSerialize.serializeArray();
  },
};

