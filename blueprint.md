# Blueprint-ul Proiectului

## Prezentare Generală

Acest document descrie arhitectura și planul de dezvoltare pentru o aplicație web modernă, construită cu React și Firebase. Aplicația oferă o experiență de autentificare sigură, monitorizare de senzori în timp real și o interfață modernă, adaptabilă.

## Caracteristici Implementate

*   **Autentificare și Securitate:**
    *   Integrare completă cu Firebase Authentication.
    *   Pagină de autentificare (`/login`) cu funcționalitate de login securizată.
    *   Pagină dedicată pentru schimbarea parolei (`/change-password`) cu validări corespunzătoare.
    *   O rută privată (`/`) accesibilă doar utilizatorilor autentificați.

*   **Dashboard Senzori:**
    *   Afișează date în timp real de la doi senzori de temperatură, citite din Firebase Realtime Database.
    *   Carduri distincte pentru fiecare senzor, cu design modern.
    *   Indicatori vizuali (culori și iconițe) care se schimbă dinamic dacă temperatura depășește limitele setate (prea mică, normală, prea mare).
    *   Butoane "Editează" pe fiecare card pentru a ajusta limitele de temperatură.

*   **Modal de Setări Limite:**
    *   Un modal elegant și responsiv care se deschide la apăsarea butonului "Editează".
    *   Afișează senzorul pentru care se fac modificările.
    *   Două câmpuri de input ("Minim" și "Maxim") pentru setarea noilor limite de temperatură.
    *   **Validare Robustă:**
        *   Utilizatorul este notificat dacă lasă câmpuri goale.
        *   Se asigură că valoarea minimă este strict mai mică decât cea maximă.
        *   Impune ca valorile introduse să fie în intervalul **0°C - 150°C**.
    *   Butoane "Salvează" (acțiune principală) și "Renunță" (acțiune secundară) aranjate vertical pentru o experiență clară pe orice dispozitiv.

*   **Design Modern și Atractiv:**
    *   **Temă Duală (Dark/Light Mode):** Comutator de temă disponibil pe toate paginile principale, cu persistență între sesiuni.
    *   **Meniu Utilizator Derulant:** O iconiță de utilizator care, la click, deschide un meniu elegant cu opțiunile "Schimbă parola" și "Delogare".
    *   **Buton de Autentificare Premium:** Butonul "Intră în cont" are un design deosebit, cu un fundal întunecat, o iconiță `Sparkles` și un chenar cu gradient animat.
    *   **Fundal Static cu Gradient:** Am înlocuit animația "Aurora" cu un gradient subtil și elegant, specific pentru fiecare temă (Light/Dark).
    *   **Feedback vizual:** Utilizarea librăriei `react-toastify` pentru notificări non-invazive.
    *   **Corecturi de text:** Am ajustat textul pentru a folosi diacriticele corecte (ex: "Centrală").

*   **Grafic de Performanță:**
    *   Afișează un grafic cu bare care arată timpul de funcționare al pompei în ultimele zile.
    *   Selector interactiv pentru a vizualiza datele pe diferite intervale (10, 20, 30, 40 de zile).
    *   Design curat și tooltip-uri personalizate pentru o lizibilitate maximă.

*   **Finisaje și Optimizări:**
    *   **Eliminare Contur Grafic:** Am eliminat chenarul vizual care apărea la click pe grafic, pentru o experiență mai curată.
    *   **Optimizare Performanță React:** Am refactorizat componenta graficului (`PumpChart`) folosind hook-ul `useMemo` pentru a preveni randări inutile și a îmbunătăți eficiența.
    
*   **Design Responsiv:**
    *   Interfața este optimizată pentru dispozitive mobile și desktop.

*   **Structura Proiectului:**
    *   Hook-uri personalizate (`useDarkMode`, `useAuth`) pentru o logică curată.
    *   Stilizare modulară cu fișiere CSS dedicate.

## Planul Curent

Funcționalitățile curente au fost implementate cu succes. Aștept noi solicitări pentru dezvoltare.
