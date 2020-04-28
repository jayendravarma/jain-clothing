import { createSelector } from 'reselect'



const selectShop = state => state.shop;

export const selectcollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectcollections],
    collections => Object.keys(collections).map(key => collections[key])
)
export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectcollections],
        collections => collections[collectionUrlParam]
        //collections => collections[collectionUrlParam]
    );
