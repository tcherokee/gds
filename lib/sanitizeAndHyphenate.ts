export const sanitizeAndHyphenate = (text: string) => {
  
  if (text) {
    const updatedText = text
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^\w-]/g, "");
    
    return updatedText;
  }
  
}