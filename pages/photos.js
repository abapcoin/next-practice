import { HeadInfo } from "../components/HeadInfo"
import Image from 'next/image'
import photosStyles from "../styles/Photos.module.css"
import Link from 'next/link'

//섬네일 이미지 보여주기 
const photos = ({ photos }) => {
    return (
        <div>
            <HeadInfo title="My Blog Photos" />
            <h1>My photos</h1>
            <ul className={photosStyles.photos}>
                {photos.map(photo => (
                    <li key={photo.id}>
                        <Link href={`/photos/${photo.id}`}>
                            <a>
                                <Image src={photo.thumbnailUrl} width={100} height={100} alt={photo.title} />
                                <span>{photo.title}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`);
    const photos = await res.json();

    return {
        props: {
            photos
        },
        revalidate: 20  // 20초 뒤에 데이터 받아오도록 설정 
    }
}

export default photos
