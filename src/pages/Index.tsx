import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const HERO_IMAGE =
  'https://cdn.poehali.dev/projects/408c4ace-5e17-4534-b7a9-d57dc5ad34ab/files/c70b180b-198c-42b0-90f5-480ad3c373c6.jpg';
const ENGINE_IMAGE =
  'https://cdn.poehali.dev/projects/408c4ace-5e17-4534-b7a9-d57dc5ad34ab/files/be906109-884f-499e-9d69-ee0767d03753.jpg';

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
  { name: 'Поршневая группа в сборе', model: '911 Turbo', price: '342 000', tag: '', icon: 'Cog' },
  { name: 'Датчик ABS колеса', model: 'Macan', price: '8 900', tag: '', icon: 'Zap' },
  { name: 'Рычаг подвески алюминиевый', model: 'Panamera', price: '36 400', tag: 'Хит', icon: 'Disc3' },
];

const SERVICES = [
  { icon: 'Search', title: 'Подбор по VIN', desc: 'Точно определим деталь по VIN-номеру вашего Porsche' },
  { icon: 'Wrench', title: 'Установка и ремонт', desc: 'Профессиональный монтаж в сертифицированном сервисе' },
  { icon: 'Stethoscope', title: 'Диагностика', desc: 'Компьютерная диагностика двигателя и электрики' },
  { icon: 'Truck', title: 'Доставка по РФ', desc: 'Отправка в любой регион за 1–3 дня' },
];

const REVIEWS = [
  { name: 'Алексей М.', car: 'Porsche 911 Carrera', text: 'Заказывал тормозные колодки и диски — пришло за два дня, всё оригинал. Подобрали по VIN моментально.', rating: 5 },
  { name: 'Дмитрий К.', car: 'Cayenne Turbo', text: 'Лучший магазин запчастей Porsche. Помогли с моторной группой, цены адекватные, консультация на высоте.', rating: 5 },
  { name: 'Сергей В.', car: 'Panamera 4S', text: 'Брал амортизаторы PASM — всё подошло идеально. Приятно, что разбираются в технике, а не просто продают.', rating: 5 },
];

