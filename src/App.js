import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import ChatIconButton from './components/chatbot/ChatIconButton.js';

function App() {
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

                <ChatIconButton onClick={() => console.log('Chat button clicked!')} />
            </div>
        </Router>
    );
}

export default App;
