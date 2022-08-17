export const isElementInArray = (arr: any, id: any) => {
   let isInArray = arr.findIndex(
      (el: any) => el.id === id || el.item_shop_id === id
   );
   return isInArray > -1;
};

export const toggleArrayElement = (arr: any, value: any) => {
   if (arr.includes(value)) return arr.filter((i: any) => i != value);
   else return [...arr, value];
};

export const checkSelectedFeatureValue = (
   values: any,
   feature_value_ids: any
) => {
   return values.some(
      (item: any) => feature_value_ids.indexOf(`${item.id}`) >= 0
   );
};

export const stringToArrayParser = (query: any) => {
   if (query) {
      let str = query.toString();
      if (str && str.length) {
         if (str.includes(",")) return str.split(",");
         else return [str];
      } else return [];
   } else return [];
};

export const getAsString = (value: string | string[]): string => {
   if (Array.isArray(value)) {
      return value[0];
   }
   return value;
};

export const splitArrayIntoChunksOfLen = (array: any, parts: number) => {
   // let chunks = [], i = 0, n = arr.length;
   // while (i < n) {
   //    chunks.push(arr.slice(i, i += len));
   // }
   // return chunks;
   let result = [];
   for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
   }
   return result;
};
