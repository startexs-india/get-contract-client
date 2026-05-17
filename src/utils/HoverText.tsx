export function HoverText({ text, maxLength }) {
    return (
        <span className="relative group cursor-pointer">

            {/* Shortened Text */}
            {shortenText(text, maxLength)}

            {/* Tooltip */}
            {text?.length > maxLength && (
                <span className="absolute left-0 top-full mt-1
                    hidden group-hover:block
                    bg-black text-white text-sm px-2 py-1 rounded shadow-lg 
                    whitespace-nowrap z-50">
                    {text}
                </span>
            )}
        </span>
    );
}


function shortenText(text, maxLength) {
    if (!text) return "";
    return text?.length > maxLength
        ? text.slice(0, maxLength) + "..."
        : text;
}
