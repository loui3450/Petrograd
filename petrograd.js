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
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/Billeder/imgs/Large/" + produkt.billede + ".jpg";

    if (produkt.udsolgt == false) {
        //produktet er ikke udsolge
        //udsolgt_tekst skal fjernes
        var udsolgt_tekst = klon.querySelector(".udsolgt_tekst");
        udsolgt_tekst.parentNode.removeChild(udsolgt_tekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }


    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}
