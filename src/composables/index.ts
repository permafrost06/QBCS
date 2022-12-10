export const isString = (data: any): data is string => {
    return typeof data === "string";
};

export const shuffleArray = <T>(arr: Array<T>) => {
    let currentIndex = arr.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex],
            arr[currentIndex],
        ];
    }

    return arr;
};

// https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
export const selectRandomElements = <T>(
    arr: Array<T>,
    num_elements: number
) => {
    // Shuffle array
    const shuffled = shuffleArray(arr);

    // Get sub-array of first n elements after shuffled
    const selected = shuffled.slice(0, num_elements);

    return selected;
};
