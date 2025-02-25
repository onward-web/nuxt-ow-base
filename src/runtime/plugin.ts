import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  const { currentRoute } = useRouter();

  const isIndexRoute = computed(() => {
    let resultSearchIndex = false;
    if( currentRoute && currentRoute.value && currentRoute.value.name){
      resultSearchIndex  =  currentRoute.value.name.includes('index');
    }
    return resultSearchIndex;
  });

  const waitGlobalVarible = async (varibleName: any) => {
    while (!window || !window.hasOwnProperty(varibleName)) {
      // console.log("waiting for variable");
      // define the condition as you like
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  const phoneFormatToTel = (phone:any):string => {
    if(typeof phone !== 'string' && phone instanceof String){
      phone = phone.toString();
    }
    return 'tel:'+phone.replace(/ /g,'');
  };

  const strReplaceSpaces = (str:any):string => {
    if(typeof str !== 'string' && str instanceof String){
      str = str.toString();
    }
    return str.replace(/ /g,'');
  };


  const valueInObjectByPath = (entityObj:object, searchPath:any) => {

    searchPath = String(searchPath);

    searchPath = searchPath.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    searchPath = searchPath.replace(/^\./, '');           // strip a leading dot
    var arrayKeys = searchPath.split('.');
    for (var i = 0, n = arrayKeys.length; i < n; ++i) {
      var k = arrayKeys[i];

      if ((Array.isArray(entityObj) ||  typeof entityObj === 'object')  && k in entityObj) {
        entityObj = entityObj[k];
      } else {
        return null;
      }
    }
    return entityObj;

  };


  const getPhoneByMark = (phones:array, mark:string):array => {

    return phones
      .filter(function (item) {
        return item.hasOwnProperty(mark)
      }).reduce(function (result, item) {
        result.push(item.phone);
        return result;
      }, []);
  };






  return {
    provide: {
      isIndexRoute: isIndexRoute,
      waitGlobalVarible: waitGlobalVarible,
      phoneFormatToTel: phoneFormatToTel,
      strReplaceSpaces: strReplaceSpaces,
      valueInObjectByPath: valueInObjectByPath,
      getPhoneByMark: getPhoneByMark,
    },
  };
});



declare module '#app' {
  interface NuxtApp {
    $isIndexRoute: boolean
    $waitGlobalVarible: any
    $phoneFormatToTel: string
    $strReplaceSpaces: string
    $valueInObjectByPath: any
    $getPhoneByMark: array

  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $isIndexRoute: boolean
    $waitGlobalVarible: any,
    $phoneFormatToTel: string,
    $strReplaceSpaces: string,
    $valueInObjectByPath: any,
    $getPhoneByMark: array
  }
}



