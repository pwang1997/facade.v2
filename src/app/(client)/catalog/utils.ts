interface Item {
  id: number;
  name: string;
  parentId: number | null;
  children?: Item[];
}

interface Post {
  postId: number;
  title: string;
  categoryId: number;
}

export function buildNestedStructure(data: Item[]): Item[] {
  const idMap = new Map<number, Item>();
  const root: Item[] = [];

  // Create a map of id to data objects
  data.forEach((item) => {
    idMap.set(item.id, { ...item, children: [] });
  });

  // Iterate through the data and build the nested structure
  data.forEach((item) => {
    const mappedItem = idMap.get(item.id);
    if (mappedItem) {
      if (item.parentId === null) {
        // No parentId means it's a root item
        root.push(mappedItem);
      } else {
        // Add to the parent's children array
        const parentItem = idMap.get(item.parentId);
        if (parentItem) {
          parentItem.children?.push(mappedItem);
        }
      }
    }
  });

  return root;
}

export function groupPostsByCategoryId(posts: Post[]) {
  return posts.reduce(
    (acc, cur) => {
      const key = cur.categoryId;

      if (acc[key] === null || acc[key] === undefined) {
        acc[key] = [];
      }
      acc[key].push(cur);

      return acc;
    },
    {} as Record<number, Post[]>,
  );
}
