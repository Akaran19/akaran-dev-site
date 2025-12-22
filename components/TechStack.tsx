import { Icon } from '@iconify/react';
import { TechCategory, TechItem } from '@/app/data/techStackData';

interface TechIconProps {
  item: TechItem;
}

function TechIcon({ item }: TechIconProps) {
  return (
    <div className="flex flex-col items-center group flex-shrink-0">
      <div className="w-12 h-12 flex items-center justify-center">
        <Icon
          icon={item.iconKey}
          className="w-10 h-10 text-white opacity-85 group-hover:opacity-100 transition-all duration-200 group-hover:scale-105"
          aria-label={item.name}
        />
      </div>
      <span className="text-xs text-gray-400 mt-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        {item.name}
      </span>
      <span className="sr-only">{item.name}</span>
    </div>
  );
}

interface TechStackCategoryProps {
  category: TechCategory;
}

function TechStackCategory({ category }: TechStackCategoryProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <h4 className="text-lg font-medium text-gray-300 mb-4">{category.title}</h4>
      <div className="flex flex-nowrap overflow-x-auto gap-3 md:grid md:grid-cols-4 md:overflow-visible">
        {category.items.map((item, index) => (
          <TechIcon key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

interface TechStackProps {
  data: TechCategory[];
}

export default function TechStack({ data }: TechStackProps) {
  return (
    <div className="space-y-4">
      {data.map((category, index) => (
        <TechStackCategory key={index} category={category} />
      ))}
    </div>
  );
}