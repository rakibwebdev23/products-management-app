
export default function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-lg text-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-6">MD Rakib Hasan Template</h1>
      <p className="text-lg text-center mb-8">A modern web development stack with Next.js, Tailwind CSS, Shadcn, TypeScript, Redux, and custom CLI commands.</p>

      <div className="flex justify-center">
        <iframe src="https://rakib-hasan-eb93b.web.app/" width="80%" height="700px" className="rounded-lg shadow-2xl border-4 border-indigo-600"></iframe>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xl font-medium">Explore the template live and start building your next project!</p>
      </div>
    </div>

  );
}
