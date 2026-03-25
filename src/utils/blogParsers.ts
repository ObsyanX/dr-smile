export const parseDocx = async (file: File): Promise<string> => {
  throw new Error("DOCX parsing requires a backend server. Please copy-paste the text or upload as a .txt file.");
};

export const parsePdf = async (file: File): Promise<string> => {
  throw new Error("PDF parsing is not natively supported in the browser without a backend server. Please copy-paste the text or upload as a .docx or .txt file.");
};

export const parseTxt = async (file: File): Promise<string> => {
  try {
    const text = await file.text();
    return text
      .split('\n\n')
      .map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');
  } catch (error) {
    throw new Error("Failed to parse TXT file");
  }
};
