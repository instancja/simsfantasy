# LIFEVERSE --- Master Project Plan

**Wersja:** 1.6\
**Data utworzenia:** 17 listopada 2026\
**Status projektu:** Koncepcja zatwierdzona częściowo · model rozgrywki i kierunek formularza postaci doprecyzowane\
**Typ dokumentu:** Główne źródło prawdy dla projektu

> Ten dokument opisuje uzgodniony dotychczas koncept prywatnej aplikacji
> LIFEVERSE. Nieustalone kwestie są oznaczone jako **OPEN**. Nie należy
> dopisywać do świata, postaci ani mechaniki niezatwierdzonych założeń
> jako faktów.

------------------------------------------------------------------------

## 1. Wizja projektu

LIFEVERSE to prywatny, lokalny symulator społeczno-fabularny na komputer
PC. Łączy dwie równorzędne warstwy:

1. **SOCIAL** --- prywatna sieć społecznościowa inspirowana X (dawniej
   Twitterem).
2. **STORY** --- turowa rozgrywka fabularna w formie interaktywnej
   prozy, w której gracz kontroluje wyłącznie główną postać, a AI
   odgrywa pozostałe postacie i świat.

Obie warstwy korzystają ze wspólnej bazy postaci, relacji, wydarzeń i
stanu świata. Wydarzenia z historii mogą wpływać na aktywność społeczną,
a aktywność społeczna może wpływać na fabułę.

Aplikacja jest przeznaczona wyłącznie do prywatnego użytku właścicielki.
Nie ma potrzeby udostępniania jej innym użytkownikom ani budowania
funkcji społecznościowej dla wielu graczy.

### Główne cele

- Budowanie własnego świata fantasy i rozwijanie go w czasie.
- Tworzenie, dodawanie i edytowanie wielu postaci w prosty sposób.
- Prowadzenie historii w turach, z perspektywy jednej grywalnej
  postaci.
- Obserwowanie autonomicznego życia pozostałych postaci.
- Korzystanie z tekstowej sieci społecznościowej, bez konieczności
  generowania obrazów.
- Zachowanie ciągłości wydarzeń, osobowości i relacji.
- Przechowywanie danych lokalnie na komputerze i możliwość tworzenia
  kopii zapasowych.

## 2. Potwierdzony koncept świata

### Estetyka i gatunek

- Współczesne fantasy.
- Inspiracja klimatem świata Harry'ego Pottera, przeniesionego do
  realiów współczesnych.
- Dark Academia, Gothic, Old Money.
- Magia i tradycje funkcjonują obok współczesnej technologii.

### Współczesność

Postacie mogą korzystać m.in. z: - iPhone'ów i innych smartfonów, -
komputerów i laptopów, - konsol PlayStation, - współczesnych aplikacji i
komunikatorów, - współczesnych mediów społecznościowych.

### Estetyka świata

Uzgodniony kierunek wizualny obejmuje m.in. gotycką architekturę, stare
rezydencje, biblioteki, akademickie wnętrza, tradycję, hierarchie
społeczne i klimat Dark Academia.

### Granice kanonu

**Nieustalone --- nie dopowiadać samodzielnie:** - nazwy i struktura
szkoły/akademii, - domy lub inne grupy, - geografia i lokalizacje, -
zasady i historia magii, - rody, ich hierarchia i polityka, - historia
świata, - główna postać i jej biografia, - pozostałe postacie i ich
kanoniczne relacje.

Wszystkie powyższe elementy zostaną określone przez właścicielkę
projektu. Inspiracja Harrym Potterem nie oznacza automatycznego
przyjęcia wszystkich elementów kanonu tej serii.

## 3. Docelowa platforma i forma

- Prywatna aplikacja uruchamiana lokalnie na komputerze PC.
- Interfejs typu desktop dashboard, dostępny najlepiej w przeglądarce
  lokalnej.
- Nie ma potrzeby imitowania ekranu iPhone'a.
- Interfejs ma być wygodny na dużym ekranie.
- Priorytetem jest działająca aplikacja, a nie statyczny mockup.

**Zatwierdzony kierunek techniczny:** lokalna aplikacja webowa oparta na Next.js (App Router), React i TypeScript. Dane są przechowywane lokalnie w SQLite przez Prisma ORM.

### Prywatność i dane

