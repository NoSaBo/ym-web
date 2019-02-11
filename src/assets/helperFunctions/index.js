
export const capitalize = (word) => {
    const response = word.toLowerCase();
    return response.charAt(0).toUpperCase() + response.slice(1);
}