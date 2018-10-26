import {withRouter} from 'next/router';
import Layout from '../components/Layout';

const Content = withRouter((props) => {
    const Hadits = props.router.query.hadits.map(h => {
        return (
            <li key={h.haditsNo}>{h.haditsNo} - {h.title}</li>
        )
    });
    return (
        <div>
            <h1>{props.router.query.title}</h1>
            <p style={{textDecoration: 'italic'}}>{props.router.query.id}</p>
            <p>This is the kitab content</p>
            <ul>{Hadits}</ul>
        </div>
    );
});

const Kitab = (props) => {
    return (
        <Layout>
            <Content/>
        </Layout>
    );
};


export default Kitab;