"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    MoreVertical,
    Phone,
    Video,
    Send,
    Paperclip,
    Smile,
    Image as ImageIcon,
    Plus,
    User as UserIcon,
    Settings,
    MessageSquare,
    Info,
    Trash2,
    VolumeX,
    Eraser,
    Search as SearchIcon,
    X,
    PhoneOff,
    Check,
    ChevronRight,
    AtSign,
    Briefcase,
    ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import styles from './Messages.module.css';
import Header from '@/components/layout/Header';

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}

interface Conversation {
    id: string;
    name: string;
    avatar: string;
    role: string;
    lastMsg: string;
    time: string;
    unread: number;
    online: boolean;
    messages: Message[];
}

const mockConversations: Conversation[] = [
    {
        id: '1',
        name: 'Sarah Wilson',
        avatar: 'SW',
        role: 'HR Manager',
        lastMsg: 'The report looks great, thank you!',
        time: '10:25 AM',
        unread: 2,
        online: true,
        messages: [
            { id: 'm1', senderId: '1', text: "Hi, did you finish the Q4 report?", timestamp: "09:00 AM" },
            { id: 'm2', senderId: 'me', text: "Yes, just sent it to your email.", timestamp: "09:15 AM" },
            { id: 'm3', senderId: '1', text: "Perfect! I'll take a look now.", timestamp: "09:20 AM" },
            { id: 'm4', senderId: '1', text: "The report looks great, thank you!", timestamp: "10:25 AM" },
        ]
    },
    {
        id: '2',
        name: 'James Rodriguez',
        avatar: 'JR',
        role: 'Senior Developer',
        lastMsg: 'Can we schedule a call for tomorrow?',
        time: 'Yesterday',
        unread: 0,
        online: false,
        messages: [
            { id: 'm1', senderId: '2', text: "Hey! Just checking in on the frontend updates.", timestamp: "Yesterday" },
            { id: 'm2', senderId: '2', text: "Can we schedule a call for tomorrow?", timestamp: "Yesterday" },
        ]
    },
    {
        id: '3',
        name: 'Tech Support',
        avatar: 'TC',
        role: 'System Administrator',
        lastMsg: 'Your ticket #492 has been resolved.',
        time: 'Monday',
        unread: 0,
        online: true,
        messages: [
            { id: 'm1', senderId: '3', text: "Working on your server access issue.", timestamp: "Monday" },
            { id: 'm2', senderId: '3', text: "Your ticket #492 has been resolved.", timestamp: "Monday" },
        ]
    }
];

const availableUsers = [
    { name: 'Priya Sharma', role: 'UI Designer', avatar: 'PS', email: 'priya.s@kiccpa.com' },
    { name: 'Amit Patel', role: 'Project Manager', avatar: 'AP', email: 'amit.p@kiccpa.com' },
    { name: 'David Chen', role: 'Backend Dev', avatar: 'DC', email: 'david.c@kiccpa.com' },
    { name: 'Surbhi Gupta', role: 'QA Lead', avatar: 'SG', email: 'surbhi.g@kiccpa.com' },
];

const emojis = ['😊', '😂', '🔥', '👍', '🙏', '❤️', '🚀', '✨', '✅', '👋', '🎉', '💡', '🤔', '👀', '💯', '🌈', '👔', '📉', '📊', '📅', '💻', '🤝', '🙌', '⭐'];
const stickers = ['🏢', '☕', '📢', '💼', '⏰', '📑', '🛠️', '🎯', '🏅'];