- Dane świata, postaci i historii powinny być przechowywane lokalnie.
- Aplikacja powinna umożliwiać eksport i kopię zapasową.
- Należy jasno rozróżnić dane lokalne od treści wysyłanych do
  zewnętrznego dostawcy AI.
- Nie zakładać, że samo posiadanie ChatGPT Free zapewnia aplikacji
  lokalnej dostęp do modelu ChatGPT.

## 4. Główna architektura funkcjonalna

Aplikacja składa się z następujących modułów:

### 4.1 SOCIAL --- sieć społecznościowa inspirowana X

Tekstowa sieć społecznościowa postaci. Nie jest to Instagram: nie opiera
się na zdjęciach ani generowaniu grafik.

**Potwierdzone funkcje:** - Feed z wpisami postaci. - Publikowanie
postów. - Odpowiedzi (replies). - Polubienia (likes). - Reposty. -
Cytowane posty (quote posts). - Obserwowanie postaci (following). -
Prywatne wiadomości (DMs). - Czaty grupowe. - Powiadomienia. - Profile
postaci.

**Usunięte / wykluczone:** - Zakładka Trends. - Funkcja globalnego
portalu trendów. - Obowiązkowe generowanie obrazów do postów.

Anonimowe konta, konta prywatne, zamknięte kręgi i inne rozszerzenia
były omawiane jako pomysły, ale nie zostały jeszcze zatwierdzone.
Oznaczyć je jako **OPEN / opcjonalne**, nie jako gotowe wymagania.

### 4.2 STORY --- turowa historia prozą

Story jest osobną warstwą aplikacji, niezależną od interfejsu Social,
ale połączoną z tym samym światem i bazą danych.

**Wybrany tryb: B --- współtworzenie turowe.**

Właścicielka odgrywa jedną, stałą postać. Nie przełącza się między postaciami. Pozostałe postacie są NPC i mogą wchodzić w interakcje między sobą również poza bezpośrednim udziałem postaci graczki, zgodnie z osobowościami, motywacjami, relacjami i posiadaną wiedzą.

Jedna historia odpowiada jednemu wydarzeniu / jednej scenie. Po zakończeniu wydarzenie zostaje zachowane jako wspomnienie, które może mieć znaczenie dla późniejszych zachowań, relacji i wiedzy postaci.

Właścicielka: - opisuje działania, wypowiedzi, gesty i myśli swojej
głównej postaci; - pisze wyłącznie z perspektywy postaci, którą
odgrywa; - nie musi pisać dialogów ani reakcji pozostałych postaci.

AI: - rozwija sytuację w pełną prozę; - odgrywa wszystkie postacie poza
główną postacią gracza; - tworzy dialogi, zachowania i reakcje NPC; -
opisuje otoczenie i konsekwencje; - zachowuje ciągłość scen i
charakterów; - pozostawia graczowi przestrzeń na kolejną turę.

#### Nienaruszalne zasady kontroli postaci

AI nie może: - podejmować decyzji za główną postać; - dopisywać jej
wypowiedzi; - wykonywać za nią działań, których gracz nie
zadeklarował; - przypisywać jej myśli, uczuć, intencji lub reakcji bez
podstawy w działaniu gracza.

Gracz kontroluje swoją postać. AI kontroluje pozostałe postacie,
otoczenie i świat.

#### Styl rozgrywki

- Pełna proza i naturalne dialogi.
- Swobodne działania wpisywane tekstowo.
- Bez wymuszonych wyborów A/B/C.
- Sceny nie powinny kończyć się sztucznie po jednej krótkiej
  odpowiedzi.
- Czas powinien płynąć logicznie, bez nieuzasadnionych przeskoków.
- Konsekwencje decyzji powinny być zachowywane.
- Postacie mogą odmawiać, kłamać, ignorować, manipulować lub działać
  wbrew oczekiwaniom gracza.

### 4.3 CHARACTERS --- baza postaci

Musi istnieć osobna warstwa zarządzania postaciami.

**Wymaganie UX:** łatwe dodawanie nowych postaci przez przycisk `+ Add Character` i formularz rozbudowany, podzielony na sekcje (wariant expanded zaakceptowany przez właścicielkę). Nie powinno być konieczne ręczne edytowanie wielu plików ani duplikowanie danych.

