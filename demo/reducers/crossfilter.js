import * as action from '../constants/ActionTypes';
import crossfilter from 'crossfilter';

const initialState = {};

export default function crossfilterdata(state = initialState, action) {
  switch (action.type) {

    case 'CREATED_CROSSFILTER':
      const dataset  = crossfilter(action.data.dataset);
      const dims     = {};
      const dimTypes = {};
      action.data.dimensions.map(dimension => {
        dims[dimension.name]     = dataset.dimension(dimension.function);
        dimTypes[dimension.name] = dimension.type;
      });
      const grps     = {};
      action.data.groups.map(group => {
        grps[group.name] = dims[group.name].group(group.function)
      });
      return {
        ...state,
        all           : dataset.groupAll(),
        dataset       : dataset,
        dimensions    : dims,
        dimensionTypes: dimTypes,
        grps          : grps
      };

    case 'FILTERED_DIMENSION':
      if (action.data.clear || action.data.values.length == 0) {
        action.data.dimension.filterAll()
      } else if (action.data.ordinal) {
        action.data.dimension.filterFunction((d) => {
          return action.data.values.indexOf(d) >= 0;
        });
      } else {
        action.data.dimension.filter(action.data.values);
      }
      return {
        ...state
      };
    default:
      return state;
  }
}
