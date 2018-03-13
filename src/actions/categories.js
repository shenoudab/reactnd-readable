//------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
//------------------------------------------------------------------------------

export const CATEGORY_ADD = 'CATEGORY_ADD';
export const CATEGORY_SET_LIST = 'CATEGORY_SET_LIST';

export function categoryAdd({ name, path }) {
  return {
    type: CATEGORY_ADD,
    name,
    path
  };
}

export function categorySetList(categoryList) {
  return {
    type: CATEGORY_SET_LIST,
    categoryList
  };
}
