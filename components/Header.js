import Link from 'next/link';

const linkStyle = {
    marginRight: 16
};

const Header = () => (
    <div>
        <h1>Kitab Kajian</h1>
        <ul>
            <li>
                <Link href='/'><a style={linkStyle}>home</a></Link>
            </li>
            <li>
                <Link href='/about'>
                    <button style={linkStyle}>about</button>
                </Link>
            </li>
        </ul>
    </div>
);

export default Header;