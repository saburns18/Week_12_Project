
$(document).on('load', () => {
    let beerList; 

    $.get('http://localhost:3000/posts', (data) => {
        beerList = data; 
    }).done(() => buildList());

    

    const buildList = () => {
        $('#render').empty();
        beerList.forEach(beer => {
            $('#render').append(
                `<div id="beer${beer.id}" class="info-box"> 
                id:${beer.id}, ${beer.name}, ${beer.style}, ${beer.ibu} </div>`
            )
            $(`#beer${beer.id}`).on('click', () => deleteBeer(beer.id))
        });
    };
    
    
    $('#myForm').on('submit', (event) => {
        event.preventDefault();
        const formData = {
            name: $('#name').val(''),
            style: $('#style').val(''),
            ibu: $('#ibu').val()
        };
        $.post('http://localhost:3000/posts', 
                {name: formData.name, style: formData.style, ibu: formData.ibu},
                (data) => { console.log(data);
        });

        $('#myForm').trigger('reset');
        buildList();
    });

    const deleteBeer = (id) => {
        $.ajax({
            url: `http://localhost:3000/posts/${id}`,
            type: 'DELETE',
            success: function() {
                buildList()
            }
        });
    };

    $('#updateForm').on('click', (event) => {
        event.preventDefault();
        const formData ={
            id: $('#updateId').val(),
            name: $('#updateName').val(),
            style: $('#updateStyle').val(),
            ibu: $('#updateIbu').val()
        
        };

        $.ajax({
            url: `http://localhost:3000/posts/${formData.id}`, 
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData)            
        }).done(() => buildList());

        $('#updateBeer').trigger('reset');
    });    
    
});