import { HttpService } from './http';

const allEl = [];

class GeneralService {
  /**
   * Init
   */
  public constructor(private http: HttpService) {}

  /**
   * Request
   */
  public request = () =>
    this.http.request({
      method: 'GET',
      url: '/in-progress'
    });

  public fetchEl = (id) => {
    return allEl;
  };
  public addEl = (allData, newData) => {
    return [...allData, ...[newData]];
  };
  public removeEl = (id, allData) => {
    return allData.filter((el) => el.id !== id);
  };
  public pruductView = (id) => {
    return id;
  };
  public addComment = (id, commentData, allData) => {
    const oldComments = allData.filter((el) => el.id === id)[0].comments;

    const currentComment = [...oldComments, ...[commentData]];

    return allData.map((el) => {
      if (el.id === id) {
        return { ...el, comments: currentComment };
      } else {
        return el;
      }
    });
  };
  public editProduct = (id, newValues, allData) => {
    console.log(id, newValues);
    return allData.map((el) => {
      if (el.id === id) {
        console.log(el.id, id);
        return {
          ...el,
          name: newValues.name,
          count: newValues.count,
          imageUrl: newValues.imageUrl,
          size: newValues.size,
          weight: newValues.weight
        };
      } else {
        return el;
      }
    });
  };
}
export { GeneralService };
