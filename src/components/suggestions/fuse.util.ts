import Fuse from "fuse.js";

export function createFuseObject(list: any, keys: string[]) {
  return new Fuse(list, getFuseOptions(keys));
}

function getFuseOptions(keys: string[]) {
  return {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [...keys]
  };
}