Sekcje formularza: informacje podstawowe, wygląd, osobowość, psychologia, historia, motywacje i cele, mocne i słabe strony, relacje, sekrety, komunikacja oraz dodatkowe informacje. Wymagane jest wyłącznie imię; pozostałe pola są opcjonalne. Sekret musi być wyraźnie oznaczony jako prywatny. Relacje pomiędzy konkretnymi postaciami powinny docelowo być zarządzane przez osobny moduł Relationships, a nie jako niesynchronizowane opisy w profilach. Nie narzucać wartości kategorii zależnych od niezatwierdzonego kanonu.

Docelowe pola profilu (szczegółowy formularz do zatwierdzenia): - imię i
nazwisko, - wiek i status, - przynależność / grupa / dom, jeśli istnieje
w kanonie, - wygląd, - osobowość, - historia, - motywacje i cele, -
mocne i słabe strony, - sekrety i wiedza, - relacje, - publiczny profil
społecznościowy, - styl pisania i komunikacji, - bieżące wątki
fabularne.

Każda postać powinna mieć odrębny, stabilny głos i osobowość. Dane
postaci muszą być współdzielone przez Social i Story.

### 4.4 RELATIONSHIPS --- relacje

Relacje nie mogą sprowadzać się do jednego statusu typu „przyjaciel" lub
„wróg".

Wstępnie zaproponowane niezależne wymiary: - zaufanie, - przyjaźń, -
atrakcyjność, - zazdrość, - uraza, - szacunek.

Wartości numeryczne 0--100 były propozycją projektową, nie ostatecznie
zatwierdzoną mechaniką. Sposób obliczania, aktualizacji i prezentacji
relacji pozostaje do zaprojektowania.

Relacje powinny wynikać z wydarzeń i zachowań. Nie mogą zmieniać się
arbitralnie tylko po to, by dopasować fabułę.

### 4.5 WORLD BIBLE --- kanon świata

Centralne miejsce na zatwierdzone informacje o świecie: - lore, -
historię, - magię i jej zasady, - lokalizacje, - instytucje, -
tradycje, - hierarchie, - kulturę i technologię.

Treści niezatwierdzone powinny być oznaczane jako pomysły lub pytania, a
nie jako kanon.

### 4.6 WORLD ENGINE --- symulacja i ciągłość

Warstwa odpowiedzialna za: - stan świata, - chronologię, - autonomię
NPC, - konsekwencje, - aktualizacje relacji, - wydarzenia, - spójność
pomiędzy Story i Social.

Świat nie powinien istnieć wyłącznie wokół głównej postaci. NPC mają
własne cele, relacje, konflikty i inicjatywę. NPC mogą wchodzić w interakcje
między sobą w tle, bez konieczności obecności postaci graczki. Istotne
wydarzenia powinny być zachowywane jako wspomnienia. Sposób i częstotliwość
symulacji tych interakcji pozostają do zaprojektowania.

Autonomia postaci została określona jako **wysoka**.

Nie oznacza to jednak konieczności ciągłego generowania zdarzeń.
Aktywność świata powinna być kontrolowana przez mechanikę symulacji i
dostępny budżet AI.

## 5. Zasady autonomii i narracji

1. NPC mają własne motywacje i mogą inicjować interakcje.
2. Nie wszyscy muszą lubić główną postać ani być nią zainteresowani.
3. Postacie nie ujawniają automatycznie wszystkich sekretów.
4. Publiczna persona może różnić się od prywatnego zachowania.
5. Relacje rozwijają się stopniowo.
6. Wydarzenia mają konsekwencje.
7. Postacie pamiętają ważne wspólne doświadczenia.
8. Aktywność Social nie musi komentować każdej sceny Story.
9. AI nie może przejmować kontroli nad postacią gracza.
10. Nie wolno dopisywać niezatwierdzonego lore do kanonu.

## 6. Powiązanie SOCIAL i STORY

Obie warstwy korzystają z jednego stanu świata.

Przykładowy przepływ: 1. W Story dochodzi do konfliktu. 2. Uczestnicy
sceny i jej skutki zostają zapisane. 3. Zmieniają się odpowiednie
relacje lub wiedza postaci. 4. Postać może później opublikować aluzję na
X albo wysłać DM. 5. Inne postacie reagują zgodnie ze swoją wiedzą i
osobowością.

