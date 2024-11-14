import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        <ul>
          <li><Link href="/Pages/signup">Sign Up</Link></li>
          <li><Link href="/Pages/login">Log In</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;