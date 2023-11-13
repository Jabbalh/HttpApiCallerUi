import {IRestCollection, RestRequest} from "src/models/model";
import {uid} from "quasar";

export default class RestCollection implements IRestCollection {
  public id = uid();
  public isOpen = false;
  public isActive = false;
  public isCollection = true;
  public name = "";
  public isSaved = true;
  public childs: IRestCollection[] = [];
  public isLocal = true;
  public requests: RestRequest[] = [];
  public get nodes(): (IRestCollection | RestRequest)[] {
    return [...this.childs, ...this.requests];
  }

  constructor(value?: IRestCollection){
    if (value) {
      this.id = value.id;
      this.name = value.name;
      this.isOpen = value.isOpen;
      this.isActive = value.isActive;
      this.isCollection = value.isCollection;
      this.isSaved = value.isSaved;
      this.childs = value.childs;
      this.isLocal = value.isLocal;
      this.requests = value.requests;
    }
  }
}
