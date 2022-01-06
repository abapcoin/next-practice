import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// 이미지 클릭시 큰 이미지(상세화면)
const index = ({ photo }) => {
    return (
        <div>
            <h2>{photo.title}</h2>
            <Image
                src={photo.url}
                width={500}
                height={500}
            />
            <Link href="/photos">
                <a>go back</a>
            </Link>
        </div>
    )
}

// getStaticPaths -> getStaticProps 호출순서 
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
    const photo = await res.json();
    return {
        props: {
            photo
        }
    }
}

//photos/1 다이나믹으로 요청받을때 필요
//허용 다이나믹 값을 지정함 
export const getStaticPaths = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`);
    const photos = await res.json();
    const ids = photos.map(photo => photo.id);
    const paths = ids.map(id => {
        return {
            params: { id: id.toString() }
        }
    })

    return {
        paths: paths,
        fallback: false,
    }
}


export default index
