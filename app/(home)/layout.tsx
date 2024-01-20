import React from 'react';
import LayoutWrapper from './components/LayoutWrapper';
import { getCurrentUser } from '../actions/getUser';

interface HomePageLayoutProps {
    children: React.ReactNode;
}

export default async function HomePageLayout({
    children,
}: HomePageLayoutProps) {
    const currentUser = await getCurrentUser();
    return (
        <LayoutWrapper
            currentUser={currentUser!}
            optionalComponent={<div>this is list</div>}
        >
            {children}
        </LayoutWrapper>
    );
}
