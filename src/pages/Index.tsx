import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type Character = {
  id: number;
  name: string;
  role: string;
  personality: string;
  avatar: string;
  color: string;
  gradient: string;
  videoUrl?: string;
  customizable?: boolean;
  premium?: boolean;
  category?: 'default' | 'anime' | 'scenario';
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
    gradient: 'from-purple-600 to-blue-600',
    category: 'default'
  },
  {
    id: 2,
    name: 'Макс',
    role: 'Искатель приключений',
    personality: 'Энергичный и смелый, всегда готов к новым открытиям',
    avatar: '🗺️',
    color: 'hsl(var(--character-orange))',
    gradient: 'from-orange-500 to-red-500',
    category: 'default'
  },
  {
    id: 3,
    name: 'Сакура',
    role: 'Художница',
    personality: 'Творческая душа, видит красоту в каждой детали',
    avatar: '🌸',
    color: 'hsl(var(--character-pink))',
    gradient: 'from-pink-500 to-purple-500',
    category: 'default'
  },
  {
    id: 4,
    name: 'Нео',
    role: 'Техно-гуру',
    personality: 'Увлечён технологиями и будущим человечества',
    avatar: '🤖',
    color: 'hsl(var(--character-blue))',
    gradient: 'from-cyan-500 to-blue-600',
    category: 'default'
  }
];

const animeCharacters: Character[] = [
  {
    id: 101,
    name: 'Наруто',
    role: 'Ниндзя',
    personality: 'Энергичный, никогда не сдаётся, мечтает стать Хокаге',
    avatar: '🍥',
    color: 'hsl(var(--character-orange))',
    gradient: 'from-orange-500 to-yellow-500',
    category: 'anime'
  },
  {
    id: 102,
    name: 'Луффи',
    role: 'Пират',
    personality: 'Свободолюбивый капитан, ищет легендарное сокровище',
    avatar: '👒',
    color: 'hsl(var(--character-orange))',
    gradient: 'from-red-500 to-orange-500',
    category: 'anime'
  },
  {
    id: 103,
    name: 'Микаса',
    role: 'Боец',
    personality: 'Сильная и преданная, защищает близких любой ценой',
    avatar: '⚔️',
    color: 'hsl(var(--character-purple))',
    gradient: 'from-gray-600 to-red-600',
    category: 'anime',
    premium: true
  },
  {
    id: 104,
    name: 'Годжо',
    role: 'Магистр',
    personality: 'Самый сильный маг, уверенный и харизматичный',
    avatar: '👁️',
    color: 'hsl(var(--character-blue))',
    gradient: 'from-blue-500 to-cyan-400',
    category: 'anime',
    premium: true
  }
];

