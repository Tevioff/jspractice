let fruits = [{
        id: 1,
        title: 'Яблоко',
        price: 20,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkzZMTh_n9DE3CznuCnA8wVdQI7IQT9sDng&usqp=CAU'
    },
    {
        id: 2,
        title: 'Киви',
        price: 40,
        img: 'https://www.alimentarium.org/sites/default/files/media/image/2017-01/alimentarium_kiwis_0.jpg'
    },
    {
        id: 3,
        title: 'Банан',
        price: 45,
        img: 'https://kot.sh/sites/default/files/articles-image/25-prost-banana-preview.jpg'
    },

]
const toHTML = fruit => (`
    <div class="col">
      <div class="card">
        <img src="${fruit.img}"
            height="300px" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
        </div>
      </div>
    </div> 
    `)

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}
render()
const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    // footerButtons: [{
    //     text: 'Закрыть',
    //     type: 'primary',
    //     handler() {
    //         priceModal.close()
    //     }
    // }, ]
})
// const confirmModal = $.modal({
//     title: 'Вы уверены?',
//     closable: true,
//     width: '400px',
//     // footerButtons: [{text: 'Отменить', type: 'secondary', handler() {
//     //     confirmModal.close()
//     // }},
//     //     {text: 'Удалить', type: 'danger', handler() {
//     //     confirmModal.close()
//     // }},

//     // ]
// })
document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        <a href="#" class="btn btn-primary" data-btn="price" data-close="true" style="position:relative; left:290px">Закрыть</a>
        `)
        priceModal.open()
    } else if (btnType === "remove") {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>
                <a href="#" class="btn btn-secondary" data-btn="remove" data-close="true" style="position:relative; left:185px">Отменить</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-close="true" style="position:relative; left:185px">Удалить</a>
            `
        }).then(()=>{
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(()=>{
            console.log('Cencel');
        })
        // confirmModal.setContent(`
        //     <p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>
        //     <a href="#" class="btn btn-secondary" data-btn="remove" data-close="true" style="position:relative; left:185px">Отменить</a>
        //     <a href="#" class="btn btn-danger" data-btn="remove" data-close="true" style="position:relative; left:185px">Удалить</a>
        // `)
        // confirmModal.open()

    }
})