Ważne: postać nie może znać prywatnej sceny, w której nie uczestniczyła,
jeśli nie otrzymała informacji inną wiarygodną drogą. System musi
rozróżniać: - fakty znane całemu światu, - fakty publiczne, - informacje
znane konkretnej postaci, - sekrety, - informacje znane graczowi, ale
niekoniecznie jego postaci.

## 7. Koncepcja interfejsu

### Główny dashboard

Desktopowy interfejs z nawigacją do: - SOCIAL, - STORY, - CHARACTERS, -
RELATIONSHIPS, - WORLD BIBLE, - WORLD STATE / TIMELINE.

### Estetyka UI

- Dark Academia.
- Gotycki, elegancki charakter.
- Ciemna paleta, stonowane kolory, czytelna typografia.
- Funkcjonalność i czytelność ważniejsze niż ozdobniki.
- Brak konieczności generowania zdjęć dla wpisów.

### SOCIAL

Widok inspirowany X: - kolumna feedu, - profile i szczegóły wpisów, -
panel wiadomości, - powiadomienia, - formularz publikacji i odpowiedzi.

### STORY

Edytor / widok rozgrywki: - czytelny obszar narracji, - historia
bieżącej sceny, - pole tekstowe na turę gracza, - kontekst sceny
(miejsce, czas, uczestnicy), - dostęp do informacji o postaciach bez
opuszczania sceny.

### CHARACTERS

- lista i wyszukiwarka postaci,
- `+ Add Character`,
- formularz dodawania,
- edycja profilu,
- powiązania i relacje,
- podgląd aktywności społecznościowej i udziału w scenach.

## 8. Wstępna architektura techniczna

### Preferowany model

Lokalna aplikacja webowa uruchamiana na PC.

Wstępne komponenty: - frontend: desktopowy dashboard webowy, - backend
lokalny: logika aplikacji i obsługa danych, - baza danych: SQLite jako
kandydat, - pliki: eksport, import i kopie zapasowe, - warstwa AI:
adapter umożliwiający komunikację z wybranym modelem.

Technologie nie zostały jeszcze ostatecznie wybrane.

### Zatwierdzony stos technologiczny — prostota konfiguracji

Właścicielka wskazała priorytet: najprostsze technologie, niewymagające
złożonej konfiguracji, z wykorzystaniem Next.js / React. Dobór pozostałych
elementów został powierzony asystentowi.

- **Next.js (App Router) + React + TypeScript** — jeden projekt i jedna
  aplikacja; UI oraz logika serwerowa w tym samym środowisku.
- **SQLite + Prisma ORM** — lokalna baza danych w jednym pliku, bez
  osobnego serwera bazy danych.
- **CSS Modules + global CSS** — style bez dodatkowego frameworka UI.
- **Vitest** — testy logiki w miarę powstawania modułów.
- **npm** — instalacja i uruchamianie projektu.
- **AI provider adapter** — późniejsza, odseparowana integracja; bez
  lokalnego modelu AI jako wymogu uruchomienia aplikacji.

Nie dodajemy na starcie Dockera, osobnego backendu FastAPI, Redux,
biblioteki komponentów ani narzędzi do pakowania desktopowego. Aplikacja
będzie działała lokalnie w przeglądarce; pakowanie do instalatora można
rozważyć dopiero po ustabilizowaniu MVP.

**Status: ZATWIERDZONY KIERUNEK TECHNOLOGICZNY.** Wersje zależności i
konfiguracja powinny być utrzymywane możliwie prosto. Wymagane Node.js
20.9 lub nowsze.

### Dostępny sprzęt właścicielki

- Laptop: MSI Katana 17 B13V.
- Procesor: Intel Core i9 (dokładny wariant nieustalony).
- GPU: NVIDIA GeForce RTX 4070 Laptop GPU.
- RAM: 16 GB — przyjmujemy tę wartość jako bazowe i obowiązujące ograniczenie sprzętowe na obecnym etapie; nie zakładamy rozbudowy pamięci.

Architektura i dobór narzędzi muszą uwzględniać 16 GB RAM oraz 8 GB VRAM typowe dla RTX 4070 Laptop GPU. Konkretne modele lokalnego AI wymagają testów wydajności; aplikacja nie może być uzależniona od jednego modelu ani dostawcy.

