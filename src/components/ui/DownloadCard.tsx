import { Button } from "./Button";

interface DownloadCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  grades: string[];
  onDownloadClick: (id: string) => void;
}

export const DownloadCard = ({
  id,
  title,
  description,
  category,
  fileType,
  fileSize,
  uploadDate,
  grades,
  onDownloadClick,
}: DownloadCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-[#6B21A8] mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">{category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">File Type</p>
            <p className="font-medium">{fileType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">File Size</p>
            <p className="font-medium">{fileSize}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Upload Date</p>
            <p className="font-medium">
              {new Date(uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Grades</p>
          <p className="font-medium">{grades.join(", ")}</p>
        </div>

        <Button
          variant="primary"
          onClick={() => onDownloadClick(id)}
          className="w-full"
        >
          Download
        </Button>
      </div>
    </div>
  );
};
