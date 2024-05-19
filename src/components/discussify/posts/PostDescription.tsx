import DOMPurify from 'dompurify';
import './PostDescription.css';

function PostDescription({ description }:{description:string}) {
    const sanitizedDescription = DOMPurify.sanitize(description);

    return (
        <div className='post-description' dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    );
}

export default PostDescription;
