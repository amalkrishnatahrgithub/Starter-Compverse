"use client"

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, Pause, Volume2, VolumeX, ExternalLink, Eye, Clock, TrendingUp, Users, Star, Zap } from 'lucide-react';

// Type definitions
interface MediaItem {
    type: 'image' | 'video';
    url: string;
}

interface Stats {
    views: string;
    engagement: string;
}

interface Advertisement {
    id: number;
    type: 'banner' | 'video' | 'carousel';
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    price: string;
    originalPrice: string;
    discount: string;
    image: string;
    video: boolean;
    stats: Stats;
    urgent: boolean;
    featured: boolean;
}

interface Author {
    name: string;
    username: string;
    avatar: string;
}

interface SocialPost {
    id: number;
    platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
    author: Author;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
    trending: boolean;
}

// Component Props
interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    style?: React.CSSProperties;
}

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'default' | 'primary' | 'secondary';
}

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

// Mock components
const Card: React.FC<CardProps> = ({ children, className, onClick, onMouseEnter, onMouseLeave, style }) => (
    <div className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style}>
        {children}
    </div>
);

const Button: React.FC<ButtonProps> = ({ children, className, onClick, variant = "default" }) => (
    <button className={className} onClick={onClick}>{children}</button>
);

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
    <span className={className}>{children}</span>
);

// Mock data for advertisements
const advertisements: Advertisement[] = [
    {
        id: 1,
        type: 'banner',
        title: 'Master AI & Machine Learning',
        subtitle: 'Transform Your Career with Our Premium Courses',
        description: 'Join 50,000+ professionals who advanced their careers with our cutting-edge AI curriculum.',
        cta: 'Start Learning Today',
        price: '$99',
        originalPrice: '$299',
        discount: '67% OFF',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
        video: false,
        stats: { views: '2.4K', engagement: '89%' },
        urgent: true,
        featured: true
    },
    {
        id: 2,
        type: 'video',
        title: 'Blockchain Revolution 2024',
        subtitle: 'Build the Future with Web3 Technology',
        description: 'Learn smart contracts, DeFi, and NFTs from industry experts.',
        cta: 'Watch Demo',
        price: '$149',
        originalPrice: '$399',
        discount: '62% OFF',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
        video: true,
        stats: { views: '5.1K', engagement: '94%' },
        urgent: false,
        featured: true
    }
];

// Mock data for social media posts
const socialPosts: SocialPost[] = [
    {
        id: 1,
        platform: 'linkedin',
        author: {
            name: 'CompVerse Academy',
            username: '@compverse',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        },
        content: '🚀 Just launched our new AI Ethics course! Join the conversation about responsible AI development. What are your thoughts on AI governance? #AIEthics #TechEducation',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        timestamp: '2h ago',
        likes: 127,
        comments: 23,
        shares: 15,
        bookmarks: 8,
        trending: true
    },
    {
        id: 2,
        platform: 'twitter',
        author: {
            name: 'TechMentor Pro',
            username: '@techmentor',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        },
        content: 'Breaking: Our students just achieved 95% job placement rate in tech roles! 💼✨ Here\'s what made the difference in their journey...',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
        timestamp: '4h ago',
        likes: 89,
        comments: 12,
        shares: 31,
        bookmarks: 22,
        trending: false
    }
];

