import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const ItemLink = (props) => {
    const isDisabled = props.publish === 'FALSE';
    return (
        <li>
            <Link as={`/${props.id}`} href={`/kitab?title=${props.title}&&id=${props.id}`}>
                <button disabled={isDisabled}>{props.title}</button>
            </Link>
        </li>
    );
};

const index = (props) => {
    const kitabs = props.kitabs.map(kitab => <ItemLink key={kitab.no} title={kitab.nama} id={kitab.kode} publish={kitab.publish}/>)
    return (
        <Layout>
            <p>Select Kitab</p>
            <ul>{kitabs}</ul>
        </Layout>
    );
};

index.getInitialProps = async function() {
    const res = await fetch('http://localhost:3000/kitab/list');
    const data = await res.json();

    console.log(`Show data fetched ${data}:`, data);
    return {
        kitabs: data
    }
};

export default index;