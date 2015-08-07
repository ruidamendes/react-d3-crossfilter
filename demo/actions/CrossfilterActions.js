import * as types from '../constants/ActionTypes';

export function createdCrossfilter(data) {
  return {
    type: types.CREATED_CROSSFILTER,
    data
  };
}

export function filteredDimension(data) {
  return {
    type: types.FILTERED_DIMENSION,
    data
  };
}