### Ważne rozróżnienie: ChatGPT Free a lokalna aplikacja

ChatGPT Free nie zapewnia automatycznie lokalnej aplikacji dostępu do
modelu ChatGPT. Korzystanie z modelu przez API jest osobną usługą i może
wiązać się z osobnymi kosztami.

Przed implementacją należy porównać: - lokalny model AI uruchamiany na
komputerze, - zewnętrzne API modelu, - ręczny przepływ pracy z ChatGPT
(np. eksport/import stanu i tekstu), jeśli integracja bezpośrednia nie
jest dostępna.

Nie wolno zakładać, że lokalna aplikacja będzie mogła automatycznie
używać limitów wiadomości ChatGPT Free. Wybór rozwiązania AI jest
**OPEN** i wymaga świadomej decyzji właścicielki.

### Lokalność

Aplikacja ma działać lokalnie, ale dokładny zakres lokalności zależy od
wybranego silnika AI: - lokalna baza danych może pozostać na PC; -
użycie zewnętrznego API oznacza wysyłanie odpowiednich danych do
dostawcy; - lokalny model może ograniczyć wysyłanie danych, ale wymaga
odpowiedniego sprzętu i konfiguracji.

## 9. Dane i model zapisu

Docelowe encje danych (do szczegółowego zaprojektowania): - Character -
CharacterProfile - Relationship - SocialPost - Reply - Like - Repost -
DirectMessage - GroupChat - GroupChatMessage - Notification - Story -
Chapter - Scene - SceneTurn - Event - Location - WorldFact -
CharacterKnowledge - TimelineEntry - WorldStateSnapshot

Ważne wymagania: - unikalne identyfikatory, - powiązania między
postaciami i wydarzeniami, - znaczniki czasu, - historia zmian, -
rozróżnienie informacji publicznych i prywatnych, - możliwość eksportu i
odtworzenia stanu.

## 10. Roadmap --- etapy tworzenia

Statusy: **NOT STARTED**, **IN PROGRESS**, **BLOCKED**, **DONE** (sprawdzone lokalnie), **OPEN** (wymaga decyzji).

| Etap | Zakres | Kryterium ukończenia | Status |
|---|---|---|---|
| 0. Product specification | Wymagania, zakres MVP i ograniczenia | Zatwierdzony zakres pierwszego pionowego wycinka | IN PROGRESS |
| 1. World Bible | Wprowadzenie kanonu świata | Zatwierdzony dokument świata | NOT STARTED |
| 2. Character model | Profil, formularz, lista, edycja i avatar | CRUD postaci sprawdzony lokalnie przez właścicielkę | DONE |
| 3. Data architecture | Schemat relacyjny, trwały zapis i zależności | Dane postaci, wydarzeń, tur i wspomnień zachowują spójność po restarcie | IN PROGRESS |
| 4. STORY MVP | Pojedyncze wydarzenie, tury gracza, zapis wspomnienia i późniejsza narracja AI | Pełny przepływ sceny działa; AI nie przejmuje postaci gracza | IN PROGRESS |
| 5. SOCIAL MVP | Feed, posty, replies, likes, reposts, profile | Podstawowe akcje zapisują się i są spójne ze światem | NOT STARTED |
| 6. Messaging | DMs i group chats | Wiadomości i członkostwo grup zapisują się | NOT STARTED |
| 7. Relationships | Model relacji i konsekwencje | Zmiany wynikają z wydarzeń | NOT STARTED |
| 8. Shared world state | Integracja Story i Social | Wydarzenia mogą aktualizować obie warstwy | NOT STARTED |
| 9. Notifications | Powiadomienia wynikające z aktywności | Powiadomienia są spójne ze zdarzeniami | NOT STARTED |
| 10. AI integration | Lokalny adapter Ollama, model Qwen, narracja wielogłosowa | AI korzysta z właściwego kontekstu i zapisuje osobne tury NPC/narratora | IN PROGRESS |
| 11. UI polish | Dopracowanie Dark Academia UI | Interfejs jest czytelny i spójny | NOT STARTED |
| 12. Testing | Testy ciągłości, danych i rozgrywki | Zaliczone scenariusze testowe | NOT STARTED |
| 13. Backup & release | Kopie zapasowe i lokalne uruchamianie | Można odtworzyć projekt po awarii | NOT STARTED |