const AdsAndSocialComponent: React.FC = () => {
    const [hoveredAd, setHoveredAd] = useState<number | null>(null);
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());
    const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
    const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set());
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleLike = (postId: number): void => {
        const newLiked = new Set(likedPosts);
        if (newLiked.has(postId)) {
            newLiked.delete(postId);
        } else {
            newLiked.add(postId);
        }
        setLikedPosts(newLiked);
    };

    const handleBookmark = (postId: number): void => {
        const newBookmarked = new Set(bookmarkedPosts);
        if (newBookmarked.has(postId)) {
            newBookmarked.delete(postId);
        } else {
            newBookmarked.add(postId);
        }
        setBookmarkedPosts(newBookmarked);
    };

    const handleAdClick = (ad: Advertisement): void => {
        console.log('Ad clicked:', ad.title);
        // Handle ad click logic here
    };

    const handleShare = (post: SocialPost): void => {
        console.log('Sharing post:', post.id);
        // Handle share logic here
    };

    const handleComment = (post: SocialPost): void => {
        console.log('Commenting on post:', post.id);
        // Handle comment logic here
    };

    const customStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(244, 196, 48, 0.3); }
      50% { box-shadow: 0 0 40px rgba(244, 196, 48, 0.6); }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    @keyframes bounce-in {
      0% { transform: scale(0.8) translateY(20px); opacity: 0; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    
    @keyframes slide-up {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .animate-shimmer { animation: shimmer 2s infinite; }
    .animate-bounce-in { animation: bounce-in 0.6s ease-out; }
    .animate-slide-up { animation: slide-up 0.8s ease-out; }
    
    .gradient-text {
      background: linear-gradient(135deg, #F4C430, #00BFFF);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hover-lift:hover {
      transform: translateY(-8px) scale(1.02);
    }
    
    .glass-effect {
      backdrop-filter: blur(20px);
      background: rgba(22, 40, 85, 0.8);
      border: 1px solid rgba(30, 58, 138, 0.3);
    }
  `;

    return (
        <div className="min-h-screen bg-[#0c1838] p-8">
            <style>{customStyles}</style>

            <div className="max-w-7xl mx-auto space-y-12">
                {/* Advertisements Section */}
                <section className="animate-slide-up">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-[#F4C430]" />
                        </div>
                        <h2 className="text-4xl font-bold text-white">Featured Advertisements</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#F4C430]/50 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {advertisements.map((ad: Advertisement, index: number) => (
                            <Card
                                key={ad.id}
                                className={`group cursor-pointer overflow-hidden relative transition-all duration-700 hover-lift glass-effect rounded-2xl flex flex-col h-full ${hoveredAd === ad.id ? 'animate-pulse-glow' : ''}`}
                                onMouseEnter={() => setHoveredAd(ad.id)}
                                onMouseLeave={() => setHoveredAd(null)}
                                onClick={() => handleAdClick(ad)}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                {/* Animated Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/5 via-[#00BFFF]/5 to-[#F4C430]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Urgency Banner */}
                                {ad.urgent && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold py-2 px-4 text-center z-20 animate-pulse">
                                        🔥 LIMITED TIME OFFER - ENDS SOON!
                                    </div>
                                )}

                                <div className={`relative h-80 overflow-hidden flex-shrink-0 ${ad.urgent ? 'mt-8' : ''}`}>
                                    <img
                                        src={ad.image}
                                        alt={ad.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1838]/90 via-[#0c1838]/50 to-transparent"></div>

                                    {/* Featured Badge */}
                                    {ad.featured && (
                                        <div className="absolute top-6 right-6">
                                            <Badge className="bg-gradient-to-r from-[#F4C430] to-[#FFD700] text-[#0c1838] font-bold px-3 py-1 rounded-full flex items-center animate-float">
                                                <Star className="w-3 h-3 mr-1" />
                                                Featured
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Discount Badge */}
                                    <div className="absolute top-6 left-6">
                                        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-4 py-2 rounded-full text-sm animate-bounce-in">
                                            {ad.discount}
                                        </Badge>
                                    </div>

                                    {/* Video Play Button */}
                                    {ad.video && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <div className="bg-[#F4C430]/20 backdrop-blur-lg rounded-full p-8 transform group-hover:scale-110 transition-transform duration-300 border border-[#F4C430]/30">
                                                <Play className="w-12 h-12 text-[#F4C430]" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats Overlay */}
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                        <div className="glass-effect rounded-lg px-3 py-1 text-xs text-white flex items-center gap-1">
                                            <Eye className="w-3 h-3 text-[#00BFFF]" />
                                            {ad.stats.views}
                                        </div>
                                        <div className="glass-effect rounded-lg px-3 py-1 text-xs text-white">
                                            {ad.stats.engagement}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Container with Flex Layout */}
                                <div className="flex flex-col flex-1 p-6 relative z-10">
                                    {/* Text Content - Fixed Height */}
                                    <div className="flex-1 mb-6">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#F4C430] transition-colors duration-300 mb-2 line-clamp-2">
                                            {ad.title}
                                        </h3>
                                        <p className="text-lg text-[#00BFFF] font-semibold mb-3 line-clamp-1">{ad.subtitle}</p>
                                        <p className="text-[#AEB4BB] group-hover:text-white transition-colors duration-300 line-clamp-3">
                                            {ad.description}
                                        </p>
                                    </div>

                                    {/* Price and Timing - Fixed Height */}
                                    <div className="flex items-center justify-between mb-4 h-12">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl font-bold text-[#F4C430]">{ad.price}</span>
                                            <span className="text-lg text-[#AEB4BB] line-through">{ad.originalPrice}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[#AEB4BB]">
                                            <Clock className="w-3 h-3" />
                                            Limited Time
                                        </div>
                                    </div>

                                    {/* CTA Button - Fixed Height */}
                                    <Button
                                        className="w-full h-12 bg-gradient-to-r from-[#F4C430] to-[#FFD700] text-[#0c1838] font-bold hover:from-[#FFD700] hover:to-[#F4C430] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#F4C430]/30 relative overflow-hidden rounded-xl group flex-shrink-0"
                                        onClick={(e) => {
                                            e?.stopPropagation();
                                            console.log(`CTA clicked for ad: ${ad.title}`);
                                        }}
                                    >
                                        <Zap className="w-4 h-4 mr-2" />
                                        {ad.cta}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Social Media Posts Section */}
                <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-gradient-to-r from-[#F4C430]/20 to-[#00BFFF]/20 rounded-xl">
                            <Share2 className="w-6 h-6 text-[#00BFFF]" />
                        </div>
                        <h2 className="text-4xl font-bold text-white">Social Media Feed</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#00BFFF]/50 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {socialPosts.map((post: SocialPost, index: number) => (
                            <Card
                                key={post.id}
                                className="glass-effect rounded-2xl overflow-hidden group hover-lift transition-all duration-500 flex flex-col h-full"
                                onMouseEnter={() => setHoveredPost(post.id)}
                                onMouseLeave={() => setHoveredPost(null)}
                                style={{ animationDelay: `${600 + index * 200}ms` }}
                            >
                                {/* Trending Indicator */}
                                {post.trending && (
                                    <div className="bg-gradient-to-r from-[#F4C430] to-[#FFD700] text-[#0c1838] px-4 py-1 text-xs font-bold flex items-center gap-1 flex-shrink-0">
                                        <TrendingUp className="w-3 h-3" />
                                        TRENDING
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-1">
                                    {/* Author Header - Fixed Height */}
                                    <div className="flex items-center gap-3 mb-4 h-12 flex-shrink-0">
                                        <img
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            className="w-12 h-12 rounded-full border-2 border-[#1e3a8a]/50"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-white truncate">{post.author.name}</h4>
                                            <p className="text-sm text-[#AEB4BB] truncate">{post.author.username} • {post.timestamp}</p>
                                        </div>
                                        <Button className="text-[#AEB4BB] hover:text-[#F4C430] transition-colors flex-shrink-0">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </Button>
                                    </div>

                                    {/* Post Content - Flexible Height */}
                                    <div className="flex-1 mb-4">
                                        <p className="text-white mb-4 leading-relaxed line-clamp-4">{post.content}</p>

                                        {/* Post Image */}
                                        {post.image && (
                                            <div className="rounded-xl overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt="Post content"
                                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Engagement Stats - Fixed Height */}
                                    <div className="flex items-center gap-6 mb-4 text-sm text-[#AEB4BB] h-5 flex-shrink-0">
                                        <span>{post.likes} likes</span>
                                        <span>{post.comments} comments</span>
                                        <span>{post.shares} shares</span>
                                    </div>

                                    {/* Action Buttons - Fixed Height */}
                                    <div className="flex items-center justify-between pt-4 border-t border-[#1e3a8a]/30 h-14 flex-shrink-0">
                                        <Button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${likedPosts.has(post.id)
                                                ? 'text-red-500 bg-red-500/10'
                                                : 'text-[#AEB4BB] hover:text-red-500 hover:bg-red-500/10'
                                                }`}
                                        >
                                            <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                            Like
                                        </Button>

                                        <Button
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#AEB4BB] hover:text-[#00BFFF] hover:bg-[#00BFFF]/10 transition-all duration-300"
                                            onClick={() => handleComment(post)}
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Comment
                                        </Button>

                                        <Button
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#AEB4BB] hover:text-[#F4C430] hover:bg-[#F4C430]/10 transition-all duration-300"
                                            onClick={() => handleShare(post)}
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </Button>

                                        <Button
                                            onClick={() => handleBookmark(post.id)}
                                            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${bookmarkedPosts.has(post.id)
                                                ? 'text-[#F4C430] bg-[#F4C430]/10'
                                                : 'text-[#AEB4BB] hover:text-[#F4C430] hover:bg-[#F4C430]/10'
                                                }`}
                                        >
                                            <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdsAndSocialComponent;