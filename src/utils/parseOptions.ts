const parseOptions = (options: string[]) => {
    let stickerName = null;
    let stickerAuthor = null;

    options.forEach((option) => {
        if (option.startsWith('name=')) {
            stickerName = option.split('=')[1].replace('"', '');
        } else if (option.startsWith('author=')) {
            stickerAuthor = option.split('=')[1].replace('"', '');
        }
    });

    return { stickerName, stickerAuthor };
};

export default parseOptions;