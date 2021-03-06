import { runQuery } from "~/node_common/data/utilities";

export default async ({ userId, publicOnly = false }) => {
  return await runQuery({
    label: "GET_SLATES_BY_USER_ID",
    queryFn: async (DB) => {
      const hasUser = (id) => DB.raw(`?? @> ?::jsonb`, ["data", JSON.stringify({ ownerId: id })]);
      const isPublic = () => DB.raw(`?? @> ?::jsonb`, ["data", JSON.stringify({ public: true })]);

      let query;
      if (publicOnly) {
        query = await DB.select("*").from("slates").where(hasUser(userId)).where(isPublic());
      } else {
        query = await DB.select("*").from("slates").where(hasUser(userId));
      }

      if (!query || query.error) {
        return [];
      }

      return query;
    },
    errorFn: async (e) => {
      return {
        error: "GET_SLATES_BY_USER_ID",
        source: e,
      };
    },
  });
};
