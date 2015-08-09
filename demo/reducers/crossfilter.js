import * as action from '../constants/ActionTypes';
import crossfilter from 'crossfilter';

const initialState = {};

export default function crossfilterdata(state = initialState, action) {
  switch (action.type) {

    case 'CREATED_CROSSFILTER':
      const dataset        = crossfilter(action.data.dataset);
      const dimensions     = {};
      const groups         = {};
      const dimensionTypes = {};

      action.data.attributes.map(attribute => {
        dimensions[attribute.name]     = dataset.dimension(attribute.dimension);
        groups[attribute.name]         = dimensions[attribute.name].group(attribute.group || ((data) => data));
        dimensionTypes[attribute.name] = attribute.type;
      });

      return {
        ...state,
        all           : dataset.groupAll(),
        dataset       : dataset,
        dimensions    : dimensions,
        dimensionTypes: dimensionTypes,
        groups        : groups
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
