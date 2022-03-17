# Projektadmin DT173G
Detta är admingränssnittet till projektet i kursen Webbutveckling 3. Med detta admingränssnitt kan du hantera din portfolio helt och hållet genom att lägga till, uppdatera eller ta bort.
Admingränssnittet är uppbyggt på följande sätt:

## /includes
I denna mapp finns filerna config.php, footer.php samt header.php. I config ligger autoload för klassfiler samt en anslutning till databasen, footer innehåller en länk till JavaScript filerna samt stänger taggarna som annars legat i botten av en webbplats.
I header ligger tvärtom från footer, här ligger det översta du hittar på en webbplats tillsammans med länkar till CSS och favicon, även admingränssnittets meny ligger här.

## /includes/images
Här ligger de billder som används på admingränssnittet, i detta fall endast en favicon.

## /includes/js
Här ligger JavaScript filerna som används av admingränssnittet för att skriva ut det som behövs för att hantera portfolion.

## /includes/style
Här ligger admingränssnittets CSS, det som ger denna del sitt utseendé.

## /classes
I denna mapp ligger en klassfil som används för att lagra och hämta data om användare som krävs för inloggningssystemet.

## root
I root ligger filer som admin.php, login.php, logout.php, manageprojects.php, managestudies.php, managework.php samt register.php.
Dessa filer är egna sidor på admingränssnittet, admin.php fungerar som en "landingpage" där instruktioner om admingränssnittet finns.
Login.php är sidan du dirigeras till då du klickar på "logga in" i footer på front-delen av detta projekt, här matar du in användarnamn samt lösenord.
Register.php är en sida som ej är listad i menyn men finns där för att enkelt kunna skapa nya konton för projektets skull.
Logout.php dirigerar dig tillbaka till front-delen och loggar ut dig från admingränssnittet, nästa gång du vill tillbaks behöver du logga in igen.

Sidorna manageprojects.php, managestudies.php och managework.php är där du hanterar den information som finns med i din portfolio, här finns ett formulär där nytt kan läggas till samt kan det användas för att göra ändringar i befintliga inlägg.
Knappar för att ta bort och uppdatera finns bredvid varje rad i tabellen som informationen skrivs ut i och vid klick av uppdatera så byts även knappen "Lägg till" under formuläret ut till en knapp som läser "Uppdatera".
