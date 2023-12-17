export default class GraphLanguage {
  public static Graph = {
    hac: {
      env: {
        get: {
          expression: "function(key: string): string",
          execution: (x: string): string => {
            return "hello world " + x;
          }
        },
        set: {
          expression: "function(key: string, value: string)",
          execution: (key: string, value: string) => {
            console.log(`${key} -> ${value}`);
          }
        }
      }
    }
  }
}
