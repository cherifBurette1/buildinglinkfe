export class FileValidator {
    static isValidFile(file: File, allowedExtensions: string[]): boolean {
      if (!file) {
        return false;
      }
      const extension = file.name.split('.').pop()?.toLowerCase();
      return allowedExtensions.includes(extension || '');
    }
  }
  