### Proponowana kolejność MVP

1. Utworzenie postaci i wybór jednej postaci gracza.
2. Utworzenie pojedynczego wydarzenia i wskazanie uczestników.
3. Zapis tur wpisywanych przez gracza.
4. Zakończenie wydarzenia i zachowanie pełnego zapisu jako wspomnienia.
5. Integracja AI: osobne odpowiedzi narratora i NPC, bez przejmowania kontroli nad postacią gracza.
6. Dopiero później rozwój Social, autonomii NPC i wspólnego stanu świata.

## 11. Otwarte decyzje

Poniższe kwestie nie zostały jeszcze rozstrzygnięte:

### Świat i fabuła

- [ ] Nazwa świata i jego główne lokalizacje.
- [ ] Struktura szkoły/akademii.
- [ ] Domy lub inne grupy.
- [ ] Zasady magii.
- [ ] Rody i hierarchie.
- [ ] Główna postać i jej historia.
- [ ] Początkowa obsada postaci.

### SOCIAL

- [ ] Czy konta anonimowe będą dostępne?
- [ ] Czy konta prywatne i zatwierdzanie obserwujących będą dostępne?
- [ ] Czy będą zamknięte kręgi znajomych?
- [ ] Jak dokładnie działa feed: chronologicznie, według
  obserwowanych, czy mieszanie?
- [ ] Czy posty mogą być planowane lub publikowane przez autonomiczne
  NPC?
- [ ] Jakie są szczegółowe zasady widoczności i prywatności wpisów?

### STORY

- [x] Graczka może rozpocząć nowe wydarzenie z modułu Story w dowolnym momencie.
- [ ] Jak szczegółowy ma być zapis tur?
- [ ] Jak rozwiązywać przeskoki czasowe?
- [ ] Czy AI może proponować rozpoczęcie nowej sceny, bez wymuszania
  jej?

### Technologia

- [x] Stack: Next.js (App Router) + React + TypeScript + SQLite + Prisma + CSS Modules.
- [x] Język produktu: angielski; język rozmów projektowych i Master Planu: polski.
- [x] Silnik AI: bezpłatny lokalny runtime Ollama; bez płatnego API i subskrypcji.
- [x] Zainstalować Ollama, pobrać `qwen3.5:4b` i potwierdzić, że model generuje satysfakcjonujący tekst w teście ręcznym. Integracja aplikacyjna pozostaje do testu lokalnego.
- [x] Wymagany rytm Story: tura gracza → kontynuacja AI obejmująca adekwatne reakcje wielu NPC i narratora → kolejna tura gracza.
- [x] Język aplikacji: angielski; dokumentacja i współpraca: polski.
- [x] Uruchamianie lokalne przez npm / Next.js (`npm run dev`).
- [x] Bazowa konfiguracja sprzętowa: MSI Katana 17 B13V, Intel Core i9, RTX 4070 Laptop GPU, 16 GB RAM (bez założenia rozbudowy).
- [x] Sposób uruchamiania aplikacji: lokalnie przez `npm run dev` w Next.js.
- [ ] Format kopii zapasowej i eksportu.

## 12. Protokół aktualizacji Master Planu

Ten dokument jest nadrzędnym źródłem prawdy projektu. Po każdej
zatwierdzonej zmianie lub ukończonym etapie należy go zaktualizować.

### Obowiązkowa procedura

1. **Odczytaj aktualny Master Plan** przed rozpoczęciem pracy.
2. **Zidentyfikuj zmianę** --- nowa funkcja, korekta wymagań, decyzja
   techniczna albo ukończony etap.
3. **Sprawdź zgodność** z istniejącymi wymaganiami i otwartymi
   decyzjami.
4. **Zaktualizuj właściwą sekcję** --- nie dopisuj sprzecznych
   informacji.
5. **Zaktualizuj roadmapę** i status etapu, jeśli dotyczy.
6. **Zaktualizuj Open Decisions** --- zamknij rozstrzygnięte punkty,
   dodaj nowe.
7. **Dodaj wpis do Change Log** z datą, opisem, powodem i wpływem.
8. **Zwiększ numer wersji**.
9. **Zachowaj historię istotnych decyzji**. Nie usuwaj informacji o
   wcześniejszym stanie, jeśli ma znaczenie dla historii projektu.

