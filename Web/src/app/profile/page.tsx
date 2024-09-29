import BasicLayout from '@/layout/BasicLayout';

export default function Component() {
    return (
        <BasicLayout>
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-4xl font-bold'>Profile</h1>
                <p>This is the profile page</p>
            </div>
        </BasicLayout>
    );
}
