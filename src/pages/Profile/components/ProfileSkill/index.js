import classNames from 'classnames/bind';
import styles from './ProfileSkill.module.scss';
import logo from '~/assets/images/bld.jpeg';

const cx = classNames.bind(styles);

const skills = [
    {
        logo: { logo },
        name: 'UTE - Trường Đại học Sư phạm Kỹ thuật ĐN',
        company: 'Software Engineering',
    },
    {
        logo: { logo },
        name: 'Content Creator',
        company: 'YouTube',
    },
];

function ProfileSkill() {
    return (
        <div className={cx('skill-section')}>
            <h2>Kỹ năng</h2>
            {skills.map((skill, index) => (
                <div key={index} className={cx('skill-item')}>
                    <div className={cx('content')}>
                        <div className={cx('name')}>{skill.name}</div>
                        <div className={cx('company')}>{skill.company}</div>
                    </div>
                </div>
            ))}

            <div className={cx('view-more')}>
                <a href="#">Hiển thị tất cả kỹ năng →</a>
            </div>
        </div>
    );
}

export default ProfileSkill;
