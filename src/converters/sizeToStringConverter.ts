export default class SizeToStringConverter {
    public static convert(size: number): string {
        if (size === 0) {
            return '0';
        }
        if (size < 1024) {
            return size + ' B';
        }
        if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + ' KB';
        }
        if (size < 1024 * 1024 * 1024) {
            return (size / 1024 / 1024).toFixed(2) + ' MB';
        }
        return '0';
    }
}