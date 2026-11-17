# LIFEVERSE --- Master Project Plan

**Wersja:** 0.1\
**Data utworzenia:** 17 listopada 2026\
**Status projektu:** Koncepcja zatwierdzona częściowo · przed etapem
specyfikacji technicznej\
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

**Preferowany kierunek techniczny:** lokalna aplikacja webowa z lokalnym
magazynem danych. SQLite jest wstępną propozycją bazy danych, ale wybór
technologii wymaga potwierdzenia w etapie technicznym.

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

**Wymaganie UX:** łatwe dodawanie nowych postaci, najlepiej przez
przycisk `+ Add Character` i formularz. Nie powinno być konieczne ręczne
edytowanie wielu plików ani duplikowanie danych.

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
własne cele, relacje, konflikty i inicjatywę.

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

Statusy: - **NOT STARTED** --- nie rozpoczęto. - **IN PROGRESS** --- w
trakcie. - **BLOCKED** --- zablokowane decyzją lub zależnością. -
**DONE** --- ukończono i sprawdzono. - **OPEN** --- wymaga decyzji.

  -----------------------------------------------------------------------
  Etap              Zakres            Kryterium         Status
                                      ukończenia
  ----------------- ----------------- ----------------- -----------------
  0. Product       Zatwierdzenie     Kompletna         IN PROGRESS
  specification     wymagań i         specyfikacja MVP
                    ograniczeń

  1. World Bible   Wprowadzenie      Zatwierdzony      NOT STARTED
                    kanonu świata     dokument świata

  2. Character     Profil postaci i  Można tworzyć i   NOT STARTED
  model             formularz         edytować postacie
                    dodawania

  3. Data          Schemat bazy,     Dane zachowują    NOT STARTED
  architecture      zapis i eksport   spójność po
                                      restarcie

  4. STORY MVP     Turowy roleplay i Testowa scena     NOT STARTED
                    zasady kontroli   działa zgodnie z
                    postaci           zasadami

  5. SOCIAL MVP    Feed, posty,      Podstawowe akcje  NOT STARTED
                    replies, likes,   działają i
                    reposts, profile  zapisują dane

  6. Messaging     DMs i group chats Wiadomości i      NOT STARTED
                                      członkostwo grup
                                      zapisują się

  7. Relationships Model relacji i   Zmiany wynikają z NOT STARTED
                    konsekwencje      wydarzeń

  8. Shared world  Integracja Story  Jedno wydarzenie  NOT STARTED
  state             i Social          może aktualizować
                                      obie warstwy

  9. Notifications Powiadomienia     Powiadomienia są  NOT STARTED
                    wynikające z      spójne ze
                    aktywności        zdarzeniami

  10. AI           Wybór i           AI korzysta z     BLOCKED --- wybór
  integration       integracja        kontekstu i       modelu
                    silnika AI        zapisuje skutki

  11. UI polish    Dopracowanie Dark Interfejs jest    NOT STARTED
                    Academia UI       czytelny i spójny

  12. Testing      Testy ciągłości,  Zaliczone         NOT STARTED
                    danych i          scenariusze
                    rozgrywki         testowe

  13. Backup &     Kopie zapasowe i  Można odtworzyć   NOT STARTED
  release           uruchamianie      projekt po awarii
                    lokalne
  -----------------------------------------------------------------------

### Proponowana kolejność MVP

Najpierw należy uruchomić minimalny, działający pionowy wycinek: 1.
utworzenie postaci, 2. rozpoczęcie sceny Story, 3. wykonanie tury
gracza, 4. odpowiedź AI jako NPC i narrator, 5. zapis sceny i aktualnego
stanu, 6. utworzenie wpisu Social wynikającego z wydarzenia --- jeśli ma
to uzasadnienie.

Dopiero potem rozszerzać system o pełny feed, DM-y, grupy, powiadomienia
i bardziej rozbudowaną autonomię.

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

- [ ] Czy sceny będą organizowane w rozdziały i historie?
- [ ] Czy gracz może w dowolnej chwili rozpocząć nową scenę?
- [ ] Jak szczegółowy ma być zapis tur?
- [ ] Jak rozwiązywać przeskoki czasowe?
- [ ] Czy AI może proponować rozpoczęcie nowej sceny, bez wymuszania
  jej?

### Technologia

- [ ] Wybór stacku frontend/backend.
- [ ] Potwierdzenie SQLite lub innej bazy.
- [ ] Wybór silnika AI: lokalny, API lub ręczny przepływ z ChatGPT.
- [ ] Specyfikacja sprzętu PC.
- [ ] Sposób uruchamiania aplikacji.
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
  --------------------------------------------------------------------------

------------------------------------------------------------------------

## 13. Bieżący stan projektu --- skrót kontekstu

**Produkt:** LIFEVERSE\
**Użytkowniczka:** jedna prywatna właścicielka / graczka\
**Platforma:** lokalna aplikacja desktopowa na PC\
**Świat:** współczesne fantasy, klimat Harry'ego Pottera w realiach
współczesnych, Dark Academia / Gothic / Old Money\
**Główne moduły:** Social, Story, Characters, Relationships, World
Bible, World Engine\
**Social:** tekstowa sieć inspirowana X; bez Trends i bez wymogu
obrazów\
**Story:** turowa proza; gracz kontroluje wyłącznie swoją główną postać;
AI kontroluje NPC i świat\
**Autonomia NPC:** wysoka\
**Dodawanie postaci:** ma być łatwe, przez interfejs i formularz\
**Dane:** lokalne, trwałe, z możliwością backupu\
**AI:** wybór technologii nadal otwarty; ChatGPT Free nie oznacza
automatycznego dostępu do modelu przez lokalną aplikację\
**Priorytet:** spójna, działająca symulacja, nie tylko atrakcyjny
dashboard.

------------------------------------------------------------------------

# Koniec dokumentu

**Następny dokument do przygotowania po Master Planie:**
`LIFEVERSE_MVP_SPEC.md` --- szczegółowa specyfikacja pierwszej
działającej wersji, ekran po ekranie i akcja po akcji.
