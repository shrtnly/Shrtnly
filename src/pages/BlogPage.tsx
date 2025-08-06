import React from 'react';
import { FileText, Calendar, User, ArrowRight, TrendingUp, Target, Share2, BarChart3 } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 URL Shortening Best Practices for Digital Marketing Success",
      excerpt: "Discover proven strategies to maximize click-through rates and improve your marketing ROI with professional URL shortening techniques.",
      author: "Marketing Team",
      date: "2024-12-15",
      readTime: "5 min read",
      category: "Marketing",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Marketing", "Best Practices", "CTR Optimization"]
    },
    {
      id: 2,
      title: "How QR Codes Are Revolutionizing Offline-to-Online Marketing",
      excerpt: "Learn how businesses are using QR codes to bridge the gap between physical and digital marketing campaigns with measurable results.",
      author: "Tech Team",
      date: "2024-12-10",
      readTime: "7 min read",
      category: "Technology",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["QR Codes", "Offline Marketing", "Digital Transformation"]
    },
    {
      id: 3,
      title: "Advanced Link Analytics: Understanding Your Audience Better",
      excerpt: "Deep dive into link analytics to understand user behavior, optimize campaigns, and make data-driven marketing decisions.",
      author: "Analytics Team",
      date: "2024-12-05",
      readTime: "6 min read",
      category: "Analytics",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Analytics", "Data Analysis", "User Behavior"]
    },
    {
      id: 4,
      title: "Social Media Link Optimization: Platform-Specific Strategies",
      excerpt: "Maximize engagement across different social media platforms with tailored link shortening and tracking strategies.",
      author: "Social Media Team",
      date: "2024-11-28",
      readTime: "4 min read",
      category: "Social Media",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Social Media", "Platform Optimization", "Engagement"]
    },
    {
      id: 5,
      title: "URL Security: Protecting Your Links and Your Audience",
      excerpt: "Essential security practices for URL shortening services and how to protect your links from malicious attacks.",
      author: "Security Team",
      date: "2024-11-20",
      readTime: "8 min read",
      category: "Security",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Security", "Link Protection", "Cybersecurity"]
    },
    {
      id: 6,
      title: "The Future of URL Shortening: Trends and Predictions for 2025",
      excerpt: "Explore emerging trends in URL shortening technology and what the future holds for link management and analytics.",
      author: "Research Team",
      date: "2024-11-15",
      readTime: "6 min read",
      category: "Industry Trends",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Future Trends", "Technology", "Industry Insights"]
    }
  ];

  const categories = ["All", "Marketing", "Technology", "Analytics", "Social Media", "Security", "Industry Trends"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">URL Shortening Blog - Tips, Insights & Best Practices</h1>
                <p className="text-gray-600">Expert advice on URL shortening, link management, and digital marketing optimization</p>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Master URL Shortening & Link Analytics</h2>
            <p className="text-lg text-gray-600 mb-6">
              Stay ahead of the curve with expert insights on URL shortening strategies, link optimization techniques, 
              and advanced analytics. Our blog covers everything from basic best practices to advanced marketing 
              automation using shortened URLs and QR codes.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Marketing Strategies</h3>
                <p className="text-sm text-gray-600">Proven tactics to increase CTR</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Analytics Insights</h3>
                <p className="text-sm text-gray-600">Data-driven optimization tips</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Industry Trends</h3>
                <p className="text-sm text-gray-600">Future of URL shortening</p>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                      <Calendar className="w-3 h-3 ml-2" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">Stay Updated with URL Shortening Insights</h2>
            <p className="text-lg mb-6 text-blue-100">
              Get the latest tips, strategies, and industry insights delivered to your inbox weekly
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Follow Our URL Shortening Blog?</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Knowledge & Industry Insights</h3>
                <p className="text-gray-600 mb-4">
                  Our team of digital marketing experts, data analysts, and technology specialists share proven 
                  strategies for URL shortening, link optimization, and conversion tracking. Stay informed about 
                  the latest trends in digital marketing and link management.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Advanced URL shortening techniques</li>
                  <li>• Link analytics and performance optimization</li>
                  <li>• QR code marketing strategies</li>
                  <li>• Social media link optimization</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Practical Tips & Actionable Advice</h3>
                <p className="text-gray-600 mb-4">
                  Every blog post includes actionable tips you can implement immediately to improve your 
                  link performance, increase click-through rates, and optimize your digital marketing campaigns 
                  for better ROI and engagement.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Step-by-step implementation guides</li>
                  <li>• Real-world case studies and examples</li>
                  <li>• Performance benchmarks and metrics</li>
                  <li>• Tool recommendations and comparisons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;