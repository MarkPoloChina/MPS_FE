const CN_KEY_MAP = {
  create_time: "创建时间",
  update_time: "完稿时间",
  revision_time: "修订时间",
  revision_no: "修订号",
  parent: "原文",
};

const parseMetadataDict = (metaJson: string, needCN = false) => {
  try {
    const metaDict = JSON.parse(metaJson);
    if (typeof metaDict === "object" && metaDict !== null) {
      if (!needCN) return metaDict as Record<string, string>;
      else {
        const cnDict: Record<string, string> = {};
        for (const key in CN_KEY_MAP) {
          if (key in metaDict) {
            const v = key.endsWith("_time")
              ? new Date(metaDict[key]).toLocaleString()
              : String(metaDict[key]);
            cnDict[CN_KEY_MAP[key as keyof typeof CN_KEY_MAP]] = v;
          }
        }
        return cnDict;
      }
    }
    return {};
  } catch {
    return {};
  }
};

const parseMetadataList = (metaJson: string, needCN = false) => {
  return Object.entries(parseMetadataDict(metaJson, needCN)).map(([k, v]) => {
    return { key: k, value: v };
  });
};

const parseMetadataTags = (metaJson: string) => {
  const dict = parseMetadataDict(metaJson);
  return [
    ...(dict.tags ?? []),
    ...(dict.collections ?? []),
  ];
};

export { parseMetadataDict, parseMetadataTags, parseMetadataList };