const Index = () => {
  const { toast } = useToast();

  const [activeModel, setActiveModel] = useState('911');
  const [form, setForm] = useState({ name: '', phone: '', vin: '', comment: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({ title: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const res = await fetch('https://functions.poehali.dev/c765a3fb-d2b9-46bc-964f-49662dd3dcc0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast({ title: '✅ Заявка отправлена!', description: 'Мы свяжемся с вами в течение часа.' });
      setForm({ name: '', phone: '', vin: '', comment: '' });
    } catch {
      toast({ title: 'Ошибка отправки', description: 'Позвоните нам: +7 495 000-00-00', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* TOP BAR */}
      <div className="bg-black text-white/80 text-xs border-b border-border">
        <div className="container flex items-center justify-between py-2">
          <span className="flex items-center gap-2">
            <Icon name="Truck" size={14} className="text-accent" /> Доставка по РФ за 1–3 дня
          </span>
          <span className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Icon name="ShieldCheck" size={14} className="text-accent" /> Гарантия оригинала</span>
            <a href="tel:+74950000000" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Icon name="Phone" size={14} /> +7 495 000-00-00
            </a>
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="font-display text-2xl font-bold tracking-tight">
            RU<span className="text-accent">-</span>PORSHE
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[['Каталог', '#catalog'], ['Услуги', '#services'], ['О компании', '#about'], ['Отзывы', '#reviews'], ['Контакты', '#contacts']].map(([t, h]) => (
              <a key={t} href={h} className="hover:text-accent transition-colors">{t}</a>
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
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Porsche 911" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="container relative py-24 lg:py-36">
          <div className="max-w-xl animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-5">
              <span className="h-px w-8 bg-accent" /> Запчасти для Porsche
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[0.95] uppercase text-balance">
              Оригинальные<br /> запчасти <span className="text-gradient-gold">Porsche</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Подвеска, двигатель, электрика, диски и тормоза. Точный подбор по вашей модели за пару кликов.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" asChild>
                <a href="#contacts"><Icon name="Search" size={18} /> Подобрать запчасть</a>
              </Button>
              <Button size="lg" variant="outline" className="font-semibold border-white/20 bg-white/5 hover:bg-white/10" asChild>
                <a href="#catalog">Открыть каталог</a>
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              {[['6 800+', 'позиций'], ['12 лет', 'на рынке'], ['24 ч', 'на подбор']].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-bold text-accent">{n}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODEL SELECTOR */}
      <section className="border-b border-border bg-secondary/40">
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
                      ? 'bg-accent text-accent-foreground border-accent'
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
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Разделы каталога</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase mt-2">Подбор по системам</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <a key={c.title} href="#catalog" className="group bg-card border border-border rounded-2xl p-7 hover-lift hover:border-accent/50">
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
      <section id="catalog" className="bg-secondary/30 border-y border-border">
        <div className="container py-16 lg:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Каталог запчастей</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase mt-2">Диски, колодки, моторная группа</h2>
            </div>
            <Button variant="outline" className="font-semibold">Весь каталог <Icon name="ArrowRight" size={16} /></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="group bg-card border border-border rounded-2xl overflow-hidden hover-lift hover:border-accent/50">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary to-background grid place-items-center">
                  <Icon name={p.icon} size={64} className="text-muted-foreground/30 group-hover:scale-110 group-hover:text-accent/60 transition-all duration-300" />
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

      {/* SERVICES */}
      <section id="services" className="container py-16 lg:py-20">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Услуги и сервис</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase mt-2">Не только продаём — обслуживаем</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title} className="border border-border rounded-2xl p-7 bg-card hover-lift hover:border-accent/50 group">
              <Icon name={s.icon} size={32} className="text-accent" />
              <h3 className="font-display text-lg font-semibold uppercase mt-4">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-secondary/30 border-y border-border">
        <div className="container py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={ENGINE_IMAGE} alt="Двигатель Porsche" className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]" />
            <div className="absolute -bottom-5 -right-5 bg-accent text-accent-foreground rounded-xl px-6 py-4 hidden sm:block">
              <p className="font-display text-4xl font-bold">12</p>
              <p className="text-xs uppercase tracking-wide">лет опыта</p>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">О компании</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase mt-2">RU-PORSHE — эксперты по Porsche</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Мы специализируемся исключительно на автомобилях Porsche уже более 12 лет. В нашем каталоге — оригинальные
              и проверенные запчасти для всех моделей: от классических 911 до электрических Taycan.
            </p>
            <ul className="mt-6 space-y-3">
              {['Только оригинал и сертифицированные бренды', 'Подбор детали по VIN-номеру', 'Собственный склад в Москве', 'Гарантия на все запчасти'].map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-accent shrink-0" /> <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="container py-16 lg:py-20">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Отзывы клиентов</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase mt-2">Нам доверяют владельцы Porsche</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-card border border-border rounded-2xl p-7 hover-lift">
              <div className="flex gap-1 text-accent mb-4">
                {Array.from({ length: r.rating }).map((_, i) => <Icon key={i} name="Star" size={16} className="fill-accent" />)}
              </div>
              <p className="text-muted-foreground leading-relaxed">«{r.text}»</p>
              <div className="mt-5 pt-5 border-t border-border">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.car}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contacts" className="bg-secondary/30 border-y border-border">
        <div className="container py-16 lg:py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Заявка на подбор</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase mt-2">Подберём запчасть по VIN</h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Оставьте контакты и VIN-номер вашего Porsche — найдём нужную деталь и рассчитаем стоимость в течение часа.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3"><Icon name="Phone" size={18} className="text-accent" /> +7 495 000-00-00</li>
              <li className="flex items-center gap-3"><Icon name="Mail" size={18} className="text-accent" /> info@ru-porshe.ru</li>
              <li className="flex items-center gap-3"><Icon name="MapPin" size={18} className="text-accent" /> Москва, ул. Автозаводская, 1</li>
              <li className="flex items-center gap-3"><Icon name="Clock" size={18} className="text-accent" /> Ежедневно с 9:00 до 21:00</li>
            </ul>
          </div>
          <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-7 space-y-4">
            <Input placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Телефон" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input placeholder="VIN-номер (необязательно)" value={form.vin} onChange={(e) => setForm({ ...form, vin: e.target.value })} />
            <Textarea placeholder="Какая запчасть нужна?" rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            <Button type="submit" size="lg" disabled={sending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <Icon name={sending ? 'Loader2' : 'Send'} size={18} className={sending ? 'animate-spin' : ''} />
              {sending ? 'Отправляем...' : 'Отправить заявку'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
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
                <li key={i}><a href="#catalog" className="hover:text-accent transition-colors">Porsche {i}</a></li>
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