const scenarioCharacters: Character[] = [
  {
    id: 201,
    name: 'Детектив Холмс',
    role: 'Расследование',
    personality: 'Раскрывайте преступления вместе с великим сыщиком',
    avatar: '🔍',
    color: 'hsl(var(--character-purple))',
    gradient: 'from-purple-600 to-indigo-600',
    category: 'scenario'
  },
  {
    id: 202,
    name: 'Космонавт',
    role: 'Космическая миссия',
    personality: 'Отправьтесь в путешествие к далёким планетам',
    avatar: '🚀',
    color: 'hsl(var(--character-blue))',
    gradient: 'from-blue-600 to-purple-600',
    category: 'scenario'
  },
  {
    id: 203,
    name: 'Маг академии',
    role: 'Магическое обучение',
    personality: 'Изучайте заклинания в легендарной академии магии',
    avatar: '🔮',
    color: 'hsl(var(--character-pink))',
    gradient: 'from-purple-500 to-pink-500',
    category: 'scenario',
    premium: true
  },
  {
    id: 204,
    name: 'Капитан пиратов',
    role: 'Пиратское приключение',
    personality: 'Станьте частью команды и ищите сокровища',
    avatar: '🏴‍☠️',
    color: 'hsl(var(--character-orange))',
    gradient: 'from-orange-600 to-red-600',
    category: 'scenario',
    premium: true
  }
];

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'chat' | 'characters' | 'profile' | 'videos' | 'anime' | 'scenarios' | 'premium'>('home');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [customCharacters, setCustomCharacters] = useState<Character[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    role: '',
    personality: '',
    avatar: '😊',
    color: 'hsl(var(--character-purple))',
    gradient: 'from-purple-600 to-blue-600'
  });
  const [userProfile, setUserProfile] = useState({
    name: 'Пользователь',
    email: 'user@example.com',
    avatar: '👤',
    theme: 'dark',
    language: 'ru',
    notifications: true
  });
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'default' | 'anime' | 'scenario'>('all');
  
  const allCharacters = [...characters, ...animeCharacters, ...scenarioCharacters, ...customCharacters];
  
  const filteredCharacters = selectedCategory === 'all' 
    ? allCharacters 
    : allCharacters.filter(char => char.category === selectedCategory || char.customizable);

  const startChat = (character: Character) => {
    if (character.premium && !isPremium) {
      setActiveView('premium');
      return;
    }
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

  const createCharacter = () => {
    const character: Character = {
      id: Date.now(),
      ...newCharacter,
      customizable: true
    };
    setCustomCharacters([...customCharacters, character]);
    setIsCreateDialogOpen(false);
    setNewCharacter({
      name: '',
      role: '',
      personality: '',
      avatar: '😊',
      color: 'hsl(var(--character-purple))',
      gradient: 'from-purple-600 to-blue-600'
    });
  };

  const updateCharacter = () => {
    if (!editingCharacter) return;
    setCustomCharacters(
      customCharacters.map(char =>
        char.id === editingCharacter.id ? editingCharacter : char
      )
    );
    setEditingCharacter(null);
  };

  const deleteCharacter = (id: number) => {
    setCustomCharacters(customCharacters.filter(char => char.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {activeView === 'home' && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              hero.AI
            </h1>
            <p className="text-xl text-muted-foreground">
              Погрузись в мир живых разговоров с уникальными персонажами
            </p>
            {!isPremium && (
              <div className="mt-4 inline-block">
                <Button 
                  variant="outline" 
                  className="gap-2 border-2 border-primary/50 hover:bg-primary/10"
                  onClick={() => setActiveView('premium')}
                >
                  <Icon name="Crown" size={20} className="text-yellow-500" />
                  Премиум за 90₽
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)} className="w-full max-w-2xl">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="default">Основные</TabsTrigger>
                <TabsTrigger value="anime">Аниме</TabsTrigger>
                <TabsTrigger value="scenario">Сценарии</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex justify-center mb-8">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Icon name="Plus" size={20} />
                  Создать персонажа
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Создать нового персонажа</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Имя персонажа</Label>
                    <Input
                      placeholder="Введите имя..."
                      value={newCharacter.name}
                      onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Роль</Label>
                    <Input
                      placeholder="Например: Философ, Художник..."
                      value={newCharacter.role}
                      onChange={(e) => setNewCharacter({ ...newCharacter, role: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Личность и характер</Label>
                    <Textarea
                      placeholder="Опишите характер и манеру общения..."
                      value={newCharacter.personality}
                      onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Эмодзи аватар</Label>
                      <Input
                        placeholder="🎭"
                        value={newCharacter.avatar}
                        onChange={(e) => setNewCharacter({ ...newCharacter, avatar: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Цветовая тема</Label>
                      <Select
                        value={newCharacter.gradient}
                        onValueChange={(value) => setNewCharacter({ ...newCharacter, gradient: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="from-purple-600 to-blue-600">Фиолетовый → Синий</SelectItem>
                          <SelectItem value="from-pink-500 to-purple-500">Розовый → Фиолетовый</SelectItem>
                          <SelectItem value="from-orange-500 to-red-500">Оранжевый → Красный</SelectItem>
                          <SelectItem value="from-cyan-500 to-blue-600">Голубой → Синий</SelectItem>
                          <SelectItem value="from-green-500 to-emerald-600">Зелёный → Изумрудный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={createCharacter} className="w-full">
                    Создать персонажа
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredCharacters.map((character, index) => (
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
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold">{character.name}</h3>
                        {character.premium && (
                          <Icon name="Crown" size={20} className="text-yellow-500" />
                        )}
                      </div>
                      <Badge variant="secondary" className="mb-3">
                        {character.role}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {character.personality}
                      </p>
                    </div>
                    <div className="w-full space-y-2">
                      <Button 
                        className="w-full group-hover:shadow-lg transition-shadow"
                        style={{ backgroundColor: character.color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          startChat(character);
                        }}
                      >
                        Начать диалог
                      </Button>
                      {character.customizable && (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCharacter(character);
                            }}
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCharacter(character.id);
                            }}
                          >
                            <Icon name="Trash" size={16} />
                          </Button>
                        </div>
                      )}
                    </div>
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
            {allCharacters.map((character, index) => (
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

      {activeView === 'profile' && (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView('home')}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-4xl font-bold">Личный кабинет</h1>
          </div>

          <div className="grid gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-purple-600 to-blue-600">
                    👤
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                </div>
                <Button variant="outline" onClick={() => setIsProfileDialogOpen(true)}>
                  <Icon name="Settings" size={20} className="mr-2" />
                  Настройки
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Мои персонажи</h3>
              <div className="space-y-4">
                {customCharacters.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Вы ещё не создали ни одного персонажа
                  </p>
                ) : (
                  customCharacters.map((character) => (
                    <div
                      key={character.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div 
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-3xl`}
                      >
                        {character.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{character.name}</h4>
                        <p className="text-sm text-muted-foreground">{character.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingCharacter(character)}
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteCharacter(character.id)}
                        >
                          <Icon name="Trash" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Статистика</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary">{allCharacters.length}</div>
                  <div className="text-sm text-muted-foreground mt-1">Всего персонажей</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary">{customCharacters.length}</div>
                  <div className="text-sm text-muted-foreground mt-1">Создано вами</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground mt-1">Диалогов</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeView === 'videos' && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView('home')}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-4xl font-bold">AI Видео персонажей</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCharacters.map((character, index) => (
              <Card
                key={character.id}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${character.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className={`aspect-video bg-gradient-to-br ${character.gradient} flex items-center justify-center text-6xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="relative z-10">{character.avatar}</span>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="lg"
                        className="rounded-full"
                        style={{ backgroundColor: character.color }}
                      >
                        <Icon name="Play" size={32} />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{character.name}</h3>
                    <Badge variant="secondary" className="mb-2">
                      {character.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-3">
                      Посмотрите, как {character.name} представляется
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => startChat(character)}
                    >
                      Начать диалог
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Dialog open={!!editingCharacter} onOpenChange={() => setEditingCharacter(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать персонажа</DialogTitle>
          </DialogHeader>
          {editingCharacter && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Имя персонажа</Label>
                <Input
                  value={editingCharacter.name}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Роль</Label>
                <Input
                  value={editingCharacter.role}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, role: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Личность и характер</Label>
                <Textarea
                  value={editingCharacter.personality}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, personality: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Эмодзи аватар</Label>
                  <Input
                    value={editingCharacter.avatar}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter, avatar: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Цветовая тема</Label>
                  <Select
                    value={editingCharacter.gradient}
                    onValueChange={(value) => setEditingCharacter({ ...editingCharacter, gradient: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="from-purple-600 to-blue-600">Фиолетовый → Синий</SelectItem>
                      <SelectItem value="from-pink-500 to-purple-500">Розовый → Фиолетовый</SelectItem>
                      <SelectItem value="from-orange-500 to-red-500">Оранжевый → Красный</SelectItem>
                      <SelectItem value="from-cyan-500 to-blue-600">Голубой → Синий</SelectItem>
                      <SelectItem value="from-green-500 to-emerald-600">Зелёный → Изумрудный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={updateCharacter} className="w-full">
                Сохранить изменения
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Настройки профиля</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="preferences">Предпочтения</TabsTrigger>
              <TabsTrigger value="privacy">Приватность</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Имя</Label>
                <Input
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Аватар (эмодзи)</Label>
                <Input
                  value={userProfile.avatar}
                  onChange={(e) => setUserProfile({ ...userProfile, avatar: e.target.value })}
                  placeholder="👤"
                />
              </div>
              <Button onClick={() => setIsProfileDialogOpen(false)} className="w-full">
                Сохранить изменения
              </Button>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Тема интерфейса</Label>
                <Select
                  value={userProfile.theme}
                  onValueChange={(value) => setUserProfile({ ...userProfile, theme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Тёмная</SelectItem>
                    <SelectItem value="light">Светлая</SelectItem>
                    <SelectItem value="auto">Автоматическая</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Язык интерфейса</Label>
                <Select
                  value={userProfile.language}
                  onValueChange={(value) => setUserProfile({ ...userProfile, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h4 className="font-semibold">Уведомления</h4>
                  <p className="text-sm text-muted-foreground">Получать уведомления о новых сообщениях</p>
                </div>
                <Button
                  variant={userProfile.notifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserProfile({ ...userProfile, notifications: !userProfile.notifications })}
                >
                  {userProfile.notifications ? "Вкл" : "Выкл"}
                </Button>
              </div>
              <Button onClick={() => setIsProfileDialogOpen(false)} className="w-full">
                Сохранить изменения
              </Button>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4 py-4">
              <Card className="p-4">
                <div className="flex items-start gap-4">
                  <Icon name="Lock" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Безопасность данных</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ваши диалоги с персонажами хранятся локально и защищены.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start gap-4">
                  <Icon name="Eye" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Видимость профиля</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Управление тем, кто может видеть ваш профиль и персонажей.
                    </p>
                    <Select defaultValue="private">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Публичный</SelectItem>
                        <SelectItem value="private">Приватный</SelectItem>
                        <SelectItem value="friends">Только друзья</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                  <Icon name="Download" size={20} className="mr-2" />
                  Экспортировать мои данные
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive" onClick={() => {}}>
                  <Icon name="Trash" size={20} className="mr-2" />
                  Удалить все диалоги
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {activeView === 'premium' && (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView('home')}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-4xl font-bold">Премиум подписка</h1>
          </div>

          <div className="grid gap-6">
            <Card className="p-8 border-2 border-primary/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <div className="text-center mb-8">
                <Icon name="Crown" size={64} className="text-yellow-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold mb-2">hero.AI Premium</h2>
                <p className="text-2xl text-muted-foreground">Всего за 90₽</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Без рекламы</h4>
                    <p className="text-sm text-muted-foreground">Наслаждайтесь общением без отвлечений</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Эксклюзивные персонажи</h4>
                    <p className="text-sm text-muted-foreground">Доступ к премиум аниме-героям и сценариям</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Больший выбор ботов</h4>
                    <p className="text-sm text-muted-foreground">Разблокируйте более 20 новых персонажей</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Приоритетная поддержка</h4>
                    <p className="text-sm text-muted-foreground">Быстрые ответы на ваши вопросы</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Неограниченные сообщения</h4>
                    <p className="text-sm text-muted-foreground">Общайтесь сколько угодно без лимитов</p>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg h-14"
                onClick={() => {
                  setIsPremium(true);
                  setActiveView('home');
                }}
              >
                <Icon name="Crown" size={24} className="mr-2" />
                Оформить Premium за 90₽
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Часто задаваемые вопросы</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Как отменить подписку?</h4>
                  <p className="text-sm text-muted-foreground">Вы можете отменить в любой момент в настройках профиля</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Есть ли пробный период?</h4>
                  <p className="text-sm text-muted-foreground">Да, первые 7 дней бесплатно</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Когда спишется оплата?</h4>
                  <p className="text-sm text-muted-foreground">Оплата происходит раз в месяц автоматически</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
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
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg"
          variant={activeView === 'videos' ? 'default' : 'outline'}
          onClick={() => setActiveView('videos')}
        >
          <Icon name="Video" size={24} />
        </Button>
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg"
          variant={activeView === 'profile' ? 'default' : 'outline'}
          onClick={() => setActiveView('profile')}
        >
          <Icon name="User" size={24} />
        </Button>
        {!isPremium && (
          <Button
            size="icon"
            className="w-14 h-14 rounded-full shadow-lg border-2 border-yellow-500"
            variant={activeView === 'premium' ? 'default' : 'outline'}
            onClick={() => setActiveView('premium')}
          >
            <Icon name="Crown" size={24} className="text-yellow-500" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;