const Skeleton = ({ className }: { className: string }) => (
    <div aria-live='polite' aria-busy='true' className={className}>
        <div className='inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none'>‌</div>
        <br />
    </div>
);

const SVGSkeleton = ({ className }: { className: string }) => <svg className={`${className} animate-pulse rounded-md bg-gray-300`} />;

const LoadingVideosSkeleton = () => (
    <>
        <div className='container mx-auto p-4'>
            <div className='mt-6 w-full shadow-lg relative hover:shadow-xl rounded-lg'>
                <iframe className='w-full aspect-video rounded-lg'></iframe>
            </div>
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {[...Array(9)].map((_, index) => (
                    <div key={index} className='shadow-lg hover:shadow-xl rounded-lg'>
                        <div className='relative w-full h-48 rounded-lg'>
                            <SVGSkeleton className='w-4 h-4 transition-transform duration-300 transform hover:scale-110 rounded-md' />
                        </div>
                        <div className='p-4'>
                            <h3 className='line-clamp-2'>
                                <Skeleton className='w-[640px] max-w-full rounded-md' />
                            </h3>
                            <div className='mt-2 line-clamp-2'>
                                <Skeleton className='w-[800px] max-w-full rounded-md' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
);

export default LoadingVideosSkeleton;
