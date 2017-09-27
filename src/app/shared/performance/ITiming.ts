export interface ITiming {
  // Total time from start to load
  loadTime;
  // Time spent constructing the DOM tree
  domReadyTime;
  // Time consumed preparing the new page
  readyStart;
  // Time spent during redirection
  redirectTime;
  // AppCache
  appcacheTime;
  // Time spent unloading documents
  unloadEventTime;
  // DNS query time
  lookupDomainTime;
  // TCP connection time
  connectTime;
  // Time spent during the request
  requestTime;
  // Request to completion of the DOM loading
  initDomTreeTime;
  // Load event time
  loadEventTime;
}