export default function MessagesPage() {
    const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showInfoSidebar, setShowInfoSidebar] = useState(false);
    const [isCalling, setIsCalling] = useState<'audio' | 'video' | null>(null);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [userSearchText, setUserSearchText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [activePickerTab, setActivePickerTab] = useState<'emoji' | 'sticker'>('emoji');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const moreMenuRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (selectedConv) {
            scrollToBottom();
        }
    }, [selectedConv, selectedConv?.messages]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setShowMoreMenu(false);
            }
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConv) return;
        submitMessage(newMessage, 'text');
    };

    const submitMessage = (text: string, type: 'text' | 'image' | 'file' | 'sticker') => {
        const msg: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedConv = {
            ...selectedConv!,
            messages: [...selectedConv!.messages, msg],
            lastMsg: type === 'image' ? 'Sent an image' : type === 'file' ? 'Sent a file' : type === 'sticker' ? 'Sent a sticker' : text,
            time: 'Just now'
        };

        setSelectedConv(updatedConv);
        setNewMessage('');
        setShowEmojiPicker(false);
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
        const file = e.target.files?.[0];
        if (file) {
            submitMessage(`📎 ${file.name}`, type);
        }
    };

    const addEmoji = (emoji: string) => {
        setNewMessage(prev => prev + emoji);
    };

    const handleStartChat = (user: { name: string, role: string, avatar: string }) => {
        const newConv: Conversation = {
            id: Date.now().toString(),
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            lastMsg: 'Started a new conversation',
            time: 'Just now',
            unread: 0,
            online: true,
            messages: []
        };
        setSelectedConv(newConv);
        setShowNewChatModal(false);
    };

    const filteredConversations = mockConversations.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUsers = availableUsers.filter(u =>
        u.name.toLowerCase().includes(userSearchText.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Header title="Communications" />

            <main className={`${styles.container} ${selectedConv ? styles.showChat : ''}`}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <div className={styles.sidebarTitleRow}>
                            <div className="flex items-center gap-3">
                                <Link href="/" className={styles.backBtn} title="Back to Dashboard">
                                    <ChevronLeft size={20} />
                                </Link>
                                <h2>Messages</h2>
                            </div>
                            <button
                                className={styles.newChatBtn}
                                title="Start New Conversation"
                                onClick={() => setShowNewChatModal(true)}
                            >
                                <Plus size={22} />
                            </button>
                        </div>
                        <div className={styles.searchWrapper}>
                            <SearchIcon size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search people or roles..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.conversationList}>
                        {filteredConversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={`${styles.conversationItem} ${selectedConv?.id === conv.id ? styles.active : ''}`}
                                onClick={() => setSelectedConv(conv)}
                            >
                                <div className={styles.avatar}>
                                    {conv.avatar}
                                    <div className={`${styles.statusIndicator} ${!conv.online ? styles.offline : ''}`}></div>
                                </div>
                                <div className={styles.convInfo}>
                                    <div className={styles.convHeader}>
                                        <span className={styles.convName}>{conv.name}</span>
                                        <span className={styles.convTime}>{conv.time}</span>
                                    </div>
                                    <div className={styles.lastMsgRow}>
                                        <span className={styles.lastMsg}>{conv.lastMsg}</span>
                                        {conv.unread > 0 && (
                                            <span className={styles.unreadBadge}>{conv.unread}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Chat Window */}
                <section className={styles.chatWindow}>
                    {selectedConv ? (
                        <>
                            <div className={styles.chatHeader}>
                                <div className={styles.chatHeaderInfo}>
                                    <button
                                        className={styles.mobileBackBtn}
                                        onClick={() => setSelectedConv(null)}
                                        title="Back to Conversations"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <div className={styles.avatar}>
                                        {selectedConv.avatar}
                                        <div className={`${styles.statusIndicator} ${!selectedConv.online ? styles.offline : ''}`}></div>
                                    </div>
                                    <div>
                                        <div className={styles.chatHeaderName}>{selectedConv.name}</div>
                                        <div className={`${styles.chatHeaderStatus} ${!selectedConv.online ? styles.offline : ''}`}>
                                            {selectedConv.online ? 'Active Now' : 'Away'}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.chatActions}>
                                    <button className={styles.actionBtn} onClick={() => setIsCalling('audio')} title="Audio Call"><Phone size={20} /></button>
                                    <button className={styles.actionBtn} onClick={() => setIsCalling('video')} title="Video Call"><Video size={20} /></button>
                                    <button
                                        className={`${styles.actionBtn} ${showInfoSidebar ? styles.active : ''}`}
                                        onClick={() => setShowInfoSidebar(!showInfoSidebar)}
                                        title="Conversation Info"
                                    >
                                        <Info size={20} />
                                    </button>
                                    <div className="relative" ref={moreMenuRef}>
                                        <button className={styles.actionBtn} onClick={() => setShowMoreMenu(!showMoreMenu)} title="More Settings">
                                            <MoreVertical size={20} />
                                        </button>
                                        {showMoreMenu && (
                                            <div className={styles.dropdown}>
                                                <div className={styles.dropdownItem}><Eraser size={18} /> Clear Chat</div>
                                                <div className={styles.dropdownItem}><VolumeX size={18} /> Mute Notifications</div>
                                                <div className={`${styles.dropdownItem} ${styles.danger}`}><Trash2 size={18} /> Delete Conversation</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-1 overflow-hidden">
                                <div className="flex-1 flex flex-col min-w-0">
                                    <div className={styles.messageArea}>
                                        <div className={styles.dateDivider}>
                                            <span>Messages are secured & encrypted</span>
                                        </div>
                                        <div className={styles.dateDivider}>
                                            <span>Today</span>
                                        </div>

                                        {selectedConv.messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`${styles.messageBubble} ${msg.senderId === 'me' ? styles.sent : styles.received}`}
                                            >
                                                {msg.text}
                                                <span className={styles.messageTime}>{msg.timestamp}</span>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    <form className={styles.inputArea} onSubmit={handleSendMessage}>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={(e) => handleFileSelect(e, 'file')}
                                        />
                                        <input
                                            type="file"
                                            ref={imageInputRef}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleFileSelect(e, 'image')}
                                        />
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.inputActions}>
                                                <button
                                                    type="button"
                                                    className={styles.attachBtn}
                                                    title="Attach File"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    <Paperclip size={20} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={styles.attachBtn}
                                                    title="Send Image"
                                                    onClick={() => imageInputRef.current?.click()}
                                                >
                                                    <ImageIcon size={20} />
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                className={styles.messageInput}
                                                placeholder={`Message ${selectedConv.name.split(' ')[0]}...`}
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                            />
                                            <div className={styles.inputActions}>
                                                <div className="relative" ref={emojiPickerRef}>
                                                    <button
                                                        type="button"
                                                        className={`${styles.attachBtn} ${showEmojiPicker ? 'text-blue-500' : ''}`}
                                                        title="Emoji & Stickers"
                                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                    >
                                                        <Smile size={20} />
                                                    </button>
                                                    {showEmojiPicker && (
                                                        <div className={styles.emojiPicker}>
                                                            <div className={styles.pickerTabs}>
                                                                <button
                                                                    type="button"
                                                                    className={`${styles.pickerTab} ${activePickerTab === 'emoji' ? styles.active : ''}`}
                                                                    onClick={() => setActivePickerTab('emoji')}
                                                                >
                                                                    Emojis
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className={`${styles.pickerTab} ${activePickerTab === 'sticker' ? styles.active : ''}`}
                                                                    onClick={() => setActivePickerTab('sticker')}
                                                                >
                                                                    Stickers
                                                                </button>
                                                            </div>
                                                            <div className={styles.pickerContent}>
                                                                {activePickerTab === 'emoji' ? (
                                                                    <div className={styles.emojiGrid}>
                                                                        {emojis.map(e => (
                                                                            <button
                                                                                key={e}
                                                                                type="button"
                                                                                className={styles.emojiItem}
                                                                                onClick={() => addEmoji(e)}
                                                                            >
                                                                                {e}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <div className={styles.stickerGrid}>
                                                                        {stickers.map(s => (
                                                                            <button
                                                                                key={s}
                                                                                type="button"
                                                                                className={styles.stickerItem}
                                                                                onClick={() => submitMessage(s, 'sticker')}
                                                                            >
                                                                                {s}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <button type="submit" className={styles.sendBtn} disabled={!newMessage.trim()}>
                                                    <Send size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Info Sidebar */}
                                {showInfoSidebar && (
                                    <aside className={styles.infoSidebar}>
                                        <div className={styles.infoAvatar}>
                                            {selectedConv.avatar}
                                        </div>
                                        <div className={styles.infoDetails}>
                                            <h3>{selectedConv.name}</h3>
                                            <p>{selectedConv.role}</p>
                                        </div>

                                        <div className={styles.infoStats}>
                                            <div className={styles.infoStatItem}>
                                                <span className={styles.infoStatLabel}>Department</span>
                                                <span className={styles.infoStatValue}>Operations & IT</span>
                                            </div>
                                            <div className={styles.infoStatItem}>
                                                <span className={styles.infoStatLabel}>Email</span>
                                                <span className={styles.infoStatValue}>{selectedConv.name.toLowerCase().replace(' ', '.')}@kiccpa.com</span>
                                            </div>
                                            <div className={styles.infoStatItem}>
                                                <span className={styles.infoStatLabel}>Extension</span>
                                                <span className={styles.infoStatValue}>+91-123-x402</span>
                                            </div>
                                        </div>

                                        <div className={styles.mediaStrip}>
                                            <h4>Shared Media</h4>
                                            <div className={styles.mediaGrid}>
                                                <div className={styles.mediaPlaceholder}></div>
                                                <div className={styles.mediaPlaceholder}></div>
                                                <div className={styles.mediaPlaceholder}></div>
                                                <div className={styles.mediaPlaceholder}></div>
                                                <div className={styles.mediaPlaceholder}></div>
                                                <div className={styles.mediaPlaceholder}></div>
                                            </div>
                                        </div>
                                    </aside>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyStateIcon}>
                                <MessageSquare size={48} />
                            </div>
                            <h3>Enterprise Connect</h3>
                            <p>Select a colleague to start a professional conversation. All messages are logged for compliance.</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Calling Modal */}
            {isCalling && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>{isCalling === 'audio' ? 'Audio Calling...' : 'Starting Video Call...'}</h2>
                            <p>{selectedConv?.name}</p>
                        </div>
                        <div className={styles.callInterface}>
                            <div className={styles.callAvatar}>
                                {selectedConv?.avatar}
                            </div>
                            <div className={styles.callActions}>
                                <button className={`${styles.callBtn} ${styles.decline}`} onClick={() => setIsCalling(null)}>
                                    <PhoneOff size={28} />
                                </button>
                                <button className={`${styles.callBtn} ${styles.accept}`} onClick={() => alert('Feature coming soon!')}>
                                    <Check size={28} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* New Chat Modal */}
            {showNewChatModal && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="mb-0">Find a Colleague</h2>
                                <button onClick={() => setShowNewChatModal(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className={styles.searchWrapper}>
                                <SearchIcon size={18} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search by name or department..."
                                    className={styles.searchInput}
                                    value={userSearchText}
                                    onChange={(e) => setUserSearchText(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className={styles.userSearchList}>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, i) => (
                                    <div key={i} className={styles.userSearchItem} onClick={() => handleStartChat(user)}>
                                        <div className={styles.userSearchAvatar}>{user.avatar}</div>
                                        <div className={styles.userSearchInfo}>
                                            <h4>{user.name}</h4>
                                            <p>{user.role}</p>
                                        </div>
                                        <ChevronRight size={18} className="ml-auto text-slate-300" />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-400">
                                    No colleagues found matching your search.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
