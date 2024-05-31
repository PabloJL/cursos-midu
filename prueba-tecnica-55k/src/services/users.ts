export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(
    `https://randomuser.me/api?results=10&seed=midudev&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Error on the request");
      return await res.json();
    })
    .then((res) => {
      const currentPage = Number(res.info.page);
      const nextCursor = currentPage > 10 ? undefined : currentPage + 1;
      return {
        users: res.results,
        nextCursor,
      };
    });
};
