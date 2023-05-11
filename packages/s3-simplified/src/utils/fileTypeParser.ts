// noinspection SpellCheckingInspection
const Dictionary: Record<string, string> = {
    "x-msdownload": "exe",
    "x-shockwave-flash": "swf",
    "x-tar": "tar",
    "x-zip-compressed": "zip",
    "x-rar-compressed": "rar",
    "x-7z-compressed": "7z",
    "x-bzip": "bz",
    "x-bzip2": "bz2",
    "x-gzip": "gz",
}

export const FileTypeParser = (mimeType: string): string => {
    const data = mimeType.split("/")[1];
    if (data === undefined) return "unknown";
    const ext = Dictionary[data];
    return ext !== undefined ? ext : data;
}
