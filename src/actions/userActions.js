export function getAddReceipe(data) {
  return async (dispatch, getState) => {
    let addReceipes = getState().addReceipe.addReceipe || [];
    addReceipes.push(data)
    dispatch({
      type: 'addReceipe',
      data: addReceipes
    });
  }
}

