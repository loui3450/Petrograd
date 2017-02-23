window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    //læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktliste)

}

function visProduktliste(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    console.log(produkt);
    //klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    //indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_kort_beskrivelse").innerHTML = produkt.kortbeskrivelse;
    klon.querySelector(".data_allergener").innerHTML = produkt.allergener;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/Billeder/imgs/Large/" + produkt.billede + ".jpg";

    if (produkt.allergener == false) {
        var allergener = klon.querySelector(".allergener_tekst");
        allergener.parentNode.removeChild(allergener);
    } else {
        klon.querySelector(".data_allergener").innerHTML = "Her ville der have stået allergener, hvis det var med i JSON-filen! ... Peter Lind...";
    }

    if (produkt.udsolgt == false) {
        //produktet er ikke udsolge
        //udsolgt_tekst skal fjernes
        var udsolgt_tekst = klon.querySelector(".udsolgt_tekst");
        udsolgt_tekst.parentNode.removeChild(udsolgt_tekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        //der er ikke rabat. Rabatprisen skal fjernes
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }




    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}
