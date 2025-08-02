import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import ChatIconButton from './components/chatbot/ChatIconButton.js';
import ChatbotWidget from './components/chatbot/ChatbotWidget.js';
import { useState } from 'react';

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isButtonOpen, setIsButtonOpen] = useState(true);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null || route.path === '/login') {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>

                {isChatOpen && (
                    <ChatbotWidget
                        onclose={() => {
                            setIsButtonOpen(true);
                            setIsChatOpen(false);
                        }}
                    />
                )}
                {/* <ChatIconButton onClick={setIsChatOpen(true)} /> */}
                {/* phải truyền vào 1 hàm, chứ truyền z là nó gọi luôn không đợi click, gọi => rerender => lặp vô hạn */}
                {isButtonOpen && (
                    <ChatIconButton
                        onClick={() => {
                            setIsButtonOpen(false);
                            setIsChatOpen(true);
                        }}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;
