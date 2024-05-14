export function isSearchQuery(
  searchQuery: string | string[]
): searchQuery is string {
  if (typeof searchQuery === "string") {
    return true;
  } else if (Array.isArray(searchQuery)) {
    return true;
  } else {
    return false;
  }
}
