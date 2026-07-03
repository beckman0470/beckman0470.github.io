// V7.2.1 Content Index Helper

export function groupWorksBySeries(works) {
  return works.reduce((groups, work) => {
    const key = work.series || "未分類";
    groups[key] ||= [];
    groups[key].push(work);
    return groups;
  }, {});
}

export function getPublishedWorks(works) {
  return works.filter((work) => work.status === "published");
}
