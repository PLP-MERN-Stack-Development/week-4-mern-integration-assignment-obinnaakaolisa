
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for categories
const categoriesData = [
  {
    id: "technology",
    name: "Technology",
    count: 128,
    icon: "🖥️",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "health",
    name: "Health & Wellness",
    count: 95,
    icon: "🧘",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "business",
    name: "Business",
    count: 87,
    icon: "💼",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    count: 74,
    icon: "🏡",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "science",
    name: "Science",
    count: 63,
    icon: "🔬",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: "food",
    name: "Food",
    count: 59,
    icon: "🍲",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "travel",
    name: "Travel",
    count: 52,
    icon: "✈️",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "finance",
    name: "Finance",
    count: 43,
    icon: "💰",
    color: "bg-emerald-100 text-emerald-700",
  }
];

const CategoryList = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setCategories(categoriesData);
  }, []);

  if (selectedCategory !== undefined) {
    // Filter mode - show category filter buttons
    const allCategories = [{ id: "All", name: "All Categories" }, ...categoriesData];
    
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {allCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    );
  }

  // Display mode - show category cards

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <span className={`text-2xl p-3 rounded-full mb-3 ${category.color}`}>
                    {category.icon}
                  </span>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} articles</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
