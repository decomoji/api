import DecomojiAll from "decomoji/configs/v5_all.json" assert { type: "json" };

export default DecomojiAll.map((v) =>
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
