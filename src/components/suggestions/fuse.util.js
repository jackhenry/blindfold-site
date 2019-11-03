import Fuse from "fuse.js";

export function createFuseObject(list, keys) {
  return new Fuse(list, getFuseOptions(keys));
}

function getFuseOptions(keys) {
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
