import {IRestCollection, RestRequest} from 'src/models/model';
import {useTypeVerify} from 'src/composables/TypeVerify';

export type CollectionTreeView = (RestRequest | IRestCollection) & {
  icon?: string,
  children: CollectionTreeView[]
};



const useTreeViewCollection = () => {
  const {isRestCollection} = useTypeVerify()
  const transform = (values: (IRestCollection | RestRequest)[]) => {
    console.log("transform");
    const result: CollectionTreeView[] = [];
    for (const item of values){
      const tmp: CollectionTreeView = {
        ...item,
        children: []
      };

      if (isRestCollection(item)){
        tmp.children.push(...transform(item.childs));
        tmp.children.push(...transform(item.requests));
      }
      result.push(tmp);
    }

    return result;
  }

  return {
    transform
  }
}

export default useTreeViewCollection;
