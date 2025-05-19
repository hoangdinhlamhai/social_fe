import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import ProfileHeader from './components/ProfileHeader';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileActivity from './components/ProfileActivity';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('profile-page')}>
            <div className={cx('main')}>
                <ProfileHeader />
                <ProfileActivity />
                {/* <Suggestions /> */}
            </div>
            <ProfileSidebar />
        </div>
    );
}

export default Profile;
