import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import RootLayout from "./_root/RootLayout";
import Bookmarkpage from "./_root/pages/bookmarkpage/Bookmarkpage";
import Homepage from "./_root/pages/homepage/Homepage";
import ViewStory from "./_root/pages/view-story/ViewStory";
const App = () => {
  return (
    <>
      <Toaster richColors={true} position='top-center' />

      <Routes>
        <Route path='/:storyId' element={<ViewStory />} />
        <Route element={<RootLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/bookmarks' element={<Bookmarkpage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
