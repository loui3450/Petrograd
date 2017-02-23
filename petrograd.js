window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");


    /**** LÆS PRODUKTLISTE ****/
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktliste)

}


/**** LÆSER JSON-FIL OG KALDER visProdukt PÅ ALLE PRODUKTER ****/
function visProduktliste(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}


/**** INDHENTER DATA FRA visProduktliste ****/
function visProdukt(produkt) {
    console.log(produkt);


    /**** KLON PRODUKT_TEMPLATE ****/
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);


    /**** INDSÆTTER DATA I KLON ****/
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_kort_beskrivelse").innerHTML = produkt.kortbeskrivelse;
    klon.querySelector(".data_allergener").innerHTML = produkt.allergener;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;


    /**** RABAT-BEREGNING ****/
    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;


    /**** BILLEDER ****/
    klon.querySelector(".data_billede").src = "/Billeder/imgs/Large/" + produkt.billede + ".jpg";


    /**** ALLERGENER ****/
    if (produkt.allergener == false) {
        var allergener = klon.querySelector(".allergener_tekst");
        allergener.parentNode.removeChild(allergener);
    } else {
        klon.querySelector(".data_allergener").innerHTML = "Her ville der have stået allergener, hvis det var med i JSON-filen! ... Peter Lind...";
    }


    /**** VEGETAR ****/
    if (produkt.vegetar == false) {
        var vegetaregnet = klon.querySelector(".vegetaregnet_tekst");
        vegetaregnet.parentNode.removeChild(vegetaregnet);
    } else {
        var ikke_vegetaregnet = klon.querySelector(".ikke_vegetaregnet_tekst");
        ikke_vegetaregnet.parentNode.removeChild(ikke_vegetaregnet);
    }


    /**** UDSOLGT ****/
    if (produkt.udsolgt == false) {
        //produktet er ikke udsolge
        //udsolgt_tekst skal fjernes
        var udsolgt_tekst = klon.querySelector(".udsolgt_tekst");
        udsolgt_tekst.parentNode.removeChild(udsolgt_tekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }


    /**** RABAT ****/
    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        //der er ikke rabat. Rabatprisen skal fjernes
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }


    /**** TILFØJER klon TIL KATEGORI ****/
    document.querySelector("." + produkt.kategori).appendChild(klon);

}
