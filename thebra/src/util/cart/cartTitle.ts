
export const truncateCartTitleLength = (title: string): string => {
    let maxLength
    if (title.length > 20) {
        maxLength = 18
    } else {
        maxLength = 15
    }
    const truncatedTitle = title.substring(0, maxLength) + '...';
    return truncatedTitle
}