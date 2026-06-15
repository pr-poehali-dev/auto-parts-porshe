import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMAGE =
  'https://cdn.poehali.dev/projects/408c4ace-5e17-4534-b7a9-d57dc5ad34ab/files/1695fe1d-0c07-4a7d-a992-ad70bad05223.jpg';

const MODELS = ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan', '718 Cayman'];

const CATEGORIES = [
  { icon: 'Disc3', title: 'Подвеска', desc: 'Амортизаторы, рычаги, сайлентблоки, пневмостойки', count: '1 240+' },
  { icon: 'Cog', title: 'Двигатель (ДВС)', desc: 'Поршневая группа, ГРМ, прокладки, насосы', count: '2 870+' },
  { icon: 'Zap', title: 'Электрика', desc: 'Датчики, блоки управления, проводка, реле', count: '960+' },
  { icon: 'CircleDot', title: 'Тормозная система', desc: 'Колодки, диски, суппорты, шланги', count: '740+' },
];

const PRODUCTS = [
  { name: 'Тормозные колодки Brembo передние', model: '911 / 718', price: '24 900', tag: 'Хит', icon: 'CircleDot' },
  { name: 'Кованые диски Porsche 21"', model: 'Cayenne / Macan', price: '189 000', tag: 'Оригинал', icon: 'CircleDashed' },
  { name: 'Комплект ГРМ моторной группы', model: 'Panamera', price: '78 500', tag: '', icon: 'Cog' },
  { name: 'Амортизатор PASM передний', model: '911 Carrera', price: '112 000', tag: '', icon: 'Disc3' },
  { name: 'Тормозной диск вентилируемый', model: 'Cayenne Turbo', price: '41 200', tag: '', icon: 'Disc' },
  { name: 'Блок управления двигателем DME', model: 'Taycan', price: '156 000', tag: 'Новинка', icon: 'Cpu' },
];

const Index = () => {
  const [activeModel, setActiveModel] = useState('911');

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* TOP BAR */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container flex items-center justify-between py-2">
          <span className="flex items-center gap-2">
            <Icon name="Truck" size={14} /> Доставка по РФ за 1–3 дня
          </span>
          <span className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Icon name="ShieldCheck" size={14} /> Гарантия оригинала</span>
            <a href="tel:+74950000000" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Icon name="Phone" size={14} /> +7 495 000-00-00
            </a>
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="font-display text-2xl font-bold tracking-tight">
            RU<span className="text-accent">-</span>PORSHE
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {['Каталог', 'Подбор по модели', 'Подвеска', 'Двигатель', 'Электрика', 'Контакты'].map((i) => (
              <a key={i} href="#catalog" className="hover:text-accent transition-colors">{i}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Icon name="Search" size={20} /></Button>
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full grid place-items-center">2</span>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border grid-pattern">
        <div className="container grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-5">
              <span className="h-px w-8 bg-accent" /> Запчасти для Porsche
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[0.95] uppercase text-balance">
              Оригинальные<br /> запчасти <span className="text-accent">Porsche</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Подвеска, двигатель, электрика, диски и тормоза. Точный подбор по вашей модели за пару кликов.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                <Icon name="Search" size={18} /> Подобрать запчасть
              </Button>
              <Button size="lg" variant="outline" className="font-semibold" asChild>
                <a href="#catalog">Открыть каталог</a>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <img src={HERO_IMAGE} alt="Porsche 911" className="w-full rounded-2xl shadow-2xl object-cover" />
            <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl shadow-xl px-5 py-3 hidden sm:block">
              <p className="font-display text-3xl font-bold">6 800+</p>
              <p className="text-xs text-muted-foreground">позиций в наличии</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL SELECTOR */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container py-7">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <p className="font-display uppercase font-semibold text-sm tracking-wide flex items-center gap-2 shrink-0">
              <Icon name="Car" size={18} className="text-accent" /> Подбор по модели:
            </p>
            <div className="flex flex-wrap gap-2">
              {MODELS.map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveModel(m)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                    activeModel === m
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:border-accent hover:text-accent'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container py-16 lg:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Разделы каталога</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase mt-2">Подбор по системам</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <a
              key={c.title}
              href="#catalog"
              className="group bg-card border border-border rounded-2xl p-7 hover-lift"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary grid place-items-center mb-5 group-hover:bg-accent transition-colors">
                <Icon name={c.icon} size={26} className="text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold uppercase">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.desc}</p>
              <p className="mt-5 text-xs font-semibold text-accent flex items-center gap-1">
                {c.count} позиций <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="catalog" className="bg-secondary/40 border-y border-border">
        <div className="container py-16 lg:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Каталог запчастей</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase mt-2">Популярные позиции</h2>
            </div>
            <Button variant="outline" className="font-semibold">Весь каталог <Icon name="ArrowRight" size={16} /></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="group bg-card border border-border rounded-2xl overflow-hidden hover-lift">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary to-muted grid place-items-center">
                  <Icon name={p.icon} size={64} className="text-muted-foreground/40 group-hover:scale-110 transition-transform duration-300" />
                  {p.tag && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{p.model}</p>
                  <h3 className="font-semibold mt-1 leading-snug min-h-[48px]">{p.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="font-display text-2xl font-bold">{p.price} <span className="text-base">₽</span></p>
                    <Button size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl">
                      <Icon name="ShoppingCart" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="container py-16 lg:py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: 'BadgeCheck', t: 'Только оригинал', d: 'Сертифицированные запчасти и проверенные бренды' },
          { icon: 'Truck', t: 'Быстрая доставка', d: 'По всей России за 1–3 дня, самовывоз в Москве' },
          { icon: 'Wrench', t: 'Помощь в подборе', d: 'Эксперты подберут деталь по VIN-номеру' },
          { icon: 'RotateCcw', t: 'Возврат 14 дней', d: 'Вернём деньги, если деталь не подошла' },
        ].map((a) => (
          <div key={a.t}>
            <Icon name={a.icon} size={32} className="text-accent" />
            <h3 className="font-display text-lg font-semibold uppercase mt-4">{a.t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{a.d}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold uppercase">Не нашли нужную деталь?</h2>
          <p className="mt-4 text-primary-foreground/70 max-w-xl mx-auto">
            Отправьте VIN-номер вашего Porsche — подберём запчасть и рассчитаем стоимость в течение часа.
          </p>
          <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Icon name="MessageSquare" size={18} /> Оставить заявку
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="font-display text-2xl font-bold">RU<span className="text-accent">-</span>PORSHE</p>
            <p className="text-muted-foreground mt-3">Запчасти и комплектующие для автомобилей Porsche.</p>
          </div>
          <div>
            <p className="font-semibold mb-3 uppercase font-display">Каталог</p>
            <ul className="space-y-2 text-muted-foreground">
              {['Подвеска', 'Двигатель', 'Электрика', 'Диски и тормоза'].map((i) => (
                <li key={i}><a href="#catalog" className="hover:text-accent transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3 uppercase font-display">Модели</p>
            <ul className="space-y-2 text-muted-foreground">
              {MODELS.slice(0, 4).map((i) => (
                <li key={i}><a href="#" className="hover:text-accent transition-colors">Porsche {i}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3 uppercase font-display">Контакты</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><Icon name="Phone" size={15} /> +7 495 000-00-00</li>
              <li className="flex items-center gap-2"><Icon name="Mail" size={15} /> info@ru-porshe.ru</li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={15} /> Москва, ул. Автозаводская, 1</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container py-5 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
            <span>© 2026 RU-PORSHE. Все права защищены.</span>
            <span>Не является официальным дилером Porsche AG.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
