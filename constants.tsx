import React from 'react';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, Github, Send } from 'lucide-react';

export const WHATSAPP_NUMBER = "201141345223";

// Defines the social media links with specific styling requirements
export const SOCIAL_LINKS = [
  { 
    name: "WhatsApp", 
    url: `https://wa.me/${WHATSAPP_NUMBER}`, 
    icon: <MessageCircle className="w-5 h-5 stroke-[1.5]" />,
    color: "group-hover:text-green-500 group-hover:border-green-500/50"
  },
  { 
    name: "Facebook", 
    url: "https://facebook.com/nq703", 
    icon: <Facebook className="w-5 h-5 stroke-[1.5]" />,
    color: "group-hover:text-blue-600 group-hover:border-blue-600/50" 
  },
  { 
    name: "Instagram", 
    url: "https://instagram.com/kl0l69", 
    icon: <Instagram className="w-5 h-5 stroke-[1.5]" />,
    color: "group-hover:text-pink-600 group-hover:border-pink-600/50" 
  },
  { 
    name: "Telegram", 
    url: "https://t.me/nq703", 
    icon: <Send className="w-5 h-5 stroke-[1.5]" />, 
    color: "group-hover:text-blue-400 group-hover:border-blue-400/50" 
  },
  { 
    name: "GitHub", 
    url: "https://github.com/kl0l69", 
    icon: <Github className="w-5 h-5 stroke-[1.5]" />,
    color: "group-hover:text-purple-500 group-hover:border-purple-500/50" 
  },
];

export const CONTACT_INFO = [
  { 
    text: "الحي الثامن، برج العرب الجديدة، الإسكندرية", 
    icon: <MapPin className="w-5 h-5 stroke-[1.5]" />,
    href: "https://www.google.com/maps/search/%D8%A7%D9%84%D8%AD%D9%8A+%D8%A7%D9%84%D8%AB%D8%A7%D9%85%D9%86+%D8%A8%D8%B1%D8%AC+%D8%A7%D9%84%D8%B9%D8%B1%D8%A8+%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9%E2%80%AD/@30.860402,29.5906593,14z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
  },
  { 
    text: "+20 114 134 5223", 
    icon: <Phone className="w-5 h-5 stroke-[1.5]" />,
    href: "tel:+201141345223"
  },
  { 
    text: "ayrn194@gmail.com", 
    icon: <Mail className="w-5 h-5 stroke-[1.5]" />,
    href: "mailto:ayrn194@gmail.com"
  },
];