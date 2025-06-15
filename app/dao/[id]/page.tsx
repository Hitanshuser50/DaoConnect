// /app/dao/[contract]/page.tsx

interface DaoPageProps {
  params: {
    contract: string;
  };
}

export default function DaoPage({ params }: DaoPageProps) {
  const { contract } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Hello World</h1>
      <p className="text-gray-600">
        DAO Contract Address: <span className="font-mono">{contract}</span>
      </p>
    </div>
  );
}
