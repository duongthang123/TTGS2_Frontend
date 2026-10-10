export default function ForbiddenPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
            <h1 className="text-4xl font-bold">403</h1>
            <p className="text-lg">Bạn không có quyền truy cập trang này.</p>
            <a
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            >
                Về trang chủ
            </a>
        </main>
    );
}