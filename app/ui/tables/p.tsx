
// pages/protected-page.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkIfLoggedIn } from '../utils/auth'; // Import your authentication logic

const ProtectedPage = ({ isLoggedIn }) => {
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/login'); // Use replace() instead of push() for immediate redirect
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        // Return null if not logged in to prevent rendering
        return null;
    }

    return (
        <div>
            <h1>Protected Page</h1>
            <p>This page is only accessible when logged in.</p>
        </div>
    );
};

export async function getServerSideProps(context: { req: any; }) {
    // Perform authentication check on the server
    const isLoggedIn = checkIfLoggedIn(context.req); // Implement your authentication logic

    // Pass the authentication status as props to the component
    return {
        props: {
            isLoggedIn,
        },
    };
}

export default ProtectedPage;
