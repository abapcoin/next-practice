
export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <h1>Welcome to My blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

// SSR 방식 : 지정된 함수명 getServerSideProps 
// 서버 데이터 변경될때 바로 페이지에 반영되게할때 사용 
// 실시간으로 데이터를 보여줘야할때 사용 
// export const getServerSideProps = async () => {
//   const url = 'http://localhost:8080/api/posts';
//   const res = await fetch(url)
//   // const res = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_end=10')
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     }
//   }
// }

//next.js에서는 아래 방식을 추천함 
//서버에 데이터가 변경되더라도 페이지 리플레쉬 반영안됨 
//빌드할때 이미 데이터가 html에 들어가 있음(.next/server/pages/index.html)
//서버와 자주 통신하지 않기 때문에 실시간을 보여주지 않아도 되는 데이터에 적합
export const getStaticProps = async () => {
  // const url = 'http://localhost:8080/api/posts';
  // const res = await fetch(url)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_end=10')
  const posts = await res.json();

  return {
    props: {
      posts
    },
    revalidate: 20  // 20초 뒤에 데이터 받아오도록 설정 
  }
}