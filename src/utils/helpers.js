//------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
//------------------------------------------------------------------------------

import findBy from 'array-find-by';

//------------------------------------------------------------------------------
// Check if category exists
//------------------------------------------------------------------------------
export function categoryExists(categoryPath, categories) {
  const match = findBy.call(categories, 'path', categoryPath);
  return match[1] !== -1 ? true : false;
}

//------------------------------------------------------------------------------
// Make id
//------------------------------------------------------------------------------
export function makeId(length) {
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for(var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
