"use client";

import { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Camera, 
  Mic, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Smartphone, 
  Heart, 
  Star, 
  CheckCircle,
  Send
} from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Conversa pelo WhatsApp",
      description: "Envie suas memórias diretamente pelo WhatsApp de forma simples e rápida"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Fotos e Vídeos",
      description: "Compartilhe suas fotos e vídeos favoritos para incluir no livro"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Áudios Personalizados",
      description: "Grave áudios contando suas histórias e memórias especiais"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Textos e Descrições",
      description: "Adicione textos explicativos e descrições para cada momento"
    }
  ];

  const aiFeatures = [
    "Organização automática das memórias",
    "Criação de narrativas personalizadas",
    "Design adaptado à temática escolhida",
    "Correção e melhoria de textos",
    "Sugestões de títulos e legendas",
    "Layout profissional e elegante"
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Transformei as fotos da viagem dos meus pais em um livro incrível! A IA fez um trabalho perfeito.",
      rating: 5
    },
    {
      name: "João Santos",
      text: "O processo foi super simples pelo WhatsApp. O resultado ficou profissional e emocionante.",
      rating: 5
    },
    {
      name: "Ana Costa",
      text: "Criei um livro de recordações para minha avó com todas as fotos antigas da família. Ela adorou!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/50 via-background to-muted/30">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary">
              recorda
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors">Como Funciona</a>
            <a href="#recursos" className="text-muted-foreground hover:text-primary transition-colors">Recursos</a>
            <a href="#depoimentos" className="text-muted-foreground hover:text-primary transition-colors">Depoimentos</a>
            <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors">Contato</a>
          </nav>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover-lift font-medium">
            Começar Agora
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              Transforme suas memórias em
              <span className="block text-primary">histórias mágicas</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Crie um livro de recordações personalizado com o poder da IA. 
              <br />
              Envie fotos, áudios e textos pelo WhatsApp e deixe a tecnologia fazer o resto!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover-lift flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Falar no WhatsApp</span>
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold hover-lift">
                Ver Exemplos
              </button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className={`mt-16 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl shadow-2xl p-8 animate-float border border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                    <Smartphone className="mx-auto w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Envie pelo WhatsApp</h3>
                    <p className="text-sm opacity-90">Fotos, áudios e textos de forma simples</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-6 text-secondary-foreground">
                    <Sparkles className="mx-auto w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">IA Processa</h3>
                    <p className="text-sm opacity-90">Tecnologia cria sua história automaticamente</p>
                  </div>
                  <div className="bg-accent rounded-xl p-6 text-accent-foreground">
                    <BookOpen className="mx-auto w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Receba seu Livro</h3>
                    <p className="text-sm opacity-90">Digital ou físico, você escolhe!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O processo é incrivelmente simples. Você só precisa enviar suas memórias e deixar a IA fazer a mágica acontecer!
            </p>
          </div>
          
          <div className="md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-6 rounded-2xl bg-card hover-lift border border-border ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Poder da IA */}
      <section className="p-8 md:p-20 bg-muted">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                O Poder da IA
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nossa inteligência artificial trabalha para transformar suas memórias em uma narrativa emocionante e profissional.
              </p>
              <div className="space-y-4">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${isVisible ? 'animate-bounce-in' : 'opacity-0'}`}>
              <div className="bg-card rounded-2xl shadow-xl p-8 animate-pulse-glow border border-border">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-card-foreground">IA Inteligente</h3>
                  <p className="text-muted-foreground mb-6">
                    Nossa tecnologia analisa cada elemento e cria uma história coesa e emocionante
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">Personalizado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary-foreground">24h</div>
                      <div className="text-sm text-muted-foreground">Entrega</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opções de Entrega */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Escolha sua Preferência
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Você pode optar pelo livro digital ou físico, ambos com a mesma qualidade e personalização.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className={`bg-card rounded-2xl p-8 hover-lift border border-border ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Livro Digital</h3>
              <p className="text-muted-foreground mb-6">
                Acesso instantâneo, compartilhável e sempre disponível em qualquer dispositivo
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Entrega imediata</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Compartilhável</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Edição ilimitada</span>
                </li>
              </ul>
              <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold hover-lift">
                Escolher Digital
              </button>
            </div>
            
            <div className={`bg-card rounded-2xl p-8 hover-lift border border-border ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Livro Físico</h3>
              <p className="text-muted-foreground mb-6">
                Impressão de alta qualidade, acabamento profissional e entrega em sua casa
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Impressão premium</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Acabamento profissional</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Entrega em casa</span>
                </li>
              </ul>
              <button className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold hover-lift">
                Escolher Físico
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="p-8 md:p-20 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de pessoas que transformaram suas memórias conosco
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-card rounded-2xl p-6 shadow-lg hover-lift border border-border ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="ml-3 font-semibold text-card-foreground">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <div className={`max-w-3xl mx-auto ${isVisible ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Pronto para criar sua história?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Comece agora mesmo enviando suas primeiras memórias pelo WhatsApp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-background text-foreground px-8 py-4 rounded-full text-lg font-semibold hover-lift flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Iniciar Conversa</span>
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover-lift">
                Ver Mais Exemplos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">recorda</span>
              </div>
              <p className="text-muted-foreground">
                Transformando memórias em histórias mágicas com o poder da IA.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Exemplos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Licenças</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Recorda. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
