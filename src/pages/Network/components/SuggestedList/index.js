import classNames from 'classnames/bind';
import styles from './SuggestedList.module.scss';
import SuggestedCard from '../SuggestedCard';
import { useState, useEffect } from 'react';
import { getAiSuggestionsForUser } from '~/services/aiSuggestionsUser.service';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function SuggestedList({ currentUserId }) {
    const [suggestionsUser, setSuggestionsUser] = useState([]);
    const { accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAiSuggestions = async () => {
            try {
                const response = await getAiSuggestionsForUser(currentUserId, accessToken);
                let jsonString = response.data;

                if (jsonString.startsWith('```json')) {
                    // Xóa ```json ở đầu và ``` ở cuối
                    jsonString = jsonString.substring(7, jsonString.length - 3).trim();
                }

                // Đoạn regex này sẽ tìm đoạn text đầu tiên bắt đầu bằng [ và kết thúc bằng ]
                const match = jsonString.match(/(\[.*\])/s);
                if (match) {
                    // Lấy nội dung đã được trích xuất
                    const extractedJson = match[0];
                    const suggestionsArray = JSON.parse(extractedJson);
                    setSuggestionsUser(suggestionsArray);
                    console.log('AI Suggestions:', suggestionsArray);
                } else {
                    setSuggestionsUser([]); // Đặt về mảng rỗng
                }
            } catch (error) {
                console.error('Error fetching AI suggestions:', error);
            }
        };
        fetchAiSuggestions();
    }, [currentUserId, accessToken]);

    if (suggestionsUser.length === 0) {
        return <>Loading...</>; // Hoặc hiển thị một thông báo "Không có gợi ý
    }

    return (
        <div className={cx('list-wrapper')}>
            <div className={cx('header')}>
                <h2>Phổ biến trên LinkedIn</h2>
                <a href="#">Hiển thị tất cả</a>
            </div>
            <div className={cx('card-list')}>
                {suggestionsUser.map((item) => (
                    <SuggestedCard key={item.id} userData={item} />
                ))}
            </div>
        </div>
    );
}

export default SuggestedList;
