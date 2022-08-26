import dirTree from "directory-tree";

export const pagesDynamicEdgeProps = (NextRequest) => {
  const tree = dirTree("./pages/", { attributes: [], depth: 10 });

  let pages = tree.children.map((dir) => [...getChildrenPaths(dir)]).flat(10);
  let edgeProps = [];
  for (page in pages) { 
    
    try {
      import  dynamicEdgeProps as page+'dynamicEdgeProps' from `page`;
      edgeProps.push( { page, dynamicEdgeProps(NextRequest) })


     } catch (e) { }
  }

  console.log(files);
};

const getChildrenPaths = (dir) => {
  if (dir.children) {
    return dir.children.map((dir) => getChildrenPaths(dir));
  } else {
    return [dir.path];
  }
};
dynamicProps();