### Reguły nadrzędne

- Zmiana jest traktowana jako zatwierdzona dopiero po wyraźnej
  akceptacji właścicielki.
- Sugestie AI nie stają się automatycznie wymaganiami.
- Nieustalone elementy pozostają oznaczone jako OPEN.
- Nie wymyślać lore ani faktów o postaciach.
- Po każdej sesji projektowej należy podać krótkie podsumowanie: co
  zmieniono, co ukończono, co pozostało otwarte.
- Jeśli plik nie może zostać fizycznie zapisany lub zaktualizowany,
  należy powiedzieć to wprost. Nie wolno twierdzić, że dokument został
  zaktualizowany, jeśli tak się nie stało.

### Szablon wpisu do Change Log

  --------------------------------------------------------------------------
  Wersja         Data           Zmiana         Powód /        Wpływ
                                               decyzja
  -------------- -------------- -------------- -------------- --------------
  0.1            2026-11-17     Utworzenie     Pierwsza       Punkt wyjścia
                                Master Planu i zatwierdzona   projektu
                                zebranie       koncepcja
                                wymagań z
                                rozmowy
  0.2            2026-11-17     Zapisanie     Właścicielka   Bazowe ograniczenie
                                konfiguracji   potwierdziła    sprzętowe: 16 GB RAM;
                                sprzętowej     pozostanie      bez założenia
                                               przy 16 GB      rozbudowy
  0.3            2026-11-17     Przygotowanie  Specyfikacja    Draft MVP
                                draftu         pierwszej       obejmujący zakres,
                                specyfikacji   wersji          ekrany, przepływy
                                MVP            przygotowana    i kryteria akceptacji;
                                               do akceptacji   brak implementacji
  0.4            2026-11-17     Doprecyzowanie  Właścicielka   Jedna postać graczki;
                                modelu          określiła       jedna historia = jedno
                                rozgrywki       strukturę       wydarzenie zapisywane
                                                rozgrywki       jako wspomnienie; NPC
                                                                mogą działać w tle
  0.5            2026-11-17     Zatwierdzenie   Właścicielka   Wybrano rozbudowany
                                kierunku        wybrała         formularz postaci
                                formularza      wariant         podzielony na sekcje;
                                postaci         expanded        szczegóły UX i typy
                                                                danych pozostają OPEN
  0.6            2026-11-17     Audyt           Odczytano       Potwierdzono brak
                                repozytorium;   bieżące pliki   kodu aplikacji;
                                korekta         main i          dodano niezobowiązującą
                                sprzecznego     sprawdzono      propozycję stacku;
                                punktu OPEN     zawartość       doprecyzowano jedną
                                                repozytorium    stałą postać grywalną
  0.7            2026-11-17     Wybór stacku    Właścicielka   Next.js/React i
                                i szkieletu      wskazała        prosty stack; pierwszy
                                aplikacji        Next.js/React   szkielet aplikacji
  0.8            2026-11-17     Synchronizacja   Właścicielka   Potwierdzono stack;
                                stacku           delegowała      Next.js, SQLite,
                                                 dobór reszty   Prisma, TypeScript
  0.9            2026-11-17     Ujednolicenie    Właścicielka   Cały interfejs aplikacji
                                języka UI        wymagała        po angielsku; język
                                                 aplikacji       pracy pozostaje polski
                                                 angielskiej
  1.0            2026-11-17     Implementacja    Zatwierdzony   Moduł Characters: lista,
                                modułu           formularz       wyszukiwanie, profil,
                                Characters       expanded       edycja, usuwanie, zapis
                                                 i język UI      do SQLite; interfejs EN
  1.1            2026-11-17     Zakładka        Właścicielka   Osobna zakładka Appearance,
                                Appearance      dodała wymóg    opis wyglądu, lokalny upload
                                i avatar        avatara         i podgląd; zdjęcie widoczne
                                                               na karcie i profilu
  1.2            2026-11-17     Story MVP       Kontynuacja     Modele wydarzeń, uczestników,
                                foundation      projektu        tur i wspomnień; lista Story,
                                                               zapis tur gracza i finalizacja
                                                               wydarzenia do Memory
  1.6            2026-11-17     Integracja      Właścicielka   Ręczny test Qwen3.5 4B
                                lokalnego AI     potwierdziła    pozytywny; dodano adapter
                                                jakość modelu   Ollama, walidację segmentów,
                                                               zapis tur NPC/narratora,
                                                               status błędu i retry; czeka
                                                               na test aplikacyjny
  1.5            2026-11-17     Wybór          Brak opłat      Ustalono bezpłatny lokalny
                                lokalnego AI    za API           runtime Ollama i Qwen3.5 4B
                                                               jako pierwszy model do testów
  1.4            2026-11-17     Doprecyzowanie  Właścicielka   Po każdej turze gracza AI
                                pętli Story     zgłosiła brak   ma kontynuować scenę; jedna
                                                odpowiedzi AI    odpowiedź może zawierać
                                                po turach        kilka NPC i narratora,
                                                gracza           z uporządkowanymi
                                                               segmentami wypowiedzi
  1.3            2026-11-17     Ochrona        Integralność   Blokada usunięcia postaci
                                historii        danych          uczestniczących w zapisanych
                                                               wydarzeniach
  --------------------------------------------------------------------------

