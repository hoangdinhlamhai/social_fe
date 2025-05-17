import classNames from 'classnames/bind';

import logo from '~/assets/images/bld.jpeg';
import postImage from '~/assets/images/post-image.jpg';
import styles from './Home.module.scss';
import Sidebar from '~/pages/Home/components/Sidebar';
import CreatePost from '~/pages/Home/components/CreatePost';
import SortBar from '~/pages/Home/components/SortBar';
import PostList from '~/pages/Home/components/PostList';
import RightSidebar from '~/pages/Home/components/RightSidebar';

const cx = classNames.bind(styles);

const newsList = [
    { title: 'A big week for Big Tech', time: '1 giờ trước', readers: '6.786 người đọc' },
    { title: 'Uncertain companies cut spending', time: '1 giờ trước', readers: '5.279 người đọc' },
    { title: 'Canada heads to the polls', time: '1 giờ trước', readers: '4.534 người đọc' },
    { title: 'Huawei debuts new AI chip', time: '1 giờ trước', readers: '2.383 người đọc' },
    { title: 'Temu, Shein prices start to surge', time: '1 giờ trước', readers: '2.251 người đọc' },
];

const posts = [
    {
        avatar: logo,
        name: 'FPT Software',
        followers: '371.161',
        time: '8 giờ',
        content: `At the World IT Show 2025, South Korea’s largest ICT exhibition, FPT reaffirmed its commitment to enabling the next wave of digital transformation. Through our Korea Onshore Development Center model and Global Delivery Centers, we...`,
        image: postImage,
        likes: 15,
    },
];

function Home() {
    return (
        <>
            <Sidebar />
            <div className={cx('content')}>
                <CreatePost />
                <SortBar />
                <PostList posts={posts} />
            </div>
            <RightSidebar newsList={newsList} />
        </>
    );
}

export default Home;
