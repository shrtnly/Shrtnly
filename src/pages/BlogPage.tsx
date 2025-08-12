import React, { useState } from 'react';
import { FileText, Calendar, User, ArrowRight, TrendingUp, Target, Share2, BarChart3, ArrowLeft, ExternalLink, Link2, Search } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
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
      tags: [
        "Marketing",
        "Best Practices",
        "CTR Optimization",
        "Short URL Tools",
        "Link Management",
      ],
      fullContent: `
        <div class="excerpt">
          Discover proven strategies to maximize click-through rates and improve your marketing ROI with professional URL shortening techniques.
        </div>
        
        <p>In today's fast-paced digital landscape, URL shortening has become an indispensable tool for marketers striving to maximize engagement, track performance, and enhance user experience. Whether you're sharing links across social media, email campaigns, or paid advertisements, implementing best practices in URL shortening can significantly impact your marketing success. This guide explores ten essential strategies to optimize your use of URL shorteners, ensuring your campaigns are not only more effective but also more measurable and professional. By understanding and applying these best practices, you'll be better equipped to leverage URL shortening as a powerful asset in your digital marketing toolkit.</p>
        
        <h2><span class="numbered-heading">1</span> Use Branded Short Domains for Brand Consistency</h2>
        <p>Branded short domains are one of the most effective ways to reinforce brand identity through every link shared. When you opt for a custom short domain that aligns with your brand name or messaging, it instantly conveys professionalism and trustworthiness. Unlike generic URL shorteners, branded domains give you control over the appearance of your links, making them more recognizable and memorable for your audience. This consistency enhances brand recall and fosters a sense of credibility around your digital presence. Moreover, branded short URLs help differentiate your links from spammy or malicious ones, which is crucial in building consumer trust.</p>
        
        <h3>To optimize branded short domains:</h3>
        <ul>
            <li>Choose a short domain that closely resembles your primary brand domain (e.g., yourbrand.co instead of bit.ly)</li>
            <li>Register multiple branded short domains if managing diverse campaigns or regions</li>
            <li>Use consistent branding across all campaigns to reinforce recognition</li>
            <li>Incorporate keywords related to your campaign into the domain if possible</li>
            <li>Regularly monitor domain reputation to avoid blacklisting or spam filters</li>
        </ul>
        <p>Implementing branded domains not only boosts recognition but also improves click-through rates by establishing a trustworthy link presentation. This practice ensures every shared link serves as a seamless extension of your brand identity.</p>
        
        <h2><span class="numbered-heading">2</span> Customize Link Slugs for Clarity and Relevance</h2>
        <p>Customizing link slugs—the tail end of a shortened URL—is vital for conveying context and encouraging clicks. Generic or random slugs often appear suspicious or uninformative, discouraging users from engaging with the link. By crafting descriptive and relevant slugs, you communicate what users can expect when they click on the link, increasing transparency and trust. Clear slugs also improve user experience by making URLs easier to read and remember when shared verbally or via print.</p>
        
        <h3>To optimize link slugs effectively:</h3>
        <ul>
            <li>Incorporate keywords related to the content or campaign</li>
            <li>Keep slugs concise yet descriptive enough to provide context</li>
            <li>Avoid using unnecessary numbers or symbols that may seem confusing</li>
            <li>Maintain consistency in slug structure across campaigns for easier tracking</li>
            <li>Test different variations to see which performs best</li>
        </ul>
        <p>Customizing link slugs allows marketers to tailor each link's message, making it more appealing and trustworthy while providing insights into user interests based on the chosen keywords.</p>
        
        <h2><span class="numbered-heading">3</span> Implement UTM Parameters for Enhanced Tracking</h2>
        <p>UTM parameters are essential components appended to URLs that enable detailed tracking within analytics platforms like Google Analytics. When used correctly with shortened URLs, they allow marketers to measure exactly how traffic sources contribute to conversions and engagement levels. Embedding UTM codes into shortened links helps attribute clicks accurately across different channels and campaigns, facilitating data-driven decision-making.</p>
        
        <h3>For optimal use:</h3>
        <ul>
            <li>Append UTM parameters such as source, medium, campaign, term, and content</li>
            <li>Ensure UTM tags are consistent across similar campaigns for easier analysis</li>
            <li>Use URL builders to generate accurate UTM parameters efficiently</li>
            <li>Keep track of UTM parameter structures in documentation to maintain consistency</li>
            <li>Regularly review analytics data to refine future campaigns based on performance insights</li>
        </ul>
        <p>Incorporating UTM parameters into shortened URLs provides granular visibility into campaign effectiveness—crucial information for refining marketing strategies.</p>
        
        <h2><span class="numbered-heading">4</span> Prioritize Link Security and Trustworthiness</h2>
        <p>Security is paramount when sharing links online; therefore, ensuring that shortened URLs are trustworthy is critical for maintaining audience confidence. Many users are wary of clicking on unfamiliar links due to phishing concerns or malware risks. Using reputable URL shortening services that offer security features such as SSL encryption and malware scanning helps protect both your brand and your audience.</p>
        
        <h3>Best practices include:</h3>
        <ul>
            <li>Choose established shortening providers with positive reputations</li>
            <li>Enable security features like link expiration or password protection if available</li>
            <li>Regularly scan shortened links for potential security threats</li>
            <li>Display trust signals alongside links when possible (e.g., HTTPS icons)</li>
            <li>Educate users about safe clicking habits</li>
        </ul>
        <p>By prioritizing security measures in your URL shortening strategy, you foster trust with your audience—an essential component of ongoing engagement and loyalty.</p>
        
        <h2><span class="numbered-heading">5</span> Monitor Link Performance Continuously</h2>
        <p>Tracking how your shortened links perform offers valuable insights into campaign success and areas needing improvement. Continuous monitoring enables real-time adjustments that can boost engagement rates significantly. Most URL shorteners come equipped with analytics dashboards providing metrics such as click volume, geographic location of users, device types, and referral sources.</p>
        
        <h3>Key steps include:</h3>
        <ul>
            <li>Set clear KPIs before launching campaigns</li>
            <li>Use analytics tools integrated within your URL shortening platform</li>
            <li>Segment data by campaign type or audience demographics</li>
            <li>Identify underperforming links early for prompt action</li>
            <li>Adjust content or targeting based on performance data</li>
        </ul>
        <p>Regular analysis allows marketers to optimize their efforts dynamically—maximizing ROI by focusing on strategies that resonate most with audiences.</p>
        
        <h2><span class="numbered-heading">6</span> A/B Test Different Link Variations</h2>
        <p>A/B testing is a proven method to identify which shortened URLs perform best under various conditions. Experimenting with different link formats—including customized slugs or call-to-action overlays—can reveal preferences among target audiences. Testing helps refine messaging strategies by providing empirical evidence about what appeals most.</p>
        
        <h3>Practical steps involve:</h3>
        <ul>
            <li>Creating two versions of similar links differing in slug structure or accompanying copy</li>
            <li>Distributing them equally across targeted segments</li>
            <li>Measuring performance metrics like click-through rate (CTR) and conversions</li>
            <li>Analyzing results statistically to determine significance</li>
            <li>Implementing winning variations into broader campaigns</li>
        </ul>
        <p>By systematically testing different approaches, marketers can fine-tune their URL strategies toward maximum effectiveness—improving overall campaign outcomes.</p>
        
        <h2><span class="numbered-heading">7</span> Maintain Consistent Branding Across All Links</h2>
        <p>Consistency in branding extends beyond visual elements—it includes the language used in URLs and associated messaging too. Uniformity across all shortened links reinforces brand identity while reducing confusion among users who encounter multiple variations during different touchpoints.</p>
        
        <h3>Strategies include:</h3>
        <ul>
            <li>Using consistent terminology in custom slugs</li>
            <li>Applying uniform branding patterns in descriptions accompanying links</li>
            <li>Ensuring logos or other visual cues align with overall branding standards</li>
            <li>Standardizing tone of voice in promotional messaging linked via shortened URLs</li>
            <li>Regularly auditing all shared links for compliance with branding guidelines</li>
        </ul>
        <p>This consistency builds familiarity over time, fostering trust while improving recognition—key factors contributing to long-term marketing success.</p>
        
        <h2><span class="numbered-heading">8</span> Automate Link Management Processes</h2>
        <p>Automation streamlines many aspects of URL shortening—from creation and customization to tracking and reporting—saving time while reducing human error. Using dedicated tools or integrations with marketing automation platforms allows seamless management at scale without sacrificing control over individual links.</p>
        
        <h3>Effective automation tactics include:</h3>
        <ul>
            <li>Integrating URL shorteners directly into content management systems (CMS)</li>
            <li>Setting up rules for automatic slug generation based on content titles</li>
            <li>Scheduling bulk link creation ahead of campaigns</li>
            <li>Utilizing APIs for dynamic link generation during live events</li>
            <li>Automating performance reports delivery at regular intervals</li>
        </ul>
        <p>Automation empowers marketers by increasing efficiency without compromising quality—freeing resources for strategic initiatives rather than manual tasks.</p>
        
        <h2><span class="numbered-heading">9</span> Follow Legal Guidelines & Respect Privacy Policies</h2>
        <p>Adhering to legal standards regarding data collection and privacy is non-negotiable when using URL shorteners extensively across digital platforms. Some jurisdictions impose strict regulations around tracking user behavior; violating these can lead to penalties or damage reputation.</p>
        
        <h3>Key considerations include:</h3>
        <ul>
            <li>Complying with GDPR, CCPA, or other relevant privacy laws</li>
            <li>Informing users about data collection methods via privacy policies</li>
            <li>Offering opt-out options where applicable</li>
            <li>Avoiding deceptive practices like cloaking or misleading redirects</li>
            <li>Choosing services that adhere strictly to privacy standards</li>
        </ul>
        <p>Respecting user privacy not only keeps you compliant but also builds goodwill—an invaluable asset in today's data-conscious environment.</p>
        
        <h2><span class="numbered-heading">10</span> Regularly Review & Update Your URL Shortening Strategy</h2>
        <p>Finally, maintaining an effective URL shortening approach requires ongoing review and refinement aligned with evolving marketing goals and technological developments. As platforms change algorithms or new tools emerge, staying adaptable ensures sustained success.</p>
        
        <h3>To keep strategies current:</h3>
        <ul>
            <li>Conduct periodic audits of existing links' performance</li>
            <li>Stay informed about new features offered by shortening services</li>
            <li>Incorporate feedback from team members or customers regarding usability</li>
            <li>Adjust branding tactics based on analytical insights</li>
            <li>Explore emerging trends like QR code integration or AI-powered personalization</li>
        </ul>
        <p>Continuous improvement guarantees that your URL strategy remains aligned with overarching business objectives—maximizing its contribution toward digital marketing success.</p>
        
        <section class="conclusion">
            <h2>Elevate Your Digital Campaigns With Strategic URL Shortening</h2>
            <p>Mastering these ten best practices transforms simple link management into a sophisticated tool that boosts visibility, credibility, tracking precision—and ultimately contributes significantly to achieving marketing goals. By leveraging branded domains, customizing slugs thoughtfully, monitoring performance diligently—and adhering strictly to security standards—you set yourself apart in an increasingly competitive landscape. Remember that automation streamlines processes while ongoing reviews ensure relevance; combined with respect for legal boundaries this creates a resilient foundation for long-term success in digital marketing endeavors involving URL shortening techniques.</p>
        </section>
      `
    },
    // Other blog posts remain the same
  ];

  const categories = ["All", "Marketing", "Technology", "Analytics", "Social Media", "Security", "Industry Trends"];
  
  const filteredPosts = React.useMemo(() => {
    let result = selectedCategory === "All" 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery]);

  const handleReadMore = (postId: number) => {
    setSelectedPost(postId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a post is selected, show the full article with the new design
  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    if (!post) return null;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
            
            {/* Article with new design */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              <style jsx>{`
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f9f9f9;
                }
                article {
                  background-color: #fff;
                  border-radius: 8px;
                  padding: 30px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                header {
                  margin-bottom: 30px;
                  border-bottom: 1px solid #eee;
                  padding-bottom: 20px;
                }
                h1 {
                  color: #2c3e50;
                  margin-bottom: 10px;
                  font-size: 2.2em;
                }
                .meta {
                  color: #7f8c8d;
                  font-size: 0.9em;
                  margin-bottom: 20px;
                }
                .category {
                  display: inline-block;
                  background-color: #3498db;
                  color: white;
                  padding: 3px 10px;
                  border-radius: 3px;
                  font-size: 0.8em;
                  margin-right: 10px;
                  font-weight: bold;
                }
                .tags {
                  margin-top: 20px;
                }
                .tag {
                  display: inline-block;
                  background-color: #ecf0f1;
                  padding: 3px 10px;
                  border-radius: 20px;
                  font-size: 0.8em;
                  margin-right: 5px;
                  margin-bottom: 5px;
                  color: #555;
                }
                .featured-image {
                  width: 100%;
                  height: auto;
                  border-radius: 5px;
                  margin-bottom: 20px;
                }
                .excerpt {
                  font-style: italic;
                  color: #555;
                  font-size: 1.1em;
                  margin-bottom: 30px;
                  padding-left: 15px;
                  border-left: 4px solid #3498db;
                }
                .content {
                  margin-bottom: 30px;
                }
                h2 {
                  color: #2c3e50;
                  margin-top: 30px;
                  margin-bottom: 15px;
                  font-size: 1.8em;
                  padding-bottom: 10px;
                  border-bottom: 1px solid #eee;
                }
                h3 {
                  color: #34495e;
                  margin-top: 25px;
                  margin-bottom: 10px;
                  font-size: 1.3em;
                }
                ul, ol {
                  padding-left: 20px;
                }
                li {
                  margin-bottom: 10px;
                }
                .conclusion {
                  background-color: #f8f9fa;
                  padding: 20px;
                  border-radius: 5px;
                  margin-top: 30px;
                  border-left: 4px solid #3498db;
                }
                .numbered-heading {
                  display: inline-block;
                  background-color: #3498db;
                  color: white;
                  width: 40px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  border-radius: 50%;
                  margin-right: 10px;
                  font-weight: bold;
                }
                .related-resources {
                  margin-top: 40px;
                  padding: 20px;
                  background-color: #f8f9fa;
                  border-radius: 5px;
                }
                .related-resources h3 {
                  color: #2c3e50;
                  margin-bottom: 15px;
                  font-size: 1.3em;
                }
                .resource-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                  gap: 15px;
                  margin-top: 15px;
                }
                .resource-item {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  padding: 10px;
                  background-color: white;
                  border-radius: 5px;
                  border: 1px solid #eee;
                }
                .resource-icon {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 40px;
                  height: 40px;
                  border-radius: 5px;
                  background-color: #3498db;
                  color: white;
                }
                .social-sharing {
                  margin-top: 30px;
                  padding: 20px;
                  background-color: #f8f9fa;
                  border-radius: 5px;
                }
                .social-sharing h3 {
                  color: #2c3e50;
                  margin-bottom: 15px;
                  font-size: 1.3em;
                }
                .social-buttons {
                  display: flex;
                  gap: 10px;
                  flex-wrap: wrap;
                }
                .social-button {
                  display: flex;
                  align-items: center;
                  gap: 5px;
                  padding: 8px 15px;
                  border-radius: 5px;
                  color: white;
                  text-decoration: none;
                  font-weight: 500;
                }
                .twitter {
                  background-color: #1DA1F2;
                }
                .linkedin {
                  background-color: #0077B5;
                }
                .facebook {
                  background-color: #4267B2;
                }
                .author-bio {
                  margin-top: 30px;
                  padding: 20px;
                  background-color: #f8f9fa;
                  border-radius: 5px;
                  border-left: 4px solid #3498db;
                }
                .author-bio h3 {
                  color: #2c3e50;
                  margin-bottom: 15px;
                  font-size: 1.3em;
                }
                .author-info {
                  display: flex;
                  align-items: flex-start;
                  gap: 15px;
                }
                .author-avatar {
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  background-color: #3498db;
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 24px;
                  font-weight: bold;
                }
                .related-articles {
                  margin-top: 40px;
                }
                .related-articles h3 {
                  color: #2c3e50;
                  margin-bottom: 20px;
                  font-size: 1.5em;
                }
                .related-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                  gap: 20px;
                }
                .related-card {
                  background-color: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .related-image {
                  width: 100%;
                  height: 180px;
                  object-fit: cover;
                }
                .related-content {
                  padding: 15px;
                }
                .related-title {
                  font-size: 1.1em;
                  font-weight: 600;
                  color: #2c3e50;
                  margin-bottom: 10px;
                }
                .related-excerpt {
                  color: #555;
                  font-size: 0.9em;
                  margin-bottom: 15px;
                }
                .read-more {
                  color: #3498db;
                  text-decoration: none;
                  font-weight: 500;
                  display: inline-flex;
                  align-items: center;
                  gap: 5px;
                }
              `}</style>
              
              <header>
                <h1>{post.title}</h1>
                <div className="meta">
                  <span className="category">{post.category}</span>
                  <span>By {post.author}</span> | 
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> | 
                  <span>{post.readTime}</span>
                </div>
                <img src={post.image} alt={post.title} className="featured-image" />
                <div className="tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </header>
              
              <section className="content">
                <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
              </section>
              
              {/* Related Resources Section */}
              <div className="related-resources">
                <h3>Related Resources & Tools</h3>
                <div className="resource-grid">
                  <a href="/" className="resource-item">
                    <div className="resource-icon">
                      <Link2 size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Free URL Shortener</div>
                      <div className="text-sm text-gray-600">Create short links instantly</div>
                    </div>
                  </a>
                  
                  <a href="/analytics" className="resource-item">
                    <div className="resource-icon" style={{ backgroundColor: '#2ecc71' }}>
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Analytics Dashboard</div>
                      <div className="text-sm text-gray-600">Track link performance</div>
                    </div>
                  </a>
                  
                  <a href="/features/link-management" className="resource-item">
                    <div className="resource-icon" style={{ backgroundColor: '#9b59b6' }}>
                      <Target size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Link Management</div>
                      <div className="text-sm text-gray-600">Organize your links</div>
                    </div>
                  </a>
                  
                  <a href="/features/how-it-works" className="resource-item">
                    <div className="resource-icon" style={{ backgroundColor: '#e67e22' }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">How It Works</div>
                      <div className="text-sm text-gray-600">Learn the process</div>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Social Sharing Section */}
              <div className="social-sharing">
                <h3>Share This Article</h3>
                <div className="social-buttons">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button twitter"
                  >
                    <Share2 size={16} />
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button linkedin"
                  >
                    <Share2 size={16} />
                    LinkedIn
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button facebook"
                  >
                    <Share2 size={16} />
                    Facebook
                  </a>
                </div>
              </div>
              
              {/* Author Bio Section */}
              <div className="author-bio">
                <h3>About the Author</h3>
                <div className="author-info">
                  <div className="author-avatar">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{post.author}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Expert team specializing in {post.category.toLowerCase()} strategies and digital marketing optimization. 
                      Follow our latest insights and best practices for URL shortening and link management.
                    </p>
                  </div>
                </div>
              </div>
            </article>
            
            {/* Related Articles Section */}
            <div className="related-articles">
              <h3>Related Articles</h3>
              <div className="related-grid">
                {blogPosts
                  .filter(p => p.id !== selectedPost && p.category === post.category)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <div key={relatedPost.id} className="related-card">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="related-image"
                      />
                      <div className="related-content">
                        <h4 className="related-title">{relatedPost.title}</h4>
                        <p className="related-excerpt">{relatedPost.excerpt}</p>
                        <button
                          onClick={() => handleReadMore(relatedPost.id)}
                          className="read-more"
                        >
                          Read More
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main> 
      </div>
    );
  }

  // Default blog listing view remains the same
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
              <div className="p-3 bg-blue-600 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">URL Shortening Blog - Expert Tips, Insights & Best Practices</h1>
                <p className="text-gray-600 mt-2">Professional advice on URL shortening, link management, and digital marketing optimization</p>
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
          
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
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
                      
                      <button 
                        onClick={() => handleReadMore(post.id)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 mb-4">No articles found matching your search.</div>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
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
            
            {/* Internal Backlinks */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore Our Platform</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <a 
                  href="/" 
                  className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <Link2 className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                  <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700">URL Shortener</span>
                </a>
                <a 
                  href="/analytics" 
                  className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <BarChart3 className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                  <span className="text-sm font-medium text-gray-900 group-hover:text-green-700">Analytics</span>
                </a>
                <a 
                  href="/features/link-management" 
                  className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <Target className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
                  <span className="text-sm font-medium text-gray-900 group-hover:text-purple-700">Link Management</span>
                </a>
                <a 
                  href="/contact" 
                  className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <FileText className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
                  <span className="text-sm font-medium text-gray-900 group-hover:text-orange-700">Contact Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;