class Beer {
    constructor(name, style, ibu) {
        this.name = name;
        this.style = style;
        this.ibu = ibu;
    }
}

class Style {
    constructor(name) {
        this.name = name;
    }
}

class Ibu {
    constructor(value) {
        this.value = value;
    }
}

class BeerService {
    static url = "http://localhost:3000/posts/1";

    static getAllBeers() {
        return $.get(this.url);
    }

    static getBeer(id) {
        return $.get(this.url + `/${id}`);
    }

    static addBeer(beer) {
        return $.post(this.url, beer);
    }

    static updateBeer(beer) {
        return $.ajax({
            url: this.url + `/${beer._id}`,
            dataType: 'json',
            data: JSON.stringify(beer),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteBeer(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELTE'
        });
    }
}

class DOMManager {
    static ;

    static getAllBeers() {
        BeerService.getAllBeers().then(beers => this.buildList(beers));
    }

    static addBeer(name, style, ibu) {
        BeerService.addBeer(new Beer(name, style, ibu))
            .then(() => {
                return BeerService.getAllBeers();
        })
        .then((beer) => this.buildList());
    }

    static deleteBeer(id) {
        BeerService.deleteBeer(id)
            .then(() => {
                return BeerService.getAllBeers();
            })
            .then((beers) => this.buildList(beers));
    }

    static buildList(beer) {
        $('#render').empty();
        beerList.forEach(beer =>{
            $('#render').append(
            `<div id="beer${beer.id}" class="info-box"> 
            id:${beer.id}, ${beer.name}, ${beer.style}, ${beer.ibu} 
            <button class="btn btn-danger" onlick="DOMManager.deleteBeer('${beer._id}')">Delete</button>
            </div>`
        )
        static formData = {
            name: $('#name').val(''),
            style: $('#style').val(''),
            ibu: $('#ibu').val()
        }
    });    
};

$('#myForm').submit((event) => {
    event.preventDefault();
    DOMManager.addBeer($('#name').val(), $('#style').val(), $('#ibu').val());
    $('#name').val('');
    $('style').val('');
    $('ibu').val();
});

$.post('http://localhost:3000/posts', 
                {name: formData.name, style: formData.style, ibu: formData.ibu},
                (data) => { console.log(data);
        });

DOMManager.getAllBeers();