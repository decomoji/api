import express from "express";
import DecomojiAll from "decomoji/configs/v5_all.json" assert { type: "json" };

const PORT = process.env.PORT || 3000;

const isFalsyString = (v) => {
  return v === "" || v === null || v === undefined;
};

// v5_all.json にカテゴリープロapティを加えたものをDBとする
const DecomojiDB = DecomojiAll.map((v) =>
  v.path.match(/basic/)
    ? {
        ...v,
        category: "basic",
      }
    : v.path.match(/explicit/)
    ? {
        ...v,
        category: "explicit",
      }
    : v.path.match(/extra/)
    ? {
        ...v,
        category: "extra",
      }
    : v
);

// query に対してマッチ
const matches = (
  {
    category: decomojiCategory,
    created: decomojiCreated,
    name: decomojiName,
    updated: decomojiUpdated,
  },
  {
    category: queryCategory,
    created: queryCreated,
    name: queryName,
    updated: queryUpdated,
  }
) => {
  // 受け入れ可能なパラメータのいずれかが存在するか
  const isValidParams =
    queryCategory || queryCreated || queryName || queryUpdated;

  // name パラメータが decomoji.name に正規表現で一致するか、または無効な指定か
  const nameMatches =
    RegExp(queryName).test(decomojiName) || isFalsyString(queryName);

  // category パラメータが decomoji.category に一致するか、または無効な指定か
  const categoryMatches =
    queryCategory === decomojiCategory || isFalsyString(queryCategory);

  // created パラメータが decomoji.created に一致するか、または無効な指定か
  const createdMatches =
    queryCreated === decomojiCreated || isFalsyString(queryCreated);

  // updated パラメータが decomoji.updated に一致するか、または無効な指定か
  const updatedMatches =
    queryUpdated === decomojiUpdated || isFalsyString(queryUpdated);

  return (
    isValidParams &&
    nameMatches &&
    categoryMatches &&
    createdMatches &&
    updatedMatches
  );
};

const app = express();

app.get("/search", (req, res) => {
  const result = DecomojiDB.filter((v) => matches(v, req.query));

  // key パラメータがあればその値のみ配列で返す
  if (req.query.key) {
    return res.json(result.map((v) => v[req.query.key]));
  } else {
    return res.json(result);
  }
});

app.listen(PORT, () => {
  console.log("listening decomoji-api server");
});
