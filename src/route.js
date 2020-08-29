import CsvUploadPage from "./pages/CsvUploadPage";
import CsvColumnMappingPage from "./pages/CsvColumnMappingPage";
import ProcessPage from "./pages/ProcessPage";
import ContactsPage from "./pages/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default [
    {
        path: '/',
        Component: CsvUploadPage
    },
    {
        path: '/uploads',
        Component: CsvUploadPage
    },
    {
        path: '/column-mapping',
        Component: CsvColumnMappingPage
    },
    {
        path: '/preview',
        Component: RemappingPreviewPage
    },
    {
        path: '/process',
        Component: ProcessPage
    },
    {
        path: '/contacts',
        Component: ContactsPage
    },
    {
        path: '/not-found',
        Component: NotFoundPage
    },
];
