import FooterComponent from '@/elements/FooterCompnent';
import NavigationComponent from '@/elements/NavigationComponent';

interface BasicLayoutProps {
    children: React.ReactNode;
}
const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
    return (
        <>
            <NavigationComponent />
            <div className='container mb-10 mt-20'>{children}</div>
            <FooterComponent />
        </>
    );
};
export default BasicLayout;
