
const HighlightAndTruncateText = ({ text, keyword, maxLength }: { text: string, keyword: string, maxLength: number }) => {
    // Function to truncate the text around the keyword
    const truncateText = (text : string, keyword : string, maxLength : number) => {
        const keywordIndex = text.toLowerCase().indexOf(keyword.toLowerCase());

        if (keywordIndex === -1) {
            // Keyword not found, truncate normally
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        }

        // Find the start and end indices for the truncated text
        const start = Math.max(keywordIndex - Math.floor(maxLength / 2), 0);
        const end = Math.min(start + maxLength, text.length);

        let truncated = text.substring(start, end);

        // Add ellipsis if text is truncated from the start or end
        if (start > 0) truncated = '...' + truncated;
        if (end < text.length) truncated += '...';

        return truncated;
    };

    const truncatedText = truncateText(text, keyword, maxLength);

    // Function to highlight the keyword in the text
    const getHighlightedText = (text : string, keyword : string) => {
        const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === keyword.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return <div>{getHighlightedText(truncatedText, keyword)}</div>;
};

export default HighlightAndTruncateText;