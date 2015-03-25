/**@jsx*/
var builder = require('focus').component.builder;
var React = require('react');
var LiveFilter = require('../../../search/live-filter/index').component;
var ListActionBar = require('../../../list/action-bar/index').component;
var ListSummary = require('../../../list/summary/index').component;
var ListSelection = require('../../../list/selection').list.component;
var Title = require('../../../common/title').component;
var Button = require('../../../common/button/action').component;
var SearchStore = require('focus').store.SearchStore;
var assign = require('object-assign');
var InfiniteScrollPageMixin = require('../common-mixin/infinite-scroll-page-mixin').mixin;
var isArray = require('lodash/lang/isArray');

var searchFilterResultMixin = {
    mixins: [InfiniteScrollPageMixin],

    /**
     * Display name.
     */
    displayName: 'search-filter-result',

    /**
     * Component intialization
     */
    componentDidMount: function componentDidMount() {
        this._registerListeners();
        this.search();
    },
    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount: function SearchComponentWillUnmount(){
        this._unRegisterListeners();
    },
    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps: function() {
        return {
            facetConfig: {},
            orderableColumnList: {},
            operationList: {},
            lineComponent: undefined,
            isSelection: true,
            lineOperationList: [],
            criteria: {
                scope: undefined,
                searchText: undefined
            }
        };
    },
    /**
     * Init default state.
     * @returns {object} Initialized state.
     */
    getInitialState: function() {
        return assign({
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},
            selectionStatus: 'none',
            orderSelected: undefined,
            groupSelectedKey: undefined
        });
    },
    /**
     * Get the state from store.
     * @returns {object} Dtat to update store.
     */
    _getStateFromStore: function() {
        if(this.store) {
            var data = this.store.get();
            return assign({
                facetList: data.facet
            }, this.getScrollState());
        }
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners: function registerListeners() {
        if(this.store) {
            this.store.addSearchChangeListener(this.onSearchChange);
        }
    },
    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners: function unRegisterSearchListeners(){
        if(this.store){
            this.store.removeSearchChangeListener(this.onSearchChange);
        }
    },

    /**
     * Handler when store emit a change event.
     */
    onSearchChange: function onSearchChange() {
        this.setState(this._getStateFromStore());
    },

    /**
     * Search function.
     */
    search: function search(event) {
        if(event) {
            event.preventDefault();
        }

        var facets = [];
        for(var selectedFacet in this.state.selectedFacetList) {
            facets.push({key: selectedFacet, value: this.state.selectedFacetList[selectedFacet].key});
        }

        this.actions.search(
            this.getSearchCriteria(this.props.criteria.scope,  this.props.criteria.searchText, facets)
        );
    },
    /**
     * Get the list of facet to print into the top bar..
     * @returns {{}} Facets object : [facet1: 'Label of facet1', facet2: 'Label of facet2'}.
     * @private
     */
    _getFacetListForBar: function() {
        var facetList = {};
        for(var key in this.state.selectedFacetList) {
            var facet = this.state.selectedFacetList[key];
            facetList[key] = facet.data.label;
        }
        return facetList;
    },
    /**
     * Click on bar facet action handler.
     * @param key [string}  Key of the clicked facet.
     * @private
     */
    _facetBarClick: function(key) {
        var selectedFacetList = this.state.selectedFacetList;
        delete selectedFacetList[key];

        this.state.selectedFacetList = selectedFacetList;
        this.setState(
            assign(
                {selectedFacetList: selectedFacetList},
                this.getNoFetchState())
            , this.search);
    },
    /**
     * Group action click handler.
     * @param {string} key Name of the column to group (if null => ungroup action).
     * @private
     */
    _groupClick: function(key) {
        console.log('Group by : ' + key);

        this.setState(
            assign(
                {groupSelectedKey: key, orderSelected: (key != undefined ? undefined : this.state.orderSelected)},
                this.getNoFetchState()
            ), this.search);
    },
    /**
     * Order action click handler.
     * @param {string} key Column to order.
     * @param {string} order Order  asc/desc
     * @private
     */
    _orderClick: function(key, order) {
        console.log('Order : ' + key + ' - ' + order);
        this.setState(
            assign(
                {orderSelected:  {key: key, order: order}},
                this.getNoFetchState()
        ), this.search);
    },
    /**
     * Selection action handler.
     * @param selectionStatus Current selection status.
     * @private
     */
    _selectionGroupLineClick: function(selectionStatus) {
        console.log("Selection status : " + selectionStatus);
        this.setState({
            selectionStatus: selectionStatus
        });
    },
    /**
     * Handler called when facet is selected.
     * @param facetComponentData Data of facet.
     */
    _facetSelectionClick: function(facetComponentData, isDisableGroup) {
        console.warn("Facet selection ");
        console.log(facetComponentData.selectedFacetList);

        var newState = {
            selectedFacetList: facetComponentData.selectedFacetList,
            openedFacetList: facetComponentData.openedFacetList
        };
        if(isDisableGroup) {
            newState.groupSelectedKey = undefined;
        }

        this.setState(assign(newState, this.getNoFetchState()), this.search);
    },
    /**
     * Line selection handler.
     * @param item Line checked/unchecked.
     */
    _selectItem: function selectItem(item) {
        this.setState({selectionStatus: "partial"});
    },
    /**
     * Export action handler.
     */
    _exportHandler: function exportHandler() {
      console.log("EXPORT TODO");
    },
    /**
     * Click on scope action handler.
     */
    _scopeClick: function scopeClick() {
      console.log("TODO SCOPE CLICK REDIRECTION");
    },
    /**
     * Render the show all button  seect the group corresponding facet.
     * @param groupKey Group key.
     * @returns {Function} Function to select the facet.
     * @private
     */
    _showAllGroupListHandler: function(groupKey) {
        return (event)=> {
            var selectedFacetList = this.state.selectedFacetList;

            var facet = this.store.getFacet();
            selectedFacetList[this.state.groupSelectedKey] = {
                data : facet[this.state.groupSelectedKey][groupKey],
                key: groupKey
            };
            this._facetSelectionClick({
                selectedFacetList: selectedFacetList,
                facetComponentData: this.state.openedFacetList
            }, true);
        };
    },

    /**
     * Render a group list.
     * @param groupKey Key of the group.
     * @returns {JSX} Rendu html.
     * @private
     */
    _renderGroupList: function(groupKey) {
        return (<div className="listResultContainer panel">
                <Title title={groupKey} />
                    {this._renderSimpleList({groupKey}, this.state.list[groupKey])}
                    <Button  handleOnClick={this._showAllGroupListHandler(groupKey)} label= "Show all"/>
            </div>);
    },

    /**
     * Render a simple list.
     * @param id Technical id of the list.
     * @param list Content of the list.
     * @returns {JSX} Html rendering.
     * @private
     */
     _renderSimpleList: function(id, list) {
         return <ListSelection data={list}
             ref={id}
             isSelection={this.props.isSelection}
             onSelection={this._selectItem}
             onLineClick={this.props.onLineClick}
             fetchNextPage={this.fetchNextPage}
             operationList={this.props.lineOperationList}
             hasMoreData={this.state.hasMoreData}
             isLoading={this.state.isLoading}
             lineComponent={this.props.lineComponent}
             selectionStatus={this.state.selectionStatus} />
     },

    /**
     * Get the list of the orderable columns.
     * @returns {object} list of orderable columns.
     * @private
     */
    _getOrderableColumnList: function() {
        if(this._isSimpleList()) {
            return this.props.orderableColumnList
        }
        return undefined;
    },

    /**
     * @returns {boolean} Returns true if list is a simple list, false if grouped.
     * @private
     */
    _isSimpleList: function() {
        return isArray(this.state.list);
    },

    /**
     * Render the liveFilter.
     * @returns {JSX} Render the liveFilter.
     */
    liveFilterComponent: function liveFilterComponent() {
        return <div className="liveFilterContainer">
                    <LiveFilter ref="liveFilter"
                        facetList={this.state.facetList}
                        selectedFacetList={this.state.selectedFacetList}
                        openedFacetList={this.state.openedFacetList}
                        config={this.props.facetConfig}
                        dataSelectionHandler={this._facetSelectionClick}/>
                </div>;
    },

    listSummary: function listSummary() {
        var scopeList = {scope: this.props.criteria.scope};
        return <div className="listSummaryContainer panel">
                    <ListSummary
                        nb={this.state.totalRecords}
                        queryText={this.props.criteria.searchText}
                        scopeList={scopeList}
                        scopeClickAction={this._scopeClick}
                        exportAction={this._exportHandler} />
                </div>;
    },
    /**
     * Render the action bar.
     * @returns {JSX} Rendering of the action bar.
     */
    actionBar: function actionBar() {
        var groupableColumnList = {};
        for(var facetKey in this.state.facetList) {
            groupableColumnList[facetKey] = facetKey;
        }
        return <div className="listActionBarContainer panel">
                    <ListActionBar selectionStatus={this.state.selectionStatus}
                        selectionAction={this._selectionGroupLineClick}
                        orderableColumnList={this._getOrderableColumnList()}
                        orderAction={this._orderClick}
                        orderSelected={this.state.orderSelected}
                        groupableColumnList={groupableColumnList}
                        groupAction={this._groupClick}
                        groupSelectedKey={this.state.groupSelectedKey}
                        facetList={this._getFacetListForBar()}
                        facetClickAction={this._facetBarClick}
                        operationList={this.props.operationList} />
                </div>;
    },

    /**
     * Render the resutl list.
     * @returns {JSX} The rendering of the list.
     * @private
     */
    resultList: function resultList() {
        if(this._isSimpleList()) {
            return <div className="listResultContainer panel">{this._renderSimpleList("list", this.state.list)}</div>;
        }
        var groupList = [];
        for(var groupKey in this.state.list) {
            groupList.push(this._renderGroupList(groupKey));
        }
        return groupList;
    }
};

module.exports = builder(searchFilterResultMixin, true);