------------------------------------------------------------------------

## 13. Bieżący stan projektu --- skrót kontekstu

**Produkt:** LIFEVERSE  
**Język aplikacji:** angielski; język współpracy i dokumentacji projektowej: polski.  
**Właścicielka / graczka:** jedna prywatna użytkowniczka, sterująca jedną stałą postacią.  
**Platforma:** lokalna aplikacja webowa na PC, Next.js App Router, React, TypeScript, SQLite i Prisma.  
**Świat:** współczesne fantasy; estetyka Dark Academia / Gothic / Old Money. Kanon świata pozostaje do określenia przez właścicielkę.  
**Story:** pojedyncze wydarzenie/scena, które po zakończeniu zostaje wspomnieniem. NPC docelowo autonomiczni; AI nie może pisać działań, wypowiedzi ani myśli postaci gracza.  
**Characters:** formularz expanded, 11 sekcji; osobna zakładka Appearance, opis wyglądu i lokalny avatar.  
**Dane:** lokalne SQLite; zdjęcia avatarów w `public/uploads/avatars` (wykluczone z Git).  
**AI:** bezpłatny lokalny runtime Ollama; Qwen3.5 4B (`qwen3.5:4b`) zainstalowany i ręcznie przetestowany przez właścicielkę — jakość przykładowej narracji została zaakceptowana. Aplikacja ma lokalny adapter Ollama, wielogłosowe segmenty narrator/NPC, walidację dozwolonych mówców, stan błędu i ponawianie. Integracja aplikacyjna wymaga testu właścicielki; nie oznaczać jej jako DONE przed tym testem. Brak płatnego API i wymaganych subskrypcji.

**Stan implementacji (2026-11-17):**
- Characters: lista, wyszukiwanie, profil, formularz, edycja, usuwanie i avatar. Właścicielka potwierdziła lokalne działanie formularza i uploadu.
- Story foundation: dodawanie pojedynczego wydarzenia, automatyczne dołączanie Player Character, wybór NPC, zapis tur gracza, lista aktywnych wydarzeń i archiwum wspomnień. Postacie powiązane z wydarzeniami są chronione przed usunięciem, aby zachować integralność archiwum.
- Zakończenie wydarzenia tworzy rekord Memory i zachowuje powiązane wydarzenie oraz pełną historię tur.
- Dodano adapter Ollama, wywołanie po turze gracza, zapisywanie osobnych segmentów narratora/NPC, status generowania/błędu i retry. Funkcjonalność oczekuje na test lokalny.
- Pełna autonomia NPC w tle i aktualizowanie relacji nie są jeszcze zaimplementowane.

**Najbliższy krok:** test integracji Ollama w istniejącej scenie: migracja schematu, tura gracza, automatyczna odpowiedź narratora/NPC, zapis i retry po błędzie.
------------------------------------------------------------------------

# Koniec dokumentu

**Dokument przygotowany:** `LIFEVERSE_MVP_SPEC.md` — draft specyfikacji pierwszej działającej wersji. Model rozgrywki oraz kierunek formularza postaci (expanded) zostały doprecyzowane zgodnie z decyzjami właścicielki.
