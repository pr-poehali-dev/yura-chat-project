import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Character = {
  id: number;
  name: string;
  role: string;
  personality: string;
  avatar: string;
  color: string;
  gradient: string;
};

type Message = {
  id: number;
  sender: 'user' | 'character';
  text: string;
  timestamp: Date;
};

const characters: Character[] = [
  {
    id: 1,
    name: 'Луна',
    role: 'Философ',
    personality: 'Мудрая и загадочная, любит говорить о смысле жизни и звёздах',
    avatar: '🌙',
    color: 'hsl(var(--character-purple))',
    gradient: 'from-purple-600 to-blue-600'
  },
  {
    id: 2,
    name: 'Макс',
    role: 'Искатель приключений',
    personality: 'Энергичный и смелый, всегда готов к новым открытиям',
    avatar: '🗺️',
    color: 'hsl(var(--character-orange))',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 3,
    name: 'Сакура',
    role: 'Художница',
    personality: 'Творческая душа, видит красоту в каждой детали',
    avatar: '🌸',
    color: 'hsl(var(--character-pink))',
    gradient: 'from-pink-500 to-purple-500'
  },
  {
    id: 4,
    name: 'Нео',
    role: 'Техно-гуру',
    personality: 'Увлечён технологиями и будущим человечества',
    avatar: '🤖',
    color: 'hsl(var(--character-blue))',
    gradient: 'from-cyan-500 to-blue-600'
  }
];

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'chat' | 'characters'>('home');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const startChat = (character: Character) => {
    setSelectedCharacter(character);
    setMessages([
      {
        id: 1,
        sender: 'character',
        text: `Привет! Я ${character.name}. ${character.personality}`,
        timestamp: new Date()
      }
    ]);
    setActiveView('chat');
  };

  const sendMessage = () => {
    if (!inputValue.trim() || !selectedCharacter) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const responses = [
        'Это интересная мысль! Расскажи подробнее.',
        'Я понимаю тебя. Что ты чувствуешь по этому поводу?',
        'Хм, а ты не думал об этом с другой стороны?',
        'Это напоминает мне одну историю...',
        'Я всегда рад нашим разговорам!'
      ];

      const characterMessage: Message = {
        id: messages.length + 2,
        sender: 'character',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, characterMessage]);
    }, 1000);

    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {activeView === 'home' && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              CharacterAI
            </h1>
            <p className="text-xl text-muted-foreground">
              Погрузись в мир живых разговоров с уникальными персонажами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {characters.map((character, index) => (
              <Card
                key={character.id}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => startChat(character)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${character.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div 
                      className={`w-24 h-24 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-5xl shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {character.avatar}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{character.name}</h3>
                      <Badge variant="secondary" className="mb-3">
                        {character.role}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {character.personality}
                      </p>
                    </div>
                    <Button 
                      className="w-full mt-4 group-hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: character.color }}
                    >
                      Начать диалог
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => setActiveView('characters')}
            >
              <Icon name="Users" size={20} />
              Все персонажи
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
            >
              <Icon name="History" size={20} />
              История чатов
            </Button>
          </div>
        </div>
      )}

      {activeView === 'chat' && selectedCharacter && (
        <div className="flex flex-col h-screen">
          <div 
            className="p-4 border-b flex items-center gap-4 bg-card/50 backdrop-blur-sm"
            style={{ borderColor: selectedCharacter.color }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView('home')}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div 
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedCharacter.gradient} flex items-center justify-center text-2xl`}
            >
              {selectedCharacter.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{selectedCharacter.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedCharacter.role}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 animate-fade-in ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                      message.sender === 'character' 
                        ? `bg-gradient-to-br ${selectedCharacter.gradient}` 
                        : 'bg-primary'
                    }`}
                  >
                    {message.sender === 'character' ? selectedCharacter.avatar : '👤'}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[70%] ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border-2'
                    }`}
                    style={
                      message.sender === 'character'
                        ? { borderColor: selectedCharacter.color }
                        : {}
                    }
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString('ru', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto flex gap-2">
              <Input
                placeholder="Напиши сообщение..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                size="icon"
                style={{ backgroundColor: selectedCharacter.color }}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeView === 'characters' && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView('home')}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-4xl font-bold">Галерея персонажей</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {characters.map((character, index) => (
              <Card
                key={character.id}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => startChat(character)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${character.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative p-6 flex gap-6">
                  <div 
                    className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${character.gradient} flex items-center justify-center text-6xl shadow-lg group-hover:scale-105 transition-transform flex-shrink-0`}
                  >
                    {character.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2">{character.name}</h3>
                    <Badge variant="secondary" className="mb-4">
                      {character.role}
                    </Badge>
                    <p className="text-muted-foreground mb-4">
                      {character.personality}
                    </p>
                    <Button 
                      className="group-hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: character.color }}
                    >
                      Начать общение
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 flex flex-col gap-2">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg"
          variant={activeView === 'home' ? 'default' : 'outline'}
          onClick={() => setActiveView('home')}
        >
          <Icon name="Home" size={24} />
        </Button>
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg"
          variant={activeView === 'characters' ? 'default' : 'outline'}
          onClick={() => setActiveView('characters')}
        >
          <Icon name="Users" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Index;
