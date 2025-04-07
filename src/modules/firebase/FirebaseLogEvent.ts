// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { getAnalytics, logEvent } from 'firebase/analytics';

// type EventParams = {
//   [key: string]: any;
// };

// export async function logEventTracking(
//   event: string,
//   extraParam: EventParams = {},
// ): Promise<void> {
//   logEvent(getAnalytics(), event, { ...extraParam });
// }

// export async function logPageView(
//   pageName: string,
//   extraParam: EventParams = {},
// ): Promise<void> {
//   console.log('pageName: ', pageName);
//   logEvent(getAnalytics(), FirebaseLogEvent.pageView, {
//     screen_view: pageName,
//     user_agent: navigator.userAgent,
//     ...extraParam,
//   });
// }

// export const FirebaseLogEvent = {
//   pageView: 'page_view',
//   landing_page_press_download_google: 'landing_page_press_download_google',
//   landing_page_press_download_apple: 'landing_page_press_download_apple',
//   landing_page_press_download_header: 'landing_page_press_download_header',
// };

// export const PAGE_VIEW = {};
