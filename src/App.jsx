import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";
import PageNotFound from "./components/PageNotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Posts />} />
                    <Route path="/item/:id" element={<PostDetail />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
