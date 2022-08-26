import dirTree from "directory-tree";

export const getPaths = () => {
  const tree = dirTree("./pages/", { attributes: [], depth: 10 });

  let paths = tree.children.map((dir) => [...getChildrenPaths(dir)]).flat(10);

  return paths;
};

const getChildrenPaths = (dir) => {
  if (dir.children) {
    return dir.children.map((dir) => getChildrenPaths(dir));
  } else {
    return [dir.path];
  }
};
