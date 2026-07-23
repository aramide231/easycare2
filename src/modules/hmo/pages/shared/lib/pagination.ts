export const HMO_PAGE_SIZE = 20;
export const MOCK_HMO_LIST_TOTAL = 40;

/** Pad seed rows up to `total` so paginated HMO lists show 20 items per page. */
export function expandMockRecords<T>(
  seed: T[],
  total: number,
  mapExtra: (base: T, index: number) => T,
): T[] {
  if (seed.length >= total) return [...seed];

  const records = [...seed];
  for (let index = seed.length; index < total; index += 1) {
    records.push(mapExtra(seed[index % seed.length], index));
  }
  return records;
}
