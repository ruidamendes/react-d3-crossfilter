
   ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
   │DATASET - the main crossfilter element, registers a dataset in redux and manages the dimensions / groups   │
   │therein.                                                                                                   │
   │                                                                                                           │
   │Raw Dataset: []                                                                                            │
   │Crossfilter: {}                                                                                            │
   │Dimensions: {}                                                                                             │
   │Groups: {}                                                                                                 │
   │                                                                                                           │
   │/* Find a way to remove need /*                                                                            │
   │DimensionTypes: {}                                                                                         │
   │                                                                                                           │
   │  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
   │  │DATA ATTRIBUTE - inclusion of this component registers an attribute as a dimension / group with      │  │
   │  │crossfilter and provides the group data down to the visual component.                                │  │
   │  │                                                                                                     │  │
   │  │State                                                                                                │  │
   │  │    filterValues: either a range for linear, or array for ordinal                                    │  │
   │  │                                                                                                     │  │
   │  │Properties                                                                                           │  │
   │  │    type: linear | ordinal                                                                           │  │
   │  │    attribute: <name>                                                                                │  │
   │  │    dimensionFunction: (data) => data.attribute                                                      │  │
   │  │    groupFunction: (value) => value                                                                  │  │
   │  │                                                                                                     │  │
   │  │Functions                                                                                            │  │
   │  │    /* update state, dispatch action to redux */                                                     │  │
   │  │    handleFilter()                                                                                   │  │
   │  │  ┌───────────────────────────────────────────────────────────────────────────────────────────────┐  │  │
   │  │  │Chart                                                                                          │  │  │
   │  │  │                                                                                               │  │  │
   │  │  │Based on parent attribute type, determines what type of plot to draw. d3 axes, scales, svg etc │  │  │
   │  │  │held in state.                                                                                 │  │  │
   │  │  │                                                                                               │  │  │
   │  │  │Properties                                                                                     │  │  │
   │  │  │    height                                                                                     │  │  │
   │  │  │    width                                                                                      │  │  │
   │  │  │    margin                                                                                     │  │  │
   │  │  │    dimension                                                                                  │  │  │
   │  │  │    group                                                                                      │  │  │
   │  │  │    onFilter                                                                                   │  │  │
   │  │  │    currentFilters: for benefit of ordinal mainly                                              │  │  │
   │  │  │                                                                                               │  │  │
   │  │  │                                                                                               │  │  │
   │  │  │                                                                                               │  │  │
   │  │  └───────────────────────────────────────────────────────────────────────────────────────────────┘  │  │
   │  │                                                                                                     │  │
   │  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
   │                                                                                                           │
   └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘
   ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
   │CONSIDER REMOVE NEED FOR REDUX.                                                                            │
   │                                                                                                           │
   │<Crossfilter data={}>                                                                                      │
   │    /* registers dataset, dimensions, groups */                                                            │
   │                                                                                                           │
   │    <Dimension function={} />                                                                              │
   │    <Group function={} />                                                                                  │
   │                                                                                                           │
   │    /*                                                                                                     │
   │        create a manifest of dimensions / groups by attribute:                                             │
   │        manifest = [                                                                                       │
   │            {name: 'Attribute 1', dimension: <cf dim>, group: <cf group>}                                  │
   │        ]                                                                                                  │
   │    */                                                                                                     │
   │                                                                                                           │
   │    /* child element now has access to the entire crossfilter state                                        │
   │    in a very digestable format */                                                                         │
   │    <Dashboard data={manifest} />                                                                          │
   │</Crossfilter>                                                                                             │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   │                                                                                                           │
   └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