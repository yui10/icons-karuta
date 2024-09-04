import Image from 'next/image';
import Link from 'next/link';

type XShareButtonProps = {
    message: string;
    hashtags: string;
    url: string;
};

const XShareButton = (props: XShareButtonProps) => {
    const { message, hashtags, url } = props;
    return (
        <Link
            href={`https://x.com/intent/post?text=${message}&hashtags=${hashtags}&url=${url}`}
            passHref
            target="_blank"
        >
            <Image
                unoptimized
                src="https://cdn.simpleicons.org/x/black"
                alt="x"
                width={32}
                height={32}
            />
        </Link>
    );
};

export default XShareButton;
