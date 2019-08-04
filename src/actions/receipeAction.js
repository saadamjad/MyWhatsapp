// import performRequest from '../services/networkProvider';
import images from "../appConfig/image";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function getBreakfastList(data) {
  return async (dispatch, getState) => {
    dispatch({
      type: 'breakfastList',
      subtype: 'loading',
    });
    // const token = getState().user.token;
    // const response = await performRequest('breakfastList', null, 'GET', token);
    let response = ([
      {
        id: 1,
        itemName: "Breakfast",
        price: '$10.00',
        dishName: 'Cracker barrel',
        image: images.bfCrackerBarrel
      },
      {
        id: 2,
        itemName: "Breakfast",
        price: '$12.00',
        dishName: 'Egg sandwich',
        image: images.bfEggSandwich
      }, {
        id: 3,
        itemName: "Breakfast",
        price: '$15.00',
        dishName: 'Masala puri',
        image: images.bfMasalaPuri
      }, {
        id: 4,
        itemName: "Breakfast",
        price: '$18.00',
        dishName: 'Pizza',
        image: images.bfPizza
      }, {
        id: 5,
        itemName: "Breakfast",
        price: '$10.00',
        dishName: 'Cracker barrel',
        image: images.bfCrackerBarrel
      }, {
        id: 6,
        itemName: "Breakfast",
        price: '$15.00',
        dishName: 'Masala puri',
        image: images.bfMasalaPuri
      }
    ]);

    if (response.error) {
      dispatch({
        type: 'breakfastList',
        error: response.error,
      });
    } else {
      dispatch({
        type: 'breakfastList',
        subtype: 'success',
        breakfast: response,
      });
    }
  };
}

export function getBookMarkedReceipe(receipe) {
  return async (dispatch, getState) => {
    let receipes = getState().bookMarkedReceipe.bookMarkedReceipe || [];

    if (receipe) {
      let isExisting = receipes.some((singleReceipe) => singleReceipe.id == receipe.id);
      if (!isExisting) {
        receipes.push(receipe);
      }
    }
    dispatch({
      type: 'bookMarkedReceipe',
      receipe: receipes
    });
  }
}

export function removeBookMarkedReceipe(id) {
  return async (dispatch, getState) => {
    let receipes = getState().bookMarkedReceipe.bookMarkedReceipe;

    if (receipes) {
      receipes.splice(receipes.findIndex(x => x.id == id), 1)
    }
    dispatch({
      type: 'bookMarkedReceipe',
      receipe: receipes
    });
  }
}

export function getLikeReceipe(likeData) {
  return async (dispatch, getState) => {
    let likeReceipes = getState().likeReceipe.likeReceipe || [];
    if (likeData) {
      let isExisting = likeReceipes.some((singleLikeReceipe) => singleLikeReceipe.id == likeData.id);
      if (!isExisting) {
        likeReceipes.push(likeData)
      }
    }
    dispatch({
      type: 'likeReceipe',
      likeData: likeReceipes
    });
  }
}

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

