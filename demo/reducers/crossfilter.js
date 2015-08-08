import * as action from '../constants/ActionTypes';
import crossfilter from 'crossfilter';
import d3 from 'd3';

const genData = () => {
  var data = [];
  //d3.range(1000).map(d3.random.bates(10))
  for (var i = 0; i < 200000; i++) {
    data.push({
      index: i,
      a    : Math.min(199, Math.max(0, d3.random.normal(100, 50)())),
      b    : Math.random() * 200,
      c    : Math.min(199, Math.max(0, d3.random.normal(100, 25)())),
    })
  }

  return data;
};

const data   = genData();
const cf     = crossfilter(data);
const dims   = {
  a: cf.dimension(function (d) {
    return d.a;
  }),
  b: cf.dimension(function (d) {
    return d.b;
  }),
  c: cf.dimension(function (d) {
    return d.c;
  })
};
const groups = {
  a: dims.a.group(d => Math.floor(d / 5) * 5),
  b: dims.b.group(d => Math.floor(d / 5) * 5),
  c: dims.c.group(d => Math.floor(d / 5) * 5)

};


/* run-time crossfilters */

const initialState = {
  data       : data,
  crossfilter: cf,
  all        : cf.groupAll(),
  dims       : dims,
  groups     : groups,
  dimensions: {},
  dimensionTypes: {},
  dataset: null
};

export default function crossfilterdata(state = initialState, action) {
  switch (action.type) {

    case 'CREATED_CROSSFILTER':
      const dataset = crossfilter(action.data.dataset);
      const dims = {};
      const dimTypes = {};
      action.data.dimensions.map(dimension => {
        dims[dimension.name] = dataset.dimension(dimension.function);
        dimTypes[dimension.name] = dimension.type;
      });
      const grps = {};
      action.data.groups.map(group => {
        grps[group.name] = dims[group.name].group(group.function)
      });
      return {
        ...state,
        dataset: dataset,
        dimensions: dims,
        dimensionTypes: dimTypes,
        grps: grps
      };

    case 'CREATED_DIMENSION':
      const name = action.data.name;
      const stateDimensions = state.dimensions;
      stateDimensions[name] = state.dataset.dimension(action.data.function);

      return {
        ...state,
        dimensions: stateDimensions
      };

    case 'FILTERED_DIMENSION':
      if (action.data.clear) {
        action.data.dimension.filterAll()
      } else {
        action.data.dimension.filter(action.data.values);
      }
      return {
        ...state
      };
    //return {
    //  ...state,
    //  crossfilter: action.data,
    //  dimensions :,
    //};

    default:
      return state;
  }
}
