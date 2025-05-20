import classNames from 'classnames/bind';
import styles from './ProfileExperience.module.scss';
import logo from '~/assets/images/bld.jpeg';

const cx = classNames.bind(styles);

const experiences = [
    {
        logo: { logo },
        title: 'Data Analyst Intern',
        company: 'VALUENEX',
        type: 'Internship',
        time: 'thg 4 2024 - Hiện tại · 1 năm 2 tháng',
        location: 'Palo Alto, California, United States',
        description: '',
        skills: 'Data Analysis, Marketing và hơn 2 kỹ năng khác',
    },
    {
        logo: { logo },
        title: 'Content Creator',
        company: 'YouTube',
        type: 'Self-employed',
        time: 'thg 1 2017 - Hiện tại · 8 năm 5 tháng',
        location: 'United States',
        description:
            '3.5 million+ Subscribers, 1.3 Billion+ total views, We Choice Awards Top 5, One of the top Youtubers in Vietnam. I produce, edit, post, and market my content, and I have worked with 50+ domestic and international brands (DuoLingo, Nestle, Notion, Google, Meta, Inivisalign, SamYang foods, Shiseido...)',
        skills: 'Management, Video Editing và hơn 3 kỹ năng khác',
    },
];

function ProfileExperience() {
    return (
        <div className={cx('experience-section')}>
            <h2>Kinh nghiệm</h2>
            {experiences.map((exp, index) => (
                <div key={index} className={cx('experience-item')}>
                    <div className={cx('logo')}>
                        <img src={logo} alt="company logo" />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>{exp.title}</div>
                        <div className={cx('company')}>
                            {exp.company} · {exp.type}
                        </div>
                        <div className={cx('time')}>{exp.time}</div>
                        <div className={cx('location')}>{exp.location}</div>
                        {exp.description && <p className={cx('description')}>{exp.description}</p>}
                        <div className={cx('skills')}>{exp.skills}</div>
                    </div>
                </div>
            ))}

            <div className={cx('view-more')}>
                <a href="#">Hiển thị tất cả kinh nghiệm →</a>
            </div>
        </div>
    );
}

export default ProfileExperience;
