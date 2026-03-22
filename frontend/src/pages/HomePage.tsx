'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
    Send,
    Settings,
    Plus,
    Info,
    Search,
    Menu,
    X
} from 'lucide-react';
import { ModeToggle } from "@/components/mode-toogle";
interface Contact {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
    lastMessage: string;
}
interface Message {
    id: number;
    text: string;
    isSent: boolean;
    time: string;
}
const contacts: Contact[] = [
    { id: '1', name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?u=emma', online: true, lastMessage: "Hey! How's your day going in Amsterdam?" },
    { id: '2', name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=alex', online: true, lastMessage: 'You free this weekend?' },
    { id: '3', name: 'Sophie Chen', avatar: 'https://i.pravatar.cc/150?u=sophie', online: false, lastMessage: 'Thanks for the help yesterday!' },
    { id: '4', name: 'Liam Patel', avatar: 'https://i.pravatar.cc/150?u=liam', online: true, lastMessage: 'Did you see the new update?' },
    { id: '5', name: 'Mia Rodriguez', avatar: 'https://i.pravatar.cc/150?u=mia', online: true, lastMessage: 'Meeting at 3 PM?' },
    { id: '6', name: 'Noah Kim', avatar: 'https://i.pravatar.cc/150?u=noah', online: false, lastMessage: 'The project looks amazing!' },
    { id: '7', name: 'Olivia Singh', avatar: 'https://i.pravatar.cc/150?u=olivia', online: true, lastMessage: 'Can we hop on a quick call?' },
    { id: '8', name: 'Lucas Moreau', avatar: 'https://i.pravatar.cc/150?u=lucas', online: true, lastMessage: 'Just sent you the files' },
    { id: '9', name: 'Ava Patel', avatar: 'https://i.pravatar.cc/150?u=ava', online: false, lastMessage: 'Happy birthday! 🎉' },
    { id: '10', name: 'Ethan Dubois', avatar: 'https://i.pravatar.cc/150?u=ethan', online: true, lastMessage: 'See you at the conference?' },
];
const initialMessages: Message[] = [
    { id: 1, text: "Hey ! How's your day going in Amsterdam?", isSent: false, time: '2:45 PM' },
    { id: 2, text: "Pretty good! Weather is rainy as usual 😂", isSent: true, time: '2:46 PM' },
    { id: 3, text: "Did you try that new coffee place yet?", isSent: false, time: '2:47 PM' },
    { id: 4, text: "Not yet, but it's on my list!", isSent: true, time: '2:48 PM' },
];
export default function ChatApp() {
    const [currentContact, setCurrentContact] = useState<Contact>(contacts[0]);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const filteredContacts = contacts.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSend = () => {
        if (!inputValue.trim()) return;
        const newMessage: Message = {
            id: Date.now(),
            text: inputValue.trim(),
            isSent: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };
    const selectContact = (contact: Contact) => {
        setCurrentContact(contact);
        setIsMobileMenuOpen(false);
    };
    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans">
            {/* ==================== MAIN CHAT AREA ==================== */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header - Hamburger moved to RIGHT side */}
                <div className="h-16 border-b border-border flex items-center px-6 gap-3 bg-card">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={currentContact.avatar} />
                        <AvatarFallback>{currentContact.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-lg truncate">{currentContact.name}</div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <div className={`h-2 w-2 rounded-full ${currentContact.online ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                            {currentContact.online ? 'Online' : 'Offline'}
                        </div>
                    </div>
                    {/* Right side buttons */}
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Info className="h-5 w-5" />
                    </Button>
                    {/* Sidebar Button (Hamburger) - NOW ON THE RIGHT */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/30">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
                        >
                            {!msg.isSent && (
                                <Avatar className="h-8 w-8 mt-1 mr-3 flex-shrink-0">
                                    <AvatarImage src={currentContact.avatar} />
                                    <AvatarFallback>{currentContact.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`flex flex-col max-w-[70%] ${msg.isSent ? 'items-end' : 'items-start'}`}>
                                <div
                                    className={`px-5 py-3 rounded-3xl text-[15px] leading-relaxed ${
                                        msg.isSent
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-muted text-foreground rounded-bl-none'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                <div className={`text-xs text-muted-foreground mt-1 px-1 ${msg.isSent ? 'text-right' : ''}`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                {/* Message Input */}
                <div className="h-20 border-t border-border bg-card px-6 flex items-center gap-3">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 bg-muted border-0 rounded-3xl py-6 pl-6 text-base placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
                    />
                    <Button
                        onClick={handleSend}
                        size="icon"
                        className="h-11 w-11 rounded-3xl bg-primary hover:bg-primary/90"
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            {/* ==================== DESKTOP SIDEBAR (hidden on mobile) ==================== */}
            <div className="hidden md:flex w-80 border-l border-border flex-col bg-card">
                <div className="h-16 border-b border-border flex items-center px-5">
                    <div className="font-semibold text-xl">Friends</div>
                </div>
                <div className="px-5 pt-5 pb-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search friends..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-muted border-0 pl-11 rounded-3xl h-10 text-sm placeholder:text-muted-foreground"
                        />
                    </div>
                </div>
                <ScrollArea className="flex-1 min-h-0 px-3">
                    <div className="space-y-1 py-2 pr-4">
                        {filteredContacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => selectContact(contact)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-colors hover:bg-accent ${
                                    currentContact.id === contact.id ? 'bg-accent' : ''
                                }`}
                            >
                                <div className="relative">
                                    <Avatar className="h-11 w-11">
                                        <AvatarImage src={contact.avatar} />
                                        <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    {contact.online && (
                                        <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">{contact.name}</div>
                                    <div className="text-sm text-muted-foreground truncate">{contact.lastMessage}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-5 space-y-3 border-t border-border">
                    <Button variant="outline" className="w-full h-10 rounded-xl text-sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Friend
                    </Button>
                    <Button variant="outline" className="w-full h-10 rounded-xl text-sm relative">
                        Approve Requests
                        <Badge className="absolute -top-1 -right-1 bg-red-500/90 text-white text-[10px] px-1.5 py-px border border-background">2</Badge>
                    </Button>
                </div>
                <div className="h-20 border-t border-border bg-muted flex items-center px-5 gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="https://i.pravatar.cc/150?u=ava" />
                        <AvatarFallback>DA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="font-medium">Literally You</div>
                        <div className="text-xs text-green-500 flex items-center gap-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full" /> Online
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <ModeToggle />
                </div>
            </div>
            {/* ==================== MOBILE SIDEBAR DRAWER (slides from RIGHT) ==================== */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[60] md:hidden bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div
                        className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border flex flex-col shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-16 border-b border-border flex items-center px-5 justify-between">
                            <div className="font-semibold text-xl">Friends</div>
                            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="px-5 pt-5 pb-3">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search friends..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-muted border-0 pl-11 rounded-3xl h-10 text-sm placeholder:text-muted-foreground"
                                />
                            </div>
                        </div>
                        <ScrollArea className="flex-1 min-h-0 px-3">
                            <div className="space-y-1 py-2 pr-4">
                                {filteredContacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        onClick={() => selectContact(contact)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-colors hover:bg-accent ${
                                            currentContact.id === contact.id ? 'bg-accent' : ''
                                        }`}
                                    >
                                        <div className="relative">
                                            <Avatar className="h-11 w-11">
                                                <AvatarImage src={contact.avatar} />
                                                <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            {contact.online && (
                                                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium truncate">{contact.name}</div>
                                            <div className="text-sm text-muted-foreground truncate">{contact.lastMessage}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="p-5 space-y-3 border-t border-border">
                            <Button variant="outline" className="w-full h-10 rounded-xl text-sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Friend
                            </Button>
                            <Button variant="outline" className="w-full h-10 rounded-xl text-sm relative">
                                Approve Requests
                                <Badge className="absolute -top-1 -right-1 bg-red-500/90 text-white text-[10px] px-1.5 py-px border border-background">2</Badge>
                            </Button>
                        </div>
                        <div className="h-20 border-t border-border bg-muted flex items-center px-5 gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="https://i.pravatar.cc/150?u=ava" />
                                <AvatarFallback>DA</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="font-medium">Literally You</div>
                                <div className="text-xs text-green-500 flex items-center gap-1">
                                    <div className="h-2 w-2 bg-green-500 rounded-full" /> Online
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <Settings className="h-5 w-5" />
                            </Button>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}