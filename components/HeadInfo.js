import Head from 'next/head'

export const HeadInfo = ({ title, keyword, contents }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta keyword={keyword} />
            <meta contents={contents} />
        </Head>
    )
}

HeadInfo.defaultProps = {
    title: 'My Blog',
    keyword: 'abapcoin',
    contents: 'abacoin'
}
