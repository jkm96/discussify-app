import {toast} from "react-toastify";

export const copyLinkToClipboard = (path:any) => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const fullUrl = `${url.origin}${path}`;

    navigator.clipboard.writeText(fullUrl)
        .then(() => {
            toast.info('Link copied to clipboard!');
        })
        .catch((err) => {
            console.error('Failed to copy: ', err);
        });
};
