/* eslint-disable no-var */
import { isUndefined } from 'lodash';

export const isValidateLink = (link: string) => {
  const pattern =
    /^(https?:\/\/)?([\w\d-]+\.)+[\w\d-]+(\/[\w\d- ;,./?%&=]*)?$/i;
  return pattern.test(link) && !link.includes(' ');
};

export const isValidateYoutubeLink = (text: string) => {
  const youtubePattern =
    /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/i;
  return youtubePattern.test(text);
};

export const validateLink = (
  link: string,
  type: 'general' | 'youtube' = 'general',
) => {
  const generalPattern =
    /^(https?:\/\/)?([\w\d-]+\.)+[\w\d-]+(\/[\w\d- ;,./?%&=]*)?$/i;
  const youtubePattern =
    /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/i;

  if (link.includes(' ')) return false; // Prevent spaces in links

  return type === 'youtube'
    ? youtubePattern.test(link)
    : generalPattern.test(link);
};

export const isGreaterThan60Minutes = (milliseconds: number): boolean => {
  const sixtyMinutesInMilliseconds = 3600000;
  return milliseconds > sixtyMinutesInMilliseconds;
};

export const isHTML = (text: string) => {
  const htmlRegex = /<\/?[a-z][\s\S]*>/i;
  return htmlRegex.test(text);
};

/**
 * ! Handling Audio Server Side
 * https://github.com/jsierles/react-native-audio/issues/107
 */

/**
 * The function `millisecondsToTimeString` converts a given number of milliseconds into a formatted
 * time string in the format "mm:ss".
 * @param {number} milliseconds - The `milliseconds` parameter is a number representing the duration in
 * milliseconds that you want to convert to a time string.
 * @returns The function `millisecondsToTimeString` returns a string in the format "mm:ss", where "mm"
 * represents the minutes and "ss" represents the seconds.
 */
export const millisecondsToTimeString = (milliseconds: number | undefined) => {
  // Check if the input is not a valid number or is negative
  if ((milliseconds && isNaN(milliseconds)) || isUndefined(milliseconds)) {
    return '00:00:00';
  }
  // format is HH:MM:SS
  const totalSeconds = milliseconds / 1000;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Convert the hours, minutes, and seconds into a formatted time string
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // Return the formatted time string
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Returns the current date and time as a formatted string.
 * The format replaces all slashes, spaces, and colons with hyphens,
 * and removes any commas.
 *
 * @returns {string} The formatted date string.
 */
export const getDateString = () => {
  const date = new Date().toLocaleString();
  return `${date.replace(/[\/\s:]/g, '-')}`.replace(/,/, '');
};

/**
 * Get the current date formatted as yymmdd-ssssss
 * @returns {string} The formatted date string.
 */
export function getFormattedDate(): string {
  const now = new Date();

  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  // Get seconds since midnight correctly
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);

  const secondsSinceMidnight = Math.floor(
    (now.getTime() - midnight.getTime()) / 1000,
  );

  const ssssss = String(secondsSinceMidnight).padStart(6, '0');

  return `${yy}${mm}${dd}-${ssssss}`;
}

export function encodeFilename(filename: string | null) {
  if (!filename) {
    return '';
  }
  return encodeURIComponent(filename)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

export const randomUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatSummary = (summary: string) => {
  if (summary?.includes('detailContainer')) {
    return summary
      ?.replace(/\s*style="[^"]*"/g, '')
      .replace(/<ol>/g, '<ul>')
      .replace(/<\/ol>/g, '</ul>');
  }
  return (
    '<div class="detailContainer">' +
    summary
      ?.replace(/\s*style="[^"]*"/g, '')
      .replace(/<ol>/g, '<ul>')
      .replace(/<\/ol>/g, '</ul>') +
    '</div>'
  );
};
