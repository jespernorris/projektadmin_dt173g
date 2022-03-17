<?php
    // "landingpage" för admingränssnittet
    include("includes/header.php");

    // skickar användare till login.php vid obehörigt inträde
    if(!isset($_SESSION['username'])) {
        header("Location: login.php");
    }
        ?>
    <article>
        <p>
            Välkommen till ditt admingränssnitt <b><?= $_SESSION['username']?></b>!

            Här finner du alternativ för att redigera och hantera ditt CV i sin helhet.
            Det som i dagsläget finns med på ditt CV är följande:
            <ul>
                <li>Utbildning</li>
                <li>Arbetserfarenhet</li>
                <li>Projekt</li>
            </ul>
        </p>
    </article>
    <article>
        <p>
            På sidan för utbildning kan du lägga till, ta bort och ändra dina tidigare utbildningar som program/kurser.
            Till dessa ger du information som platsen utbildningen lästes på (t.ex Mittuniversitetet), utbildningens namn, startdatum samt slutdatum.
        </p>
        <p>
            Sidan för jobb är där du lägger till din tidigare arbetserfarenhet, även gär går det att lägga till, ta bort och ändra tidigare arbetserfarenheter.
            Här anger du information som arbetsplatsens namn, den titel du hade på arbetet, startdatumet samt slutdatumet.
        </p>
        <p>
            Projektsidan är där dina tidigare arbeten visas, det vill säga webbplatser du tidigare skapat och publicerat. Likt ovan går det lägga till, ta bort samt ändra befintliga.
            Till denna anger du webbplatsens titel, en beskrivning gällande det som finns och skapats samt en URL till webbplatsen så den går att besöka.
        </p>
    </article>


        <?php
    include("includes/footer.php");