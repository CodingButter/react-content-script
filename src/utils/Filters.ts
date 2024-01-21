const fuzzyWordMatch = (needle: string, haystack: string) => {
    const needleWords = needle.split(" ");
    const haystackWords = haystack.split(" ");
    const spaced = needleWords.every(needleWord => {
        return haystackWords.some(haystackWord => {
            return haystackWord.includes(needleWord);
        });
    });
    const hyphanated = haystack.split("-");
    const byHyphen = needleWords.every(needleWord => {
        return hyphanated.some(haystackWord => {
            return haystackWord.includes(needleWord);
        });
    });
    return spaced || byHyphen;
}

export const fuzzyObjectSearch = <T = { [key: string]: string | number },>(objects: T[], query: string): T[] => {
    return objects.reduce((acc: T[], obj: T) => {
        if (fuzzyWordMatch(query.toLowerCase(), JSON.stringify(obj).toLowerCase())) {
            acc.push(obj)
        }
        return acc;
    }, []);
}