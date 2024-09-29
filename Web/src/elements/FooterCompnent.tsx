import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

const FooterComponent = () => {
    return (
        <footer className='py-6 border-t border-gray-100 dark:border-gray-700'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='mb-4 md:mb-0'>
                        <p className='=text-sm'>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                    </div>
                    <div className='flex space-x-4'>
                        <a href='#' className='=hover:text-gray-800'>
                            <Facebook className='h-5 w-5' />
                            <span className='sr-only'>Facebook</span>
                        </a>
                        <a href='#' className='=hover:text-gray-800'>
                            <Twitter className='h-5 w-5' />
                            <span className='sr-only'>Twitter</span>
                        </a>
                        <a href='#' className='=hover:text-gray-800'>
                            <Instagram className='h-5 w-5' />
                            <span className='sr-only'>Instagram</span>
                        </a>
                        <a href='#' className='=hover:text-gray-800'>
                            <Github className='h-5 w-5' />
                            <span className='sr-only'>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
