import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route,Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import { LoginPage } from './pages/login';

import { loader } from './commons';
import { AddSubject } from './pages/add-subject';
import { UsersPage } from './pages/users';
import { AddLession } from './pages/add-lesson';
import { Qrcode } from './pages/qr-code';
import { LessonAttendence } from './pages/attendence-for-lesson';

const router = createBrowserRouter(createRoutesFromElements(<Route>
  <Route path = "/" element = {<Dashboard />} loader={loader}/>
  <Route path = "/login" element = {<LoginPage />} />
  <Route path = "/add-house" element = {<AddSubject /> } loader = {loader} />
  <Route path = "/scan-code/:lesson_id" element = {<Qrcode />} loader = {loader} />
  <Route path = "/add-lesson/:subject_id" element = {<AddLession />} loader = {loader} />
  <Route path = "/manage-users" element = {<UsersPage />} loader = {loader} />
  <Route path = "/lesson-attendence/:lesson_id" element = {<LessonAttendence />} loader = {loader} />


</Route>))
function App() {
  return (
    <>
    <RouterProvider router = {router} />
    </>
  );
}

export default App;
