/* eslint-disable @typescript-eslint/no-explicit-any */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function isNullOrEmpty(data: any | any[]): boolean {
  if (data?.size > 0) {
    return false;
  }
  if (!data) {
    return true;
  }
  if (data instanceof Array) {
    return data.length === 0;
  }
  if (typeof data === 'number') {
    return false;
  }
  if (typeof data === 'undefined') {
    return true;
  }
  if (typeof data === 'object') {
    return Object.keys(data).length === 0;
  }

  let output = data;
  if (typeof output !== 'string') {
    output = output.toString();
  }
  output = output.trim();

  return output.length <= 0;
}

export const isEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase());
};

export function getVideoIdFromUrl(ytUrl: string) {
  if (!ytUrl || typeof ytUrl !== 'string' || ytUrl.trim() === '') {
    return null;
  }

  const regex =
    /http(?:s)?:\/\/(?:m\.)?(?:www\.)?youtu(?:\.be\/|(?:be-nocookie|be)\.com\/(?:watch|[\w]+(?:\?(?:feature=[\w]+\.[\w]+&)?v=|v\/|e\/|embed\/|live\/|shorts\/|user\/(?:[\w#]+\/)+)))([^&#?\n]+)/;
  const match = ytUrl.match(regex);

  return match ? match[1] : null;
}

export const removeAccents = (str: string) => {
  return str?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');
};

export const printDocument = (name?: string) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Generates a unique filename
  const filename = `pdf-${timestamp}.pdf`;
  const input = document.getElementById('divToPrint');
  html2canvas(input as HTMLElement).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const scaleFactor = Math.min(
      pdfWidth / canvasWidth,
      pdfHeight / canvasHeight,
    );
    const imgHeight = canvasHeight * scaleFactor;
    const leftMargin = 10; // Left margin in mm
    const rightMargin = 10; // Right margin in mm
    const adjustedImgWidth = pdfWidth - leftMargin - rightMargin;
    const titleHeight = 10; // Space for the title
    const imageYPos = titleHeight + 10; // Add space between title and image
    pdf.setFontSize(16);
    if (!isNullOrEmpty(name)) {
      pdf.text(name ?? '', leftMargin, 10);
    }
    pdf.addImage(
      imgData,
      'PNG',
      leftMargin,
      imageYPos,
      adjustedImgWidth,
      imgHeight,
    );
    pdf.save(filename);
  